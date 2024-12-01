import { createContext, useContext } from "react"

import { DateFormatsContextType } from "../utils/types"

export const DateFormatsContext = createContext<DateFormatsContextType>({
    yearFormat: "",
    monthFormat: "",
    dayFormat: "",
    setYearFormat: () => {},
    setMonthFormat: () => {},
    setDayFormat: () => {}
})

export default function useDateFormatsContext(): DateFormatsContextType {
    return useContext(DateFormatsContext)
}
