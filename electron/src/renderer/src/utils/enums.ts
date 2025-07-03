/**
 * Copyright (c) codeofandrin 
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export enum APIErrorType {
    unexpected = 0,

    // rename
    invalidFileType = 1,
    noExifData = 2,
    invalidOption = 3,
    noAccess = 4,
    notFound = 5,
    alreadyExists = 6,
    noPermission = 7,
    badChar = 8,
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
