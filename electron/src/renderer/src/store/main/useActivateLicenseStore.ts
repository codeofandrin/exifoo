import { create } from "zustand"

interface ActivateLicenseStoreType {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
}

export const useActivateLicenseStore = create<ActivateLicenseStoreType>()((set) => ({
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value })
}))
