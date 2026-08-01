'use client';

import { useState } from 'react';
import { Menu, X, Scale, Users, FileText, Info, Home, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

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
        className="hidden lg:flex fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex-col p-6 border-r border-slate-700/50 shadow-2xl"
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
                    ? 'bg-blue-500/20 text-blue-300 border-l-4 border-blue-400'
                    : 'text-slate-300 hover:bg-slate-700/50'
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

        <div className="text-xs text-slate-400 text-center pt-4 border-t border-slate-700">
          Plataforma Cívica Interactiva
        </div>
      </motion.aside>

      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 flex justify-between items-center z-50 border-b border-slate-700/50">
        <h1 className="text-xl font-bold text-blue-400">Rutas de Justicia</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="lg:hidden fixed top-16 left-0 right-0 bg-slate-900 border-b border-slate-700/50 p-4 flex flex-col gap-2 z-40"
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
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </motion.div>
      )}
    </>
  );
}
