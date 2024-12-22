import { create } from "zustand"

interface ActivateLicenseStore {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
}

export const useActivateLicenseStore = create<ActivateLicenseStore>()((set) => ({
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value })
}))
