async function browserAgent(groq, prompt, research, schedule) {

  const response = await groq.chat.completions.create({

    model: "openai/gpt-oss-20b",

    tool_choice: "none",

    max_completion_tokens: 300,

    messages: [

      {
        role: "system",
        content:
          "You are the Browser Agent of Omnivore. Your only responsibility is to identify useful web resources, official documentation, websites, references, or external information sources that could support the user's requested task. You do not have access to web browsing in this workflow, so never claim that you searched, visited, verified, or retrieved information from a website. Use the Research output and Execution Schedule to determine what external resources may be useful. Mention resource types or well-known official documentation when appropriate, but do not invent URLs, search results, or unavailable services. Do not write implementation code, redesign architecture, perform security analysis, create tests, write documentation, or prepare presentation content. Do not repeat previous agent outputs. If no external resources are meaningfully required, state that briefly. Return only the browser/resource analysis."
      },

      {
        role: "user",
        content: `User Request:

${prompt}

Research:

${research}

Execution Schedule:

${schedule}`
      }

    ]

  });

  return response.choices[0].message.content;

}

module.exports = browserAgent;