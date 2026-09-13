async function documentationAgent(groq, prompt, plan, architecture, coding, testing) {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content:
          "You are the Documentation Agent of Omnivore. Create clear technical documentation for the requested project. Include setup instructions, project structure, important features, usage instructions, and relevant technical explanations. Base the documentation on the provided outputs and do not invent implementation details."
      },
      {
        role: "user",
        content: `User Request:
${prompt}

Plan:
${plan}

Architecture:
${architecture}

Coding Output:
${coding}

Testing Strategy:
${testing}`
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = documentationAgent;