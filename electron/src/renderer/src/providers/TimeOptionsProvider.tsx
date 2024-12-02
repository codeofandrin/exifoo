import { useState } from "react"

import { TimeOptionsContext } from "../contexts/TimeOptionsContext"
import { DefaultProviderPropsType } from "../utils/types"

const HOURS_DEFAULT = "HH"
const MINUTES_DEFAULT = "MM"
const SECONDS_DEFAULT = "MM"
const SEPARATOR_DEFAULT = ""

export default function TimeOptionsProvider({ children }: DefaultProviderPropsType) {
  const [isAddTime, setIsAddTime] = useState<boolean>(false)
  const [hoursFormat, setHoursFormat] = useState<string>(HOURS_DEFAULT)
  const [minutesFormat, setMinutesFormat] = useState<string>(MINUTES_DEFAULT)
  const [secondsFormat, setSecondsFormat] = useState<string>(SECONDS_DEFAULT)
  const [timeSeparator, setTimeSeparator] = useState<string>(SEPARATOR_DEFAULT)

  function resetHoursFormat() {
    setHoursFormat(HOURS_DEFAULT)
  }
  function resetMinutesFormat() {
    setMinutesFormat(MINUTES_DEFAULT)
  }
  function resetSecondsFormat() {
    setSecondsFormat(SECONDS_DEFAULT)
  }
  function resetTimeSeparator() {
    setTimeSeparator(SEPARATOR_DEFAULT)
  }

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
    setTimeSeparator,
    resetHoursFormat,
    resetMinutesFormat,
    resetSecondsFormat,
    resetTimeSeparator
  }

  return <TimeOptionsContext.Provider value={contextValue}>{children}</TimeOptionsContext.Provider>
}
