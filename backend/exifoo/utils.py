"""
Copyright (c) codeofandrin 

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
"""

import os
import logging

import machineid


LOG_PATH = "~/Library/Logs/com.exifoo.app/backend.log"


def setup_logging():
    expanded = os.path.expanduser(LOG_PATH)
    if not os.path.exists(expanded):
        os.makedirs(os.path.dirname(expanded), exist_ok=True)

    loggers = [logging.getLogger("uvicorn.error"), logging.getLogger("uvicorn.access")]
    handlers = [logging.FileHandler(expanded), logging.StreamHandler()]

    for logger in loggers:
        for handler in handlers:
            handler.setFormatter(
                logging.Formatter(
                    "%(asctime)s %(levelname)s %(message)s",
                    datefmt="%d.%m.%y %H:%M:%S %Z",
                )
            )
            logger.addHandler(handler)


def get_machine_id():
    return machineid.id()


def get_short_key(key: str) -> str:
    return f"XXXX-{key[-12:]}"
