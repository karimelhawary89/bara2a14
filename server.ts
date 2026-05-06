import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  
  // AI Proxy Route
  app.post("/api/ai-proxy", async (req, res) => {
    try {
      const { mode, messages, context } = req.body;
      
      const masterPrompt = `أنت "براءة"، مساعد قانوني ذكي متخصص في القانون المصري. 
      - تستخدم اللغة العربية الفصيحة في الرد بأسلوب قانوني مهني.
      - تفهم العامية المصرية وتحولها لصياغة قانونية.
      - تذكر مواد القانون عندما يكون ذلك ممكناً.
      - تذكر دائماً أن ردودك استرشادية وليست بديلاً عن استشارة محامٍ متخصص.
      - لا تخترع قوانين؛ اعتمد على الحقائق المعروفة في القانون المصري.`;

      const modePrompt = mode === "draft" ? "أنت الآن في وضع صياغة المستندات. اصغ النص المطلوب بدقة." : 
                        mode === "review" ? "أنت الآن في وضع مراجعة العقود. حدد المخاطر والبنود المفقودة." : "";

      const promptParts = [masterPrompt, modePrompt];
      if (context) {
        promptParts.push(`سياق إضافي: ${JSON.stringify(context)}`);
      }
      
      const contents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const response = await genAI.models.generateContent({
        model: "gemini-1.5-flash",
        contents: contents,
        config: {
          systemInstruction: promptParts.join("\n\n"),
        }
      });

      const text = response.text;

      res.json({ content: text });
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({ error: "حدث خطأ في الاتصال بالذكاء الاصطناعي" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
