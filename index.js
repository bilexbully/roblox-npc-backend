const express = require("express");
const app = express();

app.use(express.json());

// Use environment variable (SAFE)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Chat endpoint
app.post("/chat", async (req, res) => {
  const message = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: "You are a funny Roblox NPC. Keep responses short and entertaining."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    // 🔍 DEBUG (VERY IMPORTANT)
    console.log("FULL OPENAI RESPONSE:", JSON.stringify(data, null, 2));

    // Handle errors properly
    if (!data.choices) {
      return res.json({ reply: "AI error: no choices returned" });
    }

    const reply = data.choices[0].message.content;

    res.json({ reply });

  } catch (error) {
    console.error("ERROR:", error);
    res.json({ reply: "Something broke on the server" });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
