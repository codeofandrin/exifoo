import axios, { AxiosResponse } from "axios"

import { Server as ServerConst } from "../utils/constants"
import { APIRequestResponseType, ErrorDataType } from "../utils/types"

const client = axios.create({
    baseURL: ServerConst.apiBaseURL
})

async function request(
    method: string,
    url: string,
    data: Record<string, any>,
    headers: Record<string, any>
): Promise<APIRequestResponseType> {
    const config = { method, url, data, headers }

    let isError = false
    let response: AxiosResponse | null = null
    try {
        response = await client.request(config)
    } catch (err: any) {
        isError = true
        response = err.response
    }
    console.log(response)

    let errorData: ErrorDataType | null = null
    if (isError) {
        if (response && response.status >= 400 && response.status < 500) {
            errorData = {
                code: response.data["code"],
                detail: response.data["detail"]
            }
        }
    }

    return { isError, errorData }
}

interface DateOptionsType {
    year_format: string
    month_format: string
    day_format: string
    separator: string
}

interface TimeOptionsType {
    hours_format: string
    minutes_format: string
    seconds_format: string
    separator: string
}

export async function sendImgPaths(
    paths: string[],
    dateOptions: DateOptionsType,
    timeOptions: TimeOptionsType | null,
    customText: string
): Promise<APIRequestResponseType> {
    const payload = {
        paths: paths,
        date_options: dateOptions,
        time_options: timeOptions,
        custom_text: customText
    }
    const headers = { "Content-Type": "application/json" }

    return await request("POST", "/rename", payload, headers)
}
