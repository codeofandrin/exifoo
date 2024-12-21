import { create } from "zustand"

import { AppStatusType, LicenseType } from "../utils/enums"

interface AppStoreStatesType {
    status: AppStatusType
    license_type: LicenseType | null
    license_key_short: string | null
}

interface AppStoreActions {
    setStatus: (status: AppStatusType) => void
    setLicenseType: (type: LicenseType | null) => void
    setLicenseKeyShort: (key: string | null) => void
    reset: () => void
}

const initialStates: AppStoreStatesType = {
    status: AppStatusType.start,
    license_type: null,
    license_key_short: null
}

export const useAppStore = create<AppStoreStatesType & AppStoreActions>()((set) => ({
    ...initialStates,
    setStatus: (status) => set({ status: status }),
    setLicenseType: (type) => set({ license_type: type }),
    setLicenseKeyShort: (key) => set({ license_key_short: key }),
    reset: () => {
        set(initialStates)
    }
}))
