/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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

export interface ImageFilesInputType {
    ref: RefObject<HTMLInputElement>
    imageFiles: FileList | null
}

export interface FileRenameResultType {
    path: string
    isSuccess: boolean
    errorType: APIErrorType | null
}

export interface ErrorModalType {
    title: string
    desc: string
}
