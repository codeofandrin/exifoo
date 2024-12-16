import { useState } from "react"
import { createContainer } from "unstated-next"
import { useLocalStorage } from "usehooks-ts"

import { UpdateStatusType } from "../../utils/enums"

function _useUpdateState() {
    const [updateStatus, setUpdateStatus] = useState<UpdateStatusType>(UpdateStatusType.notAvailable)
    const [updateError, setUpdateError] = useState<Error | null>(null)
    const [lastChecked, setLastChecked] = useLocalStorage<number | null>("update-last-checked", null)
    const [downloadPercentage, setDownloadPercentage] = useState<number>(0)

    window.electronAPI.onCheckingForUpdate(() => {
        setUpdateStatus(UpdateStatusType.checking)
    })

    window.electronAPI.onUpdateNotAvailable(() => {
        setUpdateStatus(UpdateStatusType.notAvailable)
        setLastChecked(Date.now())
    })

    window.electronAPI.onUpdateAvailable(() => {
        setDownloadPercentage(0)
        setUpdateStatus(UpdateStatusType.downloading)
        setLastChecked(Date.now())
    })

    window.electronAPI.onUpdateDownloadProgress((percentage: number) => {
        setDownloadPercentage(percentage)
    })

    window.electronAPI.onUpdateReady(() => {
        setUpdateStatus(UpdateStatusType.ready)
    })

    window.electronAPI.onUpdateError((err: Error) => {
        console.log(updateError)
        setUpdateError(err)
        setUpdateStatus(UpdateStatusType.error)
    })

    return { updateStatus, updateError, lastChecked, downloadPercentage }
}

export const UpdateStatusContainer = createContainer(_useUpdateState)
export default function useUpdateStatus() {
    return UpdateStatusContainer.useContainer()
}
