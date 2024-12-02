import { useState } from "react"

import { DateOptionsContext } from "../contexts/DateOptionsContext"
import { DefaultProviderPropsType } from "../utils/types"

export default function DateOptionsProvider({ children }: DefaultProviderPropsType) {
  const [yearFormat, setYearFormat] = useState<string>("")
  const [monthFormat, setMonthFormat] = useState<string>("")
  const [dayFormat, setDayFormat] = useState<string>("")
  const [dateSeparator, setDateSeparator] = useState<string>("")

  const contextValue = {
    yearFormat,
    monthFormat,
    dayFormat,
    dateSeparator,
    setYearFormat,
    setMonthFormat,
    setDayFormat,
    setDateSeparator
  }

  return <DateOptionsContext.Provider value={contextValue}>{children}</DateOptionsContext.Provider>
}
