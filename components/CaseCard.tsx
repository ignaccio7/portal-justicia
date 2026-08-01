'use client';

import { motion } from 'framer-motion';
import { Scale, MapPin, Clock } from 'lucide-react';

interface CaseCardProps {
  id: string;
  title: string;
  jurisdiction: string;
  status: 'active' | 'completed' | 'pending';
  year: number;
  onClick: () => void;
}

export default function CaseCard({
  id,
  title,
  jurisdiction,
  status,
  year,
  onClick,
}: CaseCardProps) {
  const statusConfig = {
    active: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Activo' },
    completed: { bg: 'bg-green-500/10', text: 'text-green-400', label: 'Completado' },
    pending: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', label: 'Pendiente' },
  };

  const config = statusConfig[status];

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
      <div className={`${config.bg} backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-2xl hover:shadow-blue-500/10`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Scale className="text-blue-400" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">{title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{id}</p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
          >
            {config.label}
          </span>
        </div>

        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-blue-400" />
            <span>{jurisdiction}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-slate-400" />
            <span>{year}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/50 text-xs text-slate-500 dark:text-slate-400">
          Haz clic para ver detalles →
        </div>
      </div>
    </motion.div>
  );
}
