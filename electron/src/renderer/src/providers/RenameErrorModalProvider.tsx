import { useState } from "react"

import { RenameErrorModalContext } from "../contexts/RenameErrorModalContext"
import { DefaultProviderPropsType } from "../utils/types"

export default function RenameErrorModalProvider({ children }: DefaultProviderPropsType) {
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

  return <RenameErrorModalContext.Provider value={contextValue}>{children}</RenameErrorModalContext.Provider>
}
