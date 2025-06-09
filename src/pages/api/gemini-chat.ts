import type { NextApiRequest, NextApiResponse } from "next";

const PORTFOLIO_CONTEXT = `
About Mohd Harish:
Creative Full-Stack Developer | 3D Enthusiast.
Skilled in React, Next.js, Three.js, Tailwind CSS, Node.js, and more.
Projects include: Project Alpha (3D web app), Project Beta (social platform), Project Gamma (e-commerce with 3D previews).
Achievements: Innovator of the Year, Top Performer, Community Contribution Award, Hackathon Winner.
Skills: Frontend (React, Next.js, Three.js, Tailwind), Backend (Node.js, Python, REST, GraphQL), Tools (Git, Docker, Firebase), Other (UI/UX, Agile, Problem Solving).
`;

// Mock responses for common questions
const MOCK_RESPONSES: Record<string, string> = {
  skills: "Mohd Harish has strong skills in:\n\n- Frontend: React, Next.js, Three.js, TypeScript, Tailwind CSS, and animation libraries like Framer Motion and GSAP\n- Backend: Node.js, Python, REST APIs, GraphQL\n- Tools: Git, Docker, Firebase, Vercel deployment\n- Other: UI/UX principles, Agile methodologies, Problem solving",
  
  projects: "Mohd Harish has worked on several impressive projects:\n\n- Project Alpha: A cutting-edge web application with interactive 3D visualizations using Next.js and Three.js\n- Project Beta: A mobile-first social networking platform focused on real-time interactions\n- Project Gamma: An e-commerce site with custom 3D product previews",
  
  achievements: "Mohd Harish has earned several notable achievements:\n\n- Innovator of the Year: For developing groundbreaking solutions\n- Top Performer - Project Titan: Led a team to deliver ahead of schedule and under budget\n- Community Contribution Award: For significant open-source contributions\n- Hackathon Winner: First place in the Future Tech Challenge",
  
  joke: "Why don't programmers like nature? It has too many bugs and no debugging tool!",
  
  introduction: "Hi! I'm Mohd Harish's AI assistant. I can tell you about his skills, projects, achievements, or even tell you a joke. How can I help you today?",
  
  contact: "You can contact Mohd Harish through the contact form on this website, or connect with him on GitHub and LinkedIn using the links in the About section."
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body;
  
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ reply: "Please provide a valid message." });
  }
  
  // Filter out banned words/topics
  const bannedWords = ["politics", "religion", "violence", "hate", "sex"];
  if (bannedWords.some(word => message.toLowerCase().includes(word))) {
    return res.status(200).json({ 
      reply: "Sorry, I can only answer questions about Mohd Harish or tell a friendly joke!" 
    });
  }
  
  // Process the user's message to determine the most appropriate response
  const lowerMessage = message.toLowerCase();
  
  // Check for greetings
  if (/^(hi|hello|hey|greetings)/.test(lowerMessage)) {
    return res.status(200).json({ reply: MOCK_RESPONSES.introduction });
  }
  
  // Check for questions about skills
  if (lowerMessage.includes('skills') || lowerMessage.includes('can he do') || lowerMessage.includes('good at')) {
    return res.status(200).json({ reply: MOCK_RESPONSES.skills });
  }
  
  // Check for questions about projects
  if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('work')) {
    return res.status(200).json({ reply: MOCK_RESPONSES.projects });
  }
  
  // Check for questions about achievements
  if (lowerMessage.includes('achievement') || lowerMessage.includes('award') || lowerMessage.includes('recognition')) {
    return res.status(200).json({ reply: MOCK_RESPONSES.achievements });
  }
  
  // Check for joke requests
  if (lowerMessage.includes('joke') || lowerMessage.includes('funny')) {
    return res.status(200).json({ reply: MOCK_RESPONSES.joke });
  }
  
  // Check for contact information requests
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
    return res.status(200).json({ reply: MOCK_RESPONSES.contact });
  }
  
  // Default response for other queries
  return res.status(200).json({ 
    reply: "I can tell you about Mohd Harish's skills, projects, achievements, or tell you a joke. What would you like to know?" 
  });
}
