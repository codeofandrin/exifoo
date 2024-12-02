import { createContext, useContext } from "react"

import { DateOptionsContextType } from "../utils/types"

export const DateOptionsContext = createContext<DateOptionsContextType>({
    yearFormat: "",
    monthFormat: "",
    dayFormat: "",
    dateSeparator: "",
    setYearFormat: () => {},
    setMonthFormat: () => {},
    setDayFormat: () => {},
    setDateSeparator: () => {}
})

export default function useDateOptionsContext(): DateOptionsContextType {
    return useContext(DateOptionsContext)
}
