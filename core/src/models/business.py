"""
Model for business entity, one business can have many chat flows
Author: https://github.com/velutha
"""
import datetime
from src import CACHE, DB
from src.logger import logger
# import uuid
# import json
# from src.config import flow_config as config

class Business():
    """
    Object blueprint in CACHE
        {
            business_id: {
                "name": "",
                "email": "",
                "phone": "",
                "logoUrl": "",
                "status": "",
                "colors": []
            }
        }
    """

    def __init__(self, business_id):

        self.business_id = business_id
        self.CACHE = CACHE
        self.collection = DB.Businesses

    def save(self, business_data):

        # business_keys = ["name", "email", "phone", "logoUrl", "status", "colors"]
        # data = {key : business_data[key] for key in business_keys}
        data = {}
        data["business_name"] = business_data.get("name", "")
        data["email"] = business_data.get("email", "")
        data["phone"] = business_data.get("phone", "")
        data["logoUrl"] = business_data.get("logoUrl", "")
        data["status"] = business_data.get("status", "")
        data["colors"] = business_data.get("colors", "")
        data["flow_id"] = business_data.get("flow_id", "")
        data["timestamp"] = datetime.datetime.now()

        try:
            self.CACHE.hmset(self.business_id, data)
            logger.info(f"Business data written to cache for {self.business_id}")
            return True
        except Exception as err:
            logger.error(f"Error writing business data to cache {self.business_id}")
            logger.error(err)
            return False

    def get_info(self):

        # read from cache, if not found, read from db and save to cache
        business_data = self.CACHE.hgetall(self.business_id)

        if business_data is None:
            business_data = self.collection.find_one({"_id": self.business_id})
            if business_data is not None:
                self.save(business_data)
            else:
                business_data = {}

        business_data["business_id"] = self.business_id
        return business_data

    # def get_business_data(self):

        # business_object = self.CACHE.hgetall(self.business_id)
        # return business_object

    # def get_details(self):
        # business_object = self.collection.find_one({"_id": self.business_id})
        # if business_object is None:
            # return {}
        # response_keys = ["business_id", "flow", "business_name", "flow_id"]
        # business_details = {key: value for key, value in business_object.items() if key in response_keys}
        # return business_details

    # def save_business_data_to_cache(self, business_data, nodes):

        # if business_data == {}:
            # return False

        # flow_id = business_data["flow_id"]
        # node_dict = {}

        # business_keys = ["flow_id", "business_name"]
        # business_data_to_save = {key : business_data[key] for key in business_keys}

        # for node in nodes:
            # if node["Id"] not in config["archived_node_ids"]:
                # if node.get("IsStartNode", False):
                    # get_started_key = flow_id + "." + config["first_node_key"]
                    # node_dict[get_started_key] = json.dumps(node)
                # key = flow_id + "." + node["Id"]
                # node_dict[key] = json.dumps(node)

        # try:
            # self.CACHE.mset(node_dict)
            # logger.info(f"Node data written to cache for flow {flow_id}")
            # self.CACHE.hmset(self.business_id, business_data_to_save)
            # logger.info(f"Business data written to cache for flow {flow_id}")
            # return True
        # except Exception as err:
            # logger.error("Error writing to cache")
            # logger.error(err)
            # return False

    # def save(self, data):

        # match_query = {"business_id" : self.business_id}

        # update_document = {}
        # flow_id = str(uuid.uuid4())
        # update_document["flow"] = data["flow"]
        # update_document["business_name"] = data["business_name"]
        # update_document["updated_at"] = self.updated_at

        # try:
            # self.collection.update_one(
                # match_query,
                # {
                    # "$set": update_document,
                    # "$setOnInsert": {
                        # "flow_id": flow_id,
                        # "created_at": self.created_at
                    # }
                # },
                # upsert=True)

            # return True
        # except Exception as err:
            # logger.error(err)
            # return False
