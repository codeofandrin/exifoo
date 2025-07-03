/**
 * Copyright (c) codeofandrin 
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { dialog } from "electron"
import { autoUpdater } from "electron-updater"
import type { ProgressInfo, UpdateInfo } from "electron-updater"
import log from "electron-log"

import { mainWindow } from "./main"
import * as ipc from "./ipc"

autoUpdater.allowPrerelease = false

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
    ipc.sendCheckingForUpdate()
})

autoUpdater.on("update-available", (info: UpdateInfo) => {
    log.info(`update available: ${info.releaseName} ${info.version}, ${info.releaseDate}`)
    ipc.sendUpdateAvailable()
})

autoUpdater.on("update-not-available", (info: UpdateInfo) => {
    log.info(`update not available, last: ${info.releaseName} ${info.version}, ${info.releaseDate}`)
    ipc.sendUpdateNotAvailable()
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

    ipc.sendUpdateDownloadProgress(percentage)
})

autoUpdater.on("update-downloaded", (info: UpdateInfo) => {
    log.info(`update downloaded`)
    ipc.sendUpdateReady()

    if (!userInitiated) {
        const versionTag = `v${info.version}`

        dialog
            .showMessageBox(mainWindow, {
                title: "Update available",
                message: "Update available!",
                detail: `A new version (${versionTag}) has been downloaded and is ready to install.
                    Restart the application now to install the updates.`,
                type: "info",
                buttons: ["Later", "Install and Restart"],
                defaultId: 1,
                cancelId: 0,
                textWidth: 300
            })
            .then((result) => {
                switch (result.response) {
                    // Later
                    case 0:
                        // do nothing -> closes automatically
                        break

                    // Install and Restart
                    case 1:
                        quitAndInstall()
                        break

                    default:
                        break
                }
            })
    }
})
