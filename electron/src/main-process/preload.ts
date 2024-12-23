import { contextBridge, ipcRenderer } from "electron/renderer"
import type { IpcRendererEvent } from "electron/renderer"

function listen(event: string, listener: (_event: IpcRendererEvent, ...args: any[]) => void) {
    return ipcRenderer.on(event, listener)
}

function listenNoData(event: string) {
    return (callback: Function) => listen(event, (_event) => callback())
}

function send(command: string, ...args: any[]) {
    return ipcRenderer.send(command, ...args)
}

const electronAPI = {
    // Sender
    menuAbout: (isOpen: boolean) => send("menu-about", isOpen),
    checkForUpdates: () => send("check-for-updates"),
    quitAndInstallUpdate: () => send("quit-and-install-update"),
    removeShowAboutListeners: () => ipcRenderer.removeAllListeners("show-about"),

    // Listener
    onShowAbout: listenNoData("show-about"),
    onCheckingForUpdate: listenNoData("checking-for-update"),
    onUpdateNotAvailable: listenNoData("update-not-available"),
    onUpdateAvailable: listenNoData("update-available"),
    onUpdateDownloadProgress: (callback: Function) => {
        listen("update-download-progress", (_event, percentage: number) => callback(percentage))
    },
    onUpdateReady: listenNoData("update-ready"),
    onUpdateError: (callback: Function) => {
        listen("update-error", (_event, err: Error) => callback(err))
    }
}

contextBridge.exposeInMainWorld("electronAPI", electronAPI)
