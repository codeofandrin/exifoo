import { app, Menu, WebContents } from "electron"

export function getMenu(mainWebContents: WebContents) {
    const isMac = process.platform === "darwin"
    const template = [
        // { role: 'appMenu' }
        // prettier-ignore
        ...(isMac ? [
            {
                label: app.name,
                submenu: [
                    {
                        // role: "about"
                        id: "about",
                        label: `About ${app.name}`,
                        click: () => mainWebContents.send("show-about")

                    },
                    { type: "separator" },
                    { role: "services" },
                    { type: "separator" },
                    { role: "hide" },
                    { role: "hideOthers" },
                    { role: "unhide" },
                    { type: "separator" },
                    { role: "quit" }
                ]
            }
        ]
            : []),
        // { role: 'fileMenu' }
        {
            label: "File",
            submenu: [isMac ? { role: "close" } : { role: "quit" }]
        },
        // { role: 'editMenu' }
        {
            label: "Edit",
            submenu: [
                { role: "undo" },
                { role: "redo" },
                { type: "separator" },
                { role: "cut" },
                { role: "copy" },
                { role: "paste" },
                ...(isMac
                    ? [
                          { role: "pasteAndMatchStyle" },
                          { role: "delete" },
                          { role: "selectAll" },
                          { type: "separator" },
                          {
                              label: "Speech",
                              submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }]
                          }
                      ]
                    : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }])
            ]
        },
        // { role: 'viewMenu' }
        {
            label: "View",
            submenu: [
                { role: "resetZoom" },
                { role: "zoomIn" },
                { role: "zoomOut" },
                { type: "separator" },
                { role: "togglefullscreen" },
                { type: "separator" },
                { role: "toggleDevTools" }
            ]
        },
        // { role: 'windowMenu' }
        {
            label: "Window",
            submenu: [
                { role: "minimize" },
                { role: "zoom" },
                ...(isMac
                    ? [{ type: "separator" }, { role: "front" }, { type: "separator" }, { role: "window" }]
                    : [{ role: "close" }])
            ]
        }
    ]

    // @ts-ignore
    return Menu.buildFromTemplate(template)
}
