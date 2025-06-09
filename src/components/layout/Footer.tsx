import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background/50 text-textSecondary p-4 text-center">
      <p>&copy; {new Date().getFullYear()} Mohd Harish. All rights reserved.</p>
      <p>Made with <span className="text-red-500">&hearts;</span> using Next.js & Three.js</p>
    </footer>
  );
};

export default Footer;
