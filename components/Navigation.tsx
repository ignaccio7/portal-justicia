'use client';

import { useState } from 'react';
import { Menu, X, Scale, Users, FileText, Info, Home, Brain, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Navigation({ currentView, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'casos', label: 'Casos', icon: Scale },
    { id: 'abogados', label: 'Profesionales', icon: Users },
    { id: 'informacion', label: 'Información', icon: FileText },
    { id: 'simulador', label: 'Simulador IA', icon: Brain },
  ];

  const handleNavigate = (view: string) => {
    onNavigate(view);
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden lg:flex fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-white to-slate-100 text-slate-900 flex-col p-6 border-r border-slate-200 shadow-2xl dark:from-slate-900 dark:to-slate-800 dark:text-white dark:border-slate-700/50"
        initial={{ x: -264 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-12">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Rutas de
            <br />
            Justicia
          </h1>
        </div>

        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-blue-500/10 text-blue-600 border-l-4 border-blue-400 dark:bg-blue-500/20 dark:text-blue-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50'
                }`}
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700/50 space-y-4">
          <ThemeToggle />
          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-blue-600/10 active:translate-y-px"
          >
            <LogIn size={18} />
            <span>Iniciar Sesión</span>
          </Link>
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Plataforma Cívica Interactiva
          </div>
        </div>
      </motion.aside>

      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-white to-slate-100 text-slate-900 p-4 flex justify-between items-center z-50 border-b border-slate-200 dark:from-slate-900 dark:to-slate-800 dark:text-white dark:border-slate-700/50">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">Rutas de Justicia</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle compact />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="lg:hidden fixed top-16 left-0 right-0 bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-700/50 p-4 flex flex-col gap-2 z-40"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              <LogIn size={18} />
              <span>Iniciar Sesión</span>
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
}
