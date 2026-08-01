'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [userRole, setUserRole] = useState<'citizen' | 'professional'>('citizen');

  // Interactive flow states
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<'credentials' | 'google' | 'ciudadania' | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Auto redirect simulation
  useEffect(() => {
    if (alert?.type === 'success') {
      const timer = setTimeout(() => {
        router.push('/');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [alert, router]);

  const validateEmail = (emailStr: string) => {
    return /\S+@\S+\.\S+/.test(emailStr);
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    if (!email.trim() || !password.trim()) {
      setAlert({
        type: 'error',
        message: 'Por favor complete todos los campos obligatorios.',
      });
      return;
    }

    if (!validateEmail(email)) {
      setAlert({
        type: 'error',
        message: 'El formato de correo electrónico no es válido.',
      });
      return;
    }

    if (password.length < 6) {
      setAlert({
        type: 'error',
        message: 'La contraseña debe tener al menos 6 caracteres.',
      });
      return;
    }

    // Start simulation
    setLoading(true);
    setLoadingType('credentials');

    setTimeout(() => {
      setLoading(false);
      setLoadingType(null);
      setAlert({
        type: 'success',
        message: `¡Sesión iniciada con éxito! Bienvenido, ${email.split('@')[0]}. Redirigiendo al portal...`,
      });
    }, 1800);
  };

  const handleGoogleLogin = () => {
    setAlert(null);
    setLoading(true);
    setLoadingType('google');

    setTimeout(() => {
      setLoading(false);
      setLoadingType(null);
      setAlert({
        type: 'success',
        message: 'Conectado con cuenta de Google con éxito. Redirigiendo al portal...',
      });
    }, 1500);
  };

  const handleCiudadaniaLogin = () => {
    setAlert(null);
    setLoading(true);
    setLoadingType('ciudadania');

    setTimeout(() => {
      setLoading(false);
      setLoadingType(null);
      setAlert({
        type: 'success',
        message: 'Autenticación exitosa mediante la Plataforma de Ciudadanía Digital de Bolivia (AGETIC). Redirigiendo al portal...',
      });
    }, 2000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden select-none">
      
      {/* ── Glowing Floating Background Orbs ── */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/15 blur-[120px]"
          animate={{
            x: [0, 80, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[140px]"
          animate={{
            x: [0, -100, 0],
            y: [0, -60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ── Page Layout: Center Login Box with Left Decorative Panel on Desktop ── */}
      <motion.div
        className="relative z-10 w-full max-w-5xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        
        {/* Left Side: Brand and Info Panel (Desktop Only) */}
        <div className="hidden lg:flex lg:col-span-5 relative bg-gradient-to-b from-blue-950 via-slate-900 to-purple-950 p-12 flex-col justify-between border-r border-slate-200 dark:border-slate-800/80 overflow-hidden">
          
          {/* Decorative grid pattern */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div>
            <motion.button
              onClick={() => router.push('/')}
              className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-12"
              whileHover={{ x: -4 }}
            >
              <ArrowLeft size={16} /> Volver al portal
            </motion.button>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                <ShieldCheck className="text-blue-400" size={24} />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
                Acceso Integrado a la Justicia
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Inicia sesión de forma segura y accede a tu historial de casos, consultas con profesionales y simulaciones legales con validez digital.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/30">
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Identidad Segura</p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Compatible con la firma electrónica y la credencial de Ciudadanía Digital de Bolivia para trámites de valor legal.
              </p>
            </div>

            <div className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} Rutas de Justicia. Plataforma Cívica.
            </div>
          </div>
        </div>

        {/* Right Side: Login form */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          
          {/* Mobile Back Button */}
          <div className="flex justify-between items-center mb-8 lg:hidden">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> Volver
            </button>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Portal de Justicia
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Ingresar al Sistema</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Selecciona tu tipo de perfil e introduce tus credenciales
            </p>
          </div>

          {/* User Type Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-950/80 rounded-xl mb-6 border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                setUserRole('citizen');
                setAlert(null);
              }}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                userRole === 'citizen'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Soy Ciudadano
            </button>
            <button
              type="button"
              onClick={() => {
                setUserRole('professional');
                setAlert(null);
              }}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                userRole === 'professional'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Soy Profesional
            </button>
          </div>

          {/* Feedback Alerts */}
          <AnimatePresence mode="wait">
            {alert && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-xl flex gap-3 mb-6 border ${
                  alert.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-300'
                }`}
              >
                {alert.type === 'success' ? (
                  <CheckCircle2 className="flex-shrink-0 mt-0.5" size={18} />
                ) : (
                  <AlertCircle className="flex-shrink-0 mt-0.5" size={18} />
                )}
                <span className="text-sm leading-relaxed">{alert.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Correo Electrónico
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  Contraseña
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    setAlert({ type: 'error', message: 'La recuperación de contraseña es un simulacro.' });
                  }}
                  className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-11 pr-11 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me Box */}
            <div className="flex items-center">
              <input
                id="remember-checkbox"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4.5 h-4.5 text-blue-600 bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 rounded focus:ring-blue-500/30 focus:ring-2 focus:ring-offset-0 accent-blue-500 cursor-pointer"
                disabled={loading}
              />
              <label
                htmlFor="remember-checkbox"
                className="ml-2.5 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 cursor-pointer"
              >
                Recordarme en este dispositivo
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl text-sm transition-all shadow-lg hover:shadow-blue-500/10 flex justify-center items-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ y: -1 }}
            >
              {loading && loadingType === 'credentials' ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Ingresando...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </motion.button>
          </form>

          {/* Separator */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800/80"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900/60 px-3 text-slate-500 font-semibold">
                O continuar con
              </span>
            </div>
          </div>

          {/* External Integrations */}
          <div className="space-y-3.5">
            
            {/* Ciudadanía Digital de Bolivia */}
            <motion.button
              type="button"
              onClick={handleCiudadaniaLogin}
              disabled={loading}
              className="w-full bg-white hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-white text-slate-800 font-semibold py-2.5 px-4 rounded-xl border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              whileHover={{ y: -1 }}
            >
              {loading && loadingType === 'ciudadania' ? (
                <div className="flex items-center gap-2 text-slate-600">
                  <Loader2 className="animate-spin text-slate-600" size={18} />
                  <span>Validando Ciudadanía Digital...</span>
                </div>
              ) : (
                <>
                  <img
                    src="https://ciudadaniadigital.bo/img/logos/CDV3-H.svg"
                    alt="Ciudadanía Digital Bolivia"
                    className="h-7 object-contain"
                  />
                </>
              )}
            </motion.button>

            {/* Google Login */}
            <motion.button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-[#1e293b]/40 dark:hover:bg-[#1e293b]/70 border border-slate-200 dark:border-slate-800 disabled:opacity-50 text-slate-800 dark:text-white font-medium py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              whileHover={{ y: -1 }}
            >
              {loading && loadingType === 'google' ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Conectando con Google...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Iniciar sesión con Google</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <HelpCircle size={14} />
            <span>¿Necesitas ayuda para registrarte?</span>
            <a
              href="#support"
              onClick={(e) => {
                e.preventDefault();
                setAlert({ type: 'success', message: 'Soporte técnico contactado (simulacro).' });
              }}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 hover:underline font-semibold"
            >
              Contactar Soporte
            </a>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
