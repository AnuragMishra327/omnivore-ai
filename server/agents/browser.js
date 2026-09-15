async function browserAgent(groq, prompt, research, schedule) {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    tool_choice: "none",
    max_completion_tokens: 300,
    messages: [
      {
        role: "system",
        content:
          "You are the Browser Agent of Omnivore. Determine what web information, websites, documentation, or external resources would be useful for the user's request. Do not browse the web and do not call any tools. Clearly distinguish verified information from assumptions."
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