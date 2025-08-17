# NOTE:
# Since July 03, 2025 exifoo is free to use and open source.
# Therefore, there is no need anymore to make sure the user can only use the free trial once
# with a machine ID validation, so parts of the code are commented out.

"""
Copyright (c) codeofandrin 

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
"""

import os
import json
import pathlib
from typing import List, Optional
from contextlib import asynccontextmanager

import sentry_sdk
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from starlette.exceptions import HTTPException as StarletteHTTPException

from .metadata import rename_images
from .errors import (
    catch_exceptions_middleware,
    APIException,
    APIExceptionDetail,
    APIErrorType,
)
from .utils import setup_logging, get_machine_id, get_short_key, log_rename
from .types import DateOptionsType, TimeOptionsType
from .lemsqzy import LemSqzyClient
from .license import LicenseStorage, FreeTrialStorage, AppAccess
from .enums import AppAccessType
from .constants import Path

# from .supabase import MachineIDs

IS_DEV = bool(os.getenv("IS_DEV", False))

if not IS_DEV:
    sentry_sdk.init(
        dsn=os.getenv("SENTRY_DSN"),
        # Set traces_sample_rate to 1.0 to capture 100%
        # of transactions for tracing.
        traces_sample_rate=1.0,
        _experiments={
            # Set continuous_profiling_auto_start to True
            # to automatically start the profiler on when
            # possible.
            "continuous_profiling_auto_start": True,
        },
    )


MACHINE_ID = get_machine_id()
FREE_TRIAL_FILES_AMOUNT = 20

app_access = AppAccess()
license_storage = LicenseStorage()
free_trial_storage = FreeTrialStorage()
lemsqzy = LemSqzyClient(license_storage=license_storage)
# machine_ids = MachineIDs()


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
    if app_access.is_demo():
        free_trial = free_trial_storage.get()
        files_amount = len(payload.paths)

        if (free_trial.files_remaining - files_amount) < 0:
            raise APIException(
                status_code=400,
                error_code=APIErrorType.free_trial_files_exceeded,
                msg="Free Trial files exceeded",
                detail=APIExceptionDetail(
                    msg="The requested amount of files exceeded free trial remaining files.",
                    item="",
                ),
            )
        else:
            result = rename_images(
                paths=payload.paths,
                date_options=payload.date_options,
                time_options=payload.time_options,
                custom_text=payload.custom_text,
            )

            remaining = free_trial.files_remaining - files_amount
            if remaining <= 0:
                free_trial_storage.delete()
                app_access.set_access(AppAccessType.blocked)
                raise APIException(
                    status_code=400,
                    error_code=APIErrorType.free_trial_expired,
                    msg="Free Trial expired",
                    detail=APIExceptionDetail(msg="No free trial files remaining.", item=""),
                )

            free_trial_storage.store(files_remaining=remaining)
            return JSONResponse(
                content={
                    "msg": "Successful",
                    "result": [
                        {
                            "path": status.path,
                            "is_success": status.is_success,
                            "error_type": status.error_type.value if status.error_type is not None else None,
                        }
                        for status in result
                    ],
                },
                status_code=200,
            )

    elif app_access.is_full():
        result = rename_images(
            paths=payload.paths,
            date_options=payload.date_options,
            time_options=payload.time_options,
            custom_text=payload.custom_text,
        )
        return JSONResponse(
            content={
                "msg": "Successful",
                "result": [
                    {
                        "path": status.path,
                        "is_success": status.is_success,
                        "error_type": status.error_type.value if status.error_type is not None else None,
                    }
                    for status in result
                ],
            },
            status_code=200,
        )

    else:
        raise APIException(
            status_code=403,
            error_code=APIErrorType.no_access,
            msg="No access",
            detail=APIExceptionDetail(msg="No access to renaming photos.", item=""),
        )


class LicenseActivatePayload(BaseModel):
    key: str


@app.post("/license/activate")
async def license_activate(payload: LicenseActivatePayload):
    license_key = payload.key
    instance_id = lemsqzy.activate(key=license_key, machine_id=MACHINE_ID)

    if free_trial_storage.is_stored():
        free_trial_storage.delete()

    license_storage.store(key=license_key, instance_id=instance_id)
    app_access.set_access(AppAccessType.full)

    key_short = get_short_key(license_key)
    return JSONResponse(content={"msg": "Successful", "key_short": key_short}, status_code=200)


@app.post("/license/validate")
async def license_validate():
    license = license_storage.get()
    lemsqzy.validate(key=license.key, instance_id=license.instance_id, machine_id=MACHINE_ID)
    app_access.set_access(AppAccessType.full)

    key_short = get_short_key(license.key)
    return JSONResponse(content={"msg": "Successful", "key_short": key_short}, status_code=200)


@app.post("/license/deactivate")
async def license_deactivate():
    license = license_storage.get()
    lemsqzy.deactivate(key=license.key, instance_id=license.instance_id)
    license_storage.delete()
    app_access.set_access(AppAccessType.blocked)
    return JSONResponse(content={"msg": "Successful"}, status_code=200)


@app.post("/free-trial/activate")
async def free_trial_activate():
    #     if machine_ids.exists(MACHINE_ID):
    #         raise APIException(
    #             status_code=400,
    #             error_code=APIErrorType.free_trial_expired,
    #             msg="Free Trial expired",
    #             detail=APIExceptionDetail(msg="Free Trial already used once.", item=""),
    #         )
    #
    #     machine_ids.add(MACHINE_ID)
    free_trial_storage.store(files_remaining=FREE_TRIAL_FILES_AMOUNT)
    app_access.set_access(AppAccessType.demo)
    return JSONResponse(
        content={"msg": "Successful", "files_remaining": FREE_TRIAL_FILES_AMOUNT}, status_code=200
    )


@app.post("/free-trial/validate")
async def free_trial_validate():
    free_trial = free_trial_storage.get()
    if free_trial.files_remaining == 0:
        free_trial_storage.delete()
        raise APIException(
            status_code=400,
            error_code=APIErrorType.free_trial_expired,
            msg="Free Trial expired",
            detail=APIExceptionDetail(msg="No free trial files remaining.", item=""),
        )

    app_access.set_access(AppAccessType.demo)
    return JSONResponse(
        content={"msg": "Successful", "files_remaining": free_trial.files_remaining},
        status_code=200,
    )


@app.get("/rename-history")
async def get_rename_history():
    expanded_path = os.path.expanduser(Path.rename_history)
    if os.path.exists(expanded_path):
        with open(expanded_path, "r") as f_renames:
            data = json.load(f_renames)
    else:
        data = []

    return JSONResponse(content={"msg": "Successful", "rename_history": data})


class RevertRenamePayload(BaseModel):
    file_path: str
    before_filename: str


@app.post("/rename-history/revert")
async def revert_rename(payload: RevertRenamePayload):
    file_path = pathlib.Path(payload.file_path)
    before_filename = payload.before_filename

    new_path = file_path.parent / before_filename

    try:
        if os.path.isfile(new_path):
            raise FileExistsError

        os.rename(file_path, new_path)

    except FileNotFoundError:
        raise APIException(
            status_code=400,
            error_code=APIErrorType.not_found,
            msg="File not found",
            detail=APIExceptionDetail(msg="The requested file could not be found", item=""),
        )

    except FileExistsError:
        raise APIException(
            status_code=400,
            error_code=APIErrorType.already_exists,
            msg="File already exists",
            detail=APIExceptionDetail(msg="The renamed file already exists", item=""),
        )

    except PermissionError:
        raise APIException(
            status_code=400,
            error_code=APIErrorType.no_permission,
            msg="No permission",
            detail=APIExceptionDetail(msg="No permission to rename requested file", item=""),
        )

    log_rename([{"before": str(file_path), "after": str(new_path)}])

    return JSONResponse(content={"msg": "Successful"})
