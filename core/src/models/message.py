from src.thrift_models.ttypes import MessageContent, MessageData, MessageMeta, Message, Media, Event

class EventWrapper(Event):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def trim(self):
        obj = {}
        for key, value in self.__dict__.items():
            if value != None:
                obj[key] = value
        return [obj]

class MediaWrapper(Media):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def trim(self):
        obj = {}
        for key, value in self.__dict__.items():
            if value != None:
                obj[key] = value
        return obj

class MessageContentWrapper(MessageContent):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def trim(self):
        obj = {}
        for key, value in self.__dict__.items():
            if value != None:
                obj[key] = value
        return obj

class MessageDataWrapper(MessageData):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def trim(self):
        obj = {}
        for key, value in self.__dict__.items():
            if value != None:
                obj[key] = value
        return obj

class MessageMetaWrapper(MessageMeta):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def trim(self):
        obj = {}
        for key, value in self.__dict__.items():
            if value != None:
                obj[key] = value
        return obj

class MessageWrapper(Message):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def trim(self):
        obj = {}
        for key, value in self.__dict__.items():
            if value != None:
                obj[key] = value
        return obj
