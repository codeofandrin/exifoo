import { useState } from "react"

import { SeparatorContext } from "../contexts/SeparatorContext"
import { DefaultProviderPropsType } from "../utils/types"

export default function SeparatorProvider({ children }: DefaultProviderPropsType) {
  const [dateSeparator, setDateSeparator] = useState<string>("")
  const [timeSeparator, setTimeSeparator] = useState<string>("")

  const contextValue = {
    dateSeparator,
    timeSeparator,
    setDateSeparator,
    setTimeSeparator
  }

  return <SeparatorContext.Provider value={contextValue}>{children}</SeparatorContext.Provider>
}
