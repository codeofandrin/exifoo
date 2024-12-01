import { useState } from "react"

import { DateFormatsContext } from "../contexts/DateFormatsContext"
import { DefaultProviderPropsType } from "../utils/types"

export default function DateFormatsProvider({ children }: DefaultProviderPropsType) {
  const [yearFormat, setYearFormat] = useState<string>("")
  const [monthFormat, setMonthFormat] = useState<string>("")
  const [dayFormat, setDayFormat] = useState<string>("")

  const contextValue = {
    yearFormat,
    monthFormat,
    dayFormat,
    setYearFormat,
    setMonthFormat,
    setDayFormat
  }

  return <DateFormatsContext.Provider value={contextValue}>{children}</DateFormatsContext.Provider>
}
