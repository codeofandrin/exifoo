import { createContext, useContext } from "react"

import { ModalContextType } from "../utils/types"

export const RenameErrorModalContext = createContext<ModalContextType>({
    isOpen: false,
    openModal: () => {},
    closeModal: () => {}
})

export default function useRenameErrorModalContext(): ModalContextType {
    return useContext(RenameErrorModalContext)
}
