import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import AgentWorkflow from "./components/AgentWorkflow";
import ExecutionSidebar from "./components/ExecutionSidebar";
import "./index.css";

const agents = {
  level1: ["Planner", "Research", "Architecture"],
  level2: ["Security", "Scheduler", "Coding", "Browser"],
  level3: ["File", "Testing", "Documentation", "Memory", "Presentation"]
};

function Agent({ name, delay }) {
  return (
    <motion.div
      className="agent-card"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <span className="agent-dot"></span>
      <span>{name}</span>
    </motion.div>
  );
}

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [workflowKey, setWorkflowKey] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  const [executionData, setExecutionData] = useState({
    projectInfo: null,
    ragResults: [],
    mcpAgents: []
  });

  const workflowRef = useRef(null);

  const cleanGeneratedCode = (code) => {
    if (!code) {
      return "";
    }

    let cleaned = code.trim();

    const match = cleaned.match(/```(?:html)?\s*([\s\S]*?)```/i);

    if (match) {
      cleaned = match[1].trim();
    }

    const start = cleaned.indexOf("<!DOCTYPE html>");

    if (start !== -1) {
      cleaned = cleaned.substring(start);
    }

    const end = cleaned.lastIndexOf("</html>");

    if (end !== -1) {
      cleaned = cleaned.substring(0, end + "</html>".length);
    }

    return cleaned.trim();
  };

  const runWorkflow = async () => {
    if (!prompt.trim()) {
      setResult("Please enter a request first.");
      return;
    }

    setLoading(true);
    setShowSidebar(false);
    setResult("");
    setGeneratedCode("");

    setWorkflowKey((prev) => prev + 1);
    setShowWorkflow(true);

    setTimeout(() => {
      workflowRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 150);

    try {
      const response = await fetch("http://localhost:5000/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: prompt.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setResult(data.error || "Something went wrong.");
        return;
      }

      const cleanCode = cleanGeneratedCode(data.coding);

      setGeneratedCode(cleanCode);

      setExecutionData({
        projectInfo: data.projectInfo || null,
        ragResults: data.ragResults || [],
        mcpAgents: data.mcpAgents || []
      });

      setResult(
        cleanCode
          ? "Workflow completed successfully."
          : "Workflow completed, but no application was generated."
      );

      setTimeout(() => {
        document.querySelector(".generated-preview")?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 500);

    } catch (error) {
      console.error("Omnivore workflow error:", error);

      setResult(
        "Unable to connect to Omnivore backend. Make sure the backend is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          <div className="logo-mark">O</div>
          <span>OMNIVORE</span>
        </div>

        <div className="nav-status">
          <span className="status-dot"></span>
          SYSTEM ONLINE
        </div>

      </nav>

      <main className="hero">

        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles size={14} />
          AUTONOMOUS AI AGENT SYSTEM
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          OMNIVORE
        </motion.h1>

        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          A Cognitive Operating System for Autonomous AI Agents
        </motion.p>

        <section className="agent-system">

          <div className="connection connection-main"></div>

          <div className="core-container">

            <motion.div
              className="omnivore-core"
              animate={{
                boxShadow: [
                  "0 0 25px rgba(100,145,255,0.18)",
                  "0 0 55px rgba(100,145,255,0.4)",
                  "0 0 25px rgba(100,145,255,0.18)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            >

              <div className="core-ring">
                <span>O</span>
              </div>

            </motion.div>

          </div>

          <div className="level level-one">
            {agents.level1.map((agent, index) => (
              <Agent
                key={agent}
                name={agent}
                delay={0.7 + index * 0.1}
              />
            ))}
          </div>

          <div className="level level-two">
            {agents.level2.map((agent, index) => (
              <Agent
                key={agent}
                name={agent}
                delay={1 + index * 0.1}
              />
            ))}
          </div>

          <div className="level level-three">
            {agents.level3.map((agent, index) => (
              <Agent
                key={agent}
                name={agent}
                delay={1.3 + index * 0.1}
              />
            ))}
          </div>

        </section>

        <motion.div
          className="request-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
        >

          <input
            className="input-area"
            type="text"
            placeholder="What do you want Omnivore to accomplish?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                runWorkflow();
              }
            }}
          />

          <button
            onClick={runWorkflow}
            disabled={loading}
          >
            {loading ? "PROCESSING..." : "RUN WORKFLOW"}
            <ArrowRight size={17} />
          </button>

        </motion.div>

        <motion.div
          className="tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          ONE REQUEST
          <span>•</span>
          MULTIPLE AGENTS
          <span>•</span>
          ONE COMPLETE OUTCOME
        </motion.div>

      </main>

      {showWorkflow && (
        <div ref={workflowRef}>

          <AgentWorkflow
            key={workflowKey}
            prompt={prompt}
            loading={loading}
          />

        </div>
      )}

      {generatedCode && (
        <section className="generated-preview">

          <div className="preview-header">

            <div>
              <span className="preview-label">
                GENERATED RESULT
              </span>

              <h2>
                Live Application Preview
              </h2>
            </div>

            <span className="preview-status">
              GENERATED BY CODING AGENT
            </span>

          </div>

          <div className="execution-details-action">

            <button
              className="execution-details-button"
              onClick={() => setShowSidebar(true)}
            >
              <span className="execution-button-dot"></span>
              VIEW EXECUTION DETAILS
              <ArrowRight size={16} />
            </button>

          </div>

          <div
            className="preview-frame"
            style={{
              width: "100%",
              height: "700px",
              overflow: "hidden",
              borderRadius: "14px",
              border: "1px solid rgba(120, 140, 180, 0.2)",
              background: "#ffffff"
            }}
          >

            <iframe
              title="Omnivore Generated Application"
              srcDoc={generatedCode}
              sandbox="allow-scripts allow-same-origin"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                display: "block"
              }}
            />

          </div>

        </section>
      )}

      <ExecutionSidebar
        open={showSidebar}
        onClose={() => setShowSidebar(false)}
        prompt={prompt}
        projectInfo={executionData.projectInfo}
        ragResults={executionData.ragResults}
        mcpAgents={executionData.mcpAgents}
      />

    </div>
  );
}

export default App;