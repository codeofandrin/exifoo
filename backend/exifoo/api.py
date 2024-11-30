from typing import List
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from starlette.exceptions import HTTPException as StarletteHTTPException

from .metadata import rename_images
from .errors import catch_exceptions_middleware
from .utils import setup_logging


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


class ImagesPayload(BaseModel):
    paths: List[str]
    year_option: str
    time_option: bool
    custom_text: str


@app.post("/images")
async def images(payload: ImagesPayload):
    rename_images(
        paths=payload.paths,
        year_option=payload.year_option,
        time_option=payload.time_option,
        custom_text=payload.custom_text,
    )
    return JSONResponse(content={"msg": "Successful"}, status_code=200)
