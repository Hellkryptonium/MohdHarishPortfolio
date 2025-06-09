'use client';

import React, { useState } from 'react';
import { useKonamiCode } from '@/hooks/useKonamiCode';

const Footer = () => {
  const [easterEggMessage, setEasterEggMessage] = useState('');
  
  // Use the Konami code hook to trigger the Easter egg
  useKonamiCode(() => {
    setEasterEggMessage('Thank you for visiting my portfolio! 🎮');
    setTimeout(() => {
      setEasterEggMessage('');
    }, 5000); // Hide the message after 5 seconds
  });
  return (
    <footer className="bg-background/50 text-textSecondary p-4">
      <div className="container mx-auto flex flex-wrap items-center">
        <div className="w-full md:w-1/3">
          <p className="text-xs opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
            {easterEggMessage || (
              <span className="font-mono">
                ↑↑↓↓←→←→ba <span className="font-normal italic">(click this for an easter egg)</span>
              </span>
            )}
          </p>
        </div>
        <div className="w-full md:w-1/3 text-center my-2 md:my-0">
          <p>&copy; {new Date().getFullYear()} Mohd Harish. All rights reserved.</p>
          <p>Made with <span className="text-red-500">&hearts;</span> using Next.js & Three.js</p>
        </div>
        <div className="w-full md:w-1/3">
          {/* Empty div for layout balance */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
