"use client";
import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! 👋 I'm Mohd Harish's AI assistant. Ask me about my skills, projects, or for a joke!" }
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((msgs) => [...msgs, { from: "user", text: userMsg }]);
    setInput("");
    const res = await fetch("/api/gemini-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg }),
    });
    const data = await res.json();
    setMessages((msgs) => [...msgs, { from: "bot", text: data.reply }]);
  };

  return (
    <>
      {/* Floating button */}
      <button
        aria-label="Open chat"
        className="fixed z-40 bottom-24 right-4 bg-primary text-white rounded-full shadow-lg p-3 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all"
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.03 10-9s-4.477-9-10-9S2 4.03 2 9c0 2.21 1.015 4.21 2.7 5.7L4 20l5.3-2.7A10.97 10.97 0 0 0 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {/* Chat window */}
      {open && (
        <div className="fixed z-50 bottom-4 right-4 w-80 max-w-[95vw] bg-background border border-border rounded-xl shadow-2xl flex flex-col">
          <div className="flex items-center justify-between p-3 border-b border-border bg-primary text-white rounded-t-xl">
            <span className="font-bold">AI Assistant</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-white hover:text-accent">&times;</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ maxHeight: 320 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`text-sm ${msg.from === "bot" ? "text-left" : "text-right"}`}>
                <span className={`inline-block px-3 py-2 rounded-lg ${msg.from === "bot" ? "bg-accent/20 text-foreground" : "bg-primary text-white"}`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <form
            className="flex border-t border-border"
            onSubmit={e => { e.preventDefault(); sendMessage(); }}
          >
            <input
              ref={inputRef}
              className="flex-1 p-2 rounded-bl-xl outline-none bg-background"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              aria-label="Type your message"
            />
            <button type="submit" className="p-2 text-primary hover:text-accent" aria-label="Send">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M22 2 11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="m22 2-7 20-4-9-9-4 20-7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
