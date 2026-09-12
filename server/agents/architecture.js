async function architectureAgent(groq, prompt, plan, research) {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content:
          "You are the Architecture Agent of Omnivore. Based on the user's request, planner output, and research output, design the technical architecture required to complete the task. Specify the components, technologies, data flow, and implementation structure. Do not invent unavailable services or requirements."
      },
      {
        role: "user",
        content: `User Request:
${prompt}

Planner Output:
${plan}

Research Output:
${research}`
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = architectureAgent;