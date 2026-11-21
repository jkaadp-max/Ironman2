import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL || "gpt-6.2-astra";
const client = apiKey ? new OpenAI({ apiKey }) : null;

app.post("/api/chat", async (req, res) => {
  try {
    const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
    if (!message || message.length > 8000) {
      return res.status(400).json({ error: "Enter a message (maximum 8,000 characters)." });
    }
    if (!client) return res.status(503).json({ error: "AI is not configured. Add OPENAI_API_KEY to your server environment." });
    const response = await client.responses.create({
      model,
      instructions: "You are JARVIS, a helpful voice-first personal assistant. Be clear and concise. You may suggest plans and prepare actions, but never claim to have sent messages, changed files, spent money, or performed external actions unless a separately authorized tool actually confirms it. Ask for explicit confirmation before sensitive actions.",
      input: message
    });
    return res.json({ reply: response.output_text || "I couldn't create a text reply." });
  } catch (error) {
    console.error("Chat request failed:", error?.message || error);
    return res.status(500).json({ error: "The AI request failed. Check the server configuration and try again." });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`JARVIS server listening on http://localhost:${port}`));
