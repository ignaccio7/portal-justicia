# Contexto del Proyecto: Rutas de Justicia

## Descripción General

**Rutas de Justicia** es una plataforma cívica interactiva que guía a los usuarios a través de procesos legales complejos con claridad, transparencia y precisión. Utiliza visualización de grafos, simulaciones de IA y un directorio de profesionales legales.

**Stack Tecnológico:**
- **Framework:** Next.js 16 (App Router)
- **Frontend:** React 19 + TypeScript
- **Estilos:** Tailwind CSS v4
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **Componentes UI:** shadcn/ui (solo Button.tsx por defecto)

## Estructura del Proyecto

```
/vercel/share/v0-project/
├── app/
│   ├── layout.tsx           # Layout raíz con tema oscuro
│   ├── page.tsx             # Página principal - estado y lógica central
│   ├── globals.css          # Tema y variables globales (Tailwind v4)
│
├── components/
│   ├── Navigation.tsx       # Sidebar + Topbar responsivo
│   ├── CaseCard.tsx         # Tarjetas de casos
│   ├── ProfessionalCard.tsx # Tarjetas de profesionales
│   ├── CaseGraphVisualization.tsx # Grafo interactivo
│   ├── SimulatorView.tsx    # Simulador de IA (3 pasos)
│   └── ui/
│       └── button.tsx       # Componente Button (shadcn/ui)
│
├── lib/
│   └── utils.ts             # Utilidad cn() para Tailwind
│
├── package.json             # Dependencias
├── tsconfig.json            # Configuración TypeScript
├── next.config.mjs          # Configuración Next.js
├── tailwind.config.ts       # Configuración Tailwind
```

## Tipos de Datos

### Professional
```typescript
interface Professional {
  id: string;
  name: string;
  role: 'judge' | 'lawyer' | 'prosecutor';
  casesCount: number;
  successRate: number;
}
```

### Case
```typescript
interface Case {
  id: string;
  title: string;
  jurisdiction: string;
  status: 'active' | 'completed' | 'pending';
  year: number;
}
```

### Graph Node (en CaseGraphVisualization)
```typescript
interface GraphNode {
  id: number;
  title: string;
  description: string;
  laws: string[];
  actors: string[];
  date: string;
  position: { x: number; y: number };
}
```

## Las 7 Vistas Principales

1. **Inicio** - Hero section + casos destacados + acciones principales
2. **Casos** - Grilla de todos los casos con filtros
3. **Profesionales** - Directorio de profesionales con especialidades
4. **Información** - Biblioteca legal con recursos educativos
5. **Detalle Caso** - Visualización completa del grafo de un caso
6. **Perfil Profesional** - Bio del profesional + estadísticas + casos
7. **Simulador IA** - Flujo interactivo: problema → casos similares → simulación

El estado de vista se maneja con `currentView` en `page.tsx`:
```typescript
const [currentView, setCurrentView] = useState<View>('home');
```

## Data Hardcodeada

### Ubicaciones
- `app/page.tsx` líneas 30-73: Array `PROFESSIONALS` (6 profesionales)
- `app/page.tsx` líneas 75-140: Array `CASES` (6 casos)
- `components/CaseGraphVisualization.tsx` líneas 1-100: Datos del grafo (6 nodos)
- `components/SimulatorView.tsx` líneas 1-50: Datos de recursos legales

### Actualización de Data
Si necesitas agregar más casos, profesionales o recursos:
1. Ve a la ubicación mencionada arriba
2. Sigue el patrón exacto (mismo tipo de datos, mismos campos)
3. Asigna IDs únicos (ej: 'case-007' para nuevo caso)
4. El componente renderizará automáticamente

## Tema y Diseño

### Paleta de Colores (Tema Oscuro)
- **Fondo:** `#0f172a` (slate-950) - Degradado a `#0f172a`
- **Card:** `#1e293b` (slate-900) - Para contenedores
- **Texto Principal:** `#f1f5f9` (slate-100) - Alto contraste
- **Texto Secundario:** `#cbd5e1` (slate-300) - Desaturado
- **Accent:** `#3b82f6` (blue-500) - Para botones primarios
- **Accent Hover:** `#1e40af` (blue-800) - Estados hover

### Tipografía
- **Sans (Cuerpo):** Geist (Next.js Google Fonts)
- **Mono (Código):** Geist Mono
- **Estilos:** Bold para títulos (font-bold), Regular para cuerpo

### Espaciado y Border-Radius
- **Border Radius:** `rounded-lg` para cards, `rounded-xl` para modales
- **Gap/Espaciado:** Escala Tailwind estándar (gap-4, p-6, etc.)

## Convenciones de Código

### Componentes
- **Ubicación:** `/components/`
- **Nombre:** PascalCase (ej: `MyComponent.tsx`)
- **Estructura:** Exportación por defecto
- **Props:** Usar interfaces TS (no React.FC)
- **Animaciones:** Framer Motion para transiciones, Tailwind para estados

### Animaciones Framer Motion
Patrones usados en el proyecto:
```typescript
import { motion, AnimatePresence } from 'framer-motion';

// Fade + Slide in
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 10 }}
  transition={{ duration: 0.3 }}
>
```

### Estados con React Hooks
- `useState` para estado local de componentes
- `currentView` principal en `page.tsx` para navegación entre vistas
- `selectedProfessional` y `selectedCase` para detalles

### Imports
```typescript
// Siempre usa path aliases
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
```

## Instrucciones Críticas para Cambios

### ✅ Puedes hacer:
1. Agregar más casos, profesionales o recursos legales (edita los arrays)
2. Modificar estilos de componentes (Tailwind classes)
3. Agregar nuevas animaciones con Framer Motion
4. Crear nuevos componentes siguiendo el patrón existente
5. Cambiar colores en globals.css (Tailwind v4 @theme)

### ❌ NO hagas:
1. **No elimines componentes principales** sin reasignar su funcionalidad
2. **No cambies los nombres de los archivos** de componentes
3. **No uses localStorage** - la data es hardcodeada
4. **No imports directos sin path alias** - siempre usa `@/`
5. **No agregues nuevas fuentes** sin actualizar layout.tsx y globals.css
6. **No rompas las interfaces de tipos** - mantén la compatibilidad

### Cambios Frecuentes

**Para agregar un nuevo caso:**
```typescript
// En app/page.tsx, en el array CASES:
{
  id: 'case-007',
  title: 'Nueva Demanda',
  jurisdiction: 'Tribunal - Distrito X',
  status: 'active',
  year: 2024,
}
```

**Para agregar un nuevo profesional:**
```typescript
// En app/page.tsx, en el array PROFESSIONALS:
{
  id: 'prof-7',
  name: 'Dr. Nombre Apellido',
  role: 'judge', // o 'lawyer' o 'prosecutor'
  casesCount: 50,
  successRate: 90,
}
```

**Para cambiar colores:**
```css
/* En app/globals.css, en .dark { } */
--background: oklch(...); /* Nuevo color */
```

## Dependencias Clave

```json
{
  "framer-motion": "^11.x",
  "lucide-react": "^latest",
  "next": "^16.0.0",
  "react": "^19.0.0",
  "tailwindcss": "^4.0.0"
}
```

## Ejecución Local

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo
pnpm dev  # En http://localhost:3000

# Build
pnpm build

# Start (producción)
pnpm start
```

## Diferencias con Versiones Anteriores

Este proyecto usa **Tailwind v4** que:
- Define temas en `@theme { }` dentro de CSS
- No tiene archivo `tailwind.config.js` (configuración en CSS)
- Los colores se definen con oklch() (mejor perceptibilidad)

Si modificas el tema, **siempre hazlo en globals.css**, no en un config.

## Troubleshooting

### La app no compila
1. Verifica que `pnpm install` se ejecutó
2. Revisa los tipos en `tsconfig.json`
3. Busca errores de import (usa path alias `@/`)

### Los estilos se ven mal
1. Limpia `.next/` y `.turbo/`
2. Reinicia el dev server
3. Revisa que los colores estén en globals.css

### Las animaciones no funcionan
1. Verifica que `framer-motion` está importado
2. Usa `AnimatePresence` para exit animations
3. Revisa la sintaxis de `motion` components

---

**Última actualización:** 2026-08-01  
**Mantenido por:** v0 AI  
**Estado:** En producción y mantenimiento activo
