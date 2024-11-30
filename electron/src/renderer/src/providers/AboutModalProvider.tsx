import { useState } from "react"

import { AboutModalContext } from "../contexts/AboutModalContext"
import { DefaultProviderPropsType } from "../utils/types"

export default function AboutModalProvider({ children }: DefaultProviderPropsType) {
  const [_isOpen, _setIsOpen] = useState<boolean>(false)
  function openModal() {
    _setIsOpen(true)
  }
  function closeModal() {
    _setIsOpen(false)
  }

  const contextValue = {
    isOpen: _isOpen,
    openModal,
    closeModal
  }

  return <AboutModalContext.Provider value={contextValue}>{children}</AboutModalContext.Provider>
}
