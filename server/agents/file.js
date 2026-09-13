async function fileAgent(groq, prompt, coding, schedule) {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content:
          "You are the File Agent of Omnivore. Determine what files, folders, documents, configuration files, and project artifacts are required for the user's request. Provide a clear file structure and explain the purpose of each important file. Do not claim to have created or modified files unless an actual file tool has been used."
      },
      {
        role: "user",
        content: `User Request:
${prompt}

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