from src.connectors.kinesis_helper import KinesisHelper
from src.config import application_config as config
from src.logger import logger

class EventLogInterface():

    @classmethod
    def log_message(cls, *args, **kwargs):

        if config.get("IS_AWS_ENABLED"):
            KinesisHelper().log_message(*args, **kwargs)
        else:
            # If you like to use any other logging method, define a class and log method
            # for it and add it here
            # CustomLogClass().log_message(*args, **kwargs)
            logger.info("Since AWS is disabled, any publish event is just being logged")
        return
