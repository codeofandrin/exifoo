from typing import Any, Optional, Dict

import requests

from .enums import APIErrorType, LicenseStatusType
from .errors import APIException, APIExceptionDetail, HTTPNotFound, HTTPException
from .license import delete_license


API_VERSION = 1


class Route:
    BASE: str = f"https://api.lemonsqueezy.com/v{API_VERSION}"

    def __init__(self, method: str, path: str, **kwargs: Any) -> None:
        self.method: str = method
        self.path: str = path

        url = self.BASE + self.path
        if kwargs:
            url = url.format(**kwargs)
        self.url: str = url


def _request(
    route: Route,
    *,
    params: Optional[Dict[str, Any]] = None,
    payload: Optional[Dict[str, Any]] = None,
):
    method = route.method
    url = route.url

    headers = {"Accept": "application/json"}
    if method == "POST":
        headers["Content-Type"] = "application/x-www-form-urlencoded"

    response = requests.request(method=method, url=url, params=params, data=payload)
    http_status = response.status_code
    data = response.json()

    if 200 <= http_status < 300:
        return data
    else:
        if http_status == 404:
            raise HTTPNotFound(response, data)
        else:
            raise HTTPException(response, data)


def activate_license(*, key: str, machine_id: str) -> str:
    params = {"license_key": key, "instance_name": machine_id}
    try:
        data = _request(Route("POST", "/licenses/activate"), params=params)
    except HTTPNotFound:
        raise APIException(
            status_code=400,
            error_code=APIErrorType.license_invalid,
            msg="License key not valid",
            detail=APIExceptionDetail(
                msg=f"License key could not be found on server and therefore invalid", item=key
            ),
        )
    except HTTPException as err:
        if "activation limit" in err.message:
            raise APIException(
                status_code=400,
                error_code=APIErrorType.license_used,
                msg="License in use",
                detail=APIExceptionDetail(msg=f"License key already activated", item=key),
            )
        else:
            raise HTTPException(err.response, err.data)

    activated: bool = data["activated"]
    if not activated:
        raise ValueError("license key could not be activated unexpectedly")

    instance_id = data["instance"]["id"]
    return instance_id


def validate_license(*, key: str, instance_id: str, machine_id: str) -> None:
    params = {"license_key": key, "instance_id": instance_id}
    try:
        data = _request(Route("POST", "/licenses/validate"), params=params)
    except HTTPNotFound:
        # let's delete the invalid license here
        delete_license()
        raise APIException(
            status_code=400,
            error_code=APIErrorType.license_invalid,
            msg="License key not valid",
            detail=APIExceptionDetail(
                msg=f"License key could not be found on server and therefore invalid", item=key
            ),
        )

    valid = data["valid"]
    license_key = data["license_key"]
    status = LicenseStatusType(license_key["status"])
    instance = data["instance"]
    instance_name = instance["name"]

    if not valid or not status.active or instance_name != machine_id:
        # license is invalid (also includes machine id validation), inactive, or disabled
        # let's delete the invalid license here
        delete_license()

        raise APIException(
            status_code=400,
            error_code=APIErrorType.license_invalid,
            msg="License key instance invalid",
            detail=APIExceptionDetail(msg="License key instance not valid or not active", item=instance_id),
        )


def deactivate_license(*, key: str, instance_id: str) -> None:
    params = {"license_key": key, "instance_id": instance_id}
    data = _request(Route("POST", "/licenses/deactivate"), params=params)

    deactivated: bool = data["deactivated"]
    if not deactivated:
        raise ValueError("license key could not be deactivated unexpectedly")
