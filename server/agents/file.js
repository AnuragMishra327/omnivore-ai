async function fileAgent(groq, prompt, architecture, coding, schedule) {

  const response = await groq.chat.completions.create({

    model: "openai/gpt-oss-20b",

    max_completion_tokens: 300,

    messages: [

      {
        role: "system",
        content:
          "You are the File Agent of Omnivore. Your only responsibility is to determine the files, folders, configuration files, documents, and other project artifacts required to implement the user's requested task. Use the Architecture, Coding, and Execution Schedule outputs to keep the proposed file structure consistent with the solution. Provide a clear project structure and briefly explain the purpose of important files. Do not create or modify actual files. Do not claim that files were created, edited, executed, or verified. Do not write implementation code, redesign architecture, perform security analysis, create tests, write documentation, or prepare presentation content. Do not repeat previous agent outputs. Do not invent unnecessary files, technologies, or project requirements. If the request is a simple greeting or casual message, state that no project files are required and keep the response brief. Return only the proposed file and project structure."
      },

      {
        role: "user",
        content: `User Request:

${prompt}

Architecture:

${architecture}

Coding Output:

${coding}

Execution Schedule:

${schedule}`
      }

    ]

  });

  return response.choices[0].message.content;

}

module.exports = fileAgent;