"""
Copyright (c) codeofandrin 

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
"""

import json
import os
from typing import Optional, Dict, Any
from typing_extensions import NamedTuple

import keyring
from cryptography.fernet import Fernet

from .errors import APIException, APIErrorType, APIExceptionDetail
from .enums import AppAccessType


KEYRING_SERVICE_NAME = "exifoo Safe Storage"
STORAGE_KEY: str = os.getenv("STORAGE_KEY")  # type: ignore # must be str -> check below
if STORAGE_KEY is None:
    raise ValueError("'STORAGE_KEY' env variable is not set")


class AppAccess:

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


class _SafeStorageEntry:

    def __init__(self, username: str):
        self.service_name: str = KEYRING_SERVICE_NAME
        self.username: str = username

    def _encrypt(self, data: str) -> str:
        return Fernet(STORAGE_KEY).encrypt(data.encode()).decode()

    def _decrypt(self, token: str) -> str:
        return Fernet(STORAGE_KEY).decrypt(token.encode()).decode()

    def set(self, data: Dict[str, Any]) -> None:
        encrypted = self._encrypt(json.dumps(data))
        keyring.set_password(self.service_name, self.username, encrypted)

    def get(self) -> Optional[Dict[str, Any]]:
        raw = keyring.get_password(self.service_name, self.username)
        if raw is None:
            return None

        return json.loads(self._decrypt(raw))

    def delete(self) -> None:
        keyring.delete_password(self.service_name, self.username)


class LicenseData(NamedTuple):
    key: str
    instance_id: str


class LicenseStorage:

    def __init__(self):
        self.storage: _SafeStorageEntry = _SafeStorageEntry("exifoo License")

    def store(self, *, key: str, instance_id: str) -> None:
        license_info = {"key": key, "instance_id": instance_id}
        self.storage.set(license_info)

    def get(self) -> LicenseData:
        license_info = self.storage.get()
        if license_info is None:
            raise APIException(
                status_code=400,
                error_code=APIErrorType.license_not_found,
                msg="License key not found",
                detail=APIExceptionDetail(
                    msg="License key could not be found in safe storage",
                    item=self.storage.username,
                ),
            )

        return LicenseData(key=license_info["key"], instance_id=license_info["instance_id"])

    def delete(self) -> None:
        self.storage.delete()


class FreeTrialData(NamedTuple):
    files_remaining: int


class FreeTrialStorage:

    def __init__(self):
        self.storage: _SafeStorageEntry = _SafeStorageEntry("exifoo Free Trial")

    def store(self, *, files_remaining: int) -> None:
        free_trial_info = {"files_remaining": files_remaining}
        self.storage.set(free_trial_info)

    def get(self) -> FreeTrialData:
        free_trial_info = self.storage.get()
        if free_trial_info is None:
            raise APIException(
                status_code=400,
                error_code=APIErrorType.free_trial_not_found,
                msg="Free Trial not found",
                detail=APIExceptionDetail(
                    msg="Free Trial could not be found in safe storage",
                    item=self.storage.username,
                ),
            )

        return FreeTrialData(files_remaining=free_trial_info["files_remaining"])

    def delete(self) -> None:
        self.storage.delete()

    def is_stored(self) -> bool:
        return self.storage.get() is not None
