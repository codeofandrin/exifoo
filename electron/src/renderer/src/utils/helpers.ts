export function getTruncatedText(text: string, maxLen: number): string {
    if (text.length > maxLen) {
        return text.substring(0, maxLen - 3) + "..."
    }
    return text
}
