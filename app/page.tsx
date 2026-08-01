'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import CaseCard from '@/components/CaseCard';
import ProfessionalCard from '@/components/ProfessionalCard';
import CaseGraphVisualization from '@/components/CaseGraphVisualization';
import SimulatorView from '@/components/SimulatorView';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';

// Types
interface Case {
  id: string;
  title: string;
  jurisdiction: string;
  status: 'active' | 'completed' | 'pending';
  year: number;
}

interface Professional {
  id: string;
  name: string;
  role: 'judge' | 'lawyer' | 'prosecutor';
  casesCount: number;
  successRate: number;
}

// Hardcoded Data
const PROFESSIONALS: Professional[] = [
  {
    id: 'prof-1',
    name: 'Dra. Carla Mendoza',
    role: 'judge',
    casesCount: 67,
    successRate: 94,
  },
  {
    id: 'prof-2',
    name: 'Dr. Roberto Aguilar',
    role: 'lawyer',
    casesCount: 45,
    successRate: 92,
  },
  {
    id: 'prof-3',
    name: 'Dr. Fernando Estrada',
    role: 'prosecutor',
    casesCount: 38,
    successRate: 87,
  },
  {
    id: 'prof-4',
    name: 'Dra. Sofía Reyes',
    role: 'lawyer',
    casesCount: 52,
    successRate: 96,
  },
  {
    id: 'prof-5',
    name: 'Dr. Miguel Torres',
    role: 'judge',
    casesCount: 71,
    successRate: 91,
  },
  {
    id: 'prof-6',
    name: 'Dra. Patricia Gómez',
    role: 'prosecutor',
    casesCount: 43,
    successRate: 89,
  },
];

const CASES: Case[] = [
  {
    id: 'case-001',
    title: 'Impugnación de Paternidad (Flavio)',
    jurisdiction: 'Juzgado de Familia - Distrito 1',
    status: 'active',
    year: 2024,
  },
  {
    id: 'case-002',
    title: 'Litigio de Herencia Contenciosa',
    jurisdiction: 'Tribunal de Justicia - Distrito 2',
    status: 'pending',
    year: 2024,
  },
  {
    id: 'case-003',
    title: 'Demanda por Negligencia Médica',
    jurisdiction: 'Juzgado Civil - Distrito 1',
    status: 'completed',
    year: 2023,
  },
  {
    id: 'case-004',
    title: 'Resolución de Contrato Laboral',
    jurisdiction: 'Juzgado de lo Laboral - Distrito 3',
    status: 'active',
    year: 2024,
  },
  {
    id: 'case-005',
    title: 'Tutela de Menores en Peligro',
    jurisdiction: 'Juzgado de Familia - Distrito 2',
    status: 'completed',
    year: 2023,
  },
  {
    id: 'case-006',
    title: 'Disputa de Propiedad Inmueble',
    jurisdiction: 'Tribunal Superior - Distrito 1',
    status: 'pending',
    year: 2024,
  },
];

const CASE_NODES = [
  {
    id: 1,
    title: 'Demanda Inicial',
    description: 'Se presenta la demanda de impugnación de paternidad ante el juzgado competente con toda la documentación requerida.',
    laws: ['Código de Familia', 'Ley de Procedimiento Civil'],
    actors: ['Dr. Roberto Aguilar', 'Dra. Carla Mendoza'],
    date: '2024-01-10',
  },
  {
    id: 2,
    title: 'Admisión de Demanda',
    description: 'El juzgado revisa y admite la demanda como válida para procesamiento.',
    laws: ['Artículos 1-50 del Código de Familia'],
    actors: ['Dra. Carla Mendoza'],
    date: '2024-01-20',
  },
  {
    id: 3,
    title: 'Prueba de ADN Ordenada',
    description: 'Se ordena la realización de una prueba de ADN en laboratorio certificado para esclarecer la paternidad.',
    laws: ['Normas de Análisis Genético', 'Código de Procedimiento'],
    actors: ['Dr. Roberto Aguilar', 'Laboratorio Certificado'],
    date: '2024-02-01',
  },
  {
    id: 4,
    title: 'Bloqueo Procesal Temporal',
    description: 'Se suspende el proceso mientras se realizan análisis genéticos exhaustivos.',
    laws: ['Código de Familia - Artículo 125'],
    actors: ['Dra. Carla Mendoza'],
    date: '2024-02-15',
  },
  {
    id: 5,
    title: 'Presentación de Pruebas',
    description: 'Se presentan los resultados de ADN y todas las pruebas documentales ante el juzgado.',
    laws: ['Leyes de Prueba', 'Código Procesal'],
    actors: ['Dr. Roberto Aguilar', 'Laboratorio Certificado'],
    date: '2024-03-01',
  },
  {
    id: 6,
    title: 'Sentencia Final',
    description: 'El juez dicta sentencia basada en todas las pruebas presentadas y la ley aplicable.',
    laws: ['Código de Familia - Artículos 200-250'],
    actors: ['Dra. Carla Mendoza'],
    date: '2024-03-20',
  },
];

const LIBRARY_ITEMS = [
  { id: 1, title: 'Código de Familia 2024', type: 'Ley', year: 2024 },
  { id: 2, title: 'Código de Procedimiento Civil', type: 'Ley', year: 2023 },
  { id: 3, title: 'Derecho Familiar: Guía Práctica', type: 'Guía', year: 2024 },
  { id: 4, title: 'Impugnación de Paternidad - Tutorial', type: 'Video', year: 2024 },
  { id: 5, title: 'Normas de Análisis Genético', type: 'Ley', year: 2023 },
  { id: 6, title: 'Proceso Legal Paso a Paso', type: 'Video', year: 2024 },
];

export default function Home() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<string | null>(null);
  const [highlightActor, setHighlightActor] = useState<string | null>(null);

  const selectedCase = CASES.find((c) => c.id === selectedCaseId);
  const selectedProfessional = PROFESSIONALS.find((p) => p.id === selectedProfessionalId);

  const handleCaseClick = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentView('detalle-caso');
    setHighlightActor(null);
  };

  const handleProfessionalClick = (professionalId: string) => {
    setSelectedProfessionalId(professionalId);
    setCurrentView('perfil-profesional');
  };

  const handleActorClick = (actorName: string) => {
    const prof = PROFESSIONALS.find((p) => p.name === actorName);
    if (prof) {
      setHighlightActor(actorName);
    }
  };

  const handleNavigateToProfessional = (professionalId: string) => {
    handleProfessionalClick(professionalId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navigation currentView={currentView} onNavigate={(view) => {
        setCurrentView(view);
        setSelectedCaseId(null);
        setSelectedProfessionalId(null);
        setHighlightActor(null);
      }} />

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 pb-12">
        <AnimatePresence mode="wait">
          {/* HOME */}
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 lg:p-12"
            >
              {/* Hero Section */}
              <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-slate-700/50 p-12 lg:p-20 backdrop-blur-xl">
                  <motion.div
                    className="absolute inset-0 opacity-30 bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <div className="relative z-10">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                      className="inline-block mb-6"
                    >
                      <Sparkles className="text-blue-400" size={48} />
                    </motion.div>
                    <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-white">
                      Rutas de Justicia
                    </h1>
                    <p className="text-xl text-slate-300 mb-8 max-w-2xl">
                      Plataforma cívica interactiva que te guía a través de los procesos
                      legales complejos con claridad, transparencia y precisión.
                    </p>
                    <motion.button
                      onClick={() => setCurrentView('simulador')}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center gap-3"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ir al Simulador IA <ArrowRight size={24} />
                    </motion.button>
                  </div>
                </div>
              </motion.section>

              {/* Casos de Alto Impacto */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-8 text-white">
                  Casos de Alto Impacto Recientes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {CASES.slice(0, 3).map((caseItem) => (
                    <div
                      key={caseItem.id}
                      onClick={() => handleCaseClick(caseItem.id)}
                    >
                      <CaseCard {...caseItem} onClick={() => { }} />
                    </div>
                  ))}
                </div>
              </motion.section>
            </motion.div>
          )}

          {/* CASOS */}
          {currentView === 'casos' && (
            <motion.div
              key="casos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 lg:p-12"
            >
              <motion.h1
                className="text-4xl font-bold mb-2 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Portal de Casos
              </motion.h1>
              <p className="text-slate-300 mb-12">
                Explora todos los casos documentados en nuestra plataforma
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CASES.map((caseItem) => (
                  <div
                    key={caseItem.id}
                    onClick={() => handleCaseClick(caseItem.id)}
                  >
                    <CaseCard {...caseItem} onClick={() => { }} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ABOGADOS */}
          {currentView === 'abogados' && (
            <motion.div
              key="abogados"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 lg:p-12"
            >
              <motion.h1
                className="text-4xl font-bold mb-2 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Directorio de Profesionales
              </motion.h1>
              <p className="text-slate-300 mb-12">
                Conoce a los expertos legales que están transformando el sistema de justicia
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROFESSIONALS.map((professional) => (
                  <div
                    key={professional.id}
                    onClick={() => handleProfessionalClick(professional.id)}
                  >
                    <ProfessionalCard
                      {...professional}
                      onClick={() => { }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* INFORMACIÓN */}
          {currentView === 'informacion' && (
            <motion.div
              key="informacion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 lg:p-12"
            >
              <motion.h1
                className="text-4xl font-bold mb-2 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Biblioteca Legal
              </motion.h1>
              <p className="text-slate-300 mb-12">
                Accede a recursos legales, videos educativos y documentos de referencia
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LIBRARY_ITEMS.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    className="backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 hover:border-slate-600 transition-all cursor-pointer group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -8 }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        className="p-3 bg-slate-800/50 rounded-lg group-hover:bg-blue-500/20 transition-colors"
                        whileHover={{ rotate: 12 }}
                      >
                        <BookOpen className="text-blue-400" size={24} />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white mb-1">{item.title}</h3>
                        <div className="flex justify-between">
                          <span className="text-xs bg-slate-800/50 text-slate-300 px-2 py-1 rounded">
                            {item.type}
                          </span>
                          <span className="text-xs text-slate-400">{item.year}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* DETALLE CASO */}
          {currentView === 'detalle-caso' && selectedCase && (
            <motion.div
              key="detalle-caso"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 lg:p-12"
            >
              <motion.button
                onClick={() => {
                  setCurrentView('casos');
                  setSelectedCaseId(null);
                }}
                className="mb-8 px-4 py-2 text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                whileHover={{ x: -4 }}
              >
                ← Volver a Casos
              </motion.button>

              <motion.h1
                className="text-4xl font-bold mb-2 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {selectedCase.title}
              </motion.h1>
              <p className="text-slate-300 mb-12">{selectedCase.jurisdiction}</p>

              <CaseGraphVisualization
                nodes={CASE_NODES}
                highlightActor={highlightActor}
                onActorClick={(actor) => {
                  setHighlightActor(actor);
                  const prof = PROFESSIONALS.find(
                    (p) =>
                      p.name.trim().toLowerCase() === actor.trim().toLowerCase() ||
                      p.name.toLowerCase().includes(actor.toLowerCase()) ||
                      actor.toLowerCase().includes(p.name.toLowerCase())
                  );
                  if (prof) {
                    handleProfessionalClick(prof.id);
                  }
                }}
              />
            </motion.div>
          )}

          {/* PERFIL PROFESIONAL */}
          {currentView === 'perfil-profesional' && selectedProfessional && (
            <motion.div
              key="perfil-profesional"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 lg:p-12"
            >
              <motion.button
                onClick={() => {
                  setCurrentView('abogados');
                  setSelectedProfessionalId(null);
                }}
                className="mb-8 px-4 py-2 text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                whileHover={{ x: -4 }}
              >
                ← Volver a Profesionales
              </motion.button>

              <motion.div
                className="backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 bg-slate-900/30 mb-12"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                      {selectedProfessional.name}
                    </h1>
                    <p className="text-lg text-slate-300">
                      {selectedProfessional.role === 'judge' && 'Juez/Jueza'}
                      {selectedProfessional.role === 'lawyer' && 'Abogado/Abogada'}
                      {selectedProfessional.role === 'prosecutor' && 'Fiscal'}
                    </p>
                  </div>
                  <motion.div
                    className="text-right"
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="text-sm text-slate-400 mb-2">Tasa de Éxito</p>
                    <p className="text-4xl font-bold text-green-400">
                      {selectedProfessional.successRate}%
                    </p>
                  </motion.div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <p className="text-slate-400 text-sm mb-1">Casos aaen Plataforma</p>
                    <p className="text-2xl font-bold text-white">
                      {selectedProfessional.casesCount}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <p className="text-slate-400 text-sm mb-1">Especialidad</p>
                    <p className="text-lg font-bold text-blue-400">Derecho Familiar</p>
                  </div>
                </div>
              </motion.div>

              <h2 className="text-2xl font-bold text-white mb-6">Casos en los que ha Intervenido</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CASES.filter((c) =>
                  CASE_NODES.some((n) =>
                    n.actors.includes(selectedProfessional.name)
                  )
                ).length > 0 ? (
                  CASES.filter((c) =>
                    CASE_NODES.some((n) =>
                      n.actors.includes(selectedProfessional.name)
                    )
                  ).map((caseItem) => (
                    <div
                      key={caseItem.id}
                      onClick={() => handleCaseClick(caseItem.id)}
                    >
                      <CaseCard {...caseItem} onClick={() => { }} />
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 col-span-full">
                    No hay casos asociados a este profesional en esta simulación.
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* SIMULADOR */}
          {currentView === 'simulador' && (
            <motion.div
              key="simulador"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 lg:p-12"
            >
              <SimulatorView
                onNavigateToProfile={handleNavigateToProfessional}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
