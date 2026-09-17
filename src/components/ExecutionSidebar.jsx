import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Database, Cpu, Wrench } from "lucide-react";

const agentDetails = [
  {
    name: "Planner",
    task: "Breaks the user's request into practical tasks."
  },
  {
    name: "Research",
    task: "Identifies relevant technologies, concepts and requirements."
  },
  {
    name: "Architecture",
    task: "Designs the technical structure and component interaction."
  },
  {
    name: "Security",
    task: "Identifies relevant security risks and protections."
  },
  {
    name: "Scheduler",
    task: "Determines task order, dependencies and execution sequence."
  },
  {
    name: "Browser",
    task: "Identifies useful external resources and web information."
  },
  {
    name: "Coding",
    task: "Generates the working application from the request."
  },
  {
    name: "File",
    task: "Determines the required files and project structure."
  },
  {
    name: "Testing",
    task: "Defines functional tests, edge cases and validation checks."
  },
  {
    name: "Documentation",
    task: "Prepares concise technical documentation."
  },
  {
    name: "Memory",
    task: "Organizes important project context and decisions."
  },
  {
    name: "Presentation",
    task: "Creates a presentation-ready project summary."
  }
];

function ExecutionSidebar({
  open,
  onClose,
  prompt,
  projectInfo,
  ragResults,
  mcpAgents
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="execution-sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 260
            }}
          >

            <div className="sidebar-header">
              <div>
                <span className="sidebar-label">
                  OMNIVORE
                </span>

                <h2>
                  Execution Details
                </h2>
              </div>

              <button
                className="sidebar-close"
                onClick={onClose}
                aria-label="Close execution details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="sidebar-content">

              <section className="sidebar-section">

                <div className="sidebar-section-title">
                  REQUEST
                </div>

                <div className="sidebar-request">
                  "{prompt}"
                </div>

              </section>

              <section className="sidebar-section">

                <div className="sidebar-section-title">
                  AGENT PIPELINE
                </div>

                <div className="sidebar-agents">

                  {agentDetails.map((agent, index) => (
                    <motion.div
                      className="sidebar-agent"
                      key={agent.name}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.04
                      }}
                    >

                      <div className="sidebar-agent-number">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="sidebar-agent-info">

                        <div className="sidebar-agent-title">
                          <span>
                            {agent.name}
                          </span>

                          <CheckCircle2
                            size={15}
                          />
                        </div>

                        <p>
                          {agent.task}
                        </p>

                      </div>

                    </motion.div>
                  ))}

                </div>

              </section>

              <section className="sidebar-section">

                <div className="sidebar-section-title">
                  SYSTEM INFORMATION
                </div>

                <div className="system-info">

                  <div className="system-info-card">

                    <Cpu size={18} />

                    <div>
                      <span>LLM</span>
                      <strong>
                        {projectInfo?.model || "Groq"}
                      </strong>
                    </div>

                  </div>

                  <div className="system-info-card">

                    <Wrench size={18} />

                    <div>
                      <span>AGENTS</span>
                      <strong>
                        {projectInfo?.agents || 12}
                      </strong>
                    </div>

                  </div>

                  <div className="system-info-card">

                    <Database size={18} />

                    <div>
                      <span>RAG CONTEXT</span>
                      <strong>
                        {ragResults?.length
                          ? `${ragResults.length} CHUNKS`
                          : "AVAILABLE"}
                      </strong>
                    </div>

                  </div>

                </div>

              </section>

              <section className="sidebar-section">

                <div className="sidebar-section-title">
                  MCP TOOLS
                </div>

                <div className="mcp-status">

                  <div className="mcp-status-dot"></div>

                  <div>
                    <strong>
                      MCP ACTIVE
                    </strong>

                    <span>
                      {mcpAgents?.length || 12} agent tools available
                    </span>
                  </div>

                </div>

              </section>

              <div className="sidebar-footer">

                <span className="sidebar-footer-dot"></span>

                WORKFLOW COMPLETED

              </div>

            </div>

          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default ExecutionSidebar;