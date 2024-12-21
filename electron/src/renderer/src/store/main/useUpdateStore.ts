import { create } from "zustand"
import { persist } from "zustand/middleware"

import { UpdateStatusType } from "../../utils/enums"

interface UpdateStoreType {
    status: UpdateStatusType
    error: Error | null
    progress: number
    lastCheck: number | null
    setStatus: (status: UpdateStatusType) => void
    setError: (error: Error) => void
    setProgress: (percentage: number) => void
    setLastCheck: (timestamp: number) => void
}

export const useUpdateStore = create<UpdateStoreType>()(
    persist(
        (set) => ({
            status: UpdateStatusType.notAvailable,
            error: null,
            progress: 0,
            lastCheck: null,
            setStatus: (status) => set({ status: status }),
            setError: (error) => set({ error: error }),
            setProgress: (percentage) => set({ progress: percentage }),
            setLastCheck: (timestamp) => set({ lastCheck: timestamp })
        }),
        {
            name: "update-last-check",
            partialize: (state) => ({ lastCheck: state.lastCheck })
        }
    )
)
