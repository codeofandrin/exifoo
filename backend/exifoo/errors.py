"""
Copyright (c) codeofandrin 

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
"""

import logging
from typing import Optional, Dict, TypedDict, Union, Any

import fastapi
from fastapi.responses import JSONResponse
from requests import Response

from .enums import APIErrorType

logger = logging.getLogger("uvicorn.error")


class APIExceptionDetail(TypedDict):
    msg: Optional[str]
    item: str


class APIException(fastapi.HTTPException):

    def __init__(
        self,
        *,
        status_code: int,
        error_code: APIErrorType,
        msg: str,
        detail: APIExceptionDetail,
        headers: Optional[Dict[str, str]] = None,
    ):
        d = {"code": error_code.value, "msg": msg, "detail": detail}
        super().__init__(status_code=status_code, detail=d, headers=headers)


class HTTPException(Exception):
    def __init__(self, response: Response, data: Optional[Union[str, Dict[str, Any]]]):
        self.response: Response = response
        self.data: Optional[Union[str, Dict[str, Any]]] = data

        self.status: int = self.response.status_code
        self.reason: Optional[str] = self.response.reason
        self.message: str

        if isinstance(data, dict):
            self.message = data["error"]
        else:
            self.message = data or ""

        reason = f" {self.reason}" if self.reason is not None else ""
        msg = f"{self.status}{reason}: {self.message}"
        super().__init__(msg)


class HTTPNotFound(HTTPException):
    pass


class FileBadCharacter(Exception):
    pass


async def catch_exceptions_middleware(request, call_next):
    try:
        return await call_next(request)
    except Exception:
        logger.exception("Unexpected error occurred")
        return JSONResponse(content={"msg": "Internal Server Error"}, status_code=500)
