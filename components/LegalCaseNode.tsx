'use client';

import { memo, useState } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Gavel,
  Dna,
  Clock,
  ClipboardList,
  Scale,
  X,
  User,
} from 'lucide-react';

const NODE_ICONS = [FileText, Gavel, Dna, Clock, ClipboardList, Scale];

export interface LegalCaseNodeData {
  id: number;
  title: string;
  description: string;
  laws: string[];
  actors: string[];
  date: string;
  highlighted: boolean;
  onActorClick: (actor: string) => void;
}

function LegalCaseNode({ data }: NodeProps) {
  const nodeData = data as unknown as LegalCaseNodeData;
  const { id, title, description, laws, actors, date, highlighted, onActorClick } = nodeData;
  const [modalOpen, setModalOpen] = useState(false);

  const Icon = NODE_ICONS[(id - 1) % NODE_ICONS.length];

  const formattedDate = new Date(date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      {/* ── React Flow Handles ── */}
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />

      {/* ── Compact Node: Circle + Title + Actors ── */}
      <motion.div
        role="button"
        tabIndex={0}
        onClick={() => setModalOpen(true)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setModalOpen(true); }}
        className="flex items-start gap-4 text-left focus:outline-none cursor-pointer group nodrag nopan"
        style={{ width: 340 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: (id - 1) * 0.1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Circle */}
        <div className="relative flex-shrink-0 flex items-center justify-center" style={{ width: 72, height: 72 }}>
          {/* Glow when highlighted */}
          {highlighted && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0.15, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}

          <div
            className="relative flex items-center justify-center rounded-full transition-all duration-300"
            style={{
              width: 72,
              height: 72,
              background: highlighted
                ? 'linear-gradient(135deg, rgba(30,58,138,0.85) 0%, rgba(15,23,42,0.95) 100%)'
                : 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.95) 100%)',
              border: highlighted
                ? '2px solid rgba(96,165,250,0.9)'
                : '2px solid rgba(71,85,105,0.7)',
              boxShadow: highlighted
                ? '0 0 24px rgba(59,130,246,0.5), 0 0 50px rgba(59,130,246,0.2)'
                : '0 0 10px rgba(59,130,246,0.08)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <Icon size={28} className={highlighted ? 'text-blue-300' : 'text-slate-400 group-hover:text-slate-200 transition-colors'} />

            {/* Number badge */}
            <div
              className="absolute -bottom-1 -right-1 w-5.5 h-5.5 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-slate-950"
              style={{
                width: 22,
                height: 22,
                background: highlighted ? '#3b82f6' : '#475569',
              }}
            >
              {id}
            </div>
          </div>
        </div>

        {/* Title + Actors */}
        <div className="flex flex-col justify-center pt-1 min-w-0">
          <h3 className="text-sm font-bold text-white leading-snug group-hover:text-blue-200 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 mb-2">{formattedDate}</p>

          {/* Actor pills — clickable → navigate to professional profile */}
          <div className="flex flex-wrap gap-1.5 nodrag nopan">
            {actors.map((actor) => (
              <motion.button
                key={actor}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onActorClick(actor);
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                className="nodrag nopan px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer relative z-10"
                style={{
                  background: 'rgba(59,130,246,0.12)',
                  color: '#93c5fd',
                  border: '1px solid rgba(59,130,246,0.25)',
                }}
                whileHover={{
                  scale: 1.06,
                  background: 'rgba(59,130,246,0.28)',
                  borderColor: 'rgba(59,130,246,0.5)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                {actor}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Full Detail Modal ── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: 'rgba(10,15,30,0.97)',
                border: '1px solid rgba(59,130,246,0.25)',
                backdropFilter: 'blur(24px)',
                maxHeight: '85vh',
                overflowY: 'auto',
              }}
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div
                className="flex items-start justify-between p-6"
                style={{ borderBottom: '1px solid rgba(51,65,85,0.5)' }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}
                  >
                    <Icon size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <div
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold mb-1"
                      style={{ background: 'rgba(59,130,246,0.2)', color: '#93c5fd' }}
                    >
                      Paso {id}
                    </div>
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">{formattedDate}</p>
                  </div>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-800 transition-colors ml-4 flex-shrink-0"
                  aria-label="Cerrar modal"
                >
                  <X size={18} className="text-slate-400" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Description */}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">
                    Descripción
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
                </div>

                {/* Laws */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Scale size={13} className="text-purple-400" />
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
                      Leyes y Normas Aplicadas
                    </p>
                  </div>
                  <div className="space-y-2">
                    {laws.map((law, i) => (
                      <motion.div
                        key={law}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
                        style={{
                          background: 'rgba(124,58,237,0.1)',
                          border: '1px solid rgba(124,58,237,0.2)',
                        }}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{ background: 'rgba(124,58,237,0.3)', color: '#c4b5fd' }}
                        >
                          {i + 1}
                        </div>
                        <p className="text-sm text-purple-200">{law}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Actors */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User size={13} className="text-blue-400" />
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
                      Actores Intervinientes
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {actors.map((actor) => (
                      <motion.button
                        key={actor}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onActorClick(actor);
                          setModalOpen(false);
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="nodrag nopan px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer"
                        style={{
                          background: 'rgba(59,130,246,0.15)',
                          color: '#93c5fd',
                          border: '1px solid rgba(59,130,246,0.3)',
                        }}
                        whileHover={{ scale: 1.04, background: 'rgba(59,130,246,0.3)' }}
                        whileTap={{ scale: 0.96 }}
                      >
                        {actor} →
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(LegalCaseNode);
