'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Sparkles, Palette, UserCircle2 } from 'lucide-react'; // Added UserCircle2 icon
import { useCosmicTheme } from '@/context/CosmicThemeContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/utils/supabaseClient';

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#achievements', label: 'Achievements' },
  { href: '/#contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' }, // Added Blog link
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
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const { theme, nextTheme } = useCosmicTheme();
  const { user } = useAuth();

  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== ADMIN_EMAIL) {
      alert('Only the admin can log in.');
      return;
    }
    await supabase.auth.signInWithOtp({ email });
    alert('Check your email for the login link!');
    setShowLogin(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowProfileMenu(false);
  };

  return (
    <nav className="bg-background/80 backdrop-blur-md text-foreground p-4 fixed w-full top-0 z-50 transition-all duration-300 shadow-sm border-b border-border/30">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-primary hover:text-accent transition-colors duration-300 flex items-center gap-1 relative"
          onMouseEnter={handleLogoMouseEnter}
          onMouseLeave={handleLogoMouseLeave}
        >
          <span className="relative flex items-center gap-2">
            MohdHarish
            {showSparkle && (
              <Sparkles className="absolute -top-4 -right-6 text-accent animate-pulse" size={22} />
            )}
            {/* Profile/Login Button beside logo */}
            <button
              className="rounded-full p-2 hover:bg-card/60 border border-border/30 ml-2"
              onClick={() => (user ? setShowProfileMenu((v) => !v) : setShowLogin(true))}
              aria-label="Profile/Login"
            >
              <UserCircle2 size={28} />
            </button>
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
      {/* Login Modal */}
      {showLogin && (
        <div className="absolute right-0 mt-2 bg-background shadow-lg p-4 rounded z-50 border border-border/30">
          <form onSubmit={handleLogin} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border p-2 rounded bg-card"
              required
            />
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      )}
      {/* Profile Dropdown */}
      {showProfileMenu && user && (
        <div className="absolute right-0 mt-2 bg-background shadow-lg p-4 rounded z-50 border border-border/30 min-w-[180px]">
          <div className="mb-2 font-semibold break-all">{user.email}</div>
          {/* Only show Write Blog for your email */}
          {user.email === ADMIN_EMAIL && (
            <Link href="/admin" className="block mb-2 text-primary hover:underline">Write Blog</Link>
          )}
          <button onClick={handleLogout} className="text-red-500 mt-2">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
