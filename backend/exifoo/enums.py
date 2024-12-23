from enum import Enum


class APIErrorType(Enum):
    # unexpected is on 0 (client side)

    # rename
    invalid_file_type = 1
    no_exif_data = 2
    invalid_option = 3
    no_access = 4
    not_found = 5
    already_exists = 6
    no_permission = 7
    # license
    license_used = 100
    license_invalid = 101
    license_not_found = 102
    # free trial
    free_trial_expired = 200
    free_trial_files_exceeded = 201
    free_trial_not_found = 201


class LicenseStatusType(Enum):
    inactive = "inactive"
    active = "active"
    expired = "expired"
    disabled = "disabled"


class AppAccessType(Enum):
    blocked = 0
    demo = 1
    full = 2
