"""
Copyright (c) codeofandrin 

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
"""

import uvicorn

import env  # type: ignore
from exifoo.api import app


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
