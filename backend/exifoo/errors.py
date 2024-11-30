import logging
from typing import Optional, Dict, TypedDict

from fastapi import HTTPException
from fastapi.responses import JSONResponse


logger = logging.getLogger("uvicorn.error")


class APIExceptionDetail(TypedDict):
    msg: Optional[str]
    item: str


class APIException(HTTPException):

    def __init__(
        self,
        *,
        status_code: int,
        error_code: int,
        msg: str,
        detail: APIExceptionDetail,
        headers: Optional[Dict[str, str]] = None
    ):
        d = {"code": error_code, "msg": msg, "detail": detail}
        super().__init__(status_code=status_code, detail=d, headers=headers)


async def catch_exceptions_middleware(request, call_next):
    try:
        return await call_next(request)
    except Exception:
        logger.exception("Unexpected error occurred")
        return JSONResponse(content={"msg": "Internal Server Error"}, status_code=500)
