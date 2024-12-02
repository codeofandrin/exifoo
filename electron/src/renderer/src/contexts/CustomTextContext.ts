import { createContext, useContext } from "react"

import { CustomTextContextType } from "../utils/types"

export const CustomTextContext = createContext<CustomTextContextType>({
    isAddCustomText: false,
    customText: "",
    isValid: true,
    setIsAddCustomText: () => {},
    setCustomText: () => {},
    setIsValid: () => {}
})

export default function useCustomTextContext(): CustomTextContextType {
    return useContext(CustomTextContext)
}
