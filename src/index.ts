import { LyricsFetcher } from "./LyricsFetcher";
import { SpotifySource } from "./Sources/SpotifySource";
import { NetEaseMusicSource } from "./Sources/NetEaseMusicSource";
import { LrcLibSource } from "./Sources/LrcLibSource";
import { QQMusicSource } from "./Sources/QQMusicSource";

import { PlaybackState } from "./PlaybackState";
import { PlaybackStateUpdater } from "./PlaybackStateUpdater";
import { StatusChanger } from "./StatusChanger";

import { Settings } from "./Settings";
import { SpotifyService } from "./SpotifyService";
import { Debug } from "./Debug";

import { v4 as uuidv4 } from "uuid";

/**
 * ENTRY POINT
 */
async function main(): Promise<void> {
  // 1. Load settings.json
  Settings.load();

  // 2. Ensure UUID exists
  if (!Settings.credentials.uuid) {
    Settings.credentials.uuid = uuidv4();
    Settings.save();
  }

  // 3. === SPOTIFY AUTH FLOW (QUAN TRỌNG NHẤT) ===
  // Nếu CHƯA có refreshToken nhưng CÓ code → exchange
  if (
    !Settings.credentials.refreshToken &&
    Settings.credentials.code
  ) {
    Debug.write("No refresh token found. Exchanging authorization code...");
    await SpotifyService.exchange();
    Settings.save();
  }

  // Sau khi đã có refreshToken → refresh access token
  if (Settings.credentials.refreshToken) {
    Debug.write("Refreshing Spotify access token...");
    await SpotifyService.refresh();
  } else {
    throw new Error(
      "Spotify refreshToken is missing. Authorization flow did not complete."
    );
  }

  // 4. === INIT LYRIC SOURCES ===
  const lyricsFetcher = new LyricsFetcher();
  lyricsFetcher.addSource(new SpotifySource());
  lyricsFetcher.addSource(new LrcLibSource());
  lyricsFetcher.addSource(new NetEaseMusicSource());
  lyricsFetcher.addSource(new QQMusicSource());

  // 5. === INIT PLAYBACK STATE ===
  const playbackState = new PlaybackState();
  const playbackUpdater = new PlaybackStateUpdater(
    playbackState,
    lyricsFetcher
  );

  const statusChanger = new StatusChanger(playbackState);

  // 6. === UPDATE SPOTIFY PLAYBACK (MỖI 5 GIÂY) ===
  setInterval(async () => {
    try {
      await playbackUpdater.update();
    } catch (e: any) {
      Debug.write("Playback update error: " + e?.message);
    }
  }, 5000);

  // 7. === STATUS LOOP (60 FPS) ===
  let lastTick = Date.now();

  setInterval(() => {
    const now = Date.now();
    const delta = now - lastTick;
    lastTick = now;

    // Tăng progress theo thời gian thực
    if (playbackState.isPlaying) {
      playbackState.songProgress += delta;
    }

    // Đổi status theo lyric
    statusChanger.changeStatus();

    if (playbackState.ended) {
      statusChanger.songChanged();
    }

    // Log console
    console.clear();
    console.log(`
Song: ${playbackState.songName || "Not listening"}
Author: ${playbackState.songAuthor || "Not listening"}
Progress: ${statusChanger.formatSeconds(
      Math.floor(playbackState.songProgress / 1000)
    )}
Lyric: ${playbackState.currentLine?.text || "N/A"}
Lyrics source: ${lyricsFetcher.lastFetchedFrom}
`);

  }, 1000 / 60);
}

// === GLOBAL ERROR HANDLER ===
process.on("uncaughtException", (err: any) => {
  Debug.write(err?.stack || String(err));
  process.exit(1);
});

// RUN
main().catch((e) => {
  Debug.write(e?.stack || String(e));
  process.exit(1);
});
