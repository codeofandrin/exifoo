from typing import List, Optional
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from starlette.exceptions import HTTPException as StarletteHTTPException

from .metadata import rename_images
from .errors import catch_exceptions_middleware
from .utils import setup_logging
from .types import DateOptionsType, TimeOptionsType


@asynccontextmanager
async def lifespan(app: FastAPI):
    # setup logging on startup
    setup_logging()
    yield


app = FastAPI(lifespan=lifespan)
app.middleware("http")(catch_exceptions_middleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(status_code=exc.status_code, content=exc.detail)


class RenamePayload(BaseModel):
    paths: List[str]
    date_options: DateOptionsType
    time_options: Optional[TimeOptionsType]
    custom_text: str


@app.post("/rename")
async def rename(payload: RenamePayload):
    rename_images(
        paths=payload.paths,
        date_options=payload.date_options,
        time_options=payload.time_options,
        custom_text=payload.custom_text,
    )
    return JSONResponse(content={"msg": "Successful"}, status_code=200)
