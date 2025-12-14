import { SongLyrics, LyricsLine } from "./Sources/BaseSource"

export class PlaybackState {
    songId: string | null = null
    oldSongId: string | null = null
    songName = ""
    songAuthor = ""
    songDuration = 0
    songProgress = 0
    isPlaying = false
    ended = false

    lyrics: SongLyrics | null = null
    hasLyrics = false
    currentLine: LyricsLine | null = null
}
