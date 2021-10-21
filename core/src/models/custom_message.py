from src.models.message import MessageContentWrapper as MessageContent, \
        MessageDataWrapper as MessageData
from src.models.types import MessageTypeWrapper as MessageType

class CustomMessage():

    def __init__(self):
        pass

    @staticmethod
    def get_simple_text(text):
        message_type = MessageType.get_value("SIMPLE")
        content = MessageContent(text=text).trim()
        data = MessageData(type=message_type, content=content).trim()

        return data
