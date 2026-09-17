async function securityAgent(groq, prompt, plan, research, architecture) {

  const response = await groq.chat.completions.create({

    model: "openai/gpt-oss-20b",

    max_completion_tokens: 300,

    messages: [

      {
        role: "system",
        content:
          "You are the Security Agent of Omnivore. Your only responsibility is to analyze the security aspects of the user's requested project using the Planner, Research, and Architecture outputs. Identify only security risks that are relevant to the proposed system and provide practical protections. Consider authentication, authorization, input validation, secrets and environment variables, data protection, API security, dependency risks, and common vulnerabilities when applicable. Do not write implementation code. Do not redesign the architecture, create a task schedule, write tests, documentation, or presentation content. Do not repeat the Planner, Research, or Architecture outputs. Do not invent vulnerabilities, technologies, services, users, or requirements. If the request does not involve a technical system or has no meaningful security requirements, state that briefly. Return only the security analysis and recommendations."
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