"""
This module handles sections inside combination node of ana studio output
Author: https://github.com/velutha
"""
import json
from furl import furl
from src.logger import logger
from src.converters.ana.ana_helper import AnaHelper
from src.models.types import MessageTypeWrapper as MessageType, MediaTypeWrapper as MediaType, ButtonTypeWrapper as ButtonType
from src.models.message import MessageContentWrapper as MessageContent, MessageDataWrapper as MessageData, MediaWrapper as Media
from src.models.inputs import OptionWrapper as Option, ItemWrapper as Item

class SectionProcessor():

    def __init__(self, state):
        self.state = state

    def process(self, sections):
        messages_data = []

        section_processor_map = {
            "Text": self.__text_processor,
            "EmbeddedHtml": self.__text_processor,
            "Link": self.__text_processor,
            "Image": self.__media_processor,
            "Gif": self.__media_processor,
            "Video": self.__media_processor,
            "Carousel": self.__carousel_processor
            }

        for section in sections:
            section_type = section.get("SectionType", "")
            processor = section_processor_map[section_type]
            if processor is None:
                logger.error(f"Unknown section type found {section_type}")
            else:
                message_data = processor(section)
                messages_data.append(message_data)

        return messages_data

    def __text_processor(self, data):

        message_type = MessageType.get_value("SIMPLE")
        section_type = data.get("SectionType")
        if section_type == "Text":
            text = data.get("Text", "")
        elif section_type in ["EmbeddedHtml", "Link"]:
            text = data.get("Url", "")
        text = AnaHelper.verb_replacer(text=text, state=self.state)
        message_content = MessageContent(text=text, mandatory=1).trim()
        message_data = MessageData(type=message_type, content=message_content).trim()

        return message_data


    def __media_processor(self, data):

        message_type = MessageType.get_value("SIMPLE")
        section_type = data.get("SectionType")
        if section_type in ["Image", "Gif"]:
            media_type = MediaType.get_value("IMAGE")
        elif section_type == "Video":
            media_type = MediaType.get_value("VIDEO")

        url = data.get("Url", "")
        url = AnaHelper.verb_replacer(text=url, state=self.state)
        url = furl(url).url
        preview_url = data.get("PreviewUrl", "")
        preview_url = AnaHelper.verb_replacer(text=preview_url, state=self.state)
        preview_url = furl(preview_url).url
        text = data.get("Title", "")
        text = AnaHelper.verb_replacer(text=text, state=self.state)
        media_content = Media(type=media_type, url=url, previewUrl=preview_url).trim()
        message_content = MessageContent(text=text, media=media_content, mandatory=1).trim()
        message_data = MessageData(type=message_type, content=message_content).trim()

        return message_data


    # @classmethod
    def __carousel_processor(self, data):

        message_type = MessageType.get_value("CAROUSEL")
        section_items = data.get("Items", [])
        section_items = AnaHelper.process_repeatable(section_items, self.state, True)
        item_elements = []
        item_elements = [self.__process_carousel_item(item) for item in section_items]

        message_content = MessageContent(items=item_elements, mandatory=1).trim()
        message_data = MessageData(type=message_type, content=message_content).trim()

        return message_data

    # @classmethod
    def __process_carousel_item(self, section_item):

        media_type = MediaType.get_value("IMAGE")
        image_url = section_item.get("ImageUrl", "")
        image_url = AnaHelper.verb_replacer(text=image_url, state=self.state)
        image_url = furl(image_url).url

        title = section_item.get("Title", "")
        title = AnaHelper.verb_replacer(text=title, state=self.state)
        description = section_item.get("Caption", "")
        description = AnaHelper.verb_replacer(text=description, state=self.state)

        media_content = Media(type=media_type, url=image_url).trim()
        buttons = section_item.get("Buttons", [])
        buttons = AnaHelper.process_repeatable(buttons, self.state)
        options = []
        options = [self.__process_carousel_button(button) for button in buttons]

        item_element = Item(title=title, desc=description, media=media_content, options=options).trim()

        return item_element

    # @classmethod
    def __process_carousel_button(self, button):

        if button["Type"] == "OpenUrl":
            url = button.get("Url", "")
            url = AnaHelper.verb_replacer(text=url, state=self.state)
            button_value = json.dumps({"url": url, "value": button["_id"]})
            button_type = ButtonType.get_value("URL")
        elif button["Type"] == "DeepLink":
            url = button.get("Url", "")
            url = AnaHelper.verb_replacer(text=url, state=self.state)
            button_value = json.dumps({"url": url, "value": button["_id"]})
            button_type = ButtonType.get_value("DEEPLINK")
        else:
            button_value = button["_id"]
            button_type = ButtonType.get_value("ACTION")

        button_title = button.get("Text", "")
        button_title = AnaHelper.verb_replacer(text=button_title, state=self.state)
        option_element = Option(title=button_title, value=button_value, type=button_type).trim()

        return option_element
