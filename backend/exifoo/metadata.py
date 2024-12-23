import datetime
import os
from pathlib import Path
from typing import List, Optional
from typing_extensions import NamedTuple

from PIL import Image

from .errors import APIException, APIExceptionDetail
from .enums import APIErrorType
from .types import DateOptionsType, TimeOptionsType

EXIF_DATETIME_TAG = 36867

VALID_FILE_TYPES = (".png", ".jpeg", ".jpg")
VALID_YEAR_FORMATS = ("YYYY", "YY")
VALID_MONTH_FORMATS = ("MM", "(M)M")
VALID_DAY_FORMATS = ("DD", "(D)D")
VALID_DATE_SEPARATORS = ("", "-", ".", ",")
VALID_HOURS_FORMATS = ("HH", "(H)H")
VALID_MINUTES_FORMATS = ("MM", "(M)M")
VALID_SECONDS_FORMATS = ("SS", "(S)S")
VALID_TIME_SEPARATORS = ("", "-", ".", ",")


class FileRenameStatus(NamedTuple):
    path: str
    is_success: bool
    error_type: Optional[APIErrorType]


def _get_img_datetime(img_path: Path) -> Optional[datetime.datetime]:
    img = Image.open(img_path)
    exif_data = img._getexif()  # type: ignore
    if exif_data is None:
        return None

    dt_str = exif_data[EXIF_DATETIME_TAG]
    return datetime.datetime.strptime(dt_str, "%Y:%m:%d %H:%M:%S")


def _rename_filename(
    *,
    img_path: Path,
    dt: datetime.datetime,
    year_format: str,
    month_format: str,
    day_format: str,
    date_separator: str,
    is_add_time: bool,
    hours_format: Optional[str] = None,
    minutes_format: Optional[str] = None,
    seconds_format: Optional[str] = None,
    time_separator: Optional[str] = None,
    custom_text: str,
) -> None:
    if year_format == "YYYY":
        year = "%Y"
    else:
        year = "%y"

    if month_format == "MM":
        month = "%m"
    else:
        month = str(dt.month)

    if day_format == "DD":
        day = "%d"
    else:
        day = str(dt.day)

    dt_format = date_separator.join([year, month, day])
    if is_add_time:
        if hours_format == "HH":
            hours = "%H"
        else:
            hours = str(dt.hour)

        if minutes_format == "MM":
            minutes = "%M"
        else:
            minutes = str(dt.minute)

        if seconds_format == "SS":
            seconds = "%S"
        else:
            seconds = str(dt.second)

        dt_format += "_"
        dt_format += time_separator.join([hours, minutes, seconds])  # type: ignore # 'time_separator' can't be None here

    if custom_text:
        custom_text = f"_{custom_text}"

    format_str = f"{dt_format}{custom_text}"
    dt_str = dt.strftime(format_str)
    new_name = f"{dt_str}_{img_path.name}"
    new_path = img_path.parent / new_name

    if os.path.isfile(new_path):
        raise FileExistsError

    os.rename(img_path, new_path)


def rename_images(
    *,
    paths: List[str],
    date_options: DateOptionsType,
    time_options: Optional[TimeOptionsType],
    custom_text: str,
) -> List[FileRenameStatus]:
    year_format = date_options["year_format"]
    month_format = date_options["month_format"]
    day_format = date_options["day_format"]
    date_separator = date_options["separator"]

    for i, (date_format, valid) in enumerate(
        zip(
            [year_format, month_format, day_format, date_separator],
            [
                VALID_YEAR_FORMATS,
                VALID_MONTH_FORMATS,
                VALID_DAY_FORMATS,
                VALID_DATE_SEPARATORS,
            ],
        )
    ):
        if date_format not in valid:
            raise APIException(
                status_code=400,
                error_code=APIErrorType.invalid_option,
                msg="Invalid option",
                detail=APIExceptionDetail(msg=f"Date option {i} must be one of {valid}", item=str(i)),
            )

    items = {
        "year_format": year_format,
        "month_format": month_format,
        "day_format": day_format,
        "date_separator": date_separator,
        "is_add_time": False,
    }

    if time_options:
        hours_format = time_options["hours_format"]
        minutes_format = time_options["minutes_format"]
        seconds_format = time_options["seconds_format"]
        time_separator = time_options["separator"]

        for i, (time_format, valid) in enumerate(
            zip(
                [hours_format, minutes_format, seconds_format, time_separator],
                [
                    VALID_HOURS_FORMATS,
                    VALID_MINUTES_FORMATS,
                    VALID_SECONDS_FORMATS,
                    VALID_TIME_SEPARATORS,
                ],
            )
        ):
            if time_format not in valid:
                raise APIException(
                    status_code=400,
                    error_code=APIErrorType.invalid_option,
                    msg="Invalid option",
                    detail=APIExceptionDetail(msg=f"Time option {i} must be one of {valid}", item=str(i)),
                )

        items["hours_format"] = hours_format
        items["minutes_format"] = minutes_format
        items["seconds_format"] = seconds_format
        items["time_separator"] = time_separator
        items["is_add_time"] = True

    result: List[FileRenameStatus] = []
    for path_str in paths:
        img_path = Path(path_str)

        if img_path.suffix.lower() not in VALID_FILE_TYPES:
            result.append(
                FileRenameStatus(path=path_str, is_success=False, error_type=APIErrorType.invalid_file_type)
            )
            continue

        try:
            img_dt = _get_img_datetime(img_path)
            if img_dt is None:
                result.append(
                    FileRenameStatus(path=path_str, is_success=False, error_type=APIErrorType.no_exif_data)
                )
                continue

            _rename_filename(img_path=img_path, dt=img_dt, custom_text=custom_text, **items)
            result.append(FileRenameStatus(path=path_str, is_success=True, error_type=None))
        except FileNotFoundError:
            result.append(
                FileRenameStatus(path=path_str, is_success=False, error_type=APIErrorType.not_found)
            )
            continue
        except FileExistsError:
            result.append(
                FileRenameStatus(path=path_str, is_success=False, error_type=APIErrorType.already_exists)
            )
            continue
        except PermissionError:
            result.append(
                FileRenameStatus(path=path_str, is_success=False, error_type=APIErrorType.no_permission)
            )
            continue

    return result
