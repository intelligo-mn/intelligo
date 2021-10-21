import boto3
import json
from src.config import application_config as config 
from pprint import *

# message = json.dumps({"user_id": "1234", "message": {"body": "hi"}})


class SQSHelper():

    def __init__(self,*args, **kwargs):
        try:
            self.aws_key = config["AWS_ACCESS_KEY_ID"]
            self.aws_secret = config["AWS_ACCESS_SECRET_KEY"]
            self.aws_region = config["AWS_REGION"]
            self.sqs = boto3.client(
                    "sqs",
                    aws_access_key_id=self.aws_key,
                    aws_secret_access_key=self.aws_secret,
                    region_name=self.aws_region
                    )
        except Exception as e:
            # handle this case
            print(e)
            raise

    # def send_message(self,message, attributes={}):
        # response = self.sqs.send_message(
                # QueueUrl=self.queue_url,
                # DelaySeconds=10,
                # MessageAttributes=attributes,
                # MessageBody = message
            # )

        # return response
    def delete_message(self, messageHandle, *args, **kwargs):
        queue_url = config["CHATCORE_QUEUE_URL"]
        response = self.sqs.delete_message(
                QueueUrl=queue_url,
                ReceiptHandle=messageHandle
                )
        # check how to validate the response
        return "1"


    def fetch_messages(self):
        queue_url = config["CHATCORE_QUEUE_URL"]
        response = self.sqs.receive_message(
                    QueueUrl=queue_url,
                    AttributeNames=['SentTimestamp'],
                    MaxNumberOfMessages=10,
                    MessageAttributeNames=['All'],
                    WaitTimeSeconds=1
                )
        return response.get("Messages",[])

