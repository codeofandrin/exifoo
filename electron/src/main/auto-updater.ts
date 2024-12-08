import { autoUpdater } from "electron-updater"

autoUpdater.setFeedURL({
    provider: "github",
    protocol: "https",
    private: true,
    owner: "codeofandrin",
    repo: "exifoo",
    token: process.env.GH_TOKEN
})

export function checkForUpdatesAndNotify() {
    autoUpdater.checkForUpdatesAndNotify()
}
