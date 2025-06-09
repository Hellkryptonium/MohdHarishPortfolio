import React from "react";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

// Simple tooltip using a div and group-hover
const Tooltip: React.FC<TooltipProps> = ({ content, children }) => (
  <div className="relative group inline-block">
    {children}
    <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity bg-background text-foreground text-xs px-2 py-1 rounded shadow-lg border border-border/30 whitespace-nowrap">
      {content}
    </div>
  </div>
);

export default Tooltip;
