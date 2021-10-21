# from functools import reduce
import json
import uuid
import time
import requests
from jsonpath import jsonpath
from src.config import application_config
from src.logger import logger
from src.models.types import SenderTypeWrapper as SenderType
from src.models.user import User
from src.models.business import Business
from src.event_logger import EventLogger
from src import EventLogPool

class Util(object):

    @staticmethod
    def merge_dicts(*args):
        result = {}
        for dictionary in args:
            logger.debug("Merging dictionaries")
            logger.debug(f"{dictionary} {dictionary.__class__}")
            result.update(dictionary)
        return result

    @staticmethod
    def deep_find(obj, path):
        try:
            val = jsonpath(obj, path)
            if bool(val) and isinstance(val, list) and len(val) == 1:
                val = val[0]
            return val
        except Exception as err:
            logger.error(err)
            return None

    @staticmethod
    def prepare_agent_message(message):
        message['meta']['id'] = str(uuid.uuid4())
        message['meta']['timestamp'] = int(time.time())
        return message

    @staticmethod
    def send_messages(messages, sending_to):

        endpoints = {"USER": application_config["GATEWAY_URL"], \
                "AGENT": application_config["AGENT_URL"]}
        url = endpoints.get(sending_to)

        if url is None:
            return 0

        headers = {"Content-Type" : "application/json"}
        if messages == []:
            logger.info(f"No messages to send to {sending_to}")
            return 1
        #This is deliberately synchronous to maintain order of messages being
        #sent
        for message in messages:
            json_message = json.dumps(message)
            try:
                response = requests.post(url, headers=headers, data=json_message)
                logger.info(response)
                logger.info(f"Message sent to {sending_to} {message}")
            except Exception as err:
                logger.error(err)
                return 0
        return 1

    @staticmethod
    def update_state(state, meta_data, is_handover=False):
        """
        This methods updates the state of the user after the message is sent
        For e.g. updating current_node_id
        For now agent is stateless, state corresponds to only user
        """

        sender = SenderType.get_name(meta_data["senderType"])

        if (not is_handover) and sender == "AGENT":
            # no need to update user state
            return state

        user_id = meta_data["sender"]["id"]
        session_id = meta_data["sessionId"]
        state_saved = User(user_id).set_state(session_id, state, meta_data)
        return state_saved

    @staticmethod
    def get_current_state(meta_data):
        """
        Gets state of the user in conversation which gives info about where he is in conversation
        Gets info the flow/business to which user belongs to
        For e.g. current_node_id of flow exists in state
        """

        sender_type = SenderType.get_name(meta_data["senderType"])

        if sender_type == "AGENT":
            user_id = meta_data["recipient"]["id"]
            business_id = meta_data["sender"]["id"]
        else:
            user_id = meta_data["sender"]["id"]
            business_id = meta_data["recipient"]["id"]

        state = User(user_id).get_session_data(meta_data=meta_data)
        flow_id = meta_data.get("flowId")

        # business_id = flow_id if flow_id else business_id
        business_data = Business(business_id).get_info()
        logger.debug(f"Business data is {business_data}")

        # if state has flow_id use it else use flowId from meta_data
        # else use flow_id got from business_id for backwards compatibility
        if state.get("flow_id"):
            state["flow_id"] = state.get("flow_id")
        elif flow_id:
            state["flow_id"] = flow_id
        else:
            state["flow_id"] = business_data.get("flow_id", "")
        # state["flow_id"] = state.get("flow_id") if state.get("flow_id") else flow_data.get("flow_id", "")
        state["business_name"] = business_data.get("business_name", "")
        state["business_id"] = business_data.get("business_id")
        # current_state = Util.merge_dicts(state, flow_data)

        return state

    @staticmethod
    def log_events(meta_data, state, events):
        """
        While the user is responded with messages, there will be some analytics events
        which are recorded for e.g. 'click' event for user clicking the button
        No analytics events are recorded for messages sent by agent as of now
        """

        sender = SenderType.get_name(meta_data["senderType"])

        if sender == "AGENT":
            # no need to log any event as of now
            return 1

        type_of_event = "analytics"

        for event in events:
            data = {
                "meta_data": meta_data,
                "state_data": state,
                "event_data": event
                }
            EventLogPool.submit(EventLogger().log_event(type_of_event=type_of_event, data=data))

        return 1
