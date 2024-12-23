import { RefObject } from "react"

import { APIErrorType } from "./enums"

export interface APIErrorDataType {
    code: number
    detail: { msg: string; item: string }
}

export interface APIRequestResponseType {
    isError: boolean
    errorData: APIErrorDataType | null
    successData: any | null
}

export interface DefaultProviderPropsType {
    children: React.ReactElement
}

export interface ImageFilesInputType {
    ref: RefObject<HTMLInputElement>
    imageFiles: FileList | null
}

export interface FileRenameResultType {
    path: string
    isSuccess: boolean
    errorType: APIErrorType | null
}

export interface DateOptionsContextType {
    yearFormat: string
    monthFormat: string
    dayFormat: string
    dateSeparator: string
    setYearFormat: Function
    setMonthFormat: Function
    setDayFormat: Function
    setDateSeparator: Function
}

export interface TimeOptionsContextType {
    isAddTime: boolean
    hoursFormat: string
    minutesFormat: string
    secondsFormat: string
    timeSeparator: string
    setIsAddTime: Function
    setHoursFormat: Function
    setMinutesFormat: Function
    setSecondsFormat: Function
    setTimeSeparator: Function
    resetHoursFormat: Function
    resetMinutesFormat: Function
    resetSecondsFormat: Function
    resetTimeSeparator: Function
}

export interface CustomTextContextType {
    isAddCustomText: boolean
    customText: string
    isValid: boolean
    setIsAddCustomText: Function
    setCustomText: Function
    setIsValid: Function
    resetCustomText: Function
}

export interface ErrorModalType {
    title: string
    desc: string
}
