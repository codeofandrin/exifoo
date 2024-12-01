import { RefObject } from "react"

import { FileInputStatusBasicType, ErrorType } from "./enums"

export interface YearOptionContextType {
    yearFormat: string
    setFullYear: Function
    setShortYear: Function
}

export interface TimeOptionContextType {
    timeDisplayed: boolean
    setTimeDisplayed: Function
}

export interface CustomTextContextType {
    customText: string
    isValid: boolean
    setCustomText: Function
    resetCustomText: Function
    setIsValid: Function
}

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
