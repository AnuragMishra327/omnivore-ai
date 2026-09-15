const {
  listAgents,
  getAgentRole,
  getProjectInfo
} = require("./tools");

function runTool(toolName, input = {}) {
  if (toolName === "listAgents") {
    return listAgents();
  }

  if (toolName === "getAgentRole") {
    return getAgentRole(input.agent);
  }

  if (toolName === "getProjectInfo") {
    return getProjectInfo();
  }

  return "Tool not found";
}

module.exports = runTool;