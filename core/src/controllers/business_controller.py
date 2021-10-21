"""
Business data controller
Author: https:github.com/velutha
"""
# from flask import jsonify
# from src.logger import logger
# from src.models.business import Business
# from src.controllers.chatflow_controller import ChatFlowController

# class BusinessController():

    # def __init__(self, *args, **kwargs):
        # pass

    # @staticmethod
    # def create_business(data):

        # business_id = data["business_id"]
        # business_data = {}
        # business_data["flow"] = data["flow"]
        # business_data["business_name"] = data["business_name"]
        # create_business = Business(business_id).save(business_data)
        # logger.info("Created business details")
        # ChatFlowController.populate_flows(business_id)

        # if create_business:
            # return jsonify(message="success")

        # return jsonify(message="failure"), 500

    # @staticmethod
    # def get_business(business_id):
        # business_data = Business(business_id).get_details()

        # if business_data == {}:
            # return jsonify(message="business not found"), 404

        # return jsonify(business_data)
