import { BaseSource, SongLyrics } from "./Sources/BaseSource"

export class LyricsFetcher {
    public sources: BaseSource[] = []
    public lastFetchedFrom = "None"

    public addSource(src: BaseSource): void {
        this.sources.push(src)
    }

    public async fetchLyrics(name: string, artist: string): Promise<SongLyrics | null> {
        for (const src of this.sources) {
            try {
                const res = await src.getLyrics(name, artist)
                if (res) {
                    this.lastFetchedFrom = src.getAppName()
                    return res
                }
            } catch {}
        }
        return null
    }
}
