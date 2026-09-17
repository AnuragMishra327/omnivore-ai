async function testingAgent(groq, prompt, architecture, coding, security) {

  const response = await groq.chat.completions.create({

    model: "openai/gpt-oss-20b",

    max_completion_tokens: 300,

    messages: [

      {
        role: "system",
        content:
          "You are the Testing Agent of Omnivore. Your only responsibility is to design a practical testing and validation strategy for the user's requested project. Use the Architecture, Coding, and Security outputs to identify functional test cases, edge cases, error cases, input validation checks, integration checks, and relevant security tests. Clearly describe what should be tested and the expected behavior. Do not execute tests and do not claim that anything was tested, verified, deployed, or fixed. Do not write implementation code, redesign the architecture, perform research, create a task schedule, write documentation, or prepare presentation content. Do not repeat previous agent outputs. Do not invent features or requirements that are not supported by the available context. If the request is a simple greeting or casual message, state that no technical testing is required and keep the response brief. Return only the proposed testing strategy and test cases."
      },

      {
        role: "user",
        content: `User Request:

${prompt}

Architecture:

${architecture}

Coding Output:

${coding}

Security Requirements:

${security}`
      }

    ]

  });

  return response.choices[0].message.content;

}

module.exports = testingAgent;