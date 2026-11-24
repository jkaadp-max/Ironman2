# Ironman2 — JARVIS Assistant

JARVIS is a voice-first assistant with a Node.js AI backend and an Android-compatible web app.

## Current features
- Responsive JARVIS dashboard
- Browser speech recognition (where supported) and spoken replies
- AI chat through a server-side OpenAI API endpoint
- Backend URL setting for the packaged Android app
- Installable PWA shell with basic offline caching
- Capacitor Android wrapper and GitHub Actions debug APK build
- API keys stay on the server

## Run the server
1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Set `OPENAI_API_KEY` in your server environment. Never commit it.
4. Optionally set `OPENAI_MODEL` to a model available to your API account.
5. Run `npm start`.

## Deploy the backend
Deploy this Node.js app to a host that supports environment variables. Configure:
- `OPENAI_API_KEY` — secret API key
- `OPENAI_MODEL` — optional model override
- `CORS_ORIGINS` — optional comma-separated list of trusted web origins

The Capacitor Android origin is allowed by the server. In the Android app, open Connection settings and enter the HTTPS URL of your deployed backend.

## Build the Android APK without a PC
1. Push changes to the `main` branch or open the Actions tab in GitHub.
2. Run **Build JARVIS Android APK** manually with **Run workflow**, if it has not started automatically.
3. Wait for the workflow to finish.
4. Open its completed run and download the `jarvis-debug-apk` artifact.
5. Extract the ZIP and install `app-debug.apk` on your Android device. Android may ask you to allow installation from that source.

The APK is a debug build for testing. A signed release APK/AAB and Play Store publication require a signing key and additional setup.

## Current limitations
This is the first Android-compatible build. It provides AI chat and voice UI, not unrestricted phone control. Gmail, Calendar, business workflows, notifications, and Android actions need separate integrations and permissions. JARVIS must ask before sending messages, spending money, deleting data, or taking other sensitive actions.

## Security
Never commit API keys, passwords, access tokens, or `.env` files. Configure secrets in your hosting provider. Do not place the OpenAI API key in Android or browser code.
