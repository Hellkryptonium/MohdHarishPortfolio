'use client'; // Required for React Three Fiber components

import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'; // drei is a helper library for R3F
import AboutSection from '@/components/sections/AboutSection'; // Updated import
import ProjectsSection from '@/components/sections/ProjectsSection'; // Import ProjectsSection
import SkillsSection from '@/components/sections/SkillsSection'; // Import SkillsSection
import Main3DScene from '@/components/3d/Main3DScene'; // Import Main3DScene
import ContactSection from '@/components/sections/ContactSection'; // Import ContactSection
import AchievementsSection from '@/components/sections/AchievementsSection'; // Import AchievementsSection
import BackgroundMusic from '../components/layout/BackgroundMusic';
import CosmicBackground from "@/components/3d/CosmicBackground";
import { useCosmicTheme } from "@/context/CosmicThemeContext";
import { AnimatePresence, motion } from 'framer-motion';
import { useKonamiCode } from "@/hooks/useKonamiCode";

// Section animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  exit: { opacity: 0, y: -40, transition: { duration: 0.5, ease: 'easeIn' } },
};

const HomePage = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { theme } = useCosmicTheme();
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useKonamiCode(() => {
    setShowEasterEgg(true);
    setTimeout(() => setShowEasterEgg(false), 5000); // Hide after 5s
  });

  return (
    <main className="flex min-h-screen flex-col items-center bg-background text-foreground">
      {showEasterEgg && (
        <div className="fixed z-[9999] top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
          <div className="bg-gradient-to-br from-purple-800/80 to-pink-600/80 rounded-3xl shadow-2xl p-8 animate-pulse border-4 border-yellow-400/60">
            <span className="text-4xl md:text-6xl font-bold text-yellow-300 drop-shadow-lg select-none">
              ✨ Cosmic Secret Unlocked! ✨
            </span>
            <div className="mt-4 text-lg text-white/90 text-center">You found the Konami Code Easter Egg!</div>
          </div>
        </div>
      )}
      <BackgroundMusic />
      {/* Place audio element outside Canvas */}
      <audio ref={audioRef} src="/assets/sounds/hover.mp3" preload="auto" style={{ display: 'none' }} />
      <div className="relative w-full h-screen">
        <Canvas camera={{ position: [0, 1, 7], fov: 60 }}> {/* Adjusted camera for better view */}
          {/* Cosmic animated background with theme colors */}
          <CosmicBackground colorA={theme.colorA} colorB={theme.colorB} colorC={theme.colorC} />
          <Main3DScene audioRef={audioRef} /> {/* Replace the cube with Main3DScene */}
          <OrbitControls 
            enableZoom={false} // Optional: disable zoom for a cleaner look
            enablePan={false}  // Optional: disable panning
            minPolarAngle={Math.PI / 2.5} // Lock vertical rotation to keep focus
            maxPolarAngle={Math.PI / 2.5}
          />
        </Canvas>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key="about"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
        >
          <AboutSection />
        </motion.div>
        <motion.div
          key="projects"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ProjectsSection />
        </motion.div>
        <motion.div
          key="skills"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SkillsSection />
        </motion.div>
        <motion.div
          key="achievements"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
        >
          <AchievementsSection />
        </motion.div>
        <motion.div
          key="contact"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ContactSection />
        </motion.div>
      </AnimatePresence>
      {/* Other sections will go here */}
    </main>
  );
};

export default HomePage;
