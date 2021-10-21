import os
import logging

log_format = '[%(levelname)s] [%(asctime)s] > %(message)s'

logginglevel = os.environ.get("LOGGING_LEVEL", "DEBUG")

log_level = getattr(logging, logginglevel)

logging.basicConfig(level=log_level, format=log_format)

logger = logging.getLogger()
