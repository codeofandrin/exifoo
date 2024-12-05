import { createContext, useContext } from "react"

import { RenameStatusContextType } from "../utils/types"

export const RenameStatusContext = createContext<RenameStatusContextType>({
    status: null,
    setStatus: () => {},
    resetStatus: () => {}
})

export default function useRenameStatusContext(): RenameStatusContextType {
    return useContext(RenameStatusContext)
}
