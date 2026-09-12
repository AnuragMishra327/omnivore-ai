const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");
const plannerAgent = require("./agents/planner");
const researchAgent = require("./agents/research");
const architectureAgent = require("./agents/architecture");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.get("/", (req, res) => {
  res.json({ message: "Omnivore backend is running" });
});

app.post("/api/run", async (req, res) => {
  try {
    const { prompt } = req.body;

    const plan = await plannerAgent(groq, prompt);

    const research = await researchAgent(groq, prompt, plan);

    const architecture = await architectureAgent(
      groq,
      prompt,
      plan,
      research
    );

    res.json({
      plan,
      research,
      architecture
    });

  } catch (error) {
    console.log("========== GROQ ERROR ==========");
    console.log(error);
    console.log("================================");

    res.status(500).json({
      error: error.message || "Unknown error"
    });
  }
});
app.listen(5000, () => {
  console.log("Omnivore backend running on http://localhost:5000");
});