import { existsSync, readFileSync, writeFileSync } from "fs"

export interface SettingsSchema {
    credentials: {
        token: string
        clientID: string
        clientSecret: string
        code: string
        refreshToken: string
        customRedirectUri: string
        useExternalAuthServer: boolean
        uuid: string
    }
    timings: {
        sendTimeOffset: number
        enableAutooffset: boolean
        autooffset: number
    }
    view: {
        timestamp: boolean
        label: boolean
        advanced: {
            enabled: boolean
            customStatus: string
            customEmoji: string
        }
    }
    update: {
        enableAutoupdate: boolean
    }
}

export class Settings {
    private static data: SettingsSchema

    static load(path = "settings.json"): void {
        if (!existsSync(path)) {
            throw new Error("settings.json not found")
        }
        this.data = JSON.parse(readFileSync(path, "utf8"))
    }

    static save(path = "settings.json"): void {
        writeFileSync(path, JSON.stringify(this.data, null, 2))
    }

    static get credentials() {
        return this.data.credentials
    }

    static get timings() {
        return this.data.timings
    }

    static get view() {
        return this.data.view
    }

    static get update() {
        return this.data.update
    }
}
