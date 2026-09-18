# Omnivore — Autonomous AI Agent System

> A multi-agent AI orchestration system that processes user requests through 12 specialized AI agents.

**Live Demo:** https://omnivore-app.onrender.com

## **About**

**Omnivore** is a B.Tech CSE mini project that demonstrates how multiple specialized AI agents can work together to process a complex task.

The system divides a request into different stages such as planning, research, architecture, security, coding, testing, documentation, and presentation.

## **12 AI Agents**

* Planner
* Research
* Architecture
* Security
* Scheduler
* Coding
* Browser
* File
* Testing
* Documentation
* Memory
* Presentation

## **Technology Stack**

* **Frontend:** React, Vite, JavaScript, Framer Motion
* **Backend:** Node.js, Express.js
* **AI:** Groq API, GPT-OSS 20B
* **AI Concepts:** Multi-Agent System, Basic RAG, MCP-style Tools
* **Deployment:** Render

## **Workflow**

```text
User Request
     ↓
Planner → Research → Architecture
     ↓
Security → Scheduler
     ↓
Coding + Browser
     ↓
File + Testing
     ↓
Documentation → Memory → Presentation
     ↓
Final Result
```

## **Project Structure**

```text
omnivore-ai/
├── src/
├── public/
├── server/
│   ├── agents/
│   ├── knowledge/
│   ├── mcp/
│   ├── rag.js
│   └── server.js
├── package.json
└── README.md
```

## **Purpose**

Omnivore was developed as a college mini project to demonstrate practical concepts in **Artificial Intelligence, Multi-Agent Systems, Web Development, API Integration, RAG, and AI-powered workflows**.

## **Developer**

**Anurag Mishra**
B.Tech CSE 3rd year — PSIT Kanpur

**GitHub:** https://github.com/AnuragMishra327/omnivore-ai

---

> **One request. Multiple specialized agents. One coordinated workflow.**
