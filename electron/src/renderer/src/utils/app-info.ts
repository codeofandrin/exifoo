export function getAppName() {
    return __APP_NAME__
}

export function getAppDescription() {
    return __APP_DESC__
}

export function getAppVersion() {
    return __APP_VERSION__
}

export function getAppAuthor() {
    return __APP_AUTHOR__
}

export function getReleaseLink(versionTag: string) {
    return `${__RELEASE_REPO__}/releases/tag/${versionTag}`
}
