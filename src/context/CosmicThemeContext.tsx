"use client";

import React, { createContext, useContext, useState } from "react";
import { cosmicThemes, CosmicTheme } from "@/utils/cosmicThemes";

interface CosmicThemeContextProps {
  theme: CosmicTheme;
  setThemeByName: (name: string) => void;
  nextTheme: () => void;
}

const CosmicThemeContext = createContext<CosmicThemeContextProps | undefined>(undefined);

export const CosmicThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeIndex, setThemeIndex] = useState(0);
  const setThemeByName = (name: string) => {
    const idx = cosmicThemes.findIndex((t) => t.name === name);
    if (idx !== -1) setThemeIndex(idx);
  };
  const nextTheme = () => setThemeIndex((i) => (i + 1) % cosmicThemes.length);
  return (
    <CosmicThemeContext.Provider value={{ theme: cosmicThemes[themeIndex], setThemeByName, nextTheme }}>
      {children}
    </CosmicThemeContext.Provider>
  );
};

export const useCosmicTheme = () => {
  const ctx = useContext(CosmicThemeContext);
  if (!ctx) throw new Error("useCosmicTheme must be used within CosmicThemeProvider");
  return ctx;
};
