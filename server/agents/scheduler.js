async function schedulerAgent(groq, prompt, plan, research, architecture, security) {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content:
          "You are the Scheduler Agent of Omnivore. Determine the execution order of tasks required to complete the user's request. Identify dependencies, tasks that can run independently, priorities, and the recommended sequence. Produce a clear execution schedule for the other Omnivore agents. Do not perform the tasks yourself."
      },
      {
        role: "user",
        content: `User Request:
${prompt}

Planner:
${plan}

Research:
${research}

Architecture:
${architecture}

Security:
${security}`
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = schedulerAgent;