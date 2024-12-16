import { autoUpdater } from "electron-updater"
import type { ProgressInfo, UpdateInfo } from "electron-updater"
import log from "electron-log"

import * as ipc from "./ipc"

let userInitiated = true
export function checkForUpdates(inBackground: boolean = false) {
    userInitiated = !inBackground
    autoUpdater.checkForUpdates()
}

export function quitAndInstall() {
    autoUpdater.quitAndInstall()
}

autoUpdater.on("checking-for-update", () => {
    log.info("checking for update")
    if (userInitiated) {
        ipc.sendCheckingForUpdate()
    }
})

autoUpdater.on("update-available", (info: UpdateInfo) => {
    log.info(`update available: ${info.releaseName} ${info.version}, ${info.releaseDate}`)
    if (userInitiated) {
        ipc.sendUpdateAvailable()
    }
})

autoUpdater.on("update-not-available", (info: UpdateInfo) => {
    log.info(`update not available, last: ${info.releaseName} ${info.version}, ${info.releaseDate}`)
    if (userInitiated) ipc.sendUpdateNotAvailable()
})

autoUpdater.on("error", (err: Error) => {
    log.info(`update error (userInitiated: ${userInitiated}): ${err.name}: ${err.message}`)
    if (userInitiated) {
        ipc.sendUpdateError(err)
    } else {
        ipc.sendUpdateNotAvailable()
    }
})

autoUpdater.on("download-progress", (progress: ProgressInfo) => {
    const percentage = progress.percent
    log.info(`downloading update: ${percentage}`)

    if (userInitiated) {
        ipc.sendUpdateDownloadProgress(percentage)
    }
})

autoUpdater.on("update-downloaded", () => {
    log.info(`update downloaded`)
    ipc.sendUpdateReady()
})
