"""
Messages if an agent is connected are constructed here
Author: https://github.com/velutha
"""
from src.models.message import MessageContentWrapper as MessageContent, MessageDataWrapper as MessageData
from src.models.inputs import TextInputWrapper as TextInput
from src.models.types import MessageTypeWrapper as MessageType, InputTypeWrapper as InputType
from src.logger import logger

class Converter():

    def __init__(self, state):
        self.state = state

    @classmethod
    def get_messages_data(cls, message_data):

        messages_data = []
        user_messages_data = cls.__convert_to_user_message(message_data)
        other_messages_data = cls.get_agent_connected_messages()

        messages_data = user_messages_data + other_messages_data

        return {"user_messages": messages_data}

    @classmethod
    def __convert_to_user_message(cls, data):
        events = data.get("events")
        messages_data = []
        if events is None:
            type_of_input = data["content"]["inputType"]
            input_type = InputType.get_name(type_of_input)
            input_data = data["content"]["input"]
            messages_data = cls.__construct_user_messages(input_type=input_type, data=input_data)
        else:
            pass
        return messages_data

    @classmethod
    def __construct_user_messages(cls, input_type, data):
        messages_data = []
        if input_type == "TEXT":
            message_type = MessageType.get_value("SIMPLE")
            text = data.get("val", "")
            message_content = MessageContent(text=text, mandatory=1).trim()
            message_data = MessageData(type=message_type, content=message_content).trim()
        else:
            logger.error(f"Unsupported input_type for agent {input_type}")

        messages_data.append(message_data)
        return messages_data

    @staticmethod
    def get_agent_connected_messages():
        messages_data = []

        message_type = MessageType.get_value("INPUT")
        input_type = InputType.get_value("TEXT")
        input_attr = TextInput(placeHolder="Talk to our Agent").trim()

        content = MessageContent(
            inputType=input_type,
            textInputAttr=input_attr,
            mandatory=1,
            ).trim()
        input_message_data = MessageData(
            type=message_type,
            content=content
            ).trim()

        messages_data.append(input_message_data)
        return messages_data
