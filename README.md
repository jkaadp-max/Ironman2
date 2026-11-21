# Ironman2 — JARVIS Voice Assistant

A browser-based, voice-first JARVIS starter with a secure server-side AI endpoint.

## Features
- Futuristic responsive dashboard
- Browser speech recognition (where supported)
- Spoken replies using browser speech synthesis
- Local demo commands: hello, time, date, help, stop speaking
- Optional AI chat through a server endpoint
- API key stays on the server, never in browser code

## Run locally
1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Set `OPENAI_API_KEY` in your server environment (do not commit it).
4. Optionally set `OPENAI_MODEL` (default: `gpt-6.2-astra`).
5. Run `npm start` and open `http://localhost:3000`.

## Deploy
Deploy this Node.js app to a host that supports server-side environment variables. Set `OPENAI_API_KEY` in the host's secret settings. Do not publish it in frontend code or GitHub.

## Current limitations
This starter provides AI conversation and browser voice input/output. It does not yet connect Gmail, Calendar, device controls, or arbitrary computer actions. Those require separate integrations, user authorization, and confirmation rules. Voice recognition support varies by browser and usually requires HTTPS or localhost.

## Security
Never commit `.env`, API keys, passwords, or access tokens. External actions must be implemented with scoped permissions and explicit confirmation.
