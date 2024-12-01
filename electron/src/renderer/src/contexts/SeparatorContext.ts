import { createContext, useContext } from "react"

import { SeparatorContextType } from "../utils/types"

export const SeparatorContext = createContext<SeparatorContextType>({
    dateSeparator: "",
    timeSeparator: "",
    setDateSeparator: () => {},
    setTimeSeparator: () => {}
})

export default function useSeparatorContext(): SeparatorContextType {
    return useContext(SeparatorContext)
}
