import { useState } from "react"

import { TimeFormatsContext } from "../contexts/TimeFormatsContext"
import { DefaultProviderPropsType } from "../utils/types"

export default function TimeFormatsProvider({ children }: DefaultProviderPropsType) {
  const [hoursFormat, setHoursFormat] = useState<string>("")
  const [minutesFormat, setMinutesFormat] = useState<string>("")
  const [secondsFormat, setSecondsFormat] = useState<string>("")

  const contextValue = {
    hoursFormat,
    minutesFormat,
    secondsFormat,
    setHoursFormat,
    setMinutesFormat,
    setSecondsFormat
  }

  return <TimeFormatsContext.Provider value={contextValue}>{children}</TimeFormatsContext.Provider>
}
