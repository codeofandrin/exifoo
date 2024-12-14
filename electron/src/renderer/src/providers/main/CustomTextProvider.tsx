import { useState } from "react"

import { CustomTextContext } from "../../contexts/main/CustomTextContext"
import { DefaultProviderPropsType } from "../../utils/types"

const CUSTOM_TEXT_DEFAULT = ""

export default function CustomTextProvider({ children }: DefaultProviderPropsType) {
  const [isAddCustomText, setIsAddCustomText] = useState<boolean>(false)
  const [customText, setCustomText] = useState<string>(CUSTOM_TEXT_DEFAULT)
  const [isValid, setIsValid] = useState<boolean>(true)

  function resetCustomText() {
    setCustomText(CUSTOM_TEXT_DEFAULT)
  }

  const contextValue = {
    isAddCustomText,
    customText,
    isValid,
    setIsAddCustomText,
    setCustomText,
    setIsValid,
    resetCustomText
  }

  return <CustomTextContext.Provider value={contextValue}>{children}</CustomTextContext.Provider>
}
