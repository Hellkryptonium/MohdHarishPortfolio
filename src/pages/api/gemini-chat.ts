import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyBxKtwxnowWRNtRvKifFjzmVwQWMD7Uygk";

const SYSTEM_PROMPT = `
You are a helpful AI assistant for Mohd Harish's portfolio website. Only answer questions about Mohd Harish, his skills, projects, achievements, or tell a programming joke if asked. If the question is not about Mohd Harish or programming, politely refuse to answer.

About Mohd Harish:
- Creative Full-Stack Developer & 3D Enthusiast
- Skilled in Next.js, React, Three.js, React Three Fiber, Tailwind CSS, Zustand, GSAP, Framer Motion, and more
- Loves building interactive 3D web experiences and modern UIs
- Enjoys learning, open source, and sharing knowledge
- Portfolio: mohdharish.xyz
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ reply: "Please provide a valid message." });
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

    // Concatenate system prompt and user message for context
    const prompt = `${SYSTEM_PROMPT}\nUser: ${message}`;
    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ reply: "Sorry, the AI service is currently unavailable." });
  }
}
