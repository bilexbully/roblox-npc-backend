const express = require("express");
const app = express();

app.use(express.json());

app.post("/chat", (req, res) => {
  const message = req.body.message;
  const reply = "NPC says: I heard '" + message + "'";
  res.json({ reply });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(3000, () => {
  console.log("Server running");
});
