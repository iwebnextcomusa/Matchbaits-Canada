import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for JSON parsing
app.use(express.json());

// Lazy-initialize Gemini client to prevent crashes if key is missing on startup
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined in the environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY_IF_MISSING",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Chatbot proxy endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request. 'messages' array is required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Gemini API key is not configured in environment variables. Please configure GEMINI_API_KEY in the Secrets panel.",
      });
    }

    const ai = getGeminiClient();

    // Map client-side message structure to Gemini API expected structure.
    // We can compile history into a single chat session or send contents.
    // Let's format the chat thread for ai.models.generateContent.
    // The target model is gemini-3.5-flash.
    const systemInstruction = `You are "Matchbaits Canada AI Assistant", a friendly, professional, and knowledgeable fishing expert.
You represent Matchbaits Canada, located in North York, Ontario, Canada (Phone: 647-703-8309, Email: caladonuno01@gmail.com).
Your mission is to help anglers find the best fishing baits (Groundbait, Pellets, Boilies, Hookbait, Liquid Attractants), tackle, and accessories, and provide expert angling advice for Canadian freshwater fishing (especially carp, bass, walleye, trout, pike, etc.).

Keep your tone:
- Professional, warm, and friendly
- Passionate about fishing and the outdoors
- Helpful, with specific advice for Ontario lakes (like Lake Simcoe, Lake Ontario, Kawartha Lakes, Grand River, St. Lawrence River, etc.)
- Informative and easy to understand for beginners, yet detailed enough for veteran anglers.

Be ready to explain the product categories:
1. Groundbait: Custom-blend mixes designed to attract and hold fish in your swim.
2. Pellets: Highly attractive, slow-breakdown feeding pellets loaded with oils and proteins.
3. Boilies: Premium boiled paste baits (shelf-life and freezer), optimized for carp and large specimens.
4. Hookbait: Specialized high-visibility or high-leakage pop-ups, wafters, and hard hookbaits.
5. Liquid Attractants: Power-packed syrups, amino dips, and bait boosters to enhance any presentation.
6. Fishing Accessories & Terminal Tackle: Hooks, leads, rigs, baiting tools, and essential hardware.

Always provide helpful local advice. If someone asks about location, contact info, or business hours, provide them accurately:
- Address: North York, Ontario, Canada
- Phone: 647-703-8309
- Email: caladonuno01@gmail.com
- Hours: Mon-Fri: 8:00 AM - 6:00 PM, Sat: 7:00 AM - 4:00 PM, Sun: Closed (Out fishing!)

Keep responses concise, conversational, and well-structured. Use line breaks for readability. Do not output raw markdown tags like triple backticks unless necessary.`;

    // Map conversation history
    const contents = messages.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content || "" }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I apologize, but I could not formulate a response. Please try again.";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred while communicating with the AI service." });
  }
});

// Setup Vite Dev Server / Static Hosting
async function start() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Matchbaits Canada server is running on http://0.0.0.0:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
