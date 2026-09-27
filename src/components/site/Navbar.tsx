'use client';

import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8" aria-label="Primary navigation">
        <Link href="/" className="text-base font-semibold tracking-tight" onClick={() => setOpen(false)}>
          Harish
        </Link>
        <button
          type="button"
          className="rounded-sm px-2 py-1 text-sm text-muted-foreground hover:text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>
        <div className="hidden items-center gap-7 text-sm md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
          <a href="https://github.com/Hellkryptonium" target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
            GitHub
          </a>
          <a href="/assets/MohdHarish_Resume.pdf" target="_blank" rel="noreferrer" className="text-primary transition-colors hover:text-foreground">
            Resume
          </a>
        </div>
      </nav>
      {open && (
        <div id="mobile-navigation" className="border-t border-border bg-background px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <a href="https://github.com/Hellkryptonium" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">GitHub</a>
            <a href="/assets/MohdHarish_Resume.pdf" target="_blank" rel="noreferrer" className="text-primary hover:text-foreground">Resume</a>
          </div>
        </div>
      )}
    </header>
  );
}