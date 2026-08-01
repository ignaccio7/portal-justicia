# Guía de Framer Motion: Rutas de Justicia

Este documento cubre cómo usar Framer Motion en este proyecto para animaciones consistentes y suaves.

## Instalación y Setup

**Ya está instalado.** Verifica en `package.json`:
```json
{
  "dependencies": {
    "framer-motion": "^11.x"
  }
}
```

Si no, instala:
```bash
pnpm add framer-motion
```

---

## Imports Básicos

```typescript
// Componentes core
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

// Hooks
import { useMotionValue, useTransform } from 'framer-motion';
```

---

## Componentes Motion Principales

### motion.div, motion.button, etc.

Versión animable de cualquier HTML element:

```typescript
<motion.div
  initial={{ opacity: 0 }}    // Estado al montar
  animate={{ opacity: 1 }}    // Estado animado
  exit={{ opacity: 0 }}       // Estado al desmontar
  transition={{ duration: 0.3 }} // Configuración
>
  Contenido
</motion.div>
```

**Elementos disponibles:**
```typescript
motion.div, motion.span, motion.button, motion.section, 
motion.article, motion.nav, motion.form, motion.input,
motion.h1, motion.p, motion.img, motion.svg, etc.
```

---

## Propiedades Animables

### Comunes en Este Proyecto

```typescript
// Opacidad (0 = invisible, 1 = visible)
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}

// Posición Y (eje vertical)
initial={{ y: 10 }}        // 10px abajo
animate={{ y: 0 }}         // Posición normal

// Escala (0.95 = 95% del tamaño)
initial={{ scale: 0.95 }}
animate={{ scale: 1 }}

// Rotación (grados)
initial={{ rotate: -5 }}
animate={{ rotate: 0 }}

// Combinadas (más comunes)
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
```

### Menos Comunes (pero disponibles)

```typescript
x: 100,              // Posición horizontal (píxeles)
skewX: 10,          // Inclinación X (grados)
skewY: 10,          // Inclinación Y (grados)
filter: 'blur(2px)', // Blur
backgroundColor: '#fff', // Color fondo
```

---

## Transiciones

### Configuración Básica

```typescript
// Duración simple
transition={{ duration: 0.3 }}

// Tipos de easing
transition={{ duration: 0.3, ease: 'easeInOut' }}

// Opciones:
'easeInOut' (default) // Suave inicio y fin
'easeIn'              // Lento inicio, rápido fin
'easeOut'             // Rápido inicio, lento fin
'linear'              // Velocidad constante
'circInOut'           // Circular suave
'backInOut'           // Efecto de retroceso
'anticipate'          // Anticipatory motion
```

### Delay (Retraso)

```typescript
// Retraso simple
transition={{ duration: 0.3, delay: 0.1 }}

// Retraso en stagger
transition={{ duration: 0.3, delay: index * 0.1 }}
```

### Durations Recomendadas

En este proyecto usamos:

```typescript
duration: 0.2  // Muy rápido (micro-interacciones, hover)
duration: 0.3  // Rápido (transiciones normales, modales abrir)
duration: 0.4  // Normal (entrada de elementos)
duration: 0.5  // Lento (efectos notables)
duration: 0.6  // Muy lento (animaciones especiales)
```

---

## AnimatePresence - Crucial para Exit Animations

**Problema sin AnimatePresence:**
```typescript
// ❌ MALO - Desaparece al instante
{currentView === 'home' && <HomePage />}
{currentView === 'cases' && <CasesView />}
```

**Solución con AnimatePresence:**
```typescript
// ✅ BUENO - Anima exit antes de desmontar
<AnimatePresence>
  {currentView === 'home' && (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HomePage />
    </motion.div>
  )}
</AnimatePresence>
```

**Requisitos para exit animations:**
1. Envuelve con `<AnimatePresence>`
2. Define `exit={{ }}`
3. Usa `key` único para cada elemento
4. El elemento debe moverse del DOM (como en condicionales)

---

## Patrones Usados en Rutas de Justicia

### 1. Fade In (Más común)

```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Contenido
</motion.div>
```

**Cuándo usar:** Elementos que aparecen sin movimiento especial.

---

### 2. Slide In + Fade

```typescript
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  Contenido
</motion.div>
```

**Cuándo usar:** Cards, modales, elementos que entran "desde abajo".

---

### 3. Stagger Children (Efecto cascada)

```typescript
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1,  // 0.1s delay entre hijos
      },
    },
  }}
>
  {items.map((item) => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.3 }}
    >
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

**Cuándo usar:** Listas de elementos (profesionales, casos) - los ves aparecer uno por uno.

---

### 4. Hover Effects

```typescript
<motion.button
  whileHover={{ scale: 1.05 }}  // 5% más grande
  whileTap={{ scale: 0.95 }}    // Presionado
  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
>
  Click Me
</motion.button>
```

**Cuándo usar:** Botones interactivos, links, elementos clickeables.

---

### 5. Variants (Configuración reutilizable)

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

<motion.div initial="hidden" animate="visible" variants={containerVariants}>
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

**Cuándo usar:** Animaciones complejas que se reutilizan.

---

### 6. Scale + Fade (Para modales)

```typescript
<AnimatePresence>
  {isModalOpen && (
    <motion.div
      key="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50"
      onClick={closeModal}
    >
      <motion.div
        key="modal-content"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-slate-900 rounded-xl p-8"
      >
        Modal Content
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

---

## Ejemplos Reales del Proyecto

### En CaseCard.tsx

```typescript
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.02, y: -5 }}
  transition={{ duration: 0.3 }}
  onClick={onClick}
  className="bg-slate-900 cursor-pointer border border-slate-700 rounded-lg p-6"
>
  {/* Card content */}
</motion.div>
```

### En page.tsx (Transición de vistas)

```typescript
<AnimatePresence mode="wait">
  {currentView === 'home' && (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Home view */}
    </motion.div>
  )}
  {currentView === 'cases' && (
    <motion.div
      key="cases"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Cases view */}
    </motion.div>
  )}
</AnimatePresence>
```

---

## Errores Comunes

### ❌ Error 1: Olvidó AnimatePresence

```typescript
// ❌ MALO - Exit animation no funciona
{isOpen && <motion.div exit={{ opacity: 0 }}>...</motion.div>}

// ✅ BUENO
<AnimatePresence>
  {isOpen && <motion.div exit={{ opacity: 0 }}>...</motion.div>}
</AnimatePresence>
```

---

### ❌ Error 2: Sin key en elementos en loop

```typescript
// ❌ MALO - Cada render recreará los elementos
<motion.div>
  {items.map((item) => (
    <motion.div>  {/* ← Sin key! */}
      {item.name}
    </motion.div>
  ))}
</motion.div>

// ✅ BUENO
<motion.div>
  {items.map((item) => (
    <motion.div key={item.id}>  {/* ← Con key */}
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

---

### ❌ Error 3: Animaciones muy largas

```typescript
// ❌ MALO - Animación de 10 segundos es aburrida
transition={{ duration: 10 }}

// ✅ BUENO - Entre 0.2-0.6 segundos típicamente
transition={{ duration: 0.3 }}
```

---

### ❌ Error 4: No usar variants para reutilización

```typescript
// ❌ MALO - Repetido en muchos componentes
<motion.div initial={{ opacity: 0, y: 10 }} animate={{ ... }}>

// ✅ BUENO - Definir una vez, reutilizar
const fadeInVariants = { ... };
<motion.div variants={fadeInVariants} />
```

---

## Spring Physics (Avanzado)

Para efectos más realistas que no usamos mucho, pero está disponible:

```typescript
transition={{
  type: 'spring',
  stiffness: 400,    // Rigidez (más alto = más rígido)
  damping: 10,       // Amortiguamiento (más alto = menos rebote)
  mass: 1,           // Masa (afecta momentum)
}}
```

**Presets:**
```typescript
'spring'          // Spring por defecto
type: 'tween'     // Interpolación suave (default para most)
type: 'inertia'   // Momentum físico
```

---

## Performance Tips

### ✅ Buenas Prácticas

```typescript
// RÁPIDO - Transforma propiedades simples
<motion.div animate={{ opacity: 1, y: 0 }}>

// RÁPIDO - Use transform en lugar de left/top
animate={{ x: 100, y: 50 }}  // Transform
// vs
animate={{ left: 100, top: 50 }}  // Layout thrashing
```

### ❌ Evita

```typescript
// LENTO - Animar width/height (causa reflow)
animate={{ width: 400, height: 300 }}

// LENTO - Animar muchas propiedades a la vez
animate={{
  opacity: 1,
  scale: 1,
  rotate: 360,
  x: 100,
  y: 50,
  // ...
}}

// MEJOR - Combinar con transform:
animate={{ transform: 'scale(1) rotate(360deg) translateX(100px)' }}
```

---

## Testing de Animaciones

### Desabilitar en Tests
```typescript
// Para Vitest/Jest
import { setDefaultOptions } from 'framer-motion';

beforeAll(() => {
  setDefaultOptions({ skipAnimations: true });
});
```

### Debug Mode
```typescript
// Ver duración real en console
<motion.div
  onAnimationStart={() => console.log('started')}
  onAnimationComplete={() => console.log('done')}
>
```

---

## Referencia Rápida - Valores Comunes

```typescript
// Opacidad (0 = invisible)
opacity: 0, 0.5, 1

// Desplazamiento Y (píxeles positivos = abajo)
y: -10, 0, 10, 20

// Escala (1 = normal)
scale: 0.95, 1, 1.05

// Duración (segundos)
duration: 0.2, 0.3, 0.4, 0.5

// Delay (segundos)
delay: 0, 0.1, 0.2, index * 0.1

// Easing
ease: 'easeInOut', 'easeOut', 'linear'

// Spring
stiffness: 400, damping: 10
```

---

## Recursos Externos

- [Framer Motion Official Docs](https://www.framer.com/motion)
- [Animation Handbook](https://www.framer.com/motion/animation/)
- [Variants Guide](https://www.framer.com/motion/variants/)
- [Gesture Animations](https://www.framer.com/motion/gestures/)

---

## Checklist para Nuevas Animaciones

```
☐ ¿Usa motion.div/button/etc?
☐ ¿Tiene initial, animate, transition?
☐ ¿AnimatePresence si es condicional?
☐ ¿Tiene key si está en un map?
☐ ¿Duration entre 0.2-0.6 segundos?
☐ ¿Sin console warnings?
☐ ¿Se ve suave en 60fps?
☐ ¿Accesible? (respeta prefers-reduced-motion)
```

---

**Última actualización:** 2026-08-01  
**Librería:** Framer Motion v11+  
**Uso en proyecto:** Todas las transiciones y hover effects
