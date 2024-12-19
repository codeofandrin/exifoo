from typing import List, Optional
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from starlette.exceptions import HTTPException as StarletteHTTPException

from .metadata import rename_images
from .errors import catch_exceptions_middleware, APIException, APIExceptionDetail, APIErrorType
from .utils import setup_logging, get_machine_id, get_short_key
from .types import DateOptionsType, TimeOptionsType
from . import lemsqzy
from .license import store_license, get_license, delete_license, app_access
from .enums import AppAccessType


MACHINE_ID = get_machine_id()


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
    # TODO: Implement limit for demo version
    if app_access.is_blocked():
        raise APIException(
            status_code=403,
            error_code=APIErrorType.no_access,
            msg="No access",
            detail=APIExceptionDetail(msg="No access to renaming photos.", item=""),
        )
    else:
        rename_images(
            paths=payload.paths,
            date_options=payload.date_options,
            time_options=payload.time_options,
            custom_text=payload.custom_text,
        )
        return JSONResponse(content={"msg": "Successful"}, status_code=200)


class LicenseActivatePayload(BaseModel):
    key: str


@app.post("/license/activate")
async def license_activate(payload: LicenseActivatePayload):
    license_key = payload.key
    instance_id = lemsqzy.activate_license(key=license_key, machine_id=MACHINE_ID)
    store_license(key=license_key, instance_id=instance_id)
    app_access.set_access(AppAccessType.full)

    key_short = get_short_key(license_key)
    return JSONResponse(content={"msg": "Successful", "key_short": key_short}, status_code=200)


@app.post("/license/validate")
async def license_validate():
    license = get_license()
    lemsqzy.validate_license(key=license.key, instance_id=license.instance_id, machine_id=MACHINE_ID)
    app_access.set_access(AppAccessType.full)

    key_short = get_short_key(license.key)
    return JSONResponse(content={"msg": "Successful", "key_short": key_short}, status_code=200)


@app.post("/license/deactivate")
async def license_deactivate():
    license = get_license()
    lemsqzy.deactivate_license(key=license.key, instance_id=license.instance_id)
    delete_license()
    app_access.set_access(AppAccessType.blocked)
    return JSONResponse(content={"msg": "Successful"}, status_code=200)
