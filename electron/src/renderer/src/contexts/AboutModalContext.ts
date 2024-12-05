import { createContext, useContext } from "react"

import { ModalContextType } from "../utils/types"

export const AboutModalContext = createContext<ModalContextType>({
    isOpen: false,
    openModal: () => {},
    closeModal: () => {}
})

export default function useAboutModalContext(): ModalContextType {
    return useContext(AboutModalContext)
}
