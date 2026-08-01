# Guía de Diseño: Rutas de Justicia

## Filosofía de Diseño

**Objetivo:** Crear una interfaz profesional, confiable y accesible para navegar procesos legales complejos.

**Principios:**
1. **Claridad:** La información legal es complicada. El diseño debe simplificar.
2. **Confianza:** Colores oscuros, tipografía clara, espaciado generoso.
3. **Accesibilidad:** Alto contraste, navegación clara, ARIA labels.
4. **Movimiento:** Transiciones suaves que dan contexto, no distraen.

## Paleta de Colores

### Tema Oscuro (Única opción)

| Elemento | Color | Valor | Uso |
|----------|-------|-------|-----|
| Fondo Primario | Slate 950 | `#0f172a` | Body, main background |
| Fondo Secundario | Slate 900 | `#0f172a` | Cards, contenedores |
| Texto Primario | Slate 100 | `#f1f5f9` | Títulos, cuerpo de texto |
| Texto Secundario | Slate 300 | `#cbd5e1` | Labels, ayuda, desaturado |
| Texto Muted | Slate 500 | `#64748b` | Placeholders, disabled |
| Bordes | Slate 700 | `#334155` | Líneas, separadores |
| Accent Primario | Blue 500 | `#3b82f6` | Botones, links, highlights |
| Accent Hover | Blue 700 | `#1e40af` | Estado :hover |
| Success | Green 600 | `#16a34a` | Estados completados |
| Warning | Amber 500 | `#f59e0b` | Estados pending |
| Error | Red 600 | `#dc2626` | Estados activos/alertas |

### Uso de Colores por Componente

**Navigation (Sidebar):**
- Fondo: Slate 900 (más claro que body)
- Botones activos: Blue 500 con glow
- Iconos: Slate 100

**Cards (Casos/Profesionales):**
- Fondo: Slate 900/800 con borde Slate 700
- Hover: Levemente más claro + glow effect

**Graph Nodes (CaseGraphVisualization):**
- Nodo normal: Slate 800 + borde Blue 500
- Nodo activo/hovered: Blue 600 + shadow blue-lg
- Líneas: Slate 600 con opacity

**Simulador:**
- Paso completado: Green 600
- Paso actual: Blue 500
- Paso futuro: Slate 500
- Botones: Blue 500 (primary), Slate 700 (secondary)

## Tipografía

### Fuentes
- **Sans (Cuerpo):** Geist
  - Cargas automáticamente desde Next.js Google Fonts
  - Usa clase: `font-sans`
  
- **Mono (Código):** Geist Mono
  - Para código legal, referencias
  - Usa clase: `font-mono`

### Jerarquía de Textos

| Nivel | Size | Weight | Uso |
|-------|------|--------|-----|
| H1 | `text-4xl` | Bold (700) | Títulos de página |
| H2 | `text-2xl` | Bold (700) | Títulos de sección |
| H3 | `text-xl` | Semibold (600) | Subtítulos, card titles |
| Body | `text-base` | Regular (400) | Cuerpo de texto |
| Small | `text-sm` | Regular (400) | Labels, ayuda |
| Tiny | `text-xs` | Regular (400) | Timestamps, meta |

### Línea de Altura (Line Height)
- **Títulos:** `leading-tight` (1.25)
- **Cuerpo:** `leading-relaxed` (1.625)
- **Multiline:** `leading-6` (1.5)

### Text Balance
- Usa `text-balance` en títulos para optimizar saltos de línea
- Usa `text-pretty` en párrafos largos para mejor readabilidad

## Espaciado

### Sistema de Espaciado
Basado en escala Tailwind (4px = 1 unit):

| Clase | Píxeles | Uso |
|-------|---------|-----|
| `p-2` | 8px | Padding interno pequeño |
| `p-3` | 12px | Padding dentro de componentes |
| `p-4` | 16px | Padding estándar |
| `p-6` | 24px | Padding generoso (cards, sections) |
| `p-8` | 32px | Padding grande (modales) |
| `gap-2` | 8px | Gap entre items pequeño |
| `gap-3` | 12px | Gap estándar |
| `gap-4` | 16px | Gap generoso |

### Márgenes
- Entre secciones: `mb-8` o `my-8`
- Entre items en lista: `mb-3` o `mb-4`
- Evita márgenes en componentes - usa gap en contenedor padre

## Layouts

### Principio: Mobile-First
1. Diseña móvil primero (375px width)
2. Agrega breakpoints para tablet (768px) y desktop (1024px+)

### Breakpoints Usados
```css
/* Tailwind v4 defaults */
sm: 640px   /* Tablets */
md: 768px   /* Tablets grandes */
lg: 1024px  /* Desktops */
xl: 1280px  /* Desktops grandes */
2xl: 1536px /* Ultrawide */
```

### Grid vs Flexbox
- **Flexbox (90% de casos):** `flex items-center justify-between`
- **Grid (solo para layouts 2D complejos):** `grid grid-cols-3 gap-4`

**Ejemplo - Card Container:**
```html
<div class="flex flex-col gap-4">
  <!-- Items en columna vertical -->
</div>
```

**Ejemplo - Row Container:**
```html
<div class="flex items-center justify-between">
  <!-- Items en fila horizontal -->
</div>
```

### Responsive Classes
```html
<!-- Sidebar: hide en móvil, show en desktop -->
<div class="hidden lg:block">

<!-- Grid: 1 col en móvil, 2 en tablet, 3 en desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

## Componentes Clave

### Navigation / Sidebar
- **Alto:** Full height (100vh)
- **Ancho:** `w-64` (256px) en desktop, hidden en móvil
- **Padding:** `p-6` interno
- **Botones:** Ancho completo, altura 44px mínimo (touchable)
- **Icons:** 20px size para accesibilidad

### Card Component
```html
<div class="bg-slate-900 border border-slate-700 rounded-lg p-6 hover:bg-slate-800 transition">
  <!-- Contenido -->
</div>
```

**Variantes:**
- **Seleccionada:** Agrega `border-blue-500` y `glow`
- **Disabled:** Agrega `opacity-50 cursor-not-allowed`
- **Hover:** Fondo más claro + pequeño shadow

### Modal/Overlay
```html
<!-- Fondo oscuro -->
<div class="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>

<!-- Modal -->
<div class="bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-2xl max-w-md">
```

### Button Styles

**Primary Button:**
```html
<button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
```

**Secondary Button:**
```html
<button class="bg-slate-700 hover:bg-slate-600 text-slate-100 px-6 py-2 rounded-lg">
```

**Ghost Button:**
```html
<button class="text-blue-400 hover:text-blue-300">
```

## Animaciones

### Principios
- **Propósito:** Dar contexto, no distraer
- **Duración:** 0.2-0.4s para transiciones rápidas, 0.5-0.8s para entrada
- **Easing:** `ease-in-out` para naturalidad

### Usando Framer Motion

**Fade In:**
```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
/>
```

**Slide In + Fade:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
/>
```

**Stagger Children:**
```typescript
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }}
>
  {items.map((item) => (
    <motion.div key={item.id} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} />
  ))}
</motion.div>
```

### Transiciones de Navegación
- Entre vistas: Fade (0.3s)
- Dentro de una vista: Slide (0.4s)
- Abrir modal: Scale + Fade (0.3s)
- Cerrar modal: Reverse (0.2s)

## Estados Visuales

### Hover
- Cards: Fondo más claro + borde más brillante
- Botones: Fondo oscuro + texto más claro
- Links: Underline + color más brillante

### Active/Selected
- Borde blue-500 (2px)
- Fondo con opacity blue (10%)
- Icono más brillante

### Disabled
- Opacidad 50%
- Cursor `not-allowed`
- Sin transiciones hover

### Loading
- Spinner animado (Framer Motion)
- Opacity del contenido baja hasta cargar

### Focus (Accesibilidad)
- Outline ring (Tailwind): `focus:ring-2 focus:ring-blue-500`
- Visible en todo elemento interactivo

## Responsive Design

### Desktop (1024px+)
- Sidebar visible a la izquierda
- Content en grid de 2-3 columnas
- Máximo ancho de contenedor: 1400px

### Tablet (768px - 1023px)
- Sidebar puede colapsar o convertirse a topbar
- Grid de 2 columnas
- Padding aumentado

### Mobile (< 768px)
- Sidebar como drawer/modal
- Grid de 1 columna
- Padding reducido a p-4

### Touch Targets
- Mínimo 44px × 44px para botones
- Mínimo 48px para espaciado entre elementos
- Suficiente tap/click area sin confundir

## Accesibilidad

### Contraste
- Texto sobre fondo: Mínimo WCAG AA (4.5:1)
- Large text (18px+): 3:1 válido
- Test con DevTools Lighthouse

### Semántica HTML
- `<button>` para acciones, NO `<div>`
- `<nav>` para navegación principal
- `<main>` para contenido principal
- `<h1>` ... `<h6>` en orden

### ARIA Labels
```html
<!-- Para iconos sin texto -->
<button aria-label="Cerrar modal">
  <X size={20} />
</button>

<!-- Para inputs -->
<input aria-label="Buscar casos" placeholder="..." />
```

### Keyboard Navigation
- Tab a través de elementos focusables
- Enter/Space para activar botones
- Escape para cerrar modales
- Arrow keys para navegar en listas (si es applicable)

## Ejemplo: Crear un Nuevo Componente

```typescript
// components/MyNewComponent.tsx
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface MyNewComponentProps {
  title: string;
  items: string[];
  onSelect: (item: string) => void;
}

export default function MyNewComponent({
  title,
  items,
  onSelect,
}: MyNewComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900 border border-slate-700 rounded-lg p-6"
    >
      <h3 className="text-xl font-bold text-slate-100 mb-4">{title}</h3>
      
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <Button
            key={item}
            onClick={() => onSelect(item)}
            variant="secondary"
            className="justify-start"
          >
            {item}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
```

---

**Última actualización:** 2026-08-01  
**Principio de diseño:** Oscuro, profesional, accesible
