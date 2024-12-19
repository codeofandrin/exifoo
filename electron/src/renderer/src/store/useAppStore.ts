import { create } from "zustand"

import { AppStatusType } from "../utils/enums"

interface AppStatusStoreType {
    status: AppStatusType
    setStatus: (status: AppStatusType) => void
}

export const useAppStore = create<AppStatusStoreType>()((set) => ({
    status: AppStatusType.start,
    setStatus: (status) => set({ status: status })
}))
