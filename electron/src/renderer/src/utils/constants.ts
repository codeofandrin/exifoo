export class Server {
    static apiBaseURL = "http://localhost:8000"
}

export class WebsiteLinks {
    static home = "https://exifoo.com"
    static store = "https://store.exifoo.com"
    static eula = `${this.home}/eula`
    static checkout = `${this.store}/buy/28dafee5-7c7f-48c2-8a15-4e4700742055`
    static releaseNotes = `${this.home}/release-notes`
}

export class EMail {
    static feedback = "feedback@exifoo.com"
    static help = "support@exifoo.com"
}
