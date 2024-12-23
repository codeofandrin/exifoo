import { execFile } from "child_process"
import type { ChildProcess } from "child_process"
import { kill } from "process"
import { join } from "path"
import log from "electron-log/main"

let backend: ChildProcess | null = null
export function runBackend() {
    return new Promise<void>((resolve, reject) => {
        backend = execFile(
            join(process.resourcesPath, "backend/exifoo-backend"),
            [],
            {
                windowsHide: true,
                shell: true
            },
            (error) => {
                if (error) {
                    log.error(error)
                    reject(error)
                }
            }
        )

        setTimeout(function () {
            resolve()
        }, 1000)
    })
}

export function killBackend() {
    // only try to kill backend if not already killed
    if (backend !== null) {
        kill(backend.pid as number)
        backend = null
    }
}
