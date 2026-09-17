async function architectureAgent(groq, prompt, plan, research) {

  const response = await groq.chat.completions.create({

    model: "openai/gpt-oss-20b",

    max_completion_tokens: 300,

    messages: [

      {
        role: "system",
        content:
          "You are the Architecture Agent of Omnivore. Your responsibility is to design the technical structure needed to complete the user's task using the planner's plan and research findings. Define the main components, technologies, system layers, data flow, and how the components interact. Build the architecture specifically for the user's request, not a generic application architecture. Do not write implementation code. Do not repeat the planner or research outputs. Do not perform detailed security analysis, scheduling, testing, documentation, or presentation work. Do not invent unavailable services, APIs, technologies, or requirements. If the request is a simple greeting or casual message, state that no technical architecture is required and keep the response brief. Return only the technical architecture."
      },

      {
        role: "user",
        content: `User Request:

${prompt}

Planner Output:

${plan}

Research Output:

${research}`
      }

    ]

  });

  return response.choices[0].message.content;

}

module.exports = architectureAgent;