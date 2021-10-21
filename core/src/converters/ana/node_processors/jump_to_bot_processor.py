"""
This module handles when chat jumps from one bot to another
Author: https://github.com/velutha
"""
from src.models.ana_node import AnaNode
from src.config import flow_config as config

class JumpToBotProcessor():

    def __init__(self, state):
        self.state = state

    def get_next_node(self, node_data):

        current_flow_id = self.state.get("flow_id", "")
        self.state["previous_flow_id"] = current_flow_id
        new_flow_id = node_data.get("TargetBotId")
        self.state["flow_id"] = new_flow_id
        next_node_id = node_data.get("TargetNodeId")
        if next_node_id:
            next_node_key = new_flow_id + "." + next_node_id
        else:
            next_node_key = new_flow_id + "." + config["first_node_key"]
        next_node_data = AnaNode(next_node_key).get_contents()
        return {"id": next_node_key, "data": next_node_data}

    def process_node(self, node_data):
        pass
