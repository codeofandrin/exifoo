import os
import logging


LOG_PATH = "~/Library/Logs/com.electron.imgmeta/backend.log"


def setup_logging():
    expanded = os.path.expanduser(LOG_PATH)
    if not os.path.exists(expanded):
        os.makedirs(os.path.dirname(expanded), exist_ok=True)

    loggers = [logging.getLogger("uvicorn.error"), logging.getLogger("uvicorn.access")]
    handlers = [logging.FileHandler(expanded), logging.StreamHandler()]

    for logger in loggers:
        for handler in handlers:
            handler.setFormatter(
                logging.Formatter("%(asctime)s %(levelname)s %(message)s", datefmt="%d.%m.%y %H:%M:%S %Z")
            )
            logger.addHandler(handler)
