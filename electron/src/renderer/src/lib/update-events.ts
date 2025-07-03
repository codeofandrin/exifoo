/**
 * Copyright (c) codeofandrin 
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useUpdateStore } from "../store/main/useUpdateStore"
import { UpdateStatusType } from "../utils/enums"

class UpdateStore {
    static setStatus = useUpdateStore.getState().setStatus
    static setError = useUpdateStore.getState().setError
    static setLastCheck = useUpdateStore.getState().setLastCheck
    static setDownloadProgress = useUpdateStore.getState().setProgress
}

export function registerUpdaterEvents() {
    window.electronAPI.onCheckingForUpdate(() => {
        UpdateStore.setStatus(UpdateStatusType.checking)
    })

    window.electronAPI.onUpdateNotAvailable(() => {
        UpdateStore.setStatus(UpdateStatusType.notAvailable)
        UpdateStore.setLastCheck(Date.now())
    })

    window.electronAPI.onUpdateAvailable(() => {
        UpdateStore.setDownloadProgress(0)
        UpdateStore.setStatus(UpdateStatusType.downloading)
        UpdateStore.setLastCheck(Date.now())
    })

    window.electronAPI.onUpdateDownloadProgress((percentage: number) => {
        UpdateStore.setDownloadProgress(percentage)
    })

    window.electronAPI.onUpdateReady(() => {
        UpdateStore.setStatus(UpdateStatusType.ready)
    })

    window.electronAPI.onUpdateError((err: Error) => {
        console.log(err)
        UpdateStore.setError(err)
        UpdateStore.setStatus(UpdateStatusType.error)
    })
}
