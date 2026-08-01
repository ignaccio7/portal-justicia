# Arquitectura Técnica: Rutas de Justicia

## Visión General

```
┌─────────────────────────────────────────────┐
│         app/page.tsx                        │
│  (Estado principal + Orquestación de vistas)│
└────────────────┬────────────────────────────┘
                 │
     ┌───────────┼───────────┐
     │           │           │
     ▼           ▼           ▼
┌─────────┐ ┌──────────┐ ┌──────────────┐
│ Navigation  │ View Router  │Data/Hardcoded│
│ (Sidebar)  │ (7 vistas) │ (Arrays)      │
└─────────┘ └──────────┘ └──────────────┘
     │           │           │
     └───────────┼───────────┘
                 │
     ┌───────────┼───────────┐
     │           │           │
     ▼           ▼           ▼
 [Components]  [Animations]  [Styles]
 [Cards]       [Framer Motion] [Tailwind]
 [Graph]       [Transitions]   [CSS Vars]
 [Simulator]   [Hover/Active]  [Responsive]
```

## Flujo de Estado

### Estado Principal (page.tsx)
```typescript
const [currentView, setCurrentView] = useState<View>('home');
const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
const [selectedProfessionalId, setSelectedProfessionalId] = useState<string | null>(null);
```

### Vista (View Type)
```typescript
type View = 'home' | 'cases' | 'professionals' | 'info' | 
             'caseDetail' | 'professionalDetail' | 'simulator';
```

**Transiciones de Vista:**
1. Usuario hace clic en Caso → `setCurrentView('caseDetail')`
2. Usuario hace clic en Profesional → `setCurrentView('professionalDetail')`
3. Usuario hace clic en Simulador → `setCurrentView('simulator')`
4. Usuario hace clic en Logo/Home → `setCurrentView('home')`

### Selección de Datos
```typescript
const selectedCase = selectedCaseId 
  ? CASES.find(c => c.id === selectedCaseId) 
  : null;

const selectedProfessional = selectedProfessionalId 
  ? PROFESSIONALS.find(p => p.id === selectedProfessionalId) 
  : null;
```

## Estructura de Componentes

### 1. Navigation Component
**Ubicación:** `components/Navigation.tsx`

**Props:**
```typescript
interface NavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
}
```

**Responsabilidades:**
- Renderizar sidebar en desktop (hidden en móvil)
- Mostrar botones para cambiar de vista
- Renderizar topbar en móvil
- Destacar vista actual

**Comunicación:**
- Recibe `currentView` y `onViewChange`
- Llama a `onViewChange('home')` cuando se hace clic en botón

---

### 2. CaseCard Component
**Ubicación:** `components/CaseCard.tsx`

**Props:**
```typescript
interface CaseCardProps {
  case: Case;
  isSelected?: boolean;
  onClick?: () => void;
}
```

**Responsabilidades:**
- Mostrar información del caso (título, jurisdicción, estado, año)
- Aplicar estilos según estado (active/pending/completed)
- Manejar interacción (onClick)
- Animación Framer Motion en hover

**Datos Necesarios:**
```typescript
interface Case {
  id: string;
  title: string;
  jurisdiction: string;
  status: 'active' | 'completed' | 'pending';
  year: number;
}
```

---

### 3. ProfessionalCard Component
**Ubicación:** `components/ProfessionalCard.tsx`

**Props:**
```typescript
interface ProfessionalCardProps {
  professional: Professional;
  isSelected?: boolean;
  onClick?: () => void;
}
```

**Responsabilidades:**
- Mostrar nombre, rol, casos, tasa de éxito
- Usar colores diferentes por rol (Juez/Abogado/Fiscal)
- Mostrar avatar visual (inicial del nombre)
- Animaciones de hover

**Mapeo de Colores por Rol:**
```typescript
const roleColors = {
  judge: 'from-purple-600 to-blue-600',      // Gradiente púrpura-azul
  lawyer: 'from-blue-600 to-cyan-600',       // Gradiente azul-cian
  prosecutor: 'from-red-600 to-orange-600',  // Gradiente rojo-naranja
};
```

---

### 4. CaseGraphVisualization Component
**Ubicación:** `components/CaseGraphVisualization.tsx`

**Props:**
```typescript
interface CaseGraphVisualizationProps {
  caseData: Case;
  onNodeClick?: (nodeId: number) => void;
}
```

**Responsabilidades:**
- Renderizar grafo SVG con 6 nodos
- Conectar nodos con líneas
- Mostrar modal al hacer clic en nodo
- Permitir filtrar actores por rol
- Animaciones al interactuar

**Estructura del Grafo:**
```typescript
const graphNodes = [
  {
    id: 1,
    title: 'Demanda',
    description: '...',
    laws: ['Art. 123 Código Civil', '...'],
    actors: ['Demandante', 'Juez', '...'],
    date: '2024-01-15',
    position: { x: 100, y: 50 },
  },
  // ... 5 nodos más
];
```

**Modal de Nodo:**
- Se abre al hacer clic
- Muestra: Título, descripción, leyes, actores, fecha
- Cierra con Escape o click fuera
- Permite filtrar actores por rol

---

### 5. SimulatorView Component
**Ubicación:** `components/SimulatorView.tsx`

**Props:**
```typescript
interface SimulatorViewProps {
  onBack?: () => void;
}
```

**Responsabilidades:**
- Mostrar 3 pasos del simulador
- Manejar input del usuario
- Mostrar casos similares encontrados
- Generar y mostrar simulación final con grafo

**Pasos (simulatorStep: 1 | 2 | 3):**

1. **Paso 1 - Problema:**
   - Textarea para ingresar descripción del caso
   - Botón "Buscar Casos Similares" habilitado cuando hay texto

2. **Paso 2 - Casos Similares:**
   - Mostrar casos históricos relevantes
   - Cards con información
   - Botón "Generar Simulación de mi Caso"

3. **Paso 3 - Simulación:**
   - Disclaimer de IA prominente
   - Grafo del caso simulado (6 nodos)
   - Abogados recomendados
   - Botón para volver

---

## Flujo de Datos

### Hard-coded Data (Sin API)
Toda la data está en `app/page.tsx`:

```typescript
// Definición
const PROFESSIONALS: Professional[] = [...]
const CASES: Case[] = [...]

// Uso en componentes
const selectedProfessional = PROFESSIONALS.find(p => p.id === selectedProfessionalId);
const caseDetails = CASES.find(c => c.id === selectedCaseId);
```

**Ventajas:**
- No requiere API/base de datos
- Desarrollo rápido
- Predecible y testeable

**Limitación:**
- Para producción real, requeriría API REST/GraphQL

---

## Animaciones

### Sistema de Animaciones
Todas usan Framer Motion con transiciones suaves:

**Tipos:**
1. **Fade In:** `opacity: 0 → 1`
2. **Slide In:** `y: 10 → 0` (desde abajo)
3. **Scale In:** `scale: 0.95 → 1` (desde pequeño)
4. **Stagger:** Hijos animan con delay

**Duración Estándar:**
- Rápidas: 0.2s (hover, transiciones)
- Normales: 0.3-0.4s (entrada, salida)
- Lentas: 0.6s (modales)

### Ejemplos en Código

**Transición de Vista:**
```typescript
<AnimatePresence>
  {currentView === 'home' && <HomePage key="home" />}
  {currentView === 'cases' && <CasesView key="cases" />}
</AnimatePresence>
```

**Animación de Card:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.02, y: -5 }}
  transition={{ duration: 0.3 }}
>
```

---

## Capa de Estilos

### Tailwind CSS v4
- **Configuración:** `globals.css` (no hay `tailwind.config.ts`)
- **Tema:** Define en `@theme { }` dentro del CSS
- **Colores:** Usan `oklch()` para mejor percepción

### Estructura CSS

```css
/* globals.css */

@import 'tailwindcss';

@theme inline {
  --color-background: oklch(...);
  --color-slate-900: oklch(...);
  /* ... más colores */
}

@layer base {
  body {
    @apply bg-background text-foreground;
  }
}
```

### Clases Reutilizables
No hay clases CSS personalizadas. Todo usa Tailwind:

```html
<!-- NO HAGAS -->
<div class="card">...</div>

<!-- HAZLO -->
<div class="bg-slate-900 border border-slate-700 rounded-lg p-6">...</div>
```

---

## Responsividad

### Breakpoints
```typescript
// Tailwind v4 defaults
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Patrones Usado

**Sidebar Desktop/Topbar Mobile:**
```html
<div class="hidden lg:block w-64"><!-- Sidebar --></div>
<div class="lg:hidden"><!-- Topbar --></div>
```

**Grid Adaptativo:**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

**Padding Adaptativo:**
```html
<div class="p-4 md:p-6 lg:p-8">
```

---

## TypeScript

### Type Safety
Se usa TypeScript strict mode (`tsconfig.json`):

```typescript
// ✅ CORRECTO
const [view, setView] = useState<View>('home');

// ❌ INCORRECTO
const [view, setView] = useState('home'); // Sin tipo
```

### Interfaces Clave
```typescript
type View = 'home' | 'cases' | 'professionals' | 
             'info' | 'caseDetail' | 'professionalDetail' | 'simulator';

interface Case { id: string; title: string; ... }
interface Professional { id: string; name: string; ... }
interface GraphNode { id: number; title: string; ... }
```

---

## Imports y Path Aliases

### Path Aliases Configurados
En `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Uso
```typescript
// ✅ CORRECTO
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';

// ❌ INCORRECTO
import Navigation from '../components/Navigation';
import { Button } from './components/ui/button';
```

---

## Performance

### Optimizaciones Aplicadas
1. **Componentes Funcionales:** Sin re-renders innecesarios
2. **Memoization:** `useMemo` para datos computados (si era necesario)
3. **Code Splitting:** Cada view es independiente
4. **Image Optimization:** Lucide icons (SVG, ligero)

### Posibles Mejoras Futuras
1. Lazy loading de vistas
2. Virtual scrolling para listas grandes
3. Server components (Next.js 16)
4. Image optimization con `next/image`

---

## Testing (Futuro)

**Estructura Recomendada:**
```
tests/
├── unit/
│   ├── CaseCard.test.tsx
│   └── ...
├── integration/
│   ├── navigation.test.tsx
│   └── ...
└── e2e/
    └── full-flow.spec.ts
```

---

## Despliegue

### En Vercel (Recomendado)
```bash
# Push a GitHub
git push origin main

# Vercel auto-deploya
# O: vercel deploy
```

### Variables de Entorno
Actualmente NO hay variables de entorno (.env.local).  
Si añades una API en el futuro:
```env
NEXT_PUBLIC_API_URL=https://api.ejemplo.com
API_SECRET_KEY=xxxx
```

---

## Checklist para Nuevos Cambios

- [ ] ¿El cambio afecta múltiples vistas? → Actualizar `page.tsx`
- [ ] ¿Es un nuevo componente? → Crear en `components/`
- [ ] ¿Cambios de estilo? → Usar Tailwind, NO CSS custom
- [ ] ¿Animaciones? → Usar Framer Motion
- [ ] ¿Tipos nuevos? → Definir interfaces en el archivo
- [ ] ¿Path imports? → Usar `@/` alias
- [ ] ¿Testing? → Crear en `__tests__/`
- [ ] ¿Build local?  → `pnpm build` sin errores
- [ ] ¿Compilación TypeScript?  → `pnpm tsc --noEmit` sin errores

---

**Última actualización:** 2026-08-01  
**Mantenido por:** v0 AI
