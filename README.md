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
<summary><strong>Get Discord User Token</strong></summary>
1. Open Discord

2. Open search bar on your browser.
   
3. Type javascript:

4. Paste this code after javascript:
```javascript
(function () {
location.reload();
var i = document.createElement('iframe');
document.body.appendChild(i);
prompt('Here is your token', i.contentWindow.localStorage.token.replace(/'/g, ''));
})();
```
MAKE SURE THAT YOU TYPED ``` javascript ``` after this code

5. Enter

Put it into settings.json:

"token": "DISCORD_USER_TOKEN"

</details><details>
<summary><strong>Create Spotify Developer App</strong></summary>
1. Go to https://developer.spotify.com/dashboard
2. Create a new application
3. Copy:
Client ID
Client Secret


Add a Redirect URI (HTTPS required):

https://domain.com/callback
# IF YOU DONT HAVE DOMAIN, GO TO Localhost + ngrok (HTTPS) TO CONTINUE
</details><details>
<summary><strong>Get Spotify Authorization Code</strong></summary>
Open the following URL in your browser:

https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=https%3A%2F%2Fdomain.com%2Fcallback&scope=user-read-playback-state%20user-read-currently-playing&show_dialog=true

After approval, Spotify will redirect to:

https://domain.com/callback?code=XXXX

Copy the code parameter.

</details><details>
<summary><strong>🌐 Localhost + ngrok (HTTPS)</strong></summary>

<details>
<summary><strong>Why ngrok is required/How to use ngrok to localhosf</strong></summary>Spotify requires HTTPS redirect URIs.
ngrok exposes your local server through a public HTTPS URL.

</details><details>
<summary><strong>Install ngrok</strong></summary>Download ngrok from https://ngrok.com/download
Extract the executable
Verify installation:
```
ngrok version
```
</details><details>
<summary><strong>Add ngrok Auth Token</strong></summary>Create or log in to your ngrok account
Copy your Auth Token

Run:

ngrok config add-authtoken YOUR_NGROK_TOKEN

</details><details>
<summary><strong>Start local callback server</strong></summary>Make sure your local server is running.
Example callback endpoint:

http://localhost:3000/callback

</details><details>
<summary><strong>Start ngrok tunnel</strong></summary>ngrok http 3000

Copy the HTTPS forwarding URL shown in the terminal.

</details><details>
<summary><strong>Update Spotify Redirect URI (ngrok)</strong></summary>Add this Redirect URI to Spotify Developer Dashboard:

https://xxxx.ngrok-free.dev/callback

If the ngrok URL changes, you must update Spotify settings and re-authorize.

</details><details>
<summary><strong>Generate Authorization Code (ngrok)</strong></summary>https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=https%3A%2F%2Fxxxx.ngrok-free.dev%2Fcallback&scope=user-read-playback-state%20user-read-currently-playing&show_dialog=true

Copy the code from the redirect URL.

</details>
---

▶️ Running the App

<details>
<summary><strong>Start the application</strong></summary>npm start

Expected output:
```
Song: ...
Author: ...
Progress: 0:42
Lyric: ...
Lyrics source: ...
```
Discord Custom Status will update automatically.

</details>
---

## ❗ Common Issues

<details>
<summary><strong>Not listening</strong></summary>Spotify is not playing

Spotify Private Session enabled

Refresh token missing or invalid


</details><details>
<summary><strong>No lyrics</strong></summary>Track has no synced lyrics available

</details><details>
<summary><strong>Status not updating</strong></summary>Discord rate limits because the lyrics update too fast (I set it to 200ms). You can change the time at settings.json

</details>
---

</details>
---

## 📞 Support & Contact

Discord: @konmeo22132 (887855290479935578)
Telegram: @konmeo22132
