/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { create } from "zustand"

interface ActivateLicenseStoreType {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
}

export const useActivateLicenseStore = create<ActivateLicenseStoreType>()((set) => ({
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value })
}))
