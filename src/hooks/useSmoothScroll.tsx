'use client';

import { useEffect } from 'react';

interface SmoothScrollOptions {
  offset?: number;
  duration?: number;
}

export function useSmoothScroll(options: SmoothScrollOptions = {}) {
  const { offset = 0, duration = 800 } = options;

  useEffect(() => {
    // Only run on the client-side
    if (typeof window === 'undefined') return;

    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      
      // Only handle anchor links that point to IDs on the current page
      if (target.tagName === 'A' && 
          target.href && 
          target.href.includes('#') && 
          target.pathname === window.location.pathname) {
        
        // Extract the ID from the href
        const id = target.hash.slice(1);
        const element = document.getElementById(id);
        
        if (element) {
          e.preventDefault();
          
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Update URL without scrolling
          window.history.pushState({}, '', target.hash);
        }
      }
    };

    // Add event listener to handle all clicks
    document.addEventListener('click', handleHashClick);
    
    // Initial scroll if URL contains hash
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.slice(1);
        const element = document.getElementById(id);
        
        if (element) {
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
    
    return () => {
      document.removeEventListener('click', handleHashClick);
    };
  }, [offset, duration]);
}

export default useSmoothScroll;
