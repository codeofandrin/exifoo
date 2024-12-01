import { useState } from "react"

import { CustomTextContext } from "../contexts/CustomTextContext"
import { DefaultProviderPropsType } from "../utils/types"

export default function CustomTextProvider({ children }: DefaultProviderPropsType) {
  const [customText, setCustomText] = useState<string>("")
  const [isValid, setIsValid] = useState<boolean>(true)

  const contextValue = {
    customText,
    isValid,
    setCustomText,
    setIsValid
  }

  return <CustomTextContext.Provider value={contextValue}>{children}</CustomTextContext.Provider>
}
