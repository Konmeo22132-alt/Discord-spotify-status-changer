const ACCESS_TOKEN = "";

async function check() {
  const res = await fetch("https://api.spotify.com/v1/me/player", {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  });

  if (res.status === 204) {
    console.log("Spotify mở nhưng KHÔNG phát nhạc");
    return;
  }

  if (res.status === 401) {
    console.log("Token không hợp lệ / hết hạn");
    return;
  }

  const data = await res.json();

  if (!data || !data.item) {
    console.log("Không lấy được bài hát (Private Session / thiếu scope)");
    return;
  }

  console.log("Bài hát:", data.item.name);
  console.log("Nghệ sĩ:", data.item.artists.map(a => a.name).join(", "));
  console.log("Thời gian:", Math.floor(data.progress_ms / 1000), "giây");
}

check();

