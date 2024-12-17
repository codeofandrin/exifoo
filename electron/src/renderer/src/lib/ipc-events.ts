import { useUpdateStore } from "../store/main/useUpdateStore"
import { UpdateStatusType } from "../utils/enums"

class Update {
    static setStatus = useUpdateStore.getState().setStatus
    static setError = useUpdateStore.getState().setError
    static setLastCheck = useUpdateStore.getState().setLastCheck
    static setDownloadProgress = useUpdateStore.getState().setProgress
}

// Auto Updater
window.electronAPI.onCheckingForUpdate(() => {
    Update.setStatus(UpdateStatusType.checking)
})

window.electronAPI.onUpdateNotAvailable(() => {
    Update.setStatus(UpdateStatusType.notAvailable)
    Update.setLastCheck(Date.now())
})

window.electronAPI.onUpdateAvailable(() => {
    Update.setDownloadProgress(0)
    Update.setStatus(UpdateStatusType.downloading)
    Update.setLastCheck(Date.now())
})

window.electronAPI.onUpdateDownloadProgress((percentage: number) => {
    Update.setDownloadProgress(percentage)
})

window.electronAPI.onUpdateReady(() => {
    Update.setStatus(UpdateStatusType.ready)
})

window.electronAPI.onUpdateError((err: Error) => {
    console.log(err)
    Update.setError(err)
    Update.setStatus(UpdateStatusType.error)
})
