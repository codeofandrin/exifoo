import { autoUpdater } from "electron-updater"

export function checkForUpdatesAndNotify() {
    autoUpdater.checkForUpdatesAndNotify()
}
