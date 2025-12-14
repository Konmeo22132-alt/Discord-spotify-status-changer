const ACCESS_TOKEN = "BQBAIe7keVlgjwL4_g-LxtpUL37wgOHCq2Pq0Nv73evCY9cBnfENVV0asJdnfp3aoFHBfey65FQdst7ENA_4hQA8oX76r4BM2yGSwS_1sDAJSxQFPYHW_mFfV1EtKCkNJuvuNB3zYBZgrDmb0eUey431IfQzKW7aks1o3IIV9ekTES9RnXW1W5epMmbgw8CoDBqylNPMW1Ov-o03KmJsAav5kla4PNPrpxwP-Tcoox_TwTe-o3PSzQoT2g";

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
