import { createContext, useContext } from "react"

import { TimeFormatsContextType } from "../utils/types"

export const TimeFormatsContext = createContext<TimeFormatsContextType>({
    hoursFormat: "",
    minutesFormat: "",
    secondsFormat: "",
    setHoursFormat: () => {},
    setMinutesFormat: () => {},
    setSecondsFormat: () => {}
})

export default function useTimeFormatsContext(): TimeFormatsContextType {
    return useContext(TimeFormatsContext)
}
