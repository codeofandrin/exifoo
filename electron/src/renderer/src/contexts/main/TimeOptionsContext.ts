import { createContext, useContext } from "react"

import { TimeOptionsContextType } from "../../utils/types"

export const TimeOptionsContext = createContext<TimeOptionsContextType>({
    isAddTime: false,
    hoursFormat: "",
    minutesFormat: "",
    secondsFormat: "",
    timeSeparator: "",
    setIsAddTime: () => {},
    setHoursFormat: () => {},
    setMinutesFormat: () => {},
    setSecondsFormat: () => {},
    setTimeSeparator: () => {},
    resetHoursFormat: () => {},
    resetMinutesFormat: () => {},
    resetSecondsFormat: () => {},
    resetTimeSeparator: () => {}
})

export default function useTimeOptionsContext(): TimeOptionsContextType {
    return useContext(TimeOptionsContext)
}
