from src.thrift_models.ttypes import Item, Option, TextInput, ListItem

class OptionWrapper(Option):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def trim(self):
        obj = {}
        for key, value in self.__dict__.items():
            if value != None:
                obj[key] = value
        return obj

class ItemWrapper(Item):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def trim(self):
        obj = {}
        for key, value in self.__dict__.items():
            if value != None:
                obj[key] = value
        return obj

class TextInputWrapper(TextInput):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def trim(self):
        obj = {}
        for key, value in self.__dict__.items():
            if value != None:
                obj[key] = value
        return obj

class ListItemWrapper(ListItem):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def trim(self):
        obj = {}
        for key, value in self.__dict__.items():
            if value != None:
                obj[key] = value
        return obj
