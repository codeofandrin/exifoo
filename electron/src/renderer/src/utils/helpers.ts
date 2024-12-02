export function getTruncatedText(text: string, maxLen: number): string {
    if (text.length > maxLen) {
        return text.substring(0, maxLen - 3) + "..."
    }
    return text
}

export function countInArray(arr: any[], element: any): number {
    return arr.filter((x) => x == element).length
}

export function getYearStr(year: number, short: boolean = false) {
    const yearStr = year.toString()
    return short ? yearStr.substring(2) : yearStr
}

export function getMonthStr(month: number, leadingZero: boolean = true) {
    const monthStr = month.toString()
    if (leadingZero) {
        return month < 10 ? "0" + month : monthStr
    } else {
        return monthStr
    }
}

export function getDayStr(day: number, leadingZero: boolean = true) {
    const dayStr = day.toString()
    if (leadingZero) {
        return day < 10 ? "0" + day : dayStr
    } else {
        return dayStr
    }
}

export function getHoursStr(hours: number, leadingZero: boolean = true) {
    const hoursStr = hours.toString()
    if (leadingZero) {
        return hours < 10 ? "0" + hours : hoursStr
    } else {
        return hoursStr
    }
}

export function getMinutesStr(minutes: number, leadingZero: boolean = true) {
    const minutesStr = minutes.toString()
    if (leadingZero) {
        return minutes < 10 ? "0" + minutes : minutesStr
    } else {
        return minutesStr
    }
}

export function getSecondsStr(seconds: number, leadingZero: boolean = true) {
    const secondsStr = seconds.toString()
    if (leadingZero) {
        return seconds < 10 ? "0" + seconds : secondsStr
    } else {
        return secondsStr
    }
}
