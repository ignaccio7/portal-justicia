'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

interface CaseNode {
  id: number;
  title: string;
  description: string;
  laws: string[];
  actors: string[];
  date: string;
}

interface CaseGraphProps {
  nodes: CaseNode[];
  highlightActor?: string;
  onActorClick?: (actor: string) => void;
}

export default function CaseGraphVisualization({
  nodes,
  highlightActor,
  onActorClick,
}: CaseGraphProps) {
  const [selectedNode, setSelectedNode] = useState<CaseNode | null>(null);

  return (
    <>
      <div className="space-y-8">
        {nodes.map((node, index) => {
          const isHighlighted = highlightActor
            ? node.actors.includes(highlightActor)
            : false;

          return (
            <motion.div
              key={node.id}
              className="flex flex-col lg:flex-row items-start gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Nodo */}
              <motion.button
                onClick={() => setSelectedNode(node)}
                className={`flex-shrink-0 relative ${
                  isHighlighted ? 'scale-110' : ''
                } cursor-pointer group`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Glow effect si está highlighted */}
                {isHighlighted && (
                  <motion.div
                    className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-white text-2xl backdrop-blur-xl border-2 ${
                    isHighlighted
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-300 shadow-2xl shadow-blue-500/50'
                      : 'bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600 group-hover:border-blue-400 transition-colors'
                  }`}
                >
                  {node.id}
                </div>
              </motion.button>

              {/* Contenido */}
              <motion.div
                className="flex-1 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 bg-slate-900/30 hover:bg-slate-900/50 transition-all hover:border-blue-500/30"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold text-white mb-2">{node.title}</h3>
                <p className="text-slate-300 mb-4">{node.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400 font-semibold mb-1">Leyes Aplicadas:</p>
                    <div className="flex flex-wrap gap-2">
                      {node.laws.map((law) => (
                        <span
                          key={law}
                          className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-200 text-xs"
                        >
                          {law}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-400 font-semibold mb-1">Actores:</p>
                    <div className="flex flex-wrap gap-2">
                      {node.actors.map((actor) => (
                        <motion.button
                          key={actor}
                          onClick={(e) => {
                            e.stopPropagation();
                            onActorClick?.(actor);
                          }}
                          className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs hover:bg-blue-500/40 transition-colors cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                        >
                          {actor}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mt-3">
                  {new Date(node.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </motion.div>

              {/* Flecha conexión */}
              {index < nodes.length - 1 && (
                <motion.div
                  className="hidden lg:flex justify-center items-center"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="text-slate-500 rotate-90" size={24} />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Modal detalle de nodo */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNode(null)}
          >
            <motion.div
              className="bg-slate-900 border border-slate-700/50 rounded-2xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto shadow-2xl"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-5xl font-bold text-blue-400 mb-2">
                    Paso {selectedNode.id}
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedNode.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="text-slate-400" size={24} />
                </button>
              </div>

              <p className="text-slate-300 mb-6">{selectedNode.description}</p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-200 mb-2">
                    Leyes y Normas Aplicadas:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.laws.map((law) => (
                      <span
                        key={law}
                        className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 text-sm font-medium"
                      >
                        {law}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200 mb-2">
                    Actores Intervinientes:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.actors.map((actor) => (
                      <motion.button
                        key={actor}
                        onClick={() => {
                          onActorClick?.(actor);
                          setSelectedNode(null);
                        }}
                        className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 text-sm font-medium hover:bg-blue-500/40 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.05 }}
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
