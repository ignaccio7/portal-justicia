'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  compact?: boolean;
}

const DEFAULT_DARK = true;

function readStoredTheme(): boolean {
  try {
    const stored = window.localStorage.getItem('theme');
    return stored ? stored === 'dark' : DEFAULT_DARK;
  } catch {
    return DEFAULT_DARK;
  }
}

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  root.classList.toggle('dark', dark);
  root.classList.toggle('light', !dark);
}

export default function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return DEFAULT_DARK;
    return readStoredTheme();
  });

  useEffect(() => {
    const dark = readStoredTheme();
    setIsDark(dark);
    applyTheme(dark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    applyTheme(next);
    try {
      window.localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {}
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      className={`flex items-center justify-center gap-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all cursor-pointer ${
        compact ? 'p-2' : 'w-full px-4 py-3 font-medium'
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
      {!compact && <span>{isDark ? 'Tema claro' : 'Tema oscuro'}</span>}
    </motion.button>
  );
}
