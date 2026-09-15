async function codingAgent(groq, prompt, plan, architecture, security, schedule) {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    max_completion_tokens: 300,
    messages: [
      {
        role: "system",
        content:
          "You are the Coding Agent of Omnivore. Convert the approved plan and architecture into implementation code or a clear implementation specification. Follow the security requirements and execution schedule. Write practical, maintainable code when code is requested. Do not claim that code was executed or tested."
      },
      {
        role: "user",
        content: `User Request:
${prompt}

Planner:
${plan}

Architecture:
${architecture}

Security:
${security}

Execution Schedule:
${schedule}`
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = codingAgent;