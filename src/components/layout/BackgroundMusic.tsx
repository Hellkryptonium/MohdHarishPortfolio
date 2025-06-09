"use client";
import React, { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import Tooltip from "../ui/tooltip";

// Place your music file at public/assets/sounds/background.mp3
const MUSIC_SRC = "/assets/sounds/background.mp3";

const AUTOHIDE_DELAY = 4000; // ms

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showControls, setShowControls] = useState(true);
  const howlRef = useRef<Howl | null>(null);
  const autohideTimer = useRef<NodeJS.Timeout | null>(null);
  const visualizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    howlRef.current = new Howl({
      src: [MUSIC_SRC],
      loop: true,
      volume,
      html5: true,
    });
    return () => {
      howlRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    if (howlRef.current) {
      howlRef.current.volume(volume);
    }
  }, [volume]);

  useEffect(() => {
    if (howlRef.current) {
      howlRef.current.mute(isMuted);
    }
  }, [isMuted]);

  // Auto-hide controls after inactivity
  useEffect(() => {
    if (!showControls) return;
    if (autohideTimer.current) clearTimeout(autohideTimer.current);
    autohideTimer.current = setTimeout(() => setShowControls(false), AUTOHIDE_DELAY);
    return () => {
      if (autohideTimer.current) clearTimeout(autohideTimer.current);
    };
  }, [showControls, isPlaying]);

  // Show controls on mouse move
  useEffect(() => {
    const handleMove = () => setShowControls(true);
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " ") {
      e.preventDefault();
      handlePlayPause();
    } else if (e.key.toLowerCase() === "m") {
      handleMute();
    }
  };

  // Simple animated visualizer (cosmic bars)
  useEffect(() => {
    let animId: number;
    const bars = visualizerRef.current?.children;
    if (!bars) return;
    const animate = () => {
      for (let i = 0; i < bars.length; i++) {
        const bar = bars[i] as HTMLElement;
        bar.style.height = isPlaying ? `${8 + Math.random() * 16}px` : "8px";
        bar.style.opacity = isPlaying ? `${0.7 + Math.random() * 0.3}` : "0.5";
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (!howlRef.current) return;
    if (isPlaying) {
      howlRef.current.pause();
      setIsPlaying(false);
    } else {
      howlRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMute = () => {
    setIsMuted((m) => !m);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-30 flex items-center gap-2 bg-background/80 backdrop-blur-md rounded-lg shadow-lg px-3 py-2 border border-border/30 transition-all duration-500",
        showControls ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-95 blur-sm",
        isPlaying ? "ring-2 ring-primary/40 shadow-[0_0_32px_8px_#7f5fff44] animate-pulse-slow" : "",
        "group/music-controls"
      )}
      tabIndex={0}
      role="region"
      aria-label="Background music controls"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setShowControls(true)}
      onFocus={() => setShowControls(true)}
      style={{ boxShadow: isPlaying ? "0 0 16px 4px #7f5fff55" : undefined }}
    >
      {/* Cosmic Visualizer */}
      <div
        ref={visualizerRef}
        aria-hidden="true"
        className="flex items-end gap-0.5 mr-2 h-6 w-6"
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1 rounded bg-gradient-to-b from-primary/80 to-accent/60 transition-all duration-200 shadow-[0_0_8px_2px_#7f5fff33]"
            style={{ height: "8px", opacity: 0.5 }}
          />
        ))}
      </div>
      {/* Play/Pause */}
      <Tooltip content={isPlaying ? "Pause" : "Play"}>
        <button
          onClick={handlePlayPause}
          className="p-2 rounded hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-primary/70 transition-colors"
          aria-label={isPlaying ? "Pause music" : "Play music"}
          tabIndex={0}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </Tooltip>
      {/* Mute */}
      <Tooltip content={isMuted ? "Unmute" : "Mute"}>
        <button
          onClick={handleMute}
          className="p-2 rounded hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-primary/70 transition-colors"
          aria-label={isMuted ? "Unmute music" : "Mute music"}
          tabIndex={0}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </Tooltip>
      {/* Volume */}
      <Tooltip content="Volume">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-24 accent-primary cursor-pointer"
          aria-label="Music volume"
          disabled={isMuted}
          tabIndex={0}
        />
      </Tooltip>
    </div>
  );
};

export default BackgroundMusic;
