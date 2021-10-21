"""
Model for Chat Flow
Author: https://github.com/velutha
"""
import json
from src.config import flow_config as config
from src import CACHE, DB
from src.logger import logger

class ChatFlow():
    """
    Object blueprint in CACHE
        {
            flow_id + "." + node_id : node_data
        }
    """

    def __init__(self, flow_id):

        self.flow_id = flow_id
        self.CACHE = CACHE
        self.collection = DB.Flows

    def save(self, nodes):

        node_dict = {}
        for node in nodes:
            if node["Id"] not in config["archived_node_ids"]:
                if node.get("IsStartNode", False):
                    get_started_key = self.flow_id + "." + config["first_node_key"]
                    node_dict[get_started_key] = json.dumps(node)
                key = self.flow_id + "." + node["Id"]
                node_dict[key] = json.dumps(node)

        try:
            self.CACHE.mset(node_dict)
            logger.info(f"Node data written to cache for flow {self.flow_id}")
            return True
        except Exception as err:
            logger.error("Error writing to cache")
            logger.error(err)
            return False

    def get_flow(self):
        flow = self.collection.find({"_id": self.flow_id}).sort("createdAt", -1).limit(1)
        return flow[0]
