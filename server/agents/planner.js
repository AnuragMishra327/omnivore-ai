async function plannerAgent(groq, prompt) {

  const response = await groq.chat.completions.create({

    model: "openai/gpt-oss-20b",

    max_completion_tokens: 300,

    messages: [

      {
        role: "system",
        content:
          "You are the Planner Agent of Omnivore. Your only responsibility is to analyze the user's request and create a practical task plan for the other agents. Do not answer the user's request directly. Do not write code. Do not create architecture, security analysis, testing, documentation, or presentation content. Break the request into clear numbered tasks and identify the main objective, required work, and important constraints. If the user gives a simple greeting or casual message, state that no technical task has been requested and keep the plan very short. Return only the task plan."
      },

      {
        role: "user",
        content: prompt
      }

    ]

  });

  return response.choices[0].message.content;

}

module.exports = plannerAgent;