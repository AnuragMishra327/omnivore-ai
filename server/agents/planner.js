async function plannerAgent(groq, prompt) {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    max_completion_tokens: 300,
    messages: [
      {
        role: "system",
        content:
          "You are the Planner Agent of Omnivore. Break the user's request into clear, practical tasks. Return only the task plan."
      },
      {
        role: "user",
        content: prompt
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = plannerAgent;