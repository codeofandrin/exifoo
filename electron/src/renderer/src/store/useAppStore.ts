import { create } from "zustand"

import { AppStatusType, LicenseType } from "../utils/enums"

interface AppStoreStatesType {
    status: AppStatusType
    license_type: LicenseType | null
    license_key_short: string | null
    free_trial_remaining: number
}

interface AppStoreActions {
    setStatus: (status: AppStatusType) => void
    setLicenseType: (type: LicenseType | null) => void
    setLicenseKeyShort: (key: string | null) => void
    setFreeTrialRemaining: (remaining: number) => void
    reset: () => void
}

const initialStates: AppStoreStatesType = {
    status: AppStatusType.start,
    license_type: null,
    license_key_short: null,
    free_trial_remaining: 0
}

export const useAppStore = create<AppStoreStatesType & AppStoreActions>()((set) => ({
    ...initialStates,
    setStatus: (status) => set({ status: status }),
    setLicenseType: (type) => set({ license_type: type }),
    setLicenseKeyShort: (key) => set({ license_key_short: key }),
    setFreeTrialRemaining: (remaining) => set({ free_trial_remaining: remaining }),
    reset: () => {
        set(initialStates)
    }
}))
