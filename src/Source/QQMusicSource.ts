import { BaseSource, SongLyrics } from "./BaseSource"

export class QQMusicSource extends BaseSource {
    getAppName(): string {
        return "QQMusic"
    }

    async getLyrics(_song: string, _artist: string): Promise<SongLyrics | null> {
        return null
    }
}
