// src/utils/cosmicThemes.ts
// Color palettes for different cosmic modes

export type CosmicTheme = {
  name: string;
  colorA: string; // Main gradient color
  colorB: string; // Background color
  colorC: string; // Accent/pulse color
};

export const cosmicThemes: CosmicTheme[] = [
  {
    name: 'Galaxy',
    colorA: '#6C3FCF', // Muted Electric Violet
    colorB: '#14121A', // Deep Jet Black
    colorC: '#3A2B5C', // Dimmed Coral Red (for subtle accent)
  },
  {
    name: 'Nebula',
    colorA: '#3ED6B5', // Muted Aqua Green
    colorB: '#1B2233', // Muted Deep Space Blue
    colorC: '#BFAF5A', // Muted Nebula Gold
  },
  {
    name: 'Aurora',
    colorA: '#4ED6C1', // Muted Aurora Cyan
    colorB: '#181A2A', // Muted Night Sky
    colorC: '#B86B8B', // Muted Aurora Pink
  },
  {
    name: 'Supernova',
    colorA: '#BFAF5A', // Muted Supernova Gold
    colorB: '#1B1020', // Muted Deep Purple
    colorC: '#B84A6E', // Muted Magenta
  },
  {
    name: 'Starlight',
    colorA: '#A0B8FF', // Soft Blue
    colorB: '#181C24', // Deep Blue-Gray
    colorC: '#E6E6FA', // Lavender (very subtle accent)
  },
  {
    name: 'Dawn',
    colorA: '#F7C59F', // Soft Peach
    colorB: '#23212B', // Muted Purple-Gray
    colorC: '#A3A1A8', // Muted Silver
  },
];
