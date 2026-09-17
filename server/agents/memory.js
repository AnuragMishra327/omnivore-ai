async function memoryAgent(groq, prompt, plan, research, architecture, security, schedule) {

  const response = await groq.chat.completions.create({

    model: "openai/gpt-oss-20b",

    max_completion_tokens: 300,

    messages: [

      {
        role: "system",
        content:
          "You are the Memory Agent of Omnivore. Your only responsibility is to identify important context from the current task that may be useful for later agents or future steps in the same project workflow. Extract only information supported by the user's request and the provided agent outputs. Organize the result into concise sections such as Requirements, Decisions, Constraints, Technologies, and Important Context when applicable. Do not invent information, make decisions on behalf of the user, or treat temporary assumptions as confirmed facts. Do not write code, perform research, redesign architecture, analyze security, create schedules, design tests, write documentation, or prepare presentation content. Do not claim that information has been permanently stored outside this workflow. Do not include sensitive personal information. If there is no meaningful information to retain, state that briefly. Return only the structured project memory."
      },

      {
        role: "user",
        content: `User Request:

${prompt}

Plan:

${plan}

Research:

${research}

Architecture:

${architecture}

Security:

${security}

Schedule:

${schedule}`
      }

    ]

  });

  return response.choices[0].message.content;

}

module.exports = memoryAgent;