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
    let response: AxiosResponse | null = null
    try {
        response = await client.request(config)
    } catch (err: any) {
        response = err.response
    }
    console.log(response)

    let isError = false
    if (response) {
        if (!(response.status >= 200 && response.status <= 308)) {
            isError = true
        }
    }

    let errorData: ErrorDataType | null = null
    if (isError) {
        if (response !== null && response.status >= 400 && response.status < 500) {
            errorData = {
                code: response.data["code"],
                detail: response.data["detail"]
            }
        }
    }

    return { isError, errorData }
}

export async function sendImgPaths(
    paths: string[],
    yearOption: string,
    timeOption: boolean,
    customText: string
): Promise<APIRequestResponseType> {
    const payload = {
        paths: paths,
        year_option: yearOption,
        time_option: timeOption,
        custom_text: customText
    }
    const headers = { "Content-Type": "application/json" }

    return await request("POST", "/images", payload, headers)
}
