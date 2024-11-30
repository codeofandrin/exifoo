import datetime
import os
from pathlib import Path
from typing import List

from PIL import Image

from .errors import APIException, APIExceptionDetail
from .enums import ErrorType


EXIF_DATETIME_TAG = 36867
VALID_FILE_TYPES = (".png", ".jpeg", ".jpg")


def _get_img_datetime(img_path: Path) -> datetime.datetime:
    img = Image.open(img_path)
    exif_data = img._getexif()  # type: ignore
    if exif_data is None:
        raise APIException(
            status_code=422,
            error_code=ErrorType.no_exif_data.value,
            msg="No exif data available",
            detail=APIExceptionDetail(msg=None, item=str(img_path)),
        )

    dt_str = exif_data[EXIF_DATETIME_TAG]
    return datetime.datetime.strptime(dt_str, "%Y:%m:%d %H:%M:%S")


def _rename_filename(
    *, img_path: Path, dt: datetime.datetime, year_option: str, time_option: bool, custom_text: str
) -> None:
    if year_option == "YY":
        year_format = "%y"
    else:
        year_format = "%Y"

    if time_option:
        dt_format = f"{year_format}%m%d_%H%M%S"
    else:
        dt_format = f"{year_format}%m%d"

    if custom_text:
        custom_text = f"_{custom_text}"

    format_str = f"{dt_format}{custom_text}"
    dt_str = dt.strftime(format_str)
    new_name = f"{dt_str}_{img_path.name}"
    new_path = img_path.parent / new_name
    os.rename(img_path, new_path)


def rename_images(*, paths: List[str], year_option: str, time_option: bool, custom_text: str) -> None:
    for path_str in paths:
        img_path = Path(path_str)

        if img_path.suffix not in VALID_FILE_TYPES:
            raise APIException(
                status_code=400,
                error_code=ErrorType.invalid_file_type.value,
                msg="Invalid file type",
                detail=APIExceptionDetail(
                    msg=f"File type must be one of {VALID_FILE_TYPES}", item=str(img_path)
                ),
            )

        img_dt = _get_img_datetime(img_path)
        _rename_filename(
            img_path=img_path,
            dt=img_dt,
            year_option=year_option,
            time_option=time_option,
            custom_text=custom_text,
        )
