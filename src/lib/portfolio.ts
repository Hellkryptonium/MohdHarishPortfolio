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
    name: 'Togetherly',
    title: 'University networking platform',
    description: 'University networking platform connecting students through skills, interests, projects, professional profiles, connections, and messaging.',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    github: 'https://github.com/Hellkryptonium/Togetherly',
    highlights: ['PostgreSQL and Redis', 'REST APIs', 'Authentication', 'Networking and messaging', 'Modular monorepo'],
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
    name: 'OpenWallet',
    title: 'Non-custodial Ethereum wallet',
    description: 'Non-custodial Ethereum wallet built with Java 17, JavaFX, and Web3j.',
    technologies: ['Java 17', 'JavaFX', 'Web3j', 'BIP-39', 'Sepolia'],
    github: 'https://github.com/Hellkryptonium/OpenWallet',
    highlights: ['Encrypted local key storage', 'ERC-20 and ERC-721 support', 'Transaction signing', 'QR receiving'],
  },
];

export const experience = [
  {
    role: 'Senior Web Development Mentor',
    company: 'Galgotias Web Development Club',
    period: '2026 - Present',
    details: ['Mentor 100+ students in frontend development, backend engineering, REST APIs, databases, authentication, debugging, and deployment.', 'Guide students through designing, implementing, and deploying full-stack applications.'],
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
    details: ['Implemented secure email and OTP authentication using Supabase Authentication and EmailJS.', 'Contributed to Next.js routing and backend integrations.'],
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
  'Cloud & Infrastructure': ['Google Cloud', 'AWS', 'Docker', 'Google Pub/Sub', 'Vercel', 'Render', 'Git', 'GitHub'],
  'AI / Security': ['Machine Learning', 'BERT', 'Phishing Detection', 'ClamAV', 'Cybersecurity', 'Cryptography', 'Secure Authentication'],
  'Core CS': ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'Distributed Systems'],
};

export const achievements = [
  '589 LeetCode problems solved',
  'LeetCode rating: 1662',
  'Codeforces rating: 867',
  'Top 16 SIH 2026 university pre-qualifiers',
  'CodeYourFuture merged open-source contribution',
];

export const profiles = [
  {
    name: 'LeetCode',
    handle: 'hell_233',
    detail: '589 solved · Contest rating 1,662',
    href: 'https://leetcode.com/u/hell_233/',
  },
  {
    name: 'Codeforces',
    handle: 'Harish999',
    detail: 'Rating 867 · 118 problems solved',
    href: 'https://codeforces.com/profile/Harish999',
  },
  {
    name: 'Codolio',
    handle: 'hellkenick',
    detail: '806 questions solved · 352 active days',
    href: 'https://codolio.com/profile/hellkenick',
  },
  {
    name: 'SIH 2026',
    handle: 'ThreatTrace team lead',
    detail: 'Top 16 university pre-qualifiers',
    href: 'https://lnkd.in/p/dwdKtBcr',
  },
];