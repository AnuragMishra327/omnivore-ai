const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

const plannerAgent = require("./agents/planner");
const researchAgent = require("./agents/research");
const architectureAgent = require("./agents/architecture");
const securityAgent = require("./agents/security");
const schedulerAgent = require("./agents/scheduler");
const codingAgent = require("./agents/coding");
const browserAgent = require("./agents/browser");
const fileAgent = require("./agents/file");
const testingAgent = require("./agents/testing");
const documentationAgent = require("./agents/documentation");
const memoryAgent = require("./agents/memory");
const presentationAgent = require("./agents/presentation");

const retrieve = require("./rag");
const runTool = require("./mcp/mcp");

dotenv.config({ path: __dirname + "/.env" });

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

    const ragResults = retrieve(prompt);

    const context = ragResults
      .map(result => result.content)
      .join("\n\n");

    const mcpAgents = runTool("listAgents");
    const projectInfo = runTool("getProjectInfo");

    const plan = await plannerAgent(
      groq,
      prompt,
      context
    );

    const research = await researchAgent(
      groq,
      prompt,
      plan
    );

    const architecture = await architectureAgent(
      groq,
      prompt,
      plan,
      research
    );

    const security = await securityAgent(
      groq,
      prompt,
      plan,
      research,
      architecture
    );

    const schedule = await schedulerAgent(
      groq,
      prompt,
      plan,
      research,
      architecture,
      security
    );

    const browser = await browserAgent(
      groq,
      prompt,
      research,
      schedule
    );

    const coding = await codingAgent(
      groq,
      prompt,
      plan,
      architecture,
      security,
      schedule
    );

    const [
      files,
      testing
    ] = await Promise.all([

      fileAgent(
        groq,
        prompt,
        architecture,
        coding,
        schedule
      ),

      testingAgent(
        groq,
        prompt,
        architecture,
        coding,
        security
      )

    ]);

    const documentation = await documentationAgent(
      groq,
      prompt,
      plan,
      architecture,
      coding,
      testing
    );

    const memory = await memoryAgent(
      groq,
      prompt,
      plan,
      research,
      architecture,
      security,
      schedule
    );

    const presentation = await presentationAgent(
      groq,
      prompt,
      plan,
      architecture,
      coding,
      testing,
      documentation
    );

    res.json({

      plan,
      research,
      architecture,
      security,
      schedule,
      browser,
      coding,
      files,
      testing,
      documentation,
      memory,
      presentation,

      ragResults,
      mcpAgents,
      projectInfo

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Omnivore backend running on port ${PORT}`);
});