'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Sparkles, Palette } from 'lucide-react'; // Added theme toggle, sparkles, and palette icon
import { useCosmicTheme } from '@/context/CosmicThemeContext';

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#achievements', label: 'Achievements' },
  { href: '/#contact', label: 'Contact' },
  { href: '/mascot', label: 'Mascot' }, // Added Mascot link
  { href: '/terminal', label: 'Terminal' }, // Add Terminal link
  { href: '/timeline', label: 'Timeline' }, // Add Timeline link
  { href: '/skills-radar', label: 'Skills Radar' }, // Add Skills Radar link
];

const Navbar = () => {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showSparkle, setShowSparkle] = useState(false);
  const { theme, nextTheme } = useCosmicTheme();

  // Theme toggle handler
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Sparkle effect on logo hover
  const handleLogoMouseEnter = () => setShowSparkle(true);
  const handleLogoMouseLeave = () => setShowSparkle(false);

  useEffect(() => {
    const handleScroll = () => {
      let currentHash = '';
      for (const link of navLinks) {
        const sectionId = link.href.split('#')[1];
        if (sectionId) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              currentHash = `#${sectionId}`;
              break;
            }
          }
        }
      }
      setActiveHash(currentHash);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      setActiveHash(window.location.hash);
    }
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Keyboard shortcut for theme toggle (Ctrl+B)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        setDarkMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <nav className="bg-background/80 backdrop-blur-md text-foreground p-4 fixed w-full top-0 z-50 transition-all duration-300 shadow-sm border-b border-border/30">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-primary hover:text-accent transition-colors duration-300 flex items-center gap-1 relative"
          onMouseEnter={handleLogoMouseEnter}
          onMouseLeave={handleLogoMouseLeave}
        >
          <span className="relative">
            MohdHarish
            {showSparkle && (
              <Sparkles className="absolute -top-4 -right-6 text-accent animate-pulse" size={22} />
            )}
          </span>
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-2 md:space-x-4 items-center">
          {navLinks.map((link) => {
            const isActive = activeHash === link.href.substring(link.href.indexOf('#')) ||
              (activeHash === '' && link.href === '/#about' && pathname === '/');
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300
                  ${isActive
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-accent'
                  }
                `}
                onClick={() => {
                  setActiveHash(link.href.substring(link.href.indexOf('#')));
                  setIsMobileMenuOpen(false);
                }}
              >
                {link.label}
              </Link>
            );
          })}
          {/* Theme toggle button */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="ml-2 p-2 rounded-md border border-border/30 bg-card/60 hover:bg-card/80 transition-colors duration-200 text-primary hover:text-accent focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle dark mode"
            title="Toggle dark mode (Ctrl+B)"
          >
            {darkMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          {/* Cosmic theme switcher */}
          <button
            onClick={nextTheme}
            className="ml-2 p-2 rounded-md border border-border/30 bg-card/60 hover:bg-card/80 transition-colors duration-200 text-accent focus:outline-none focus:ring-2 focus:ring-accent flex items-center gap-1"
            aria-label="Switch cosmic theme"
            title={`Switch cosmic theme (Current: ${theme.name})`}
          >
            <Palette size={18} />
            <span className="hidden md:inline text-xs font-semibold">{theme.name}</span>
          </button>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 rounded-md border border-border/30 bg-card/60 hover:bg-card/80 transition-colors duration-200 text-primary hover:text-accent focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle dark mode"
            title="Toggle dark mode (Ctrl+B)"
          >
            {darkMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={nextTheme}
            className="p-2 rounded-md border border-border/30 bg-card/60 hover:bg-card/80 transition-colors duration-200 text-accent focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Switch cosmic theme"
            title={`Switch cosmic theme (Current: ${theme.name})`}
          >
            <Palette size={18} />
          </button>
          <button
            onClick={toggleMobileMenu}
            className="text-foreground hover:text-accent transition-colors p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu - Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 pb-2 bg-background/90 backdrop-blur-sm rounded-md shadow-lg">
          <div className="flex flex-col space-y-1 px-2 pt-2 pb-3">
            {navLinks.map((link) => {
              const isActive = activeHash === link.href.substring(link.href.indexOf('#')) ||
                (activeHash === '' && link.href === '/#about' && pathname === '/');
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`
                    block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300
                    ${isActive
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:text-accent'
                    }
                  `}
                  onClick={() => {
                    setActiveHash(link.href.substring(link.href.indexOf('#')));
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
