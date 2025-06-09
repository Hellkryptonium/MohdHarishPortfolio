'use client';

import { useEffect } from 'react';
import useSmoothScroll from '@/hooks/useSmoothScroll'; // Adjusted import path

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  navbarOffset?: number;
}

const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children, navbarOffset = 64 }) => {
  // Assuming navbar height is around 64px (pt-16 in layout)
  useSmoothScroll({ offset: navbarOffset }); 

  return <>{children}</>;
};

export default SmoothScrollProvider;
