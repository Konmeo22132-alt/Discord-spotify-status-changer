import { PlaybackState } from "./PlaybackState"
import { Settings } from "./Settings"
import { LyricsLine } from "./Sources/BaseSource"
import { Autooffset } from "./Autooffset"

export class StatusChanger {
    public playbackState: PlaybackState
    public sentLines: LyricsLine[]
    public autooffset: Autooffset

    constructor(playbackState: PlaybackState) {
        this.playbackState = playbackState
        this.sentLines = []
        this.autooffset = new Autooffset()
    }

    public async changeStatusRequest(text: string, token: string, emoji: string): Promise<void> {
        const start = Date.now()

        await fetch("https://discord.com/api/v9/users/@me/settings", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                "User-Agent": "Discord/1.0"
            },
            body: JSON.stringify({
                custom_status: {
                    text,
                    emoji_id: null,
                    emoji_name: emoji,
                    expires_at: new Date(Date.now() + 60_000).toISOString()
                }
            })
        })

        this.autooffset.addValue(Date.now() - start)
    }

    public changeStatus(): void {
        const state = this.playbackState

        if (!state.isPlaying) return
        if (!state.hasLyrics) return
        if (!state.lyrics) return
        if (state.ended) return

        this.autooffset.setLimit(Settings.timings.autooffset)

        const progress = state.songProgress
        const offset = Settings.timings.enableAutooffset
            ? this.autooffset.getAverageValue() + 100
            : Settings.timings.sendTimeOffset

        const lines = state.lyrics.lines

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            const next = lines[i + 1]

            if (!line.text) continue
            if (line.time > progress + offset) break
            if (next && next.time <= progress + offset) continue
            if (this.sentLines.some(l => l.time === line.time)) break
            if (state.currentLine && state.currentLine.time === line.time) break

            state.currentLine = line

            if (Settings.view.advanced.enabled) {
                this.changeStatusRequest(
                    this.parseStatusString(Settings.view.advanced.customStatus),
                    Settings.credentials.token,
                    Settings.view.advanced.customEmoji
                )
            } else {
                this.changeStatusRequest(
                    this.getStatusString(line),
                    Settings.credentials.token,
                    "chuotleluoi:1444254951726649466"
                )
            }

            this.sentLines.push(line)
            break
        }
    }

    public songChanged(): void {
        this.sentLines = []
        this.playbackState.currentLine = null
    }

    public clearStatus(): void {
        fetch("https://discord.com/api/v9/users/@me/settings", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Settings.credentials.token,
                "User-Agent": "Discord/1.0"
            },
            body: JSON.stringify({
                custom_status: null
            })
        })
    }

    public formatSeconds(sec: number): string {
        const m = Math.floor(sec / 60)
        const s = Math.floor(sec % 60)
        return `${m}:${s < 10 ? "0" : ""}${s}`
    }

    public getStatusString(line: LyricsLine): string {
        return `${Settings.view.timestamp ? `[${this.formatSeconds(Math.floor(line.time / 1000))}] ` : ""}${Settings.view.label ? "Song lyrics - " : ""}${line.text.replace(/♪/g, "🎶")}`.slice(0, 128)
    }

    public parseStatusString(template: string): string {
        const state = this.playbackState
        if (!state.currentLine) return template.slice(0, 128)

        const line = state.currentLine
        const song = state.songName || ""
        const author = state.songAuthor || ""

        return template
            .replace("{lyrics}", line.text)
            .replace("{lyrics_upper}", line.text.toUpperCase())
            .replace("{lyrics_lower}", line.text.toLowerCase())
            .replace("{lyrics_letters_only}", line.text.replace(/['",\.]/gi, ""))
            .replace("{lyrics_upper_letters_only}", line.text.toUpperCase().replace(/['",\.]/gi, ""))
            .replace("{lyrics_lower_letters_only}", line.text.toLowerCase().replace(/['",\.]/gi, ""))
            .replace("♪", "🎶")
            .replace("{timestamp}", this.formatSeconds(Math.floor(line.time / 1000)))
            .replace("{song_name}", song)
            .replace("{song_name_upper}", song.toUpperCase())
            .replace("{song_name_lower}", song.toLowerCase())
            .replace("{song_name_cropped}", song.replace(/( ?- ?.+)|(\(.+\))/gi, ""))
            .replace("{song_name_upper_cropped}", song.toUpperCase().replace(/( ?- ?.+)|(\(.+\))/gi, ""))
            .replace("{song_name_lower_cropped}", song.toLowerCase().replace(/( ?- ?.+)|(\(.+\))/gi, ""))
            .replace("{song_author}", author)
            .replace("{song_author_upper}", author.toUpperCase())
            .replace("{song_author_lower}", author.toLowerCase())
            .slice(0, 128)
    }
}
