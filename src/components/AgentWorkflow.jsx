import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const agents = [
  "Planner",
  "Research",
  "Architecture",
  "Coding",
  "Testing",
  "Documentation",
  "Presentation",
  "Memory",
  "Browser",
  "File",
  "Security",
  "Scheduler"
];

function AgentWorkflow({ prompt, result, loading }) {
  const [countdown, setCountdown] = useState(3);
  const [activeAgent, setActiveAgent] = useState(-1);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown((current) => {
        if (current <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  useEffect(() => {
    if (countdown !== 0) {
      return;
    }

    setActiveAgent(0);

    const agentTimer = setInterval(() => {
      setActiveAgent((current) => {
        if (current >= agents.length - 1) {
          clearInterval(agentTimer);
          return current;
        }

        return current + 1;
      });
    }, 1100);

    return () => clearInterval(agentTimer);
  }, [countdown]);

  return (
    <section className="workflow-screen">

      <div className="workflow-header">

        <div>
          <div className="workflow-label">
            OMNIVORE EXECUTION
          </div>

          <h2>
            {countdown > 0
              ? "COMMAND SEQUENCE"
              : "BUILDING YOUR REQUEST"}
          </h2>
        </div>

        <div className="workflow-status">
          <span></span>
          {loading ? "PROCESSING" : "COMPLETE"}
        </div>

      </div>

      <motion.div
        className="workflow-request"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="workflow-request-label">
          USER REQUEST
        </div>

        <div className="workflow-request-text">
          "{prompt}"
        </div>
      </motion.div>

      {countdown > 0 && (
        <motion.div
          className="countdown"
          key={countdown}
          initial={{ opacity: 0, scale: 1.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          {countdown}
        </motion.div>
      )}

      {countdown === 0 && (
        <div className="workflow-agents">

          {agents.map((agent, index) => {

            const isActive = index === activeAgent;
            const isComplete = index < activeAgent;

            return (
              <motion.div
                className={`workflow-agent ${
                  isActive ? "active" : ""
                } ${
                  isComplete ? "complete" : ""
                }`}
                key={agent}
                initial={{ opacity: 0, x: -35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.4
                }}
              >

                <div className="agent-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="workflow-agent-dot">
                  {isComplete ? "✓" : ""}
                </div>

                <div className="workflow-agent-name">
                  {agent}
                </div>

                <div className="workflow-agent-status">

                  {isComplete
                    ? "COMPLETE"
                    : isActive
                    ? "ACTIVATED"
                    : "STANDBY"}

                </div>

              </motion.div>
            );
          })}

        </div>
      )}

      {countdown === 0 && activeAgent >= 0 && (
        <motion.div
          className="current-operation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="operation-pulse"></span>

          {activeAgent < agents.length
            ? `${agents[activeAgent].toUpperCase()} IS ACTIVATED`
            : "OMNIVORE WORKFLOW COMPLETE"}
        </motion.div>
      )}

      {result && !loading && (
        <motion.div
          className="workflow-result"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
        >

          <div className="result-header">
            <span className="result-check">✓</span>
            WORKFLOW COMPLETE
          </div>

          <div className="result-content">
            {result}
          </div>

        </motion.div>
      )}

    </section>
  );
}

export default AgentWorkflow;