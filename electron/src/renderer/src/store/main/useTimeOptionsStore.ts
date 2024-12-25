import { create } from "zustand"

interface TimeOptionsStatesType {
    isAddTime: boolean
    hoursFormat: string
    minutesFormat: string
    secondsFormat: string
    timeSeparator: string
}

interface TimeOptionsActionsType {
    setIsAddTime: (isAddTime: boolean) => void
    setHoursFormat: (value: string) => void
    setMinutesFormat: (value: string) => void
    setSecondsFormat: (value: string) => void
    setTimeSeparator: (value: string) => void
    reset: () => void
}

const initialStates: TimeOptionsStatesType = {
    isAddTime: false,
    hoursFormat: "HH",
    minutesFormat: "MM",
    secondsFormat: "SS",
    timeSeparator: ""
}

export const useTimeOptionsStore = create<TimeOptionsStatesType & TimeOptionsActionsType>()((set) => ({
    ...initialStates,
    setIsAddTime: (isAddTime: boolean) => set({ isAddTime: isAddTime }),
    setHoursFormat: (value: string) => set({ hoursFormat: value }),
    setMinutesFormat: (value: string) => set({ minutesFormat: value }),
    setSecondsFormat: (value: string) => set({ secondsFormat: value }),
    setTimeSeparator: (value: string) => set({ timeSeparator: value }),
    reset: () => set({ ...initialStates })
}))
