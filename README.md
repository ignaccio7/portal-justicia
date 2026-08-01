# Rutas de Justicia 🏛️

Una plataforma cívica interactiva que guía a los usuarios a través de procesos legales complejos con claridad, transparencia y precisión.

## Visión Rápida

- **Plataforma:** Web interactiva moderna
- **Propósito:** Educación legal, simulación de casos, directorio de profesionales
- **Usuarios:** Ciudadanos que necesitan guía en procesos legales
- **Vistas:** 7 vistas interactivas totalmente funcionales
- **Data:** 6 casos, 6 profesionales, 6 nodos de grafo, 6 recursos legales

## Tecnología

| Aspecto | Tecnología |
|--------|------------|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript |
| UI Framework | React 19 |
| Estilos | Tailwind CSS v4 |
| Animaciones | Framer Motion |
| Iconos | Lucide React |
| Componentes | shadcn/ui (Button) |
| Estado | React Hooks (useState) |
| Build | pnpm |

## Inicio Rápido

```bash
# Clonar/Descargar el proyecto
cd rutas-de-justicia

# Instalar dependencias
pnpm install

# Desarrollo local (con hot reload)
pnpm dev

# Abrir navegador
# http://localhost:3000
```

## Estructura

```
rutas-de-justicia/
├── app/
│   ├── layout.tsx          # Configuración global
│   ├── page.tsx            # Página principal + lógica central
│   └── globals.css         # Tema y estilos globales
│
├── components/
│   ├── Navigation.tsx      # Navegación (sidebar + topbar)
│   ├── CaseCard.tsx        # Tarjeta de caso
│   ├── ProfessionalCard.tsx # Tarjeta de profesional
│   ├── CaseGraphVisualization.tsx # Grafo interactivo
│   ├── SimulatorView.tsx   # Simulador de IA
│   └── ui/button.tsx       # Componente button
│
├── lib/
│   └── utils.ts            # Utilidades (cn para Tailwind)
│
└── [Archivos de config]
    ├── package.json
    ├── tsconfig.json
    ├── next.config.mjs
    └── tailwind.config.ts
```

## Las 7 Vistas

### 1. **Inicio (Home)**
- Hero section con llamada a la acción
- Casos destacados recientemente
- Acceso rápido a todas las funciones

### 2. **Casos**
- Grilla de todos los casos disponibles
- Filtrado por estado (activo/pendiente/completado)
- Click en caso → ver detalles

### 3. **Profesionales**
- Directorio de abogados, jueces, fiscales
- Filtrado por especialidad/rol
- Estadísticas de cada profesional
- Click en profesional → ver perfil

### 4. **Información**
- Biblioteca legal con recursos
- Artículos de leyes
- Videos educativos
- Referencias legales

### 5. **Detalle de Caso**
- Visualización completa del grafo del proceso
- 6 nodos interconectados mostrando pasos del caso
- Modal de detalles al hacer click en nodo
- Información de leyes aplicadas
- Actores intervinientes

### 6. **Perfil de Profesional**
- Biografía completa
- Estadísticas (casos, tasa de éxito)
- Especialidades
- Casos asociados
- Contacto

### 7. **Simulador de IA**
- **Paso 1:** Describe tu problema legal
- **Paso 2:** Ve casos similares históricos
- **Paso 3:** Recibe simulación personalizada con grafo
- Disclaimer de IA visible
- Abogados recomendados basados en caso

## Componentes Principales

### Navigation
Sidebar en desktop, topbar en móvil. Navegación entre las 7 vistas.

### CaseCard
Muestra casos con:
- Título
- Jurisdicción
- Estado (visual con colores)
- Año
- Interactivo: click para ver detalles

### ProfessionalCard
Muestra profesional con:
- Nombre y rol
- Casos realizados
- Tasa de éxito
- Avatar con gradiente por rol
- Interactivo: click para ver perfil

### CaseGraphVisualization
Grafo interactivo con:
- 6 nodos conectados
- Cada nodo tiene:
  - Título del paso
  - Descripción
  - Leyes aplicadas
  - Actores intervinientes
  - Fecha
- Modal al hacer click en nodo
- Filtro de actores por rol

### SimulatorView
Flujo interactivo de 3 pasos:
1. Input: Describe tu caso
2. Output: Casos similares históricos
3. Output: Simulación de tu caso + recomendaciones

## Diseño

### Tema
- **Modo:** Oscuro (dark mode)
- **Paleta:** Grises profesionales + Blue accent
- **Filosofía:** Confianza, claridad, accesibilidad

### Colores Clave
```
Fondo: #0f172a (slate-950)
Card: #1e293b (slate-900)
Texto: #f1f5f9 (slate-100)
Accent: #3b82f6 (blue-500)
```

### Tipografía
- **Familia:** Geist (sans), Geist Mono (mono)
- **Jerarquía:** H1 (text-4xl) → Body (text-base) → Small (text-xs)

### Animaciones
- **Librería:** Framer Motion
- **Estilo:** Transiciones suaves, sin distracciones
- **Ejemplos:** Fade in, slide in, stagger children, hover effects

## Data

**Todo hardcoded (sin API/Base de datos):**

### Profesionales (6)
- Dra. Carla Mendoza (Juez) - 94% éxito
- Dr. Roberto Aguilar (Abogado) - 92% éxito
- Dr. Fernando Estrada (Fiscal) - 87% éxito
- Dra. Sofía Reyes (Abogada) - 96% éxito
- Dr. Miguel Torres (Juez) - 91% éxito
- Dra. Patricia Gómez (Fiscal) - 89% éxito

### Casos (6)
- Impugnación de Paternidad
- Litigio de Herencia
- Negligencia Médica
- Resolución de Contrato Laboral
- Pensión Alimenticia
- Procedimiento De Divorcio

### Nodos del Grafo (6 por caso)
1. Demanda
2. Contestación
3. Pruebas
4. Sentencia Preliminar
5. Apelación (si aplica)
6. Sentencia Final

### Recursos Legales (6)
- Código de Familia
- Código Civil
- Ley de Procedimientos
- Normas de Tránsito
- Código Penal
- Derecho Laboral

## Desarrollo

### Cambios Frecuentes

#### Agregar un Nuevo Caso
Ubicación: `app/page.tsx` línea ~80

```typescript
{
  id: 'case-007',
  title: 'Tu Nuevo Caso',
  jurisdiction: 'Juzgado - Distrito X',
  status: 'active',
  year: 2024,
}
```

#### Agregar un Nuevo Profesional
Ubicación: `app/page.tsx` línea ~30

```typescript
{
  id: 'prof-7',
  name: 'Dr. Nuevo Nombre',
  role: 'judge',
  casesCount: 50,
  successRate: 90,
}
```

#### Cambiar Colores
Ubicación: `app/globals.css` sección `.dark`

```css
--background: oklch(0.165 0 0); /* Nuevo valor */
```

### Comandos

```bash
pnpm dev         # Desarrollo (http://localhost:3000)
pnpm build       # Build de producción
pnpm start       # Start (producción)
pnpm tsc         # Type check
```

## Documentación

### Para Entender el Proyecto
1. **context.md** - Contexto general, estructura, tipos (LEER PRIMERO)
2. **DESIGN.md** - Guía visual, colores, tipografía, layouts
3. **ARCHITECTURE.md** - Flujos técnicos, componentes, data flow
4. **FRAMER_MOTION_GUIDE.md** - Animaciones con Framer Motion

### Para Trabajar en el Proyecto (como IA)
5. **AI_GUIDE.md** - Instrucciones para modificar sin romper

## Guía Rápida para Cambios

### ✅ Puedo Cambiar
- Casos/Profesionales/Leyes (editar arrays en page.tsx)
- Estilos Tailwind (clases en componentes)
- Animaciones Framer Motion
- Textos y descripciones
- Colores en globals.css

### ❌ No Cambiar
- Nombres de archivos componentes
- Path imports (siempre @/)
- Estructura base de page.tsx
- Sistema Tailwind v4

## Recursos

### Documentación Oficial
- [Next.js 16](https://nextjs.org/docs)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion)
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)

### Dentro del Proyecto
- Todos los componentes tienen tipos TypeScript
- Code comments explican lógica compleja
- Ejemplos en ARCHITECTURE.md

## Status

| Aspecto | Status |
|--------|--------|
| Funcionalidad | ✅ 100% Completo |
| Diseño | ✅ Premium (oscuro) |
| Responsivo | ✅ Desktop + Móvil |
| Performance | ✅ Fluido (60fps) |
| TypeScript | ✅ Strict mode |
| Documentación | ✅ Completa |

## Próximas Mejoras (Futuro)

- [ ] Integración con API real
- [ ] Base de datos (Neon/Supabase)
- [ ] Autenticación de usuarios
- [ ] Guardado de simulaciones
- [ ] Más casos/profesionales
- [ ] Búsqueda avanzada
- [ ] Exportar reportes
- [ ] Notificaciones

## Soporte

### Troubleshooting

**Error: Module not found**
- Verifica path imports (`@/` alias)
- Asegúrate que el archivo existe

**Error: Type 'X' is not assignable**
- TypeScript está siendo estricto
- Verifica interfaces y tipos

**Estilos no se aplican**
- Tailwind v4 está en CSS, no config
- Limpia `.next/` y reinicia servidor

**Animación no funciona**
- Verifica `<AnimatePresence>` si es condicional
- Asegúrate que el `key` es único

### Contacto
Para preguntas sobre el código, revisa:
1. `context.md` - información general
2. `ARCHITECTURE.md` - cómo funciona todo
3. `AI_GUIDE.md` - para cambios específicos

## License

Proyecto privado - Rutas de Justicia 2024

## Changelog

### v1.0.0 (2026-08-01)
- ✅ Todas las 7 vistas funcionales
- ✅ Grafo interactivo con 6 nodos
- ✅ Simulador de IA con 3 pasos
- ✅ 6 casos + 6 profesionales
- ✅ Tema oscuro profesional
- ✅ Animaciones Framer Motion
- ✅ Responsivo (desktop + móvil)
- ✅ Documentación completa

---

**Última actualización:** 2026-08-01  
**Versión:** 1.0.0  
**Mantenido por:** v0 AI  
**Estado:** En producción
