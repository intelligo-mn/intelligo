"""
Message lifecycle goes here, receiving to responding
All the higher level logic should exist here
Author: https://github.com/velutha
"""
from src.utils import Util
from src.converters.converter import Converter
from src.event_handler import MessageEventHandler
from src.logger import logger

class MessageProcessor():

    def __init__(self, message):

        self.meta_data = message["meta"]
        self.message_data = message.get("data", {})
        self.events = message.get("events", [])

        self.sender_id = self.meta_data["sender"]["id"]
        self.recipient_id = self.meta_data["recipient"]["id"]

        self.state = Util.get_current_state(self.meta_data)
        logger.info(f"Current state of user is {self.state}")
        self.meta_data["sessionId"] = self.state.get("session_id")

    def respond_to_message(self):
        """
        This method is responsible for getting the messages to respond with
        Also covers analytics events for those messages for e.g. click, view
        """

        MessageEventHandler(self.state, self.meta_data, self.message_data).handle_events(events=self.events)
        data = Converter(self.state).get_messages(meta_data=self.meta_data, message_data=self.message_data)

        outgoing_messages = data.get("messages", [])
        events_to_publish = data.get("publish_events", [])

        agent_messages = [message["message"] for message in outgoing_messages if message["sending_to"] == "AGENT"]
        user_messages = [message["message"] for message in outgoing_messages if message["sending_to"] == "USER"]

        agent_response = Util.send_messages(messages=agent_messages, sending_to="AGENT")
        user_response = Util.send_messages(messages=user_messages, sending_to="USER")

        if agent_response or user_response:

            Util.update_state(meta_data=self.meta_data, state=self.state)
            Util.log_events(meta_data=self.meta_data, state=self.state, events=events_to_publish)

        return 1

    def respond_to_events(self):
        """
        This method is responsible for responding to events hit on synchronous api
        """
        event_response = MessageEventHandler(self.state, self.meta_data, self.message_data).handle_events(events=self.events)

        if event_response == []:
            return {}
        return event_response[0]
