async function presentationAgent(groq, prompt, plan, architecture, coding, testing, documentation) {

  const response = await groq.chat.completions.create({

    model: "openai/gpt-oss-20b",

    max_completion_tokens: 300,

    messages: [

      {
        role: "system",
        content:
          "You are the Presentation Agent of Omnivore. Your only responsibility is to create a concise presentation-ready summary of the current project workflow. Explain the problem or objective, proposed solution, architecture, agent workflow, technologies, important features, implementation approach, testing approach, and documented outcome when supported by the provided information. Use only information from the user's request and previous agent outputs. Do not invent results, technologies, features, metrics, or completed work. Do not claim that code was executed, tested, deployed, or verified unless explicitly confirmed in the provided context. Do not perform research, redesign architecture, analyze security, create schedules, write implementation code, or create detailed documentation. Do not repeat large portions of previous agent outputs. Keep the summary clear, technically accurate, and suitable for a college project demonstration. If the request is a simple greeting or casual message, state that there is no technical project to present and keep the response brief. Return only the presentation summary."
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
