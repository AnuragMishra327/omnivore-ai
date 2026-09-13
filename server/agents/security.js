async function securityAgent(groq, prompt, plan, research, architecture) {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content:
          "You are the Security Agent of Omnivore. Analyze the user's requested project and the outputs from the Planner, Research, and Architecture agents. Identify relevant security risks and provide practical security recommendations. Focus on authentication, authorization, input validation, secrets, data protection, API security, dependencies, and common vulnerabilities. Do not invent vulnerabilities that are not relevant to the project."
      },
      {
        role: "user",
        content: `User Request:
${prompt}

Planner Output:
${plan}

Research Output:
${research}

Architecture Output:
${architecture}`
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = securityAgent;