import React, { createContext, useContext, useEffect, useState } from 'react';

export interface AdminImage {
  id: string;
  src: string;
  alt: string;
  uploadedAt: number;
}

export interface ThemeColors {
  primaryHex: string;
  accentHex: string;
}

const DEFAULT_THEME: ThemeColors = {
  primaryHex: '#FF3D2E',
  accentHex: '#FFD600',
};

const LS_IMAGES_KEY = 'tcg_admin_images';
const LS_THEME_KEY = 'tcg_theme_colors';

function hexToHsl(hex: string): string {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function applyThemeToDom(colors: ThemeColors) {
  const root = document.documentElement;
  const primaryHsl = hexToHsl(colors.primaryHex);
  const accentHsl = hexToHsl(colors.accentHex);
  root.style.setProperty('--primary', primaryHsl);
  root.style.setProperty('--ring', primaryHsl);
  root.style.setProperty('--destructive', primaryHsl);
  root.style.setProperty('--sidebar-primary', primaryHsl);
  root.style.setProperty('--sidebar-ring', primaryHsl);
  root.style.setProperty('--chart-1', primaryHsl);
  root.style.setProperty('--accent', accentHsl);
  root.style.setProperty('--sidebar-accent', accentHsl);
  root.style.setProperty('--chart-2', accentHsl);
  root.style.setProperty('--primary-border', `hsl(${primaryHsl})`);
  root.style.setProperty('--accent-border', `hsl(${accentHsl})`);
  root.style.setProperty('--sidebar-primary-border', `hsl(${primaryHsl})`);
  root.style.setProperty('--sidebar-accent-border', `hsl(${accentHsl})`);
  root.style.setProperty('--destructive-border', `hsl(${primaryHsl})`);
}

interface SiteContextValue {
  adminImages: AdminImage[];
  addAdminImage: (file: File) => Promise<void>;
  removeAdminImage: (id: string) => void;
  themeColors: ThemeColors;
  setThemeColors: (colors: ThemeColors) => void;
  resetTheme: () => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [adminImages, setAdminImages] = useState<AdminImage[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_IMAGES_KEY) || '[]');
    } catch {
      return [];
    }
  });

  const [themeColors, setThemeColorsState] = useState<ThemeColors>(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_THEME_KEY) || 'null') ?? DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  });

  useEffect(() => {
    applyThemeToDom(themeColors);
  }, [themeColors]);

  const addAdminImage = (file: File): Promise<void> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        const newImage: AdminImage = {
          id: `img_${Date.now()}_${Math.random().toString(36).slice(2)}`,
          src,
          alt: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          uploadedAt: Date.now(),
        };
        setAdminImages((prev) => {
          const next = [...prev, newImage];
          localStorage.setItem(LS_IMAGES_KEY, JSON.stringify(next));
          return next;
        });
        resolve();
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const removeAdminImage = (id: string) => {
    setAdminImages((prev) => {
      const next = prev.filter((img) => img.id !== id);
      localStorage.setItem(LS_IMAGES_KEY, JSON.stringify(next));
      return next;
    });
  };

  const setThemeColors = (colors: ThemeColors) => {
    setThemeColorsState(colors);
    localStorage.setItem(LS_THEME_KEY, JSON.stringify(colors));
  };

  const resetTheme = () => {
    setThemeColors(DEFAULT_THEME);
  };

  return (
    <SiteContext.Provider value={{ adminImages, addAdminImage, removeAdminImage, themeColors, setThemeColors, resetTheme }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteProvider');
  return ctx;
}
