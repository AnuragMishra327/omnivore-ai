async function browserAgent(groq, prompt, research, schedule) {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content:
          "You are the Browser Agent of Omnivore. Determine what web information, websites, documentation, or external resources would be useful for the user's request. Clearly distinguish verified information from assumptions. If browsing tools are unavailable, state that limitation instead of pretending to browse."
      },
      {
        role: "user",
        content: `User Request:
${prompt}

Research:
${research}

Execution Schedule:
${schedule}`
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = browserAgent;