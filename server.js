import express from "express";
import cors from "cors";
import OpenAI from "openai";
const app=express();
const origins=new Set((process.env.CORS_ORIGINS||"").split(",").map(x=>x.trim()).filter(Boolean));
const local=new Set(["capacitor://localhost","https://localhost","http://localhost"]);
app.use(cors({origin(o,cb){if(!o||local.has(o)||origins.has(o))return cb(null,true);cb(new Error("App origin not allowed by CORS."));},methods:["GET","POST","OPTIONS"],allowedHeaders:["Content-Type"]}));
app.use(express.json({limit:"1mb"}));app.use(express.static("public"));
const provider=(process.env.AI_PROVIDER||(process.env.GEMINI_API_KEY?"gemini":"openai")).toLowerCase();
const geminiKey=process.env.GEMINI_API_KEY, geminiModel=process.env.GEMINI_MODEL||"gemini-2.5-flash";
const openaiKey=process.env.OPENAI_API_KEY, openaiModel=process.env.OPENAI_MODEL||"gpt-6.2-astra";
const openai=openaiKey?new OpenAI({apiKey:openaiKey}):null;
const configured=provider==="gemini"?Boolean(geminiKey):Boolean(openai);
const instructions="You are JARVIS, a personal work assistant. Help with business management, staffing, email/message drafts, official letters, documents, reports, planning, and task organization. You may draft and plan. You do not have access to private accounts, calendars, files, or device controls unless an authorized integration is available. Never claim to have sent, saved, scheduled, purchased, deleted, or changed anything unless a tool confirms it. Ask for confirmation before consequential external actions. Protect secrets.";
app.get("/api/health",(_req,res)=>res.json({ok:true,aiConfigured:configured,provider:configured?provider:"not-configured"}));
app.post("/api/chat",async(req,res)=>{try{
const message=typeof req.body?.message==="string"?req.body.message.trim():"";
if(!message||message.length>8000)return res.status(400).json({error:"Enter a message (maximum 8,000 characters)."});
if(!configured)return res.status(503).json({error:provider==="gemini"?"AI is not configured. Add GEMINI_API_KEY to your server environment.":"AI is not configured. Add OPENAI_API_KEY to your server environment."});
if(provider==="gemini"){
const r=await fetch("https://generativelanguage.googleapis.com/v1beta/models/"+encodeURIComponent(geminiModel)+":generateContent",{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":geminiKey},body:JSON.stringify({systemInstruction:{parts:[{text:instructions}]},contents:[{role:"user",parts:[{text:message}]}],generationConfig:{temperature:0.6,maxOutputTokens:2048}})});
const d=await r.json().catch(()=>({}));if(!r.ok){console.error("Gemini error",r.status,d?.error?.message||"");return res.status(502).json({error:"Gemini request failed. Check your key, model, and Google AI quota."});}
const reply=d?.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("").trim();return res.json({reply:reply||"I couldn't create a text reply."});
}
const r=await openai.responses.create({model:openaiModel,instructions,input:message});
return res.json({reply:r.output_text||"I couldn't create a text reply."});
}catch(e){console.error("Chat failed",e?.message||e);return res.status(500).json({error:"AI request failed. Check server configuration and try again."});}});
const port=Number(process.env.PORT||3000);app.listen(port,()=>console.log("JARVIS server listening on "+port));
