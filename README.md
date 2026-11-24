# Ironman2 — JARVIS Assistant

JARVIS is a voice-first assistant with a Node.js AI backend and an Android-compatible web app.

## Deploy the AI backend (Android-only setup)

1. Open the [one-click Render deployment page](https://render.com/deploy?repo=https://github.com/jkaadp-max/Ironman2).
2. Sign in to Render and connect your GitHub account if asked.
3. Review the service named `jarvis-ai-backend`. Choose the Free plan if available.
4. When prompted for `OPENAI_API_KEY`, paste your secret key directly into Render's secret field. Never put it in GitHub, this README, or the Android app.
5. Create the service and wait for deployment to finish.
6. Copy the service's HTTPS URL (it will look like `https://jarvis-ai-backend.onrender.com`).
7. Open JARVIS on Android → Connection settings → paste that URL → Save.
8. Send JARVIS a test message such as "Hello, who are you?"

The Render blueprint sets `OPENAI_MODEL=gpt-6.2-sol` by default. You can change this in Render's Environment settings if your API project has access to another model. The OpenAI API is billed separately from a ChatGPT subscription. Free hosting availability and limits may change; a free service can sleep when idle.

## Current features
- Responsive JARVIS dashboard
- Browser speech recognition (where supported) and spoken replies
- AI chat through a server-side OpenAI API endpoint
- Backend URL setting for the packaged Android app
- Installable PWA shell with basic offline caching
- Capacitor Android wrapper and GitHub Actions debug APK build
- API keys stay on the server

## Run the server manually
1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Set `OPENAI_API_KEY` in your server environment. Never commit it.
4. Optionally set `OPENAI_MODEL` to a model available to your API account.
5. Run `npm start`.

## Server configuration
- `OPENAI_API_KEY` — secret API key (required)
- `OPENAI_MODEL` — model ID; defaults to `gpt-6.2-astra` unless the hosting blueprint overrides it
- `CORS_ORIGINS` — optional comma-separated list of trusted web origins

The Capacitor Android origin is allowed by the server.

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
