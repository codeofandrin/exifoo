/**
 * Copyright (c) codeofandrin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class Server {
    static apiBaseURL = "http://localhost:8000"
}

export class WebsiteLinks {
    static home = "https://exifoo.vercel.app"
    static store = "https://exifoo.lemonsqueezy.com"
    static eula = `${this.home}/eula`
    static checkout = `${this.store}/buy/43f8a4fc-780d-41c5-a7bb-5eba8bf24fda`
    static releaseNotes = `${this.home}/release-notes`
}

export class EMail {
    static feedback = "mail@andrin.software"
    static help = "mail@andrin.software"
}
