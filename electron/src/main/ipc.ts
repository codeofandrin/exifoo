import { ipcMain, Menu } from "electron"
import type { MenuItem } from "electron"

import { mainWindow } from "./index"
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
    mainWindow.webContents.send("update-download-progress", percentage)
}

export function sendUpdateReady() {
    mainWindow.webContents.send("update-ready")
}

export function sendUpdateError(err: Error) {
    mainWindow.webContents.send("update-error", err)
}

// IPC Events
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
