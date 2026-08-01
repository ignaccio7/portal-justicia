'use client';

import { motion } from 'framer-motion';
import { Users, Award, Scale } from 'lucide-react';

interface ProfessionalCardProps {
  id: string;
  name: string;
  role: 'judge' | 'lawyer' | 'prosecutor';
  casesCount: number;
  successRate: number;
  onClick: () => void;
}

export default function ProfessionalCard({
  id,
  name,
  role,
  casesCount,
  successRate,
  onClick,
}: ProfessionalCardProps) {
  const roleConfig = {
    judge: { label: 'Juez/Jueza', icon: Scale, color: 'from-purple-500 to-purple-600' },
    lawyer: { label: 'Abogado/Abogada', icon: Users, color: 'from-blue-500 to-blue-600' },
    prosecutor: { label: 'Fiscal', icon: Award, color: 'from-red-500 to-red-600' },
  };

  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <motion.div
      onClick={onClick}
      className="cursor-pointer group"
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden hover:border-slate-600/80 transition-all shadow-lg hover:shadow-2xl group-hover:shadow-slate-600/20">
        {/* Header con gradiente */}
        <div className={`h-24 bg-gradient-to-r ${config.color} relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20 bg-noise"></div>
        </div>

        {/* Contenido */}
        <div className="p-6 bg-slate-900/50">
          {/* Avatar placeholder */}
          <div className="flex justify-center -mt-12 mb-4">
            <motion.div
              className={`w-20 h-20 rounded-full bg-gradient-to-br ${config.color} border-4 border-slate-900 flex items-center justify-center shadow-lg`}
              whileHover={{ scale: 1.1 }}
            >
              <Icon className="text-white" size={32} />
            </motion.div>
          </div>

          <h3 className="font-bold text-white text-center text-lg mb-1">{name}</h3>
          <p className="text-sm text-slate-400 text-center mb-4">{config.label}</p>

          {/* Stats */}
          <div className="space-y-3 mb-4 text-sm">
            <div className="flex justify-between items-center p-2 rounded-lg bg-slate-800/50">
              <span className="text-slate-300">Casos en plataforma</span>
              <span className="font-bold text-blue-400">{casesCount}</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-slate-800/50">
              <span className="text-slate-300">Tasa de éxito</span>
              <span className="font-bold text-green-400">{successRate}%</span>
            </div>
          </div>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="w-full py-2 px-4 rounded-lg bg-slate-700/50 text-slate-200 hover:bg-slate-600 transition-colors text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver perfil →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
