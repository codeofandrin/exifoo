import { useState } from "react"

import { TimeOptionsContext } from "../contexts/TimeOptionsContext"
import { DefaultProviderPropsType } from "../utils/types"

export default function TimeOptionsProvider({ children }: DefaultProviderPropsType) {
  const [isAddTime, setIsAddTime] = useState<boolean>(false)
  const [hoursFormat, setHoursFormat] = useState<string>("")
  const [minutesFormat, setMinutesFormat] = useState<string>("")
  const [secondsFormat, setSecondsFormat] = useState<string>("")
  const [timeSeparator, setTimeSeparator] = useState<string>("")

  const contextValue = {
    isAddTime,
    hoursFormat,
    minutesFormat,
    secondsFormat,
    timeSeparator,
    setIsAddTime,
    setHoursFormat,
    setMinutesFormat,
    setSecondsFormat,
    setTimeSeparator
  }

  return <TimeOptionsContext.Provider value={contextValue}>{children}</TimeOptionsContext.Provider>
}
