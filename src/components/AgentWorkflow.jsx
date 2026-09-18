import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarClock,
  CheckCircle2,
  Code2,
  Database,
  FileText,
  Globe2,
  Layers3,
  LockKeyhole,
  MemoryStick,
  Network,
  Presentation,
  Search,
  Workflow
} from "lucide-react";

import {
  playCompletionSound,
  speakAgentsActivated,
  speakComplete
} from "../utils/soundEffects";

const agents = [
  {
    name: "Planner",
    icon: Workflow
  },
  {
    name: "Research",
    icon: Search
  },
  {
    name: "Architecture",
    icon: Network
  },
  {
    name: "Security",
    icon: LockKeyhole
  },
  {
    name: "Scheduler",
    icon: CalendarClock
  },
  {
    name: "Browser",
    icon: Globe2
  },
  {
    name: "Coding",
    icon: Code2
  },
  {
    name: "File",
    icon: FileText
  },
  {
    name: "Testing",
    icon: CheckCircle2
  },
  {
    name: "Documentation",
    icon: FileText
  },
  {
    name: "Memory",
    icon: MemoryStick
  },
  {
    name: "Presentation",
    icon: Presentation
  }
];

function AgentWorkflow({ prompt, loading, soundEnabled }) {
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

    if (loading) {
      setActiveAgent(0);

      if (soundEnabled) {
        speakAgentsActivated();
      }

      const agentTimer = setInterval(() => {
        setActiveAgent((current) => {
          if (current >= agents.length - 1) {
            clearInterval(agentTimer);
            return current;
          }

          return current + 1;
        });
      }, 700);

      return () => clearInterval(agentTimer);
    }

    setActiveAgent(agents.length);
  }, [countdown, loading, soundEnabled]);

  useEffect(() => {
    if (activeAgent >= 0 && activeAgent < agents.length) {
      const element = document.getElementById(
        `workflow-agent-${activeAgent}`
      );

      element?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [activeAgent]);

  useEffect(() => {
    if (
      !loading &&
      countdown === 0 &&
      soundEnabled
    ) {
      playCompletionSound();
      speakComplete();
    }
  }, [loading, countdown, soundEnabled]);

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
              : loading
              ? "BUILDING YOUR REQUEST"
              : "WORKFLOW COMPLETE"}
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
        >
          {countdown}
        </motion.div>
      )}

      {countdown === 0 && (
        <div className="workflow-agents">

          {agents.map((agent, index) => {

            const Icon = agent.icon;

            const isActive =
              loading && index === activeAgent;

            const isComplete =
              !loading || index < activeAgent;

            return (
              <motion.div
                id={`workflow-agent-${index}`}
                className={`workflow-agent ${
                  isActive ? "active" : ""
                } ${
                  isComplete ? "complete" : ""
                }`}
                key={agent.name}
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
                  <Icon size={18} strokeWidth={1.8} />
                </div>

                <div className="workflow-agent-name">
                  {agent.name}
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

          {loading && activeAgent < agents.length
            ? `${agents[activeAgent].name.toUpperCase()} IS ACTIVATED`
            : "OMNIVORE WORKFLOW COMPLETE"}
        </motion.div>
      )}

      {!loading && countdown === 0 && (
        <motion.div
          className="workflow-success"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span>✓</span>

          <div>
            <strong>
              Workflow completed successfully
            </strong>

            <small>
              Your generated application is ready below.
            </small>
          </div>

        </motion.div>
      )}

    </section>
  );
}

export default AgentWorkflow;