# Ironman2 — JARVIS Work Assistant

JARVIS is a voice-first assistant with a Node.js AI backend and Android-compatible app.

## Deploy the cloud AI (Android-only)

1. Open the [Render deploy page](https://render.com/deploy?repo=https://github.com/jkaadp-max/Ironman2).
2. Sign in to Render and connect GitHub.
3. Review the `jarvis-ai-backend` service and create it.
4. In Render → JARVIS service → Environment, add `GEMINI_API_KEY` as a secret and paste your Google AI Studio key. Never put the key in GitHub or the Android app.
5. Set `AI_PROVIDER` to `gemini` and `GEMINI_MODEL` to a model enabled for your key (default `gemini-2.5-flash`).
6. Wait for deployment. Copy the service's HTTPS URL.
7. In JARVIS on Android → Connection settings, paste the backend URL and Save.
8. Test: “Hello JARVIS, what work can you help me automate?”

The backend supports Gemini and OpenAI. Gemini is selected by default when `GEMINI_API_KEY` is present, unless `AI_PROVIDER` overrides it. API usage may be billed or quota-limited by Google; ChatGPT subscription does not include API credits.

## Features in this first version
- Responsive JARVIS dashboard and voice interface
- Server-side AI chat with Gemini or OpenAI
- Android backend URL setting
- PWA shell and Capacitor Android wrapper
- GitHub Actions debug APK build
- API keys remain on the cloud server

## Manual server setup
Requires Node.js 20+.

```sh
npm install
GEMINI_API_KEY=your_key AI_PROVIDER=gemini npm start
```

## Environment variables
- `AI_PROVIDER` — `gemini` or `openai` (optional; defaults to Gemini when its key is set)
- `GEMINI_API_KEY` — secret Gemini API key
- `GEMINI_MODEL` — default `gemini-2.5-flash`
- `OPENAI_API_KEY` — optional OpenAI secret
- `OPENAI_MODEL` — OpenAI model ID
- `CORS_ORIGINS` — optional comma-separated trusted web origins

## Build APK on Android
1. Open the repository's Actions tab.
2. Run **Build JARVIS Android APK** or wait for a push-triggered build.
3. Download the `jarvis-debug-apk` artifact from a successful run.
4. Extract and install `app-debug.apk`.

## Automation limits and safety
This build supports AI conversation, drafting and planning. It does not yet automatically access Gmail, Calendar, contacts, local files or other apps. Those require separate authorized integrations and workflow modules. JARVIS should request confirmation before sending messages, spending money, deleting data, or making other consequential changes.

## Security
Never commit API keys, passwords, access tokens, or `.env` files. Configure secrets in Render. Do not put provider keys in Android/browser code.
