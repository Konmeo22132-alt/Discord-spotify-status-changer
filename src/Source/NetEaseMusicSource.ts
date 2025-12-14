import { BaseSource, SongLyrics } from "./BaseSource"

export class NetEaseMusicSource extends BaseSource {
    public getAppName(): string {
        return "NetEase"
    }

    public async getLyrics(_song: string, _artist: string): Promise<SongLyrics | null> {
        return null
    }
}
