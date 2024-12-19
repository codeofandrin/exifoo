import { create } from "zustand"

import { AppStatusType, LicenseType } from "../utils/enums"

interface AppStoreType {
    status: AppStatusType
    license_type: LicenseType | null
    license_key_short: string | null
    setStatus: (status: AppStatusType) => void
    setLicenseType: (type: LicenseType | null) => void
    setLicenseKeyShort: (key: string | null) => void
}

export const useAppStore = create<AppStoreType>()((set) => ({
    status: AppStatusType.start,
    license_type: null,
    license_key_short: null,
    setStatus: (status) => set({ status: status }),
    setLicenseType: (type) => set({ license_type: type }),
    setLicenseKeyShort: (key) => set({ license_key_short: key })
}))
