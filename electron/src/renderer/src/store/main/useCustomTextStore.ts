/**
 * Copyright (c) codeofandrin 
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { create } from "zustand"

interface CustomTextStatesType {
    isAddCustomText: boolean
    customText: string
    isValid: boolean
}

interface CustomTextActionsType {
    setIsAddCustomText: (isAdd: boolean) => void
    setCustomText: (text: string) => void
    setIsValid: (isValid: boolean) => void
    reset: () => void
}

const initialStates: CustomTextStatesType = {
    isAddCustomText: false,
    customText: "",
    isValid: false
}

export const useCustomTextStore = create<CustomTextStatesType & CustomTextActionsType>()((set) => ({
    ...initialStates,
    setIsAddCustomText: (isAdd) => set({ isAddCustomText: isAdd }),
    setCustomText: (text) => set({ customText: text }),
    setIsValid: (isValid: boolean) => set({ isValid: isValid }),
    reset: () => set({ ...initialStates })
}))
