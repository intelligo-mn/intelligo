"""
This is the entry point to bot-core server
Author: https://github.com/velutha
"""
import os
import traceback
from flask import request, jsonify
from werkzeug.exceptions import HTTPException
from src import app, MessageHandlerPool
from src.validator import Validator
# from src.controllers.business_controller import BusinessController
from src.controllers.chatflow_controller import ChatFlowController
from src.controllers.session_controller import SessionController
from src.logger import logger
from src.responder import MessageProcessor


@app.route("/bot/health")
def hello_world():
    status_message = {"status": "UP v 1.11"}
    return jsonify(status_message)


@app.route("/bot/session", endpoint="get_session")
@Validator.validate_session_params
def get_session():
    user_id = request.args.get("user_id")
    flow_id = request.args.get("flow_id", "")
    business_id = request.args.get("business_id", "")

    response = SessionController.get_active_session(user_id, business_id, flow_id)

    return response

@app.route("/bot/clear", endpoint="clear_sessions")
@Validator.validate_session_params
def clear_sessions():
    user_id = request.args.get("user_id")
    flow_id = request.args.get("flow_id")
    business_id = request.args.get("business_id")
    response = SessionController.clear_sessions(user_id, business_id, flow_id)

    return response

# add a validator method to check for data in body
@app.route("/bot/flow", methods=["POST"])
def flow_handler():
    business_data = request.get_json()
    response = ChatFlowController.populate_flows_new(business_data)

    return response

@app.route("/bot/refresh")
@Validator.validate_flow_params
def populate_ana_flows():
    flow_id = request.args.get("flow_id")
    response = ChatFlowController.refresh_flows(flow_id)

    return response
# @app.route("/bot/business", methods=["GET"], endpoint="get_business")
# @Validator.validate_business_params
# def get_business():
    # business_id = request.args.get("business_id")
    # response = BusinessController.get_business(business_id)

    # return response

# @app.route("/bot/business", methods=["POST"])
# def business_handler():
    # business_data = request.get_json()
    # response = BusinessController.create_business(business_data)

    # return response
@app.route("/bot/message", methods=["POST"])
def message_handler():
    message = request.get_json()

    logger.info(f"Message Received {message}")

    handle_message = MessageHandlerPool.submit(MessageProcessor(message).respond_to_message)
    exception = handle_message.exception()
    if exception:
        logger.error(exception)

    return jsonify(status="received")


@app.route("/bot/events", methods=["POST"])
def event_handler():
    message = request.get_json()

    logger.info(f"Event Received {message}")

    response = MessageProcessor(message).respond_to_events()

    logger.info(f"Event Response {response}")

    return jsonify(response)

@app.errorhandler(Exception)
def handle_error(e):
    code = 500
    logger.error(traceback.format_exc())
    if isinstance(e, HTTPException):
        code = e.code
    return jsonify(error=str(e)), code

if __name__ == "__main__":
    HOST = os.environ.get("HOST") or "0.0.0.0"
    PORT = os.environ.get("PORT") or 9500
    PORT = int(PORT)
    app.run(host=HOST, port=PORT)
