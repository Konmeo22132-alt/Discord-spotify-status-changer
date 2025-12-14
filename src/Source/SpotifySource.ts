import { BaseSource, SongLyrics } from "./BaseSource"

export class SpotifySource extends BaseSource {
    public getAppName(): string {
        return "Spotify"
    }

    public async getLyrics(_song: string, _artist: string): Promise<SongLyrics | null> {
        return null
    }
}
