'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, ArrowRight, AlertCircle } from 'lucide-react';
import CaseGraphVisualization from './CaseGraphVisualization';
import ProfessionalCard from './ProfessionalCard';

interface SimulatorViewProps {
  onNavigateToProfile: (professionalId: string) => void;
}

export default function SimulatorView({
  onNavigateToProfile,
}: SimulatorViewProps) {
  const [step, setStep] = useState(1);
  const [legalProblem, setLegalProblem] = useState('');
  const [simulatedCase, setSimulatedCase] = useState<any>(null);

  // Casos similares hardcodeados
  const similarCases = [
    {
      id: 'case-similar-1',
      title: 'Caso Similar: Impugnación de Paternidad 2022',
      jurisdiction: 'Juzgado de Familia',
      status: 'completed' as const,
      year: 2022,
    },
    {
      id: 'case-similar-2',
      title: 'Caso Similar: Reconocimiento de Derechos Familiares',
      jurisdiction: 'Tribunal Superior',
      status: 'completed' as const,
      year: 2023,
    },
    {
      id: 'case-similar-3',
      title: 'Caso Similar: Pruebas de ADN en Procesos Civiles',
      jurisdiction: 'Corte de Justicia',
      status: 'completed' as const,
      year: 2024,
    },
  ];

  // Simulación del grafo
  const simulatedNodes = [
    {
      id: 1,
      title: 'Presentación de Demanda',
      description: 'Se presenta la demanda ante el juzgado competente con todos los requisitos legales.',
      laws: ['Código Procesal', 'Ley de Procedimiento'],
      actors: ['Dr. Roberto Aguilar'],
      date: '2024-01-15',
    },
    {
      id: 2,
      title: 'Requerimiento de Pruebas',
      description: 'Se solicita evidencia médica y documental para respaldar la demanda.',
      laws: ['Código de Familia', 'Leyes de Prueba'],
      actors: ['Dra. Carla Mendoza'],
      date: '2024-02-01',
    },
    {
      id: 3,
      title: 'Realización de Prueba de ADN',
      description: 'Se realiza la prueba de ADN en laboratorio certificado.',
      laws: ['Normas de Análisis Genético'],
      actors: ['Laboratorio Certificado'],
      date: '2024-02-20',
    },
    {
      id: 4,
      title: 'Resolución Judicial',
      description: 'El juez dicta sentencia basado en pruebas.',
      laws: ['Código Familiar'],
      actors: ['Dra. Carla Mendoza'],
      date: '2024-03-15',
    },
  ];

  const recommendedLawyers = [
    {
      id: 'lawyer-1',
      name: 'Dr. Roberto Aguilar',
      role: 'lawyer' as const,
      casesCount: 45,
      successRate: 92,
    },
    {
      id: 'lawyer-2',
      name: 'Dra. María López',
      role: 'lawyer' as const,
      casesCount: 38,
      successRate: 88,
    },
    {
      id: 'lawyer-3',
      name: 'Dr. Carlos Henríquez',
      role: 'lawyer' as const,
      casesCount: 52,
      successRate: 95,
    },
  ];

  const handleGenerateSimulation = () => {
    if (legalProblem.trim()) {
      setSimulatedCase({
        problem: legalProblem,
        estimatedDuration: '3-4 meses',
        estimatedCost: '$2,500 - $4,500',
        complexity: 'Alta',
      });
      setStep(3);
    }
  };

  return (
    <div className="space-y-8">
      {/* Step 1: Descripción del Problema */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div className="text-center mb-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="inline-block mb-4"
            >
              <Brain className="text-blue-400" size={48} />
            </motion.div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Simulador de Rutas Legales
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Describe tu problema legal y te mostraremos las posibles rutas que
              podría seguir
            </p>
          </div>

          <div className="backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 bg-white/60 dark:bg-slate-900/30">
            <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-3">
              ¿Qué problema legal enfrentas?
            </label>
            <textarea
              value={legalProblem}
              onChange={(e) => setLegalProblem(e.target.value)}
              placeholder="Describe detalladamente tu situación legal..."
              className="w-full h-40 bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-lg p-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 resize-none"
            />

            <motion.button
              onClick={() => setStep(2)}
              disabled={!legalProblem.trim()}
              className="mt-4 w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Buscar Casos Similares <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Casos Similares */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Casos Similares Históricos
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Estos casos formarán la base de tu simulación
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {similarCases.map((caseItem) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 bg-white/60 dark:bg-slate-900/30 hover:bg-white/80 dark:hover:bg-slate-900/50 transition-all"
              >
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{caseItem.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{caseItem.jurisdiction}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">{caseItem.year}</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-600 dark:text-green-300">
                    ✓ Completado
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={handleGenerateSimulation}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Generar Simulación de mi Caso <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      )}

      {/* Step 3: Simulación */}
      {step === 3 && simulatedCase && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-8"
        >
          {/* Disclaimer */}
          <motion.div
            className="border border-yellow-600/50 bg-yellow-500/10 rounded-lg p-4 flex gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
            <div className="text-sm">
              <p className="font-semibold text-yellow-600 dark:text-yellow-300 mb-1">
                ⚠️ Disclaimer Importante
              </p>
              <p className="text-yellow-700 dark:text-yellow-200">
                Esto es una simulación basada en IA, NO asegura resultados legales.
                Consulta con un profesional legal certificado antes de tomar
                decisiones importantes.
              </p>
            </div>
          </motion.div>

          {/* Detalles de la simulación */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Duración Estimada', value: simulatedCase.estimatedDuration },
              { label: 'Costo Estimado', value: simulatedCase.estimatedCost },
              { label: 'Complejidad', value: simulatedCase.complexity },
              { label: 'Confianza IA', value: '78%' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-lg p-4 bg-white/60 dark:bg-slate-900/30 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{item.label}</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{item.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Grafo simulado */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Grafo Visual de Ruta Simulada
            </h3>
            <CaseGraphVisualization
              nodes={simulatedNodes}
              onActorClick={(actor) => {}}
            />
          </div>

          {/* Abogados recomendados */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Abogados Expertos Recomendados para Este Flujo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedLawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  onClick={() => onNavigateToProfile(lawyer.id)}
                >
                  <ProfessionalCard {...lawyer} onClick={() => {}} />
                </div>
              ))}
            </div>
          </div>

          <motion.button
            onClick={() => setStep(1)}
            className="w-full py-3 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 dark:bg-slate-700/50 dark:text-white dark:hover:bg-slate-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Realizar otra simulación
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
