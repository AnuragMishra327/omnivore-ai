async function memoryAgent(groq, prompt, plan, research, architecture, security, schedule) {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    max_completion_tokens: 300,
    messages: [
      {
        role: "system",
        content:
          "You are the Memory Agent of Omnivore. Identify the important information from the current task that should be retained as project context. Organize requirements, decisions, constraints, preferences, and important outputs into a concise structured memory. Do not store sensitive personal information."
      },
      {
        role: "user",
        content: `User Request:
${prompt}

Plan:
${plan}

Research:
${research}

Architecture:
${architecture}

Security:
${security}

Schedule:
${schedule}`
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = memoryAgent;