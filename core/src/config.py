import os

application_config = {
    "CHATCORE_QUEUE_URL" : os.environ.get("CHATCORE_QUEUE_URL"),
    "GATEWAY_URL": os.environ.get("GATEWAY_URL"),
    "AGENT_URL": os.environ.get("AGENT_URL"),
    "AWS_ACCESS_KEY_ID" : os.environ.get("AWS_ACCESS_KEY_ID"),
    "AWS_ACCESS_SECRET_KEY" : os.environ.get("AWS_ACCESS_SECRET_KEY"),
    "AWS_REGION" : os.environ.get("AWS_REGION"),
    "KINESIS_STREAM_NAME": os.environ.get("KINESIS_STREAM_NAME"),
    "ENVIRONMENT": os.environ.get("ENVIRONMENT"),
    "IS_AWS_ENABLED": os.environ.get("IS_AWS_ENABLED") == "TRUE" or False,
    "IS_REDIS_CLUSTER": os.environ.get("IS_REDIS_CLUSTER") == "TRUE" or False
    }

flow_config = {
    "first_node_key": "GET_STARTED_NODE",
    "default_flow_id": os.environ.get("DEFAULT_FLOW_ID") or "",
    "archived_node_ids": ["INIT_CHAT_NODE", "SEND_CHAT_HISTORY_TO_SERVER",\
            "GET_CHAT_TEXT_NODE", "SEND_CHAT_TEXT_NODE", "CONTINUE_CHAT_NODE"],
    }

ana_config = {
    "click_input_types" : ["NextNode", "OpenUrl", "DeepLink"],

    "text_input_types" : ["GetText", "GetEmail", "GetNumber", "GetPhoneNumber",\
            "GetItemFromSource", "GetLocation", "GetAddress", "GetDate", "GetDateTime",\
            "GetTime", "GetImage", "GetFile", "GetAudio", "GetVideo"],

    "button_map": {
        "GetText": {
            "input_type": "TEXT",
            "media_type": None
            },
        "GetNumber": {
            "input_type": "NUMERIC",
            "media_type": None
            },
        "GetPhoneNumber": {
            "input_type": "PHONE",
            "media_type": None
            },
        "GetEmail": {
            "input_type": "EMAIL",
            "media_type": None
            },
        "GetLocation": {
            "input_type": "LOCATION",
            "media_type": None
            },
        "GetAddress": {
            "input_type": "ADDRESS",
            "media_type": None
            },
        "GetDate": {
            "input_type": "DATE",
            "media_type": None
            },
        "GetTime": {
            "input_type": "TIME",
            "media_type": None
            },
        "GetImage": {
            "input_type": "MEDIA",
            "media_type": "IMAGE"
            },
        "GetAudio": {
            "input_type": "MEDIA",
            "media_type": "AUDIO"
            },
        "GetVideo": {
            "input_type": "MEDIA",
            "media_type": "VIDEO"
            },
        "GetFile": {
            "input_type": "MEDIA",
            "media_type": "FILE"
            }

        },
    "ana_section_types" : ["Image", "Text", "Graph", "Gif", "Audio", "Video",\
            "Link", "EmbeddedHtml", "Carousel"],

    "ana_node_types" : ["Combination", "ApiCall"],

    "ana_button_types" : ["PostText", "OpenUrl", "GetText", "GetAddress", "GetNumber",\
            "GetPhoneNumber", "GetEmail", "GetImage", "GetAudio", "GetVideo", "GetItemFromSource",\
            "NextNode", "DeepLink", "GetAgent", "ApiCall", "ShowConfirmation", "FetchChatFlow",\
            "GetDate", "GetTime", "GetDateTime", "GetLocation"]
    }
