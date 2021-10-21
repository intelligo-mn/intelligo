"""
This module handles acting on "events" in message object
Author: https://github.com/velutha
"""
import json
from src.models.types import EventTypeWrapper as EventType, SenderTypeWrapper as SenderType
from src.models.message import MessageWrapper as Message
from src.models.ana_node import AnaNode
from src.models.custom_message import CustomMessage
from src.converters.ana.node_processors.combination.combination_processor import CombinationProcessor
from src.converters.ana.ana_converter import Converter as AnaConverter
from src.logger import logger
from src.utils import Util

class MessageEventHandler(object):

    def __init__(self, state, meta_data, message_data):
        self.state = state
        self.meta_data = meta_data
        self.message_data = message_data

    def handle_events(self, events):
        responses = []
        for event in events:
            logger.debug(f"Event received {event}")
            event_type = EventType.get_name(event.get("type"))
            handler_method = getattr(self, "handle_%s" % event_type.lower(), None)

            if handler_method is None:
                logger.error(f"Unknown event encountered in message {event}")
            else:
                response = handler_method(event) # for synchronous events, return the response
                responses.extend(response)

        return responses

    def handle_typing(self, event):
        logger.debug(f"Typing event received meta {self.meta_data} event {event}")
        response = self.__handle_delivery_events(event)
        return response

    def handle_ack(self, event):
        logger.debug(f"ACK event received meta {self.meta_data} event {event}")
        response = self.__handle_delivery_events(event)
        return response

    def __handle_delivery_events(self, event):
        sender = SenderType.get_name(self.meta_data["senderType"])

        sending_to = None

        if sender == "AGENT":
            sending_to = "USER"
        elif sender == "USER":
            node_key = self.state.get("current_node_id")
            is_agent_node = AnaNode(node_key).check_if_agent_node()
            if is_agent_node:
                sending_to = "AGENT"

        logger.debug(f"Typing event forwarded to {sending_to} meta {self.meta_data} event {event}")

        message = Message(meta=self.meta_data, events=[event]).trim()

        Util.send_messages(messages=[message], sending_to=sending_to)
        return []


    def handle_set_session_data(self, event):

        data = event.get("data", "{}")

        try:
            dict_data = json.loads(data)
            var_data = self.state.get("var_data", {})
            final_var_data = Util.merge_dicts(var_data, dict_data)
            self.state["var_data"] = final_var_data
        except ValueError:
            logger.error(f"Set session data payload is not in json format {data}")

        return []

    def handle_intent_to_handover(self, event):
        # from state get current_node_id
        # check if it's handofftoagent type node
        # process this node as combination node and get message data
        # fill meta and construct message
        # respond with this message
        node_id = self.state.get("current_node_id")
        node_contents = AnaNode(node_id).get_contents()
        data = CombinationProcessor(self.state).process_node(node_contents)
        messages = data.get("user_messages", [])
        message_data = {}
        if messages:
            message_data = messages[0]
        message = Message(meta=self.meta_data, data=message_data).trim()

        return [message]

    def handle_handover(self, event):
        # from event payload determine the next node
        # convert this node into message
        # send this message to user
        # update state with new_node_id as current_node_id
        # respond with 200 ok status success
        current_node_id = self.state.get("current_node_id")
        next_node_data = AnaNode(current_node_id).get_next_node_data(self.message_data, self.state)
        next_node_id = next_node_data.get("node_id")

        self.state["current_node_id"] = next_node_id
        node_data = AnaNode(next_node_id).get_contents()
        data = AnaConverter(self.state).get_messages_data(node_data, self.message_data)
        messages_data = data.get("user_messages")

        self.meta_data["id"] = ""
        messages = [Message(meta=self.meta_data, data=data).trim() for data in messages_data]

        # message = Message(meta=self.meta_data, data=message_data).trim()
        user_response = Util.send_messages(messages=messages, sending_to="USER")


        if user_response:
            Util.update_state(meta_data=self.meta_data, state=self.state, is_handover=True)
            Util.log_events(meta_data=self.meta_data, state=self.state, events=data.get("publish_events", []))
        return []

    def handle_no_agent_found(self, event):

        messages = []
        self.meta_data["id"] = ""

        message_text = "Apologies, our agents are busy at the moment"
        data = CustomMessage.get_simple_text(text=message_text)
        message = Message(meta=self.meta_data, data=data).trim()
        messages.append(message)

        message_text = "If you have already shared your information, we will get back to you"
        data = CustomMessage.get_simple_text(text=message_text)
        message = Message(meta=self.meta_data, data=data).trim()
        messages.append(message)

        user_response = Util.send_messages(messages=messages, sending_to="USER")
        return []


    # def handle_intent_to_handover(self, event):
        # try:
            # data = Converter(self.state).get_messages(meta_data=self.meta_data, message_data=self.message_data, event="INTENT_TO_HANDOVER")
            # outgoing_messages = data.get("messages", [])

            # As a response to intent to handover event, Agent Panel expects input type messages in response
            # messages_to_return = [item for item in outgoing_messages if item['sending_to'] == "AGENT" and \
                    # item['message']['data'].get('type', None) == MessageType.get_value("INPUT")]
            # and item['message']['data']['content'].get('inputType', None) == InputType.get_value("OPTIONS")


            # return messages_to_return
        # except ValueError:
            # logger.error(f"Error in INTENT_TO_HANDOVER get_messages with data: {data}")

        # return []

    # def handle_handover(self, event):
        # try:
            # data = Converter(self.state).get_messages(meta_data=self.meta_data, message_data=self.message_data, event="HANDOVER")
            # outgoing_messages = data.get("messages", [])

            # user_messages = [message["message"] for message in outgoing_messages if message["sending_to"] == "USER"]
            # user_response = Util.send_messages(messages=user_messages, sending_to="USER")

            # if user_response:
                # Util.update_state(meta_data=self.meta_data, state=self.state, event="HANDOVER")

        # except ValueError:
            # logger.error(f"Error in HANDOVER get_messages with data: {data}")

        # return []
