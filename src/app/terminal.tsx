"use client";
import { marked } from "marked";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"; // Add router import for the home command

const GITHUB_USERNAME = "Hellkryptonium"; // Change to your GitHub username

function useLatestCommits(username: string, repo?: string) {
  const [commits, setCommits] = useState<any[]>([]);
  useEffect(() => {
    let url = repo
      ? `https://api.github.com/repos/${username}/${repo}/commits`
      : `https://api.github.com/users/${username}/events/public`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (repo) {
          setCommits(data.slice(0, 5));
        } else {
          // Filter for PushEvent (commits)
          const pushEvents = data.filter((e: any) => e.type === "PushEvent");
          const commitList = pushEvents.flatMap((e: any) =>
            e.payload.commits.map((c: any) => ({
              message: c.message,
              repo: e.repo.name,
              date: e.created_at,
            }))
          );
          setCommits(commitList.slice(0, 5));
        }
      });
  }, [username, repo]);
  return commits;
}

const HACKER_LINES = [
  "$ npm run build",
  "Compiling...",
  "✨ Built successfully!",
  "$ git push origin main",
  "Enumerating objects: 12, done.",
  "Counting objects: 100% (12/12), done.",
  "Delta compression using up to 8 threads.",
  "Compressing objects: 100% (8/8), done.",
  "Writing objects: 100% (12/12), 1.23 KiB | 1.23 MiB/s, done.",
  "To github.com:mohdharish/portfolio.git",
  "main -> main",
  "$ echo 'Hello, world!'",
  "Hello, world!",
  "$ whoami",
  "mohdharish",
];

const PROJECTS = [
  { name: "Portfolio 3D", url: "https://mohdharish.xyz" },
  { name: "GeoLocApp", url: "https://github.com/Hellkryptonium/GeoLocApp" },
  { name: "PulsePay", url: "https://github.com/Hellkryptonium/PulsePay" },
];
const SKILLS = ["React", "Next.js", "Three.js", "TypeScript", "Supabase", "TailwindCSS", "Node.js"];
const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "Why do JavaScript developers wear glasses? Because they don't C#.",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'"
];
const CONTACT = "Email: harishjs1006@gmail.com | Twitter: @Hellkryptonium";

export default function TerminalPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<(string | JSX.Element)[]>(["Welcome to the Mohd Harish Terminal! Type 'help' to get started."]);
  const [hackerIdx, setHackerIdx] = useState(0);
  const [showHacker, setShowHacker] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const commits = useLatestCommits(GITHUB_USERNAME);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter(); // Add router for navigation

  useEffect(() => {
    if (showHacker && hackerIdx < HACKER_LINES.length) {
      const timer = setTimeout(() => {
        setOutput((o) => [...o, HACKER_LINES[hackerIdx]]);
        setHackerIdx((i) => i + 1);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [showHacker, hackerIdx]);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [output]);

  // Autocomplete logic
  const COMMANDS = ["help", "commits", "hacker", "clear", "readme", "projects", "skills", "contact", "joke", "home"];
  const COMMAND_HELP = {
    "help": "Display available commands. Use 'help <command>' for more information about a specific command.",
    "commits": "Display recent GitHub commits from your public activity.",
    "hacker": "Show a cool hacker-style animation.",
    "clear": "Clear the terminal screen.",
    "readme": "Display your GitHub profile README.md file.",
    "projects": "List your main projects with links.",
    "skills": "Display your technical skills.",
    "contact": "Show your contact information.",
    "joke": "Display a random programming joke.",
    "home": "Navigate back to the main portfolio page."
  };

  function handleAutocomplete(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find(cmd => cmd.startsWith(input));
      if (match) setInput(match);
    }
    // Command history navigation
    if (e.key === "ArrowUp") {
      if (history.length > 0) {
        const idx = historyIdx === null ? history.length - 1 : Math.max(0, historyIdx - 1);
        setInput(history[idx]);
        setHistoryIdx(idx);
      }
    }
    if (e.key === "ArrowDown") {
      if (history.length > 0 && historyIdx !== null) {
        const idx = Math.min(history.length - 1, historyIdx + 1);
        setInput(history[idx]);
        setHistoryIdx(idx);
      }
    }
  }
  // Simpler typing effect for terminal output
  function typeOutput(text: string | JSX.Element, cb?: () => void) {
    if (typeof text !== "string") {
      setOutput(prev => [...prev, text]);
      if (cb) setTimeout(cb, 50);
      return;
    }
    
    setIsTyping(true);
    
    // Add the complete text immediately (no animation)
    setOutput(prev => [...prev, text]);
    
    // Set a timeout to clear the typing state
    setTimeout(() => {
      setIsTyping(false);
      if (cb) cb();
    }, 50);
  }
  function handleCommand(cmd: string) {
    if (isTyping) return;
    const [command, ...args] = cmd.trim().split(" ");
    
    if (command === "help") {
      if (args.length > 0 && args[0] in COMMAND_HELP) {
        // Show help for specific command
        const cmdName = args[0];
        setOutput(o => [...o, `${cmdName}: ${COMMAND_HELP[cmdName as keyof typeof COMMAND_HELP]}`]);
      } else {
        setOutput(o => [
          ...o, 
          "Available commands: help, commits, hacker, clear, readme, projects, skills, contact, joke, home",
          "Type 'help <command>' for more information about a specific command."
        ]);
      }
    } else if (command === "commits") {
      if (commits.length === 0) {
        setOutput(o => [...o, "Fetching latest commits..."]);
      } else {
        setOutput(o => [
          ...o,
          ...commits.map((c) => `- [${c.repo}] ${c.message}`),
        ]);
      }
    } else if (command === "hacker") {
      setShowHacker(true);
      setHackerIdx(0);
    } else if (command === "clear") {
      setOutput([]);
    } else if (command === "readme") {
      setOutput(o => [...o, "Fetching README from GitHub..."]);
      fetch(`https://raw.githubusercontent.com/Hellkryptonium/Hellkryptonium/main/README.md`)
        .then((res) => res.ok ? res.text() : Promise.reject("Not found"))
        .then((text) => {
          // Add better styling for markdown content
          setOutput(o => [
            ...o, 
            <div key="readme-md" className="prose prose-invert max-w-none prose-headings:text-green-400 prose-a:text-green-300 prose-strong:text-green-200" 
                 dangerouslySetInnerHTML={{ __html: marked(text) }} />
          ]);
        })
        .catch(() => setOutput(o => [...o, "Could not fetch README."]));
    } else if (command === "projects") {
      // Direct output for multi-line content
      setOutput(o => [...o, PROJECTS.map((p) => `${p.name}: ${p.url}`).join("\n")]);
    } else if (command === "skills") {
      // Direct output for single-line content with multiple items
      setOutput(o => [...o, "Skills: " + SKILLS.join(", ")]);
    } else if (command === "contact") {
      setOutput(o => [...o, CONTACT]);
    } else if (command === "joke") {
      setOutput(o => [...o, JOKES[Math.floor(Math.random() * JOKES.length)]]);
    } else if (command === "home") {
      setOutput(o => [...o, "Navigating to home page..."]);
      setTimeout(() => {
        router.push('/');
      }, 500);
    } else if (command !== "") {
      // Find similar commands to suggest
      const similarCommands = COMMANDS.filter(c => 
        c.includes(command) || command.includes(c) || 
        c.charAt(0) === command.charAt(0)
      ).slice(0, 3);
      
      const suggestion = similarCommands.length > 0 
        ? `\nDid you mean: ${similarCommands.join(", ")}?`
        : "";
        
      setOutput(o => [...o, `Command not found: ${command}${suggestion}\nType 'help' to see available commands.`]);
    } else {
      // Handle empty command
      setOutput(o => [...o, "Type 'help' to see available commands."]);
    }
    setHistory(h => [...h, cmd]);
    setHistoryIdx(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOutput((o) => [...o, `$ ${input}`]);
    handleCommand(input.trim());
    setInput("");
  }

  return (
    <div className={`min-h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-center py-12${isFullscreen ? ' fixed inset-0 z-50 bg-black' : ''}`}>
      <div className={`w-full ${isFullscreen ? 'h-[95vh] max-w-full' : 'max-w-2xl'} bg-black border border-green-700 rounded-lg shadow-lg p-4 flex flex-col`} style={isFullscreen ? {height: '95vh'} : {}}>
        <div className="flex items-center justify-between mb-2 border-b border-green-700 pb-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-green-500">terminal@mohdharish.xyz</div>
            <button
              className="ml-2 px-2 py-1 text-xs border border-green-700 rounded bg-black hover:bg-green-900 transition-colors"
              onClick={() => setIsFullscreen(f => !f)}
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              type="button"
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
          </div>
        </div>
        <div
          ref={terminalRef}
          className={`flex-1 ${isFullscreen ? 'max-h-[70vh]' : 'max-h-80'} overflow-y-auto overflow-x-hidden bg-black p-2 rounded custom-scrollbar`}
          style={{ fontSize: 16 }}
        >
          {output.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap animate-fade-in">
              {line}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex mt-2 border-t border-green-700 pt-2">
          <span className="text-green-500">$</span>
          <input
            className="flex-1 bg-black text-green-400 border-none outline-none ml-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleAutocomplete}
            autoFocus
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </form>
      </div>
      {!isFullscreen && (
        <>
          <div className="mt-4 text-green-300 text-xs opacity-70">
            Try commands: <span className="font-bold">help</span>, <span className="font-bold">commits</span>, <span className="font-bold">hacker</span>, <span className="font-bold">readme</span>, <span className="font-bold">home</span>
          </div>
          <a href="/" className="mt-6 text-sm text-green-500 hover:text-green-300 transition-colors">
            ← Back to Portfolio
          </a>
        </>
      )}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #111;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #22c55e;
          border-radius: 4px;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
