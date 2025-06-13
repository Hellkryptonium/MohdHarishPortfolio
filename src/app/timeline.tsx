"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const timeline = [
  {
    year: "2024",
    title: "Started B.Tech in Computer Science",
    description: "Began my journey in Computer Science at Galgotias University.",
    type: "education",
  },
  {
    year: "2024",
    title: "AICTE Aws and Aandroid App Development Internship",
    description: "Learned how to build Android apps and integrate AWS services.",
    type: "work",
  },
  {
    year: "2025",
    title: "Open Source Contributor",
    description: "Did my first open source contribution to a project on GitHub.",
    type: "milestone",
  },
  {
    year: "2025",
    title: "PulsePay",
    description: "Made a new payments transaction app that revolutionizes the process.",
    type: "work",
  },
  {
    year: "2025",
    title: "Launched 3D Portfolio",
    description: "Built and launched this interactive 3D portfolio website!",
    type: "milestone",
  },
];

const typeColor = {
  education: "bg-blue-500",
  work: "bg-green-500",
  milestone: "bg-purple-500",
  award: "bg-yellow-500",
};

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col items-center py-16">
      <h1 className="text-4xl font-bold mb-8 text-primary">My Journey</h1>
      <div className="relative w-full max-w-2xl px-4">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 to-accent/40 -translate-x-1/2 z-0" />
        <ul className="relative z-10">
          {timeline.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="mb-12 flex items-center w-full"
            >
              <div className="w-1/2 text-right pr-8 hidden md:block">
                <div className="text-lg font-semibold text-accent">{item.year}</div>
              </div>
              <div className="relative flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full border-4 border-white shadow-lg ${typeColor[item.type]} flex items-center justify-center animate-pulse`}></div>
                {i < timeline.length - 1 && (
                  <div className="w-1 h-24 bg-gradient-to-b from-primary/60 to-accent/40" />
                )}
              </div>
              <div className="w-1/2 pl-8">
                <div className="bg-card/80 rounded-lg shadow-lg p-4 mb-2">
                  <div className="text-lg font-bold text-primary mb-1">{item.title}</div>
                  <div className="text-sm text-foreground/80 mb-1">{item.description}</div>
                  <span className="text-xs text-muted-foreground">{item.year}</span>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
