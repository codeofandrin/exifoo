from typing_extensions import TypedDict


class DateOptionsType(TypedDict):
    year_format: str
    month_format: str
    day_format: str
    separator: str


class TimeOptionsType(TypedDict):
    hours_format: str
    minutes_format: str
    seconds_format: str
    separator: str
