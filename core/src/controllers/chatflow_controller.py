"""
Chat Flow data controller
Author: https:github.com/velutha
"""
from flask import jsonify
from src.models.business import Business
from src.models.chat_flow import ChatFlow
# from src.logger import logger

class ChatFlowController():

    def __init__(self):
        pass

    @staticmethod
    def refresh_flows(flow_id):
        flow = ChatFlow(flow_id).get_flow()
        nodes = flow["flow"]
        chat_flow_saved = ChatFlow(flow_id).save(nodes)
        return jsonify(message="success") if chat_flow_saved else jsonify(message="failure")

    @staticmethod
    def populate_flows_new(data):

        business_data = {}
        business_id = data["businessId"]
        flow_id = data["id"]
        business_data["business_id"] = business_id
        business_data["flow_id"] = data["id"]
        business_data["business_name"] = data.get("businessName", "")
        business_data["flow_name"] = data["name"]
        business_data["user_id"] = data["userId"]
        nodes = data["flow"]

        business_data_saved = Business(business_id).save(business_data)
        flow_data_saved = ChatFlow(flow_id).save(nodes)
        return jsonify(message="success") if business_data_saved and flow_data_saved else jsonify(message="failure")
