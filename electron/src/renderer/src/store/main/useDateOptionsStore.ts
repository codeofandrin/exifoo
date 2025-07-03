/**
 * Copyright (c) codeofandrin 
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { create } from "zustand"

interface DateOptionsStoreType {
    yearFormat: string
    monthFormat: string
    dayFormat: string
    dateSeparator: string
    setYearFormat: (value: string) => void
    setMonthFormat: (value: string) => void
    setDayFormat: (value: string) => void
    setDateSeparator: (value: string) => void
}

export const useDateOptionsStore = create<DateOptionsStoreType>()((set) => ({
    yearFormat: "YYYY",
    monthFormat: "MM",
    dayFormat: "DD",
    dateSeparator: "",
    setYearFormat: (value: string) => set({ yearFormat: value }),
    setMonthFormat: (value: string) => set({ monthFormat: value }),
    setDayFormat: (value: string) => set({ dayFormat: value }),
    setDateSeparator: (value: string) => set({ dateSeparator: value })
}))
