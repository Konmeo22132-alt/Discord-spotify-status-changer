import { PlaybackState } from "./PlaybackState"
import { LyricsFetcher } from "./LyricsFetcher"
import { SpotifyService } from "./SpotifyService"

export class PlaybackStateUpdater {
    constructor(
        public state: PlaybackState,
        public lyricsFetcher: LyricsFetcher
    ) {}

    public async update(): Promise<void> {
        const start = Date.now()

        const res = await fetch("https://api.spotify.com/v1/me/player", {
            headers: {
                "Authorization": "Bearer " + SpotifyService.token
            }
        })

        if (res.status === 204) {
            this.state.isPlaying = false
            this.state.ended = true
            return
        }

        if (res.status === 401) {
            await SpotifyService.refresh()
            return
        }

        const json = await res.json()

        this.state.isPlaying = json.is_playing
        this.state.songProgress = json.progress_ms + (Date.now() - start)

        if (this.state.songId !== json.item.id) {
            this.state.songId = json.item.id
            this.state.songName = json.item.name
            this.state.songAuthor = json.item.artists[0].name
            this.state.songDuration = json.item.duration_ms

            this.state.lyrics = await this.lyricsFetcher.fetchLyrics(
                this.state.songName,
                this.state.songAuthor
            )

            this.state.hasLyrics = !!this.state.lyrics
            this.state.currentLine = null
        }
    }
}
