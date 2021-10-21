import json
import boto3
from src.logger import logger
from src.config import application_config as config

class KinesisHelper():

    def __init__(self):
        try:
            self.aws_key = config["AWS_ACCESS_KEY_ID"]
            self.aws_secret = config["AWS_ACCESS_SECRET_KEY"]
            self.aws_region = config["AWS_REGION"]
            self.stream_name = config["KINESIS_STREAM_NAME"]
            self.client = boto3.client(
                "kinesis",
                aws_access_key_id=self.aws_key,
                aws_secret_access_key=self.aws_secret,
                region_name=self.aws_region
                )
        except Exception as err:
            # handle this case
            logger.error(err)
            raise

    def log_message(self, key, data=None):

        if data is None:
            return 1

        json_data = json.dumps(data)
        self.client.put_records(
            Records=[
                {
                    "Data": json_data,
                    "PartitionKey": key

                }
            ],
            StreamName=self.stream_name
        )
        return 1
