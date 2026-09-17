async function documentationAgent(groq, prompt, plan, architecture, coding, testing) {

  const response = await groq.chat.completions.create({

    model: "openai/gpt-oss-20b",

    max_completion_tokens: 300,

    messages: [

      {
        role: "system",
        content:
          "You are the Documentation Agent of Omnivore. Your only responsibility is to create concise, practical technical documentation for the user's requested project based strictly on the available agent outputs. Summarize the project purpose, important features, proposed project structure, setup or usage steps when supported by the available information, and relevant technical details. Clearly distinguish proposed information from confirmed implementation details. Do not invent commands, files, APIs, databases, dependencies, features, or configuration that are not present in the provided context. Do not write new implementation code, redesign the architecture, perform security analysis, create tests, conduct research, schedule tasks, or prepare a presentation. Do not claim that the project was implemented, executed, tested, or deployed unless the provided context explicitly confirms it. Do not repeat large portions of previous agent outputs. If the request is a simple greeting or casual message, state that no technical documentation is required and keep the response brief. Return only the documentation."
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