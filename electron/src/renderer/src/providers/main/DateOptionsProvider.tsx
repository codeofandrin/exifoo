import { useState } from "react"

import { DateOptionsContext } from "../../contexts/main/DateOptionsContext"
import { DefaultProviderPropsType } from "../../utils/types"

export default function DateOptionsProvider({ children }: DefaultProviderPropsType) {
  const [yearFormat, setYearFormat] = useState<string>("YYYY")
  const [monthFormat, setMonthFormat] = useState<string>("MM")
  const [dayFormat, setDayFormat] = useState<string>("DD")
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
