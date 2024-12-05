import { useState } from "react"

import { RenameStatusContext } from "../contexts/RenameStatusContext"
import { DefaultProviderPropsType, RenameStatusType } from "../utils/types"

export default function RenameStatusProvider({ children }: DefaultProviderPropsType) {
  const [status, setStatus] = useState<RenameStatusType | null>(null)
  function resetStatus() {
    setStatus(null)
  }

  const contextValue = {
    status,
    setStatus,
    resetStatus
  }

  return <RenameStatusContext.Provider value={contextValue}>{children}</RenameStatusContext.Provider>
}
