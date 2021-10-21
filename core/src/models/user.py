import uuid
import datetime
import json
import time
from src import CACHE, DB
from src.logger import logger
from src.event_logger import EventLogger
from src.models.types import MediumWrapper as Medium
from src.models.types import SenderTypeWrapper as SenderType

class User():

    def __init__(self, user_id):
        self.user_id = user_id
        self.CACHE = CACHE

    def get_session_data(self, meta_data):

        response = {}
        session_data = {}
        flow_id = meta_data.get("flowId")
        sender = SenderType.get_name(meta_data.get("senderType"))
        if sender == "USER":
            business_id = meta_data["recipient"]["id"]
        else:
            business_id = meta_data["sender"]["id"]

        if flow_id:
            user_session_key = self.user_id + "." + business_id + "." + flow_id + "." + "sessions"
        else:
            user_session_key = self.user_id + "." + "sessions"

        user_sessions = self.CACHE.lrange(user_session_key, 0, -1)

        session_id = meta_data.get("sessionId")
        # initializing session if it does not exist
        if session_id is None:
            session_id = str(uuid.uuid4())
            meta_data["sessionId"] = session_id
            EventLogger().log_event(type_of_event="SESSION_START", data=meta_data)
        # session_id = str(uuid.uuid4()) if session_id is None else session_id

        if session_id in user_sessions:
            session_data = self.CACHE.hgetall(session_id)
        else:
            # create session in cache
            self.CACHE.lpush(user_session_key, session_id)

        response["session_id"] = session_id

        for key, value in session_data.items():
            response[key] = value

        var_data = response.get("var_data", "{}")
        response["var_data"] = json.loads(var_data)
        return response

    def set_state(self, session_id, state, meta_data):
        #TODO define an object for state and pass data to blueprint object
        # this is not really good, can cause lot of confusions
        # check if appending to state can work
        try:
            new_state = {}
            final_var_data = state.get("var_data", {})
            new_var_data = state.get("new_var_data", {})

            #TODO: need to choose sender.medium or recipient.medium based on senderType
            channel_type = meta_data["sender"]["medium"]

            channel = Medium.get_name(channel_type)
            business_name = state.get("business_name", "")
            timestamp = int(time.time())

            current_node_id = state.get("current_node_id")
            if current_node_id is not None:
                new_state["current_node_id"] = state["current_node_id"]

            new_state["timestamp"] = timestamp
            new_state["var_data"] = json.dumps(final_var_data)
            new_state["flow_id"] = state["flow_id"]
            new_state["previous_flow_id"] = state.get("previous_flow_id", "")

            self.CACHE.hmset(session_id, new_state)
            logger.info(f"User state with session_id {session_id} updated with state {new_state}")
            # Too many arguments pass an object
            self._persist_data(var_data=new_var_data, session_id=session_id, channel=channel,\
                    business_name=business_name, business_id=state.get("business_id"), flow_id=state["flow_id"])

            return 1
        except Exception as err:
            logger.error(err)
            raise

    def _persist_data(self, var_data, session_id="", channel="", business_name="", flow_id="", business_id=""):
        # change this method to perform async
        if var_data == {}:
            return 1
        object_id = str(uuid.uuid4())
        timestamp = datetime.datetime.utcnow()
        collection = DB["user_data"]
        document = {
            "_id": object_id,
            "user_id" : self.user_id,
            "flow_id": flow_id,
            "session_id": session_id,
            "business_id": business_id,
            "data": var_data,
            "channel": channel,
            "business_name": business_name,
            "timestamp": timestamp
            }
        try:
            saved_document_id = collection.insert_one(document).inserted_id
            logger.info(f"Variable data saved with object_id {saved_document_id}")
            return 1
        except Exception as err:
            logger.error(err)
            raise
