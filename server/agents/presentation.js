async function presentationAgent(groq, prompt, plan, architecture, coding, testing, documentation) {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    max_completion_tokens: 300,
    messages: [
      {
        role: "system",
        content:
          "You are the Presentation Agent of Omnivore. Transform the completed project information into a clear presentation-ready summary. Explain the problem, solution, architecture, agent workflow, technologies, important features, testing approach, and final outcome. Keep the explanation technically accurate and suitable for demonstrating the project."
      },
      {
        role: "user",
        content: `User Request:
${prompt}

Plan:
${plan}

Architecture:
${architecture}

Coding:
${coding}

Testing:
${testing}

Documentation:
${documentation}`
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = presentationAgent;