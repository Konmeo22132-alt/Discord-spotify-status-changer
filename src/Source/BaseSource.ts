export interface LyricsLine {
    time: number
    text: string
}

export interface SongLyrics {
    lines: LyricsLine[]
}

export abstract class BaseSource {
    abstract getLyrics(song: string, artist: string): Promise<SongLyrics | null>
    abstract getAppName(): string
}
