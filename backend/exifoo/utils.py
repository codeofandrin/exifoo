"""
Copyright (c) codeofandrin 

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
"""

import os
import logging
import datetime
import json
from typing import List, Dict

import machineid

from .constants import Path


def setup_logging():
    expanded = os.path.expanduser(Path.log)
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


def log_rename(files: List[Dict[str, str]]) -> None:
    log_data = {"date": str(datetime.datetime.now().isoformat()), "files": files}
    expanded_path = os.path.expanduser(Path.rename_history)
    if not os.path.exists(expanded_path):
        os.makedirs(os.path.dirname(expanded_path), exist_ok=True)
        data = [log_data]

        with open(expanded_path, "w") as f_renames:
            json.dump(data, f_renames, indent=4)

    else:
        with open(expanded_path, "r+") as f_renames:
            data = json.load(f_renames)
            data.append(log_data)
            data = sorted(data, key=lambda x: x["date"], reverse=True)

            f_renames.seek(0)
            f_renames.truncate(0)
            json.dump(data, f_renames, indent=4)
