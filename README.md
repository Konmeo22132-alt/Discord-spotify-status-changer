# 🎵 Discord Lyrics Status (Spotify Sync)

Automatically update your **Discord Custom Status** with **real-time synced lyrics** from the song you are currently listening to on **Spotify**.

The application reads Spotify playback state, fetches timed lyrics (LRC), and updates your Discord status line-by-line as the song progresses.

> [!WARNING]  
> This project uses a Discord **user token** (self-bot–like behavior).  
> It may violate Discord Terms of Service.  
> Use at your own risk.  
> This project is for **educational purposes only**.

---

## ✨ Features

- Detects currently playing Spotify track
- Reads real-time playback progress
- Fetches synced lyrics from multiple sources
- Updates Discord Custom Status line-by-line
- Auto-offset to reduce lyric delay
- Runs locally as a Node.js service

---

## 🧰 Requirements

- Node.js 18+ (Node 20 / 22 supported)
- Spotify account (Premium recommended)
- Spotify Developer App
- Discord account (Custom Status enabled)
- Internet connection

---

## 📦 Installation

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
npm install
npm run build
```

---

🔐 Setup & Authorization (Step-by-Step)

<details>
<summary><strong>Step 1 — Get Discord User Token</strong></summary>1. Open Discord in your browser


2. Press F12 to open DevTools


3. Go to the Network tab


4. Send any message


5. Find a request and copy the token



Put it into settings.json:

"token": "DISCORD_USER_TOKEN"

</details><details>
<summary><strong>Step 2 — Create Spotify Developer App</strong></summary>1. Go to https://developer.spotify.com/dashboard


2. Create a new application


3. Copy:

Client ID

Client Secret




Add a Redirect URI (HTTPS required):

https://domain.com/callback

</details><details>
<summary><strong>Step 3 — Get Spotify Authorization Code</strong></summary>Open the following URL in your browser:

https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=https%3A%2F%2Fdomain.com%2Fcallback&scope=user-read-playback-state%20user-read-currently-playing&show_dialog=true

After approval, Spotify will redirect to:

https://domain.com/callback?code=XXXX

Copy the code parameter.

</details><details>
<summary><strong>Step 4 — Create settings.json</strong></summary>Create settings.json in the project root:

{
  "credentials": {
    "token": "DISCORD_USER_TOKEN",
    "clientID": "SPOTIFY_CLIENT_ID",
    "clientSecret": "SPOTIFY_CLIENT_SECRET",
    "code": "SPOTIFY_AUTH_CODE",
    "refreshToken": "",
    "customRedirectUri": "https://domain.com/callback",
    "useExternalAuthServer": false,
    "uuid": ""
  },
  "timings": {
    "sendTimeOffset": 0,
    "enableAutooffset": true,
    "autooffset": 10
  },
  "view": {
    "timestamp": false,
    "label": false,
    "advanced": {
      "enabled": false,
      "customStatus": "{lyrics}",
      "customEmoji": "🎶"
    }
  },
  "update": {
    "enableAutoupdate": false
  }
}

On first run, the app will automatically exchange the authorization code for a refresh token.
After that, the code field can be cleared.

</details>
---

🌐 Localhost + ngrok (HTTPS)

<details>
<summary><strong>Why ngrok is required</strong></summary>Spotify requires HTTPS redirect URIs.
ngrok exposes your local server through a public HTTPS URL.

</details><details>
<summary><strong>Step 5 — Install ngrok</strong></summary>Download ngrok from https://ngrok.com/download
Extract the executable

Verify installation:

ngrok version

</details><details>
<summary><strong>Step 6 — Add ngrok Auth Token</strong></summary>Create or log in to your ngrok account
Copy your Auth Token

Run:

ngrok config add-authtoken YOUR_NGROK_TOKEN

</details><details>
<summary><strong>Step 7 — Start local callback server</strong></summary>Make sure your local server is running.
Example callback endpoint:

http://localhost:3000/callback

</details><details>
<summary><strong>Step 8 — Start ngrok tunnel</strong></summary>ngrok http 3000

Copy the HTTPS forwarding URL shown in the terminal.

</details><details>
<summary><strong>Step 9 — Update Spotify Redirect URI (ngrok)</strong></summary>Add this Redirect URI to Spotify Developer Dashboard:

https://xxxx.ngrok-free.dev/callback

If the ngrok URL changes, you must update Spotify settings and re-authorize.

</details><details>
<summary><strong>Step 10 — Generate Authorization Code (ngrok)</strong></summary>https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=https%3A%2F%2Fxxxx.ngrok-free.dev%2Fcallback&scope=user-read-playback-state%20user-read-currently-playing&show_dialog=true

Copy the code from the redirect URL.

</details>
---

▶️ Running the App

<details>
<summary><strong>Start the application</strong></summary>npm start

Expected output:

Song: ...
Author: ...
Progress: 0:42
Lyric: ...
Lyrics source: ...

Discord Custom Status will update automatically.

</details>
---

❗ Common Issues

<details>
<summary><strong>Not listening</strong></summary>Spotify is not playing

Spotify Private Session enabled

Refresh token missing or invalid


</details><details>
<summary><strong>No lyrics</strong></summary>Track has no synced lyrics available


</details><details>
<summary><strong>Status not updating</strong></summary>Discord rate limits

Invalid Discord token


</details>
---

🔒 Security Notes

<details>
<summary><strong>Important</strong></summary>Add the following to .gitignore:

settings.json
node_modules/
dist/
cache/
log.txt

Never publish:

Discord token

Spotify client secret

Refresh token


</details>
---

📞 Support & Contact

Discord: YOUR_DISCORD_USERNAME
Telegram: YOUR_TELEGRAM_USERNAME


---

📜 License

MIT License


---

✅ Summary

Spotify playback synced to Discord Custom Status

OAuth via Authorization Code + Refresh Token

ngrok used only for HTTPS when running locally

Designed for educational and experimental use


Enjoy syncing your music with Discord 🎶
