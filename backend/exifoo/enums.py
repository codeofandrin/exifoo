from enum import Enum


class APIErrorType(Enum):
    # unexpected is on 0 (client side)

    # rename
    invalid_file_type = 1
    no_exif_data = 2
    invalid_option = 3
    no_access = 4
    # license
    license_used = 100
    license_invalid = 101
    license_not_found = 102


class LicenseStatusType(Enum):
    inactive = "inactive"
    active = "active"
    expired = "expired"
    disabled = "disabled"


class AppAccessType(Enum):
    blocked = 0
    demo = 1
    full = 2
