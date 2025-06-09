"use client";
import { useEffect, useRef, useState } from "react";

const GITHUB_USERNAME = "mohdharish"; // Change to your GitHub username

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

export default function TerminalPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>(["Welcome to the Mohd Harish Terminal! Type 'help' to get started."]);
  const [hackerIdx, setHackerIdx] = useState(0);
  const [showHacker, setShowHacker] = useState(false);
  const commits = useLatestCommits(GITHUB_USERNAME);
  const terminalRef = useRef<HTMLDivElement>(null);

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

  function handleCommand(cmd: string) {
    if (cmd === "help") {
      setOutput((o) => [...o, "Available commands:", "help", "commits", "hacker", "clear"]);
    } else if (cmd === "commits") {
      if (commits.length === 0) {
        setOutput((o) => [...o, "Fetching latest commits..."]);
      } else {
        setOutput((o) => [
          ...o,
          ...commits.map((c) => `- [${c.repo}] ${c.message}`),
        ]);
      }
    } else if (cmd === "hacker") {
      setShowHacker(true);
      setHackerIdx(0);
    } else if (cmd === "clear") {
      setOutput([]);
    } else {
      setOutput((o) => [...o, `Unknown command: ${cmd}`]);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOutput((o) => [...o, `$ ${input}`]);
    handleCommand(input.trim());
    setInput("");
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-2xl bg-black border border-green-700 rounded-lg shadow-lg p-4">
        <div
          ref={terminalRef}
          className="h-80 overflow-y-auto bg-black p-2 rounded"
          style={{ fontSize: 16 }}
        >
          {output.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap animate-fade-in">
              {line}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex mt-2">
          <span className="text-green-500">$</span>
          <input
            className="flex-1 bg-black text-green-400 border-none outline-none ml-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </form>
      </div>
      <div className="mt-4 text-green-300 text-xs opacity-70">Try commands: <span className="font-bold">help</span>, <span className="font-bold">commits</span>, <span className="font-bold">hacker</span>, <span className="font-bold">clear</span></div>
    </div>
  );
}
