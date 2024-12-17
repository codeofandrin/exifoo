import { app, shell, BrowserWindow, Menu } from "electron"
import { join } from "path"
import { electronApp, optimizer, is } from "@electron-toolkit/utils"

import log from "electron-log/main"
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer"

import { getMenu } from "./menu"
import { runBackend, killBackend } from "./backend-handler"
import { checkForUpdates } from "./auto-updater"
import { registerIpcEvents } from "./ipc"

log.errorHandler.startCatching()
log.transports.file.level = "info"
log.transports.file.resolvePathFn = (vars) => join(vars.libraryDefaultDir, "../com.exifoo.app/electron.log")
log.info("App starting...")

export let mainWindow: BrowserWindow

function createWindow(): void {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 755,
        minHeight: 755,
        show: false,
        title: "",
        autoHideMenuBar: true,
        webPreferences: {
            preload: join(__dirname, "./preload.js"),
            sandbox: false
        }
    })

    Menu.setApplicationMenu(getMenu(mainWindow.webContents))

    mainWindow.on("ready-to-show", () => {
        mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: "deny" }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
        mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"])
    } else {
        mainWindow.loadFile(join(__dirname, "../renderer/index.html"))
    }

    // check for updates when browser is ready for showing in UI
    mainWindow.webContents.once("dom-ready", () => {
        checkForUpdates(true)
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId("com.exifoo.app")

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on("browser-window-created", (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    registerIpcEvents()

    if (is.dev) {
        installExtension(REACT_DEVELOPER_TOOLS)
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log("An error occurred: ", err))
        createWindow()
    } else {
        // in development backend is started manually
        runBackend()
            .then(() => {
                createWindow()
            })
            .catch((error) => {
                log.error(error)
            })
    }

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on("ready", () => {
    log.info("ready")
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("quit", () => {
    if (!is.dev) {
        // in development server is killed manually
        killBackend()
    }
})
