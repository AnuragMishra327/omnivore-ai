async function testingAgent(groq, prompt, architecture, coding, security) {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content:
          "You are the Testing Agent of Omnivore. Design a practical testing strategy for the requested project. Identify functional tests, edge cases, error cases, security checks, and important validation steps. Do not claim that tests were executed when they were only proposed."
      },
      {
        role: "user",
        content: `User Request:
${prompt}

Architecture:
${architecture}

Coding Output:
${coding}

Security Requirements:
${security}`
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = testingAgent;