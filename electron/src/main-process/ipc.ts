/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ipcMain, Menu, app } from "electron"
import type { MenuItem } from "electron"
import log from "electron-log/main"
import { ErrorInfo } from "react"

import { mainWindow } from "./main"
import { checkForUpdates, quitAndInstall } from "./auto-updater"

export function sendCheckingForUpdate() {
    mainWindow.webContents.send("checking-for-update")
}

export function sendUpdateNotAvailable() {
    mainWindow.webContents.send("update-not-available")
}

export function sendUpdateAvailable() {
    mainWindow.webContents.send("update-available")
}

export function sendUpdateDownloadProgress(percentage: number) {
    if (!mainWindow.isDestroyed()) {
        mainWindow.webContents.send("update-download-progress", percentage)
    }
}

export function sendUpdateReady() {
    mainWindow.webContents.send("update-ready")
}

export function sendUpdateError(err: Error) {
    mainWindow.webContents.send("update-error", err)
}

// IPC Events
export function registerIpcEvents() {
    ipcMain.on("menu-about", (_event, isOpen: boolean) => {
        const aboutMenuItem = Menu.getApplicationMenu()?.getMenuItemById("about") as MenuItem
        aboutMenuItem.enabled = !isOpen
    })

    ipcMain.on("check-for-updates", (_event) => {
        checkForUpdates()
    })

    ipcMain.on("quit-and-install-update", (_event) => {
        quitAndInstall()
    })

    ipcMain.on("log-error", (_event, error: Error, info: ErrorInfo) => {
        log.error(`[renderer] ${error} ${info.componentStack}`)
    })

    ipcMain.on("restart", (_event) => {
        log.info("restart app")
        app.relaunch()
        app.exit()
    })
}
