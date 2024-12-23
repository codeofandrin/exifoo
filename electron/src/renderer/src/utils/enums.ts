export enum APIErrorType {
    unexpected = 0,

    // rename
    invalidFileType = 1,
    noExifData = 2,
    invalidOption = 3,
    noAccess = 4,
    // license
    licenseUsed = 100,
    licenseInvalid = 101,
    licenseNotFound = 102,
    // free trial
    freeTrialExpired = 200,
    freeTrialFilesExceeded = 201,
    freeTrialNotFound = 201
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
    getStarted,
    main
}

export enum LicenseType {
    demo,
    full
}
