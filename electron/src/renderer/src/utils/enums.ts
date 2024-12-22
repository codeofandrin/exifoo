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
    license_not_found = 102,
    // free trial
    free_trial_expired = 200,
    free_trial_files_exceeded = 201,
    free_trial_not_found = 201
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

export enum LicenseType {
    demo,
    full
}
