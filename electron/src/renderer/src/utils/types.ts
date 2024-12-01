import { RefObject } from "react"

import { FileInputStatusBasicType, ErrorType } from "./enums"

export interface ErrorDataType {
    code: number
    detail: { msg: string; item: string }
}

export interface APIRequestResponseType {
    isError: boolean
    errorData: ErrorDataType | null
}

export interface StatusType {
    type: FileInputStatusBasicType
    error: { type: ErrorType; item: string | null } | null
}

export interface AboutModalContextType {
    isOpen: boolean
    openModal: Function
    closeModal: Function
}

export interface DefaultProviderPropsType {
    children: React.ReactElement
}

export interface ImageFilesInputType {
    ref: RefObject<HTMLInputElement>
    imageFiles: FileList | null
    renamedAmount: number
}

export interface DateFormatsContextType {
    yearFormat: string
    monthFormat: string
    dayFormat: string
    setYearFormat: Function
    setMonthFormat: Function
    setDayFormat: Function
}

export interface TimeFormatsContextType {
    hoursFormat: string
    minutesFormat: string
    secondsFormat: string
    setHoursFormat: Function
    setMinutesFormat: Function
    setSecondsFormat: Function
}

export interface SeparatorContextType {
    dateSeparator: string
    timeSeparator: string
    setDateSeparator: Function
    setTimeSeparator: Function
}

export interface CustomTextContextType {
    customText: string
    isValid: boolean
    setCustomText: Function
    setIsValid: Function
}
