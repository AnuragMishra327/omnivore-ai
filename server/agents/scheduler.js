async function schedulerAgent(groq, prompt, plan, research, architecture, security) {

  const response = await groq.chat.completions.create({

    model: "openai/gpt-oss-20b",

    max_completion_tokens: 300,

    messages: [

      {
        role: "system",
        content:
          "You are the Scheduler Agent of Omnivore. Your only responsibility is to determine the execution order for completing the user's requested task. Use the Planner, Research, Architecture, and Security outputs to identify tasks, dependencies, priorities, parallel work, and the recommended sequence. Focus on coordinating the work of the other agents. Do not perform any task yourself. Do not write code, conduct research, redesign architecture, perform detailed security analysis, create test cases, write documentation, or prepare presentation content. Do not repeat the outputs from previous agents. Do not invent tasks, dependencies, technologies, or requirements that are not supported by the available context. If the request is a simple greeting or casual message, state that no technical schedule is required and keep the response brief. Return only the execution schedule."
      },

      {
        role: "user",
        content: `User Request:

${prompt}

Planner:

${plan}

Research:

${research}

Architecture:

${architecture}

Security:

${security}`
      }

    ]

  });

  return response.choices[0].message.content;

}

module.exports = schedulerAgent;