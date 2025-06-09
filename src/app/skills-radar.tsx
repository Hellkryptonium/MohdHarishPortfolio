"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const SKILL_CATEGORIES = [
  {
    label: "Frontend",
    color: "#8C52FF",
    value: 90,
  },
  {
    label: "Backend",
    color: "#00F5D4",
    value: 75,
  },
  {
    label: "3D/Graphics",
    color: "#FF6B6B",
    value: 80,
  },
  {
    label: "DevOps",
    color: "#FFD166",
    value: 60,
  },
  {
    label: "UI/UX",
    color: "#43E97B",
    value: 70,
  },
];

function polarToXY(angle: number, value: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return [
    Math.cos(rad) * (value / 100) * radius,
    Math.sin(rad) * (value / 100) * radius,
  ];
}

export default function SkillsRadarPage() {
  const radius = 120;
  const points = SKILL_CATEGORIES.map((cat, i) => {
    const angle = (360 / SKILL_CATEGORIES.length) * i - 90;
    return polarToXY(angle, cat.value, radius);
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted py-16">
      <h1 className="text-4xl font-bold mb-8 text-primary">Skills Radar</h1>
      <div className="relative w-[320px] h-[320px] flex items-center justify-center">
        <svg width={320} height={320} viewBox="0 0 320 320">
          {/* Radar grid */}
          {[20, 40, 60, 80, 100].map((v) => (
            <circle
              key={v}
              cx={160}
              cy={160}
              r={(v / 100) * radius}
              fill="none"
              stroke="#4444"
              strokeDasharray="4 4"
            />
          ))}
          {/* Radar polygon */}
          <motion.polygon
            points={points.map(([x, y]) => `${160 + x},${160 + y}`).join(" ")}
            fill="#8C52FF33"
            stroke="#8C52FF"
            strokeWidth={3}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            style={{ transformOrigin: "160px 160px" }}
          />
          {/* Category points */}
          {points.map(([x, y], i) => (
            <g key={i}>
              <motion.circle
                cx={160 + x}
                cy={160 + y}
                r={10}
                fill={SKILL_CATEGORIES[i].color}
                initial={{ r: 0 }}
                animate={{ r: 10 }}
                transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
              />
              <text
                x={160 + x}
                y={160 + y - 16}
                textAnchor="middle"
                fontSize={14}
                fill="#fff"
                style={{ pointerEvents: "none" }}
              >
                {SKILL_CATEGORIES[i].label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        {SKILL_CATEGORIES.map((cat, i) => (
          <div key={i} className="flex items-center gap-2 bg-card/70 px-4 py-2 rounded shadow text-foreground">
            <span className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
            <span className="font-semibold">{cat.label}</span>
            <span className="text-xs text-muted-foreground">{cat.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
