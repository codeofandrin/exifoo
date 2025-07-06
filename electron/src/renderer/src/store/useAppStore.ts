/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { create } from "zustand"

import { AppStatusType, LicenseType } from "../utils/enums"

interface AppStoreStatesType {
    status: AppStatusType
    licenseType: LicenseType | null
    licenseKeyShort: string | null
    freeTrialRemaining: number
}

interface AppStoreActionsType {
    setStatus: (status: AppStatusType) => void
    setLicenseType: (type: LicenseType | null) => void
    setLicenseKeyShort: (key: string | null) => void
    setFreeTrialRemaining: (remaining: number) => void
    reset: () => void
}

const initialStates: AppStoreStatesType = {
    status: AppStatusType.start,
    licenseType: null,
    licenseKeyShort: null,
    freeTrialRemaining: 0
}

export const useAppStore = create<AppStoreStatesType & AppStoreActionsType>()((set) => ({
    ...initialStates,
    setStatus: (status) => set({ status: status }),
    setLicenseType: (type) => set({ licenseType: type }),
    setLicenseKeyShort: (key) => set({ licenseKeyShort: key }),
    setFreeTrialRemaining: (remaining) => set({ freeTrialRemaining: remaining }),
    reset: () => {
        set(initialStates)
    }
}))
