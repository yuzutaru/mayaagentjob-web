import React from 'react';
import { Briefcase, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const HomeNavbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/40 dark:border-slate-800/60 bg-white/80 dark:bg-[#090A0E]/85 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              Maya
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/20">
                Asisten cari kerja Kamu
              </span>
            </span>
          </div>
        </div>

        {/* Navigation links - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a
            href="#community"
            className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
          >
            Community
          </a>
          <a
            href="#find-jobs"
            className="flex items-center gap-1 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
          >
            Find Jobs
            <ChevronDown className="w-4 h-4 opacity-70" />
          </a>
          <a
            href="#companies"
            className="flex items-center gap-1 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
          >
            Companies
            <ChevronDown className="w-4 h-4 opacity-70" />
          </a>
          <a
            href="#salaries"
            className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
          >
            Salaries
          </a>
        </nav>

        {/* Right actions: Theme toggle + Auth */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Light/Dark Theme"
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-sm"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          <a
            href="#login"
            className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors px-2 py-1.5"
          >
            Login
          </a>

          <a
            href="#signup"
            className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm shadow-md shadow-emerald-500/30 hover:shadow-emerald-500/50 active:scale-95 transition-all duration-200"
          >
            Sign Up
          </a>
        </div>
      </div>
    </header>
  );
};
