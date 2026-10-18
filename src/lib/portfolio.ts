export type Project = {
  name: string;
  title: string;
  description: string;
  technologies: string[];
  live?: string;
  github?: string;
  demo?: string;
  image?: string;
  highlights: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: 'ThreatTrace',
    title: 'Cybersecurity Threat Detection & Forensic Intelligence Platform',
    description: 'Evidence-first platform for analyzing suspicious emails using phishing detection, malware scanning, threat intelligence, and event-driven processing.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'BERT', 'Google Cloud', 'Google Pub/Sub', 'ClamAV'],
    live: 'https://threattrace.me',
    image: '/assets/images/projects/ThreatTrace.png',
    highlights: ['Production deployment', 'BERT phishing detection', 'ClamAV scanning', 'Gmail and Outlook triggers', 'Event-driven cloud processing'],
    featured: true,
  },
  {
    name: 'Horizon AI Runtime',
    title: 'Distributed AI Compute Platform',
    description: 'A distributed inference platform that connects underutilized computing resources to run AI models through intelligent, resource-aware scheduling.',
    technologies: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'WebSockets', 'Ollama'],
    live: 'https://horizonruntimeai.tech/',
    github: 'https://github.com/Hellkryptonium/horizon-ai-runtime',
    demo: 'https://youtu.be/3YVfK_uPvJU?si=27Fy0rU4w7kx00s5',
    highlights: ['Worker registration', 'Resource-aware scheduling', 'Deployment management', 'Remote inference', 'Heterogeneous machine support'],
    featured: true,
  },
  {
    name: 'PulsePay',
    title: 'Closed-loop digital wallet',
    description: 'Closed-loop digital wallet supporting device-independent transfers and secure credential handling.',
    technologies: ['Flutter', 'Firebase', 'Google Cloud', 'Argon2', 'bcrypt'],
    github: 'https://github.com/Hellkryptonium/pulsepay',
    demo: 'https://drive.google.com/file/d/16cPX8Y9LH9wYKBG3lrrwPao5TB3fzVkI/view?usp=drive_link',
    highlights: ['Six-member team', 'Hackathon winner', 'Cloud architecture', 'Secure credential handling'],
  },
];

export const otherProjects: Project[] = [
  {
    name: 'CodeYourFuture',
    title: 'Open-source curriculum contribution',
    description: 'Merged open-source contribution improving curriculum documentation with Mermaid diagrams.',
    technologies: ['Open Source', 'Markdown', 'Mermaid'],
    github: 'https://github.com/CodeYourFuture/curriculum/pull/1444',
    highlights: ['Merged pull request', 'Improved technical documentation', 'Open-source collaboration'],
  },
];

export const experience = [
  {
    role: 'Senior Web Development Mentor',
    company: 'Galgotias Web Development Club',
    period: '2026 - Present',
    details: ['Mentor students in frontend, backend, REST APIs, databases, authentication, debugging, and deployment through hands-on technical sessions.', 'Guide students through designing, implementing, and deploying full-stack applications.'],
  },
  {
    role: 'Team Lead',
    company: 'Smart India Hackathon 2026',
    period: '2026',
    link: 'https://lnkd.in/p/dwdKtBcr',
    details: ['Led a six-member engineering team building ThreatTrace.', 'Coordinated architecture, implementation, integration, ML inference, testing, and deployment.', 'Ranked Top 16 in university-level SIH 2026 pre-qualifiers.'],
  },
  {
    role: 'Full Stack Developer',
    company: 'SkillYug',
    period: 'Aug 2025 - Oct 2025',
    details: ['Implemented secure email and OTP authentication using EmailJS.', 'Contributed to Next.js routing and backend integrations.'],
  },
  {
    role: 'Customer Service Executive Intern',
    company: 'Tech Mahindra',
    period: 'Aug 2025 - Sep 2025',
    details: [],
  },
];

export const skillGroups = {
  Languages: ['C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Dart', 'Rust', 'Solidity'],
  'Web & Backend': ['React', 'Next.js', 'Node.js', 'Express.js', 'REST APIs', 'Authentication'],
  Databases: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Firebase', 'Firestore'],
  'Cloud & Infrastructure': ['Google Cloud', 'AWS', 'Docker', 'Firebase Cloud Functions', 'Google Pub/Sub', 'Vercel', 'Render', 'Git', 'GitHub'],
  'AI / Security': ['Machine Learning', 'BERT', 'Phishing Detection', 'ClamAV', 'Cybersecurity', 'Cryptography'],
  'Core CS': ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'Distributed Systems'],
};

export const achievements = [
  '593+ LeetCode problems solved',
  'LeetCode rating: 1,749',
  'Top 16 SIH 2026 university pre-qualifiers',
  'Winner, Bitcoin India Tour 2.0 Quiz Competition',
  'CodeYourFuture merged open-source contribution',
];

export const profiles = [
  {
    name: 'LeetCode',
    handle: 'hell_233',
    detail: '593+ solved · Contest rating 1,749',
    href: 'https://leetcode.com/u/hell_233/',
  },
  {
    name: 'SIH 2026',
    handle: 'ThreatTrace team lead',
    detail: 'Top 16 university pre-qualifiers',
    href: 'https://youtu.be/SmNgXueVuFM?si=3wU7Sm6mGRZxfrf3',
  },
];

export const education = {
  institution: 'Galgotias University',
  location: 'Greater Noida, India',
  degree: 'Bachelor of Technology in Computer Science & Engineering',
  period: '2024 - 2028',
  result: 'CGPA: 8.75/10',
};

export const certifications = [
  { name: 'GitHub Foundations', href: 'https://www.credly.com/badges/8dcafaa2-3583-4ca0-a069-ff8c4b36edc5/print' },
  { name: 'AWS Academy Cloud Architecting', href: 'https://drive.google.com/file/d/16cPX8Y9LH9wYKBG3lrrwPao5TB3fzVkI/view?usp=drive_link' },
];