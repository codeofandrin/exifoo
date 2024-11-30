import { createContext, useContext } from "react"

import { AboutModalContextType } from "../utils/types"

export const AboutModalContext = createContext<AboutModalContextType>({
    isOpen: false,
    openModal: () => {},
    closeModal: () => {}
})

export default function useAboutModal(): AboutModalContextType {
    return useContext(AboutModalContext)
}
