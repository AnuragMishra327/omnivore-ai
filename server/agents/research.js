async function researchAgent(groq, prompt, plan) {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    max_completion_tokens: 300,
    messages: [
      {
        role: "system",
        content:
          "You are the Research Agent of Omnivore. Analyze the user's request and the planner's task plan. Identify the information, technologies, requirements, and considerations needed to complete the task. Do not invent facts."
      },
      {
        role: "user",
        content: `User Request:
${prompt}

Planner's Task Plan:
${plan}`
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = researchAgent;