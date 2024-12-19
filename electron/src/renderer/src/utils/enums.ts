export enum RenameGeneralStatusType {
    success,
    error
}

export enum APIErrorType {
    unexpected = 0,

    // rename
    invalidFileType = 1,
    noExifData = 2,
    invalid_option = 3,
    no_access = 4,
    // license
    license_used = 100,
    license_invalid = 101,
    license_not_found = 102
}

export enum UpdateStatusType {
    error,
    checking,
    notAvailable,
    downloading,
    ready
}

export enum AppStatusType {
    start,
    get_started,
    main
}
