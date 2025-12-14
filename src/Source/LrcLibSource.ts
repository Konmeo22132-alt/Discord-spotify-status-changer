import { BaseSource, SongLyrics } from "./BaseSource"

export class LrcLibSource extends BaseSource {
    public getAppName(): string {
        return "LRCLIB"
    }

    public async getLyrics(song: string, artist: string): Promise<SongLyrics | null> {
        const url =
            `https://lrclib.net/api/get?track_name=${encodeURIComponent(song)}&artist_name=${encodeURIComponent(artist)}`

        const res = await fetch(url)
        if (!res.ok) return null

        const json: any = await res.json()
        const lrc: string | undefined = json?.syncedLyrics
        if (!lrc) return null

        const lines = lrc
            .split("\n")
            .map((raw: string) => {
                const m = raw.match(/^\[(\d+):(\d+(?:\.\d+)?)\](.*)$/)
                if (!m) return null
                const mm = parseInt(m[1], 10)
                const ss = parseFloat(m[2])
                const text = (m[3] || "").trim()
                return { time: (mm * 60 + ss) * 1000, text }
            })
            .filter((x: any) => x && typeof x.time === "number")

        return { lines }
    }
}
