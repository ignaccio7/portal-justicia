# Guía para IA: Trabajar con Rutas de Justicia

Este documento es para asistentes de IA (como v0, Cursor, Claude, etc.) que necesitan trabajar en este proyecto sin romper nada.

## Resumen Ejecutivo

**Rutas de Justicia** es una plataforma de procesos legales con:
- 7 vistas interactivas (home, cases, professionals, info, caseDetail, professionalDetail, simulator)
- Data hardcodeada (6 casos, 6 profesionales, 6 nodos de grafo)
- Stack: Next.js 16, React 19, TypeScript, Tailwind v4, Framer Motion
- Tema oscuro profesional
- Sin API/Base de Datos (todo hardcoded)

**NO romper:**
1. La estructura de `page.tsx` (estado central)
2. Los arrays `PROFESSIONALS`, `CASES` (ubicación crucial)
3. Los nombres de componentes en `/components/`
4. Path imports (siempre `@/`, nunca relativo)
5. El sistema Tailwind v4 en `globals.css`

---

## Antes de Hacer Cualquier Cambio

### Checklist Inicial
```
☐ Leí context.md completo
☐ Leí DESIGN.md para estándares de estilos
☐ Leí ARCHITECTURE.md para entender flujos
☐ Entiendo dónde está cada cosa (ubicaciones exactas)
☐ Verifico tipos de datos antes de modificar
☐ No cambio nombres de archivos
☐ No elimino imports sin entender el impacto
```

### Preguntas Críticas Antes de Editar
1. **¿Es un cambio visual/estilo?**
   → Modifica Tailwind classes, NO crearás CSS custom
   
2. **¿Es agregar data (caso/profesional)?**
   → Ir a `app/page.tsx` línea 30-140, agregar al array con patrón correcto
   
3. **¿Es un nuevo componente?**
   → Crear en `/components/`, seguir patrón existente, importar en `page.tsx`
   
4. **¿Es cambiar navegación/vistas?**
   → Modificar `currentView` state en `page.tsx`
   
5. **¿Es una animación?**
   → Usar Framer Motion `motion` components, NO crear clases CSS

---

## Estructura de Archivos - ZONAS SEGURAS

### ZONA A: Editar sin Problemas
```
✅ app/page.tsx
   - Agregar casos/profesionales en arrays
   - Cambiar textos y descripciones
   - Modificar lógica de vistas
   - Agregar nuevas vistas (si sigues el patrón)

✅ components/*.tsx (excepto cambiar nombres)
   - Modificar props
   - Agregar validaciones
   - Cambiar renderizado
   - Agregar animaciones

✅ app/globals.css
   - Cambiar colores en @theme { }
   - Modificar variables CSS
   - NO agregar clases personalizadas
```

### ZONA B: Editar con Cuidado
```
⚠️ app/layout.tsx
   - Solo cambiar metadata, title, description
   - NO toques el <html> o <body>
   - NO cambies font imports sin actualizar globals.css

⚠️ tsconfig.json
   - NO modifiques paths aliases
   - NO cambies compiler options

⚠️ next.config.mjs
   - Evitar modificaciones
   - Si necesitas agregar, documenta bien
```

### ZONA C: No Tocar
```
❌ node_modules/ - Nunca edites
❌ .next/ - Build output, autogenerado
❌ package.json - Solo pnpm, no cambiar scripts
❌ package-lock.json / pnpm-lock.yaml - Autogenerado
```

---

## Tareas Comunes

### 1️⃣ Agregar un Nuevo Caso

**Ubicación:** `app/page.tsx` línea 75-140

**Patrón Exacto:**
```typescript
const CASES: Case[] = [
  {
    id: 'case-001',  // ← Único, formato case-XXX
    title: 'Impugnación de Paternidad',  // ← Descriptivo
    jurisdiction: 'Juzgado de Familia - Distrito 1',  // ← Real
    status: 'active',  // ← Solo: active | pending | completed
    year: 2024,  // ← Número
  },
  // ... TUS CASOS AQUÍ
];
```

**Checklist:**
- [ ] ID único (no duplicado)
- [ ] Título descriptivo
- [ ] Jurisdicción válida
- [ ] Status correcto (active/pending/completed)
- [ ] Year es número

**Error Común:**
```typescript
// ❌ MALO - ID duplicado
{ id: 'case-001', ... }

// ✅ BUENO - ID único
{ id: 'case-007', ... }
```

---

### 2️⃣ Agregar un Nuevo Profesional

**Ubicación:** `app/page.tsx` línea 30-73

**Patrón Exacto:**
```typescript
const PROFESSIONALS: Professional[] = [
  {
    id: 'prof-1',  // ← Único, formato prof-X
    name: 'Dra. Carla Mendoza',  // ← Nombre completo
    role: 'judge',  // ← Solo: judge | lawyer | prosecutor
    casesCount: 67,  // ← Número realista
    successRate: 94,  // ← 0-100
  },
  // ... TUS PROFESIONALES AQUÍ
];
```

**Roles y Colores Asociados:**
```typescript
'judge' → Gradiente púrpura-azul
'lawyer' → Gradiente azul-cian
'prosecutor' → Gradiente rojo-naranja
```

---

### 3️⃣ Cambiar Colores del Tema

**Ubicación:** `app/globals.css` línea 50-90 (sección `.dark`)

**Ejemplo - Cambiar Fondo Primario:**
```css
/* ANTES */
.dark {
  --background: oklch(0.145 0 0);  /* Muy oscuro */
}

/* DESPUÉS */
.dark {
  --background: oklch(0.165 0 0);  /* Levemente más claro */
}
```

**NO HAGAS:**
```css
/* ❌ MALO - Añadir colores custom */
.dark {
  --color-custom: #1234ab;
}

/* ✅ BUENO - Usar colores existentes */
/* O cambiar los existentes en @theme */
```

---

### 4️⃣ Crear un Nuevo Componente

**Ubicación:** `components/MyNewComponent.tsx`

**Patrón Requerido:**
```typescript
'use client'; // Si usa hooks (useState, etc)

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { IconName } from 'lucide-react';

interface MyNewComponentProps {
  title: string;
  onClick?: () => void;
}

export default function MyNewComponent({ 
  title, 
  onClick 
}: MyNewComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900 border border-slate-700 rounded-lg p-6"
    >
      <h3 className="text-xl font-bold text-slate-100 mb-4">{title}</h3>
      <Button onClick={onClick}>Click me</Button>
    </motion.div>
  );
}
```

**Checklist:**
- [ ] `'use client'` si usa hooks
- [ ] Imports con `@/` path alias
- [ ] Interface para props
- [ ] Export default del componente
- [ ] Usa Tailwind clases, NO CSS custom
- [ ] Framer Motion para animaciones
- [ ] Importado en `app/page.tsx` si es necesario

---

### 5️⃣ Agregar una Nueva Vista

**Ubicación:** `app/page.tsx` + nuevo componente

**Pasos:**

1. **Crear componente:**
   ```typescript
   // components/MyNewView.tsx
   export default function MyNewView({ onBack }) {
     return <div>Mi vista</div>;
   }
   ```

2. **Actualizar type View:**
   ```typescript
   type View = 'home' | 'cases' | ... | 'myNewView';
   ```

3. **Agregar en renderizado:**
   ```typescript
   <AnimatePresence>
     {currentView === 'myNewView' && (
       <MyNewView key="myNewView" onBack={() => setCurrentView('home')} />
     )}
   </AnimatePresence>
   ```

4. **Agregar botón en Navigation:**
   ```typescript
   // components/Navigation.tsx
   <button onClick={() => onViewChange('myNewView')}>
     Mi Nueva Vista
   </button>
   ```

---

### 6️⃣ Cambiar Estilos de un Componente

**Regla:** Usa Tailwind clases, NUNCA crearás CSS personalizadas.

**Ejemplo - Cambiar Card Colors:**
```typescript
// ANTES
<div className="bg-slate-900 border border-slate-700 rounded-lg p-6">

// DESPUÉS - Más oscuro
<div className="bg-slate-950 border border-slate-600 rounded-lg p-6">

// DESPUÉS - Más colorido
<div className="bg-slate-900 border border-blue-500 rounded-lg p-6 hover:bg-slate-800">
```

**Clases Útiles:**
```
Fondo: bg-slate-900, bg-slate-800, bg-blue-600
Texto: text-slate-100, text-blue-400
Borde: border border-slate-700, border-blue-500
Padding: p-4, p-6, p-8
Radius: rounded-lg, rounded-xl
```

---

### 7️⃣ Agregar Animaciones

**Librería:** Framer Motion (ya instalada)

**Patrón:**
```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 10 }}       // Estado inicial
  animate={{ opacity: 1, y: 0 }}        // Estado final
  exit={{ opacity: 0, y: -10 }}         // Al salir
  transition={{ duration: 0.3 }}        // Duración
  className="..."
>
  Contenido
</motion.div>
```

**Animaciones Comunes:**
```typescript
// Fade in
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}

// Slide in desde abajo
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}

// Scale in
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}

// Stagger children
transition={{ staggerChildren: 0.1 }}
```

---

## Comandos de Desarrollo

```bash
# Instalar dependencias (primera vez)
pnpm install

# Desarrollo local (hot reload)
pnpm dev
# Accede a http://localhost:3000

# Build (verificar que compila)
pnpm build

# Start (producción local)
pnpm start

# Type check
pnpm tsc --noEmit

# Lint (si está configurado)
pnpm lint
```

---

## Debugging - Cómo Verificar que NO Rompiste Nada

### 1. Compila sin Errores
```bash
pnpm build
```
Si hay errores, la consola mostrará dónde exactamente.

### 2. Type Check
```bash
pnpm tsc --noEmit
```
Verifica tipos TypeScript.

### 3. Test Manual
- Abre `http://localhost:3000` (con `pnpm dev` corriendo)
- Navega entre todas las 7 vistas
- Verifica que:
  - [ ] Home carga
  - [ ] Cases muestra todos los casos
  - [ ] Professionals muestra todos
  - [ ] Información carga
  - [ ] Clic en caso → caseDetail con grafo
  - [ ] Clic en profesional → professionalDetail
  - [ ] Simulador funciona (3 pasos)
  - [ ] Volver desde cualquier vista funciona

### 4. Browser Console
Abre DevTools (F12), pestaña Console:
- ¿Hay errores rojos? → Problema grave
- ¿Hay warnings amarillos? → Revisar pero generalmente seguro

---

## Errores Comunes y Cómo Arreglarlos

### Error: "Module not found: @/components/..."
**Causa:** Path alias mal escrito o archivo no existe

**Fix:**
```typescript
// ❌ MALO
import Foo from './components/Foo';

// ✅ BUENO
import Foo from '@/components/Foo';
```

---

### Error: "Expected 1 argument, got 0"
**Causa:** Componente espera props, pero llamaste sin props

**Fix:**
```typescript
// ❌ MALO
<CaseCard />

// ✅ BUENO
<CaseCard case={selectedCase} onClick={() => {}} />
```

---

### Error: "Cannot find type 'View'"
**Causa:** Type no está definido o está fuera de scope

**Fix:** Verifica que `type View = ...` esté definido antes de usarla.

---

### Estilos no se aplican (Tailwind)
**Causa:** 
- Typo en clase Tailwind
- Clase no es válida en Tailwind v4
- Conflicto de especificidad

**Fix:**
```typescript
// ❌ MALO - Typo
className="p-x-4"

// ✅ BUENO
className="px-4"
```

---

### Animación no ocurre
**Causa:**
- Olvidó `<AnimatePresence>`
- Olvidó `key` en componentes animados
- Transición muy rápida (duration: 0)

**Fix:**
```typescript
import { AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {isVisible && <motion.div key="unique-key">...</motion.div>}
</AnimatePresence>
```

---

## Límites y Restricciones

### Qué NO Debe Cambiar (Arquitectura Base)
```
❌ No cambies:
  - Estructura de page.tsx (estado central)
  - Nombres de componentes
  - Ubicación de arrays (PROFESSIONALS, CASES)
  - Path imports (@/)
  - Sistema de Tailwind v4

❌ No agregues:
  - Nueva dependencies sin consultar
  - APIs/Backend (actualmente hardcoded)
  - localStorage/sessionStorage
  - Componentes shadcn/ui extras (excepto si es necesario)
```

### Performance: Límites Reales
```
✅ Actual:
  - 6 casos: Carga al instante
  - 6 profesionales: Sin lag
  - 1 grafo de 6 nodos: Suave

⚠️ Limite Teórico:
  - 50+ casos: Empieza a ralentizar
  - 50+ profesionales: Grid se ve lento
  - Múltiples modales: Posible lag
```

Si necesitas escalar, considera:
- Paginar datos (mostrar 10 por página)
- Virtual scrolling
- API real (base de datos)

---

## Documentación de Referencia Rápida

**Dentro del Proyecto:**
- `context.md` - Contexto general (leer primero)
- `DESIGN.md` - Guía visual y colores
- `ARCHITECTURE.md` - Flujos técnicos
- `AI_GUIDE.md` - Este archivo (para IAs)

**Externas:**
- [Next.js 16 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)

---

## Checklist Final - Antes de Enviar

```
ANTES DE HACER COMMIT:

☐ El build compila: pnpm build
☐ Sin errores TypeScript: pnpm tsc --noEmit
☐ Probé las 7 vistas manualmente
☐ Sin console errors/warnings
☐ Imágenes/Assets cargan
☐ Responsive (desktop + móvil)
☐ Animaciones suaves
☐ Documenté cambios grandes en comments
☐ No rompí ningún path import
☐ Mantuve patrones de código existentes
☐ Leí este AI_GUIDE completamente
```

---

## Contacto de Ayuda

Si algo no funciona:

1. **Verifica:**
   - ¿Compiló sin errores?
   - ¿TypeScript limpio?
   - ¿Imports correctos con @/?

2. **Revisa:**
   - context.md para estructura
   - ARCHITECTURE.md para flujos
   - Componentes existentes para patrones

3. **Debuggea:**
   - DevTools Console (F12)
   - Terminal build (pnpm build)
   - Hot reload (saved file, auto-reload)

---

**Última actualización:** 2026-08-01  
**Versión:** 1.0  
**Para IAs:** Este documento es tu guía principal. Síguelo.
