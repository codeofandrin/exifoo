import { useState } from "react"

import { CustomTextContext } from "../contexts/CustomTextContext"
import { DefaultProviderPropsType } from "../utils/types"

export default function CustomTextProvider({ children }: DefaultProviderPropsType) {
  const [isAddCustomText, setIsAddCustomText] = useState<boolean>(false)
  const [customText, setCustomText] = useState<string>("")
  const [isValid, setIsValid] = useState<boolean>(true)

  const contextValue = {
    isAddCustomText,
    customText,
    isValid,
    setIsAddCustomText,
    setCustomText,
    setIsValid
  }

  return <CustomTextContext.Provider value={contextValue}>{children}</CustomTextContext.Provider>
}
