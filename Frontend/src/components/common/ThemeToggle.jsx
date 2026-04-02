import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ className = '' }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage or system preference on initial load
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={`group rounded-2xl border border-white/70 bg-white/85 p-2.5 text-slate-500 shadow-[0_14px_34px_-20px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600 hover:shadow-[0_18px_40px_-22px_rgba(37,99,235,0.45)] active:scale-95 dark:border-white/10 dark:bg-slate-950/75 dark:text-slate-400 dark:hover:border-blue-500/30 dark:hover:text-blue-300 ${className}`}
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Sun size={20} className="transition-transform duration-300 group-hover:rotate-12" />
      ) : (
        <Moon size={20} className="transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
};

export default ThemeToggle;
