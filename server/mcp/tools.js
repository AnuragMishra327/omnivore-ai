const agents = {
  planner: "Creates a structured plan for the user's request.",
  research: "Provides relevant research and information for the task.",
  architecture: "Designs the technical architecture for the task.",
  security: "Identifies security risks and security requirements.",
  scheduler: "Determines task order and dependencies.",
  coding: "Produces implementation code or coding guidance.",
  browser: "Identifies useful web information and external resources.",
  file: "Determines required files, folders, and project structure.",
  testing: "Defines tests, edge cases, and validation steps.",
  documentation: "Creates technical documentation and setup instructions.",
  memory: "Organizes important project context and decisions.",
  presentation: "Creates a clear presentation-ready summary of the work."
};

function listAgents() {
  return Object.keys(agents);
}

function getAgentRole(agentName) {
  const role = agents[agentName.toLowerCase()];

  if (!role) {
    return "Agent not found";
  }

  return role;
}

function getProjectInfo() {
  return {
    name: "Omnivore",
    type: "College Mini Project",
    backend: "Node.js and Express",
    model: "Groq",
    agents: 12
  };
}

module.exports = {
  listAgents,
  getAgentRole,
  getProjectInfo
};