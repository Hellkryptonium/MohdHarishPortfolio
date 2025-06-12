'use client';

import React, { useEffect, useState } from 'react';

const VisitorCountFloating = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Increment the visitor count and get the latest count
    fetch('/api/visitor-count', { method: 'POST' })
      .then(res => res.json())
      .then(data => setCount(data.count))
      .catch(() => setCount(null));
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        left: 16,
        bottom: 32,
        zIndex: 1000,
        background: 'rgba(30,30,40,0.92)',
        color: '#fff',
        borderRadius: '9999px',
        padding: '0.5rem 1.25rem',
        boxShadow: '0 2px 16px 0 rgba(0,0,0,0.18)',
        fontWeight: 600,
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        pointerEvents: 'none',
      }}
      aria-label="Live visitor count"
    >
      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M12 13c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"/></svg>
      {count !== null ? `PeepsCount: ${count}` : 'Loading...'}
    </div>
  );
};

export default VisitorCountFloating;
