import { execFile } from "child_process"
import { kill } from "process"
import { join } from "path"
import log from "electron-log/main"

let backend
export function runBackend() {
    return new Promise<void>((resolve, reject) => {
        backend = execFile(
            join(process.resourcesPath, "backend/backend"),
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
    kill(backend.pid)
}
