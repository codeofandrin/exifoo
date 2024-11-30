from enum import Enum


class ErrorType(Enum):
    # unexpected is on 0 (client side)
    invalid_file_type = 1
    no_exif_data = 2
