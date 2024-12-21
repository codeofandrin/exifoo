import json
import os
from typing_extensions import NamedTuple

import keyring
from cryptography.fernet import Fernet

from .errors import APIException, APIErrorType, APIExceptionDetail
from .enums import AppAccessType


KEYRING_SERVICE_NAME = "exifoo Safe Storage"
KEYRING_LICENSE_USERNAME = "exifoo License"
STORAGE_KEY = os.getenv("STORAGE_KEY")


class _AppAccess:

    def __init__(self):
        self._access: AppAccessType = AppAccessType.blocked

    def is_blocked(self) -> bool:
        return self._access == AppAccessType.blocked

    def is_demo(self) -> bool:
        return self._access == AppAccessType.demo

    def is_full(self) -> bool:
        return self._access == AppAccessType.full

    def set_access(self, access_tye: AppAccessType):
        self._access = access_tye


app_access = _AppAccess()


def _encrypt(data: str) -> str:
    return Fernet(STORAGE_KEY).encrypt(data.encode()).decode()


def _decrypt(token: str) -> str:
    return Fernet(STORAGE_KEY).decrypt(token.encode()).decode()


class License(NamedTuple):
    key: str
    instance_id: str


def store_license(*, key: str, instance_id: str) -> None:
    license_info = {"key": key, "instance_id": instance_id}
    encrypted = _encrypt(json.dumps(license_info))
    keyring.set_password(KEYRING_SERVICE_NAME, KEYRING_LICENSE_USERNAME, encrypted)


def get_license() -> License:
    raw_license_info = keyring.get_password(KEYRING_SERVICE_NAME, KEYRING_LICENSE_USERNAME)
    if raw_license_info is None:
        raise APIException(
            status_code=400,
            error_code=APIErrorType.license_not_found,
            msg="License key not found",
            detail=APIExceptionDetail(
                msg="License key could not be found in safe storage", item=KEYRING_LICENSE_USERNAME
            ),
        )
    license_info = json.loads(_decrypt(raw_license_info))
    return License(key=license_info["key"], instance_id=license_info["instance_id"])


def delete_license() -> None:
    keyring.delete_password(KEYRING_SERVICE_NAME, KEYRING_LICENSE_USERNAME)
