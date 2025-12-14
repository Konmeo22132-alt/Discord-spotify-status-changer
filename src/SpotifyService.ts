import { Settings } from "./Settings"

export class SpotifyService {
    public static token = ""

    public static async exchange(): Promise<void> {
        const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Authorization": "Basic " + Buffer.from(
                    Settings.credentials.clientID + ":" + Settings.credentials.clientSecret
                ).toString("base64"),
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code: Settings.credentials.code,
                redirect_uri: Settings.credentials.customRedirectUri
            })
        })

        const json = await res.json()
        this.token = json.access_token
        Settings.credentials.refreshToken = json.refresh_token
        Settings.save()
    }

    public static async refresh(): Promise<void> {
        const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Authorization": "Basic " + Buffer.from(
                    Settings.credentials.clientID + ":" + Settings.credentials.clientSecret
                ).toString("base64"),
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: Settings.credentials.refreshToken
            })
        })

        const json = await res.json()
        this.token = json.access_token
    }
}
