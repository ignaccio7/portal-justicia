# Índice de Documentación - Rutas de Justicia

Encuentra rápidamente lo que necesitas leer según tu rol y necesidad.

---

## 👤 Por Rol

### Soy Desarrollador (Humano o IA)

**Comienza aquí:**
1. 📖 `README.md` - Visión general (5 min)
2. 📖 `context.md` - Contexto profundo (15 min)
3. 📖 `ARCHITECTURE.md` - Cómo funciona todo (20 min)

**Luego según tu tarea:**
- Modificar estilos → `DESIGN.md`
- Agregar animaciones → `FRAMER_MOTION_GUIDE.md`
- Cambiar componentes → `ARCHITECTURE.md` + `AI_GUIDE.md`

**Para mantener registro:**
- Copia `CHANGES_TEMPLATE.md` antes de cambios grandes

---

### Soy una IA (v0, Claude, Cursor, etc.)

**Debes leer PRIMERO:**
1. ⚡ `README.md` - Vista general (2 min)
2. ⚡ `context.md` - Estructura y convenciones (10 min)
3. ⚡ `AI_GUIDE.md` - Instrucciones críticas (15 min)

**Antes de hacer CUALQUIER cambio:**
- ✅ Lee la sección "Antes de Hacer Cualquier Cambio" en `AI_GUIDE.md`
- ✅ Verifica ubicación de datos en `context.md`
- ✅ Sigue patrones en `ARCHITECTURE.md`

**Si modificas:**
- Estilos → Consulta `DESIGN.md`
- Animaciones → Lee `FRAMER_MOTION_GUIDE.md`
- Componentes → Sigue patrón en `ARCHITECTURE.md`

---

### Soy Diseñador

**Lee:**
1. 🎨 `DESIGN.md` - Sistema visual completo
2. 📖 `README.md` - Contexto general
3. 📖 `context.md` - Datos y componentes (sección "Estructura del Proyecto")

---

### Soy Product Manager

**Lee:**
1. 📖 `README.md` - Visión y funcionalidades
2. 📖 `context.md` - Qué es y cómo funciona (omite secciones técnicas)
3. 🎨 `DESIGN.md` - Filosofía visual

---

## 📋 Por Necesidad

### Necesito Entender la Estructura

```
context.md
├── Estructura del Proyecto (carpetas, archivos)
├── Tipos de Datos (interfaces TypeScript)
└── Las 7 Vistas Principales
```

### Necesito Cambiar Datos

```
context.md (ubicación exacta)
├── Data Hardcodeada (dónde está)
└── Actualización de Data (patrones)

app/page.tsx (archivos)
├── Arrays PROFESSIONALS (línea 30)
├── Arrays CASES (línea 75)
└── [Dentro de componentes] (nodos del grafo, recursos)
```

### Necesito Cambiar Estilos

```
DESIGN.md (cómo hacerlo)
├── Paleta de Colores
├── Tipografía
└── Componentes Clave

globals.css (dónde cambiar colores)
components/*.tsx (dónde cambiar clases)
```

### Necesito Agregar Animaciones

```
FRAMER_MOTION_GUIDE.md (cómo hacerlo)
├── Patrones Usados en el Proyecto
├── Ejemplos Reales
└── Errores Comunes

components/*.tsx (dónde implementar)
```

### Necesito Crear Componente Nuevo

```
ARCHITECTURE.md (patrón)
├── Estructura de Componentes
└── Ejemplos en el Proyecto

AI_GUIDE.md (si eres IA)
└── Crear un Nuevo Componente (paso a paso)
```

### Necesito Entender Cómo Fluye el Estado

```
ARCHITECTURE.md
├── Flujo de Estado
├── Selección de Datos
└── Comunicación entre Componentes
```

### Necesito Debuggear

```
AI_GUIDE.md (si eres IA)
└── Debugging - Cómo Verificar que NO Rompiste Nada

context.md (si eres dev humano)
└── Troubleshooting
```

### Necesito Documentar un Cambio

```
CHANGES_TEMPLATE.md
├── Plantilla lista para copiar
└── Ejemplos de cambios comunes
```

---

## 🚀 Flujos Rápidos

### "Quiero agregar un caso"

1. Abre: `app/page.tsx` línea ~90
2. Sigue patrón en: `AI_GUIDE.md` → "Agregar un Nuevo Caso"
3. Copia/pega el template
4. Verifica: `pnpm build` sin errores
5. Listo

**Archivos involucrados:** 1 (page.tsx)  
**Tiempo:** 2 minutos

---

### "Quiero cambiar colores"

1. Abre: `app/globals.css` línea ~70
2. Sigue guía en: `DESIGN.md` → "Paleta de Colores"
3. Modifica valor oklch
4. Verifica: DevTools colors
5. Listo

**Archivos involucrados:** 1 (globals.css)  
**Tiempo:** 5 minutos

---

### "Quiero crear un componente nuevo"

1. Lee: `ARCHITECTURE.md` → "Estructura de Componentes"
2. Consulta: `DESIGN.md` → "Ejemplo: Crear un Nuevo Componente"
3. Crea archivo: `components/MyComponent.tsx`
4. Sigue patrón (importa en page.tsx, maneja state, etc.)
5. Verifica: `pnpm build` sin errores
6. Listo

**Archivos involucrados:** 2-3 (new component + page.tsx + maybe globals.css)  
**Tiempo:** 15-30 minutos

---

### "Quiero agregar animación"

1. Lee: `FRAMER_MOTION_GUIDE.md` → "Patrones Usados en Rutas de Justicia"
2. Consulta ejemplo que aplique a tu caso
3. Modifica componente: envuelve con `motion.div`, agrega props
4. Verifica: animación suave en navegador
5. Listo

**Archivos involucrados:** 1 (componente)  
**Tiempo:** 5-10 minutos

---

## 📚 Tabla de Contenido Completo

| Documento | Propósito | Audiencia | Tiempo Lectura |
|-----------|-----------|-----------|-----------------|
| `README.md` | Visión general, intro rápida | Todos | 5 min |
| `context.md` | Contexto, estructura, tipos, datos | Devs + IAs | 20 min |
| `DESIGN.md` | Sistema visual, colores, tipografía | Designers + Devs | 15 min |
| `ARCHITECTURE.md` | Flujos técnicos, componentes, state | Senior Devs + IAs | 25 min |
| `AI_GUIDE.md` | Instrucciones para IAs | IAs únicamente | 30 min |
| `FRAMER_MOTION_GUIDE.md` | Cómo usar animaciones | Devs con animaciones | 15 min |
| `CHANGES_TEMPLATE.md` | Documentar cambios | Devs + IAs | Variable |
| `DOCS_INDEX.md` | Este archivo | Todos | 5 min |

---

## ⏱️ Tiempo de Lectura Total

- **Mínimo (para empezar):** 10 minutos (README + contexto rápido)
- **Recomendado (antes de cambios):** 30 minutos (README + context + AI_GUIDE)
- **Completo (para maestría):** 2 horas (todo)

---

## 🆘 Palabras Clave para Buscar

Busca en los documentos usando Ctrl+F:

- **"Agregar"** → cómo agregar datos/componentes
- **"Cambiar"** → cómo modificar código existente
- **"Error"** → solución de problemas
- **"Patrón"** → convenciones de código
- **"Ejemplo"** → código listo para copiar
- **"Ubicación"** → dónde está el código

---

## ✅ Checklist de Iniciación

### Para Nuevo Dev Humano
- [ ] Leí `README.md`
- [ ] Leí `context.md` completamente
- [ ] Entiendo la estructura (7 vistas, 5 componentes)
- [ ] Puedo localizar arrays de data (PROFESSIONALS, CASES)
- [ ] Entiendo Tailwind v4 (no hay config.js)
- [ ] Entiendo Framer Motion basics

### Para Nueva IA
- [ ] Leí `README.md`
- [ ] Leí `context.md` completamente
- [ ] Leí `AI_GUIDE.md` completamente
- [ ] Sé dónde están los arrays de data
- [ ] Sé qué NO cambiar (zona C en AI_GUIDE)
- [ ] Entiendo checklist final en AI_GUIDE

### Antes de Hacer Cambios
- [ ] ¿Qué archivo cambio?
- [ ] ¿Cuál es la ubicación exacta?
- [ ] ¿Qué patrón sigo?
- [ ] ¿Qué puedo romper?
- [ ] ¿Cómo lo verifico?

---

## 🔗 Enlaces Rápidos

### Dentro del Proyecto
- Estructura: ver `context.md` sección "Estructura del Proyecto"
- Componentes: ver `ARCHITECTURE.md` sección "Estructura de Componentes"
- Data: ver `app/page.tsx` líneas 30-140
- Estilos: ver `app/globals.css`
- Animaciones: ver cualquier componente + `FRAMER_MOTION_GUIDE.md`

### Externo
- [Next.js 16](https://nextjs.org)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)

---

## 📞 Preguntas Frecuentes

**P: ¿Por dónde empiezo?**  
R: Lee `README.md` + `context.md` (25 min). Luego consulta qué necesites.

**P: Quiero modificar X, ¿qué leo?**  
R: Ve a sección "Por Necesidad" arriba, encuentra X, sigue los links.

**P: Soy una IA, ¿qué debo leer?**  
R: README → context → AI_GUIDE (obligatorio). El resto según tarea.

**P: Rompí algo, ¿qué hago?**  
R: Ve a `AI_GUIDE.md` → "Debugging". Sigue checklist.

**P: ¿Puedo cambiar X?**  
R: Ve a `AI_GUIDE.md` → "NO hagas" y "Puedes hacer". Decide según lista.

**P: ¿Hay ejemplos de código?**  
R: Sí, muchos. Búscalos:
- En `ARCHITECTURE.md`
- En `FRAMER_MOTION_GUIDE.md`
- En `CHANGES_TEMPLATE.md`
- En componentes (comenta el código)

**P: ¿Dónde está la data?**  
R: `app/page.tsx` líneas 30-140. Sigue patrones en `AI_GUIDE.md`.

**P: ¿Cómo verifico que no rompí nada?**  
R: `AI_GUIDE.md` → "Debugging - Cómo Verificar". Corre `pnpm build`.

---

## 🎓 Ruta de Aprendizaje Recomendada

### Semana 1 (Comprensión)
1. Lee `README.md` + `context.md`
2. Explora estructura de archivos
3. Abre el proyecto, corre `pnpm dev`
4. Navega entre las 7 vistas

### Semana 2 (Práctica Simple)
1. Agrega un nuevo caso (seguir AI_GUIDE)
2. Agrega un nuevo profesional
3. Cambia un color en globals.css
4. Verifica que todo funciona

### Semana 3 (Práctica Intermedia)
1. Lee `DESIGN.md` completamente
2. Lee `FRAMER_MOTION_GUIDE.md`
3. Agrega animación a un componente
4. Crea un pequeño cambio visual

### Semana 4 (Competencia)
1. Lee `ARCHITECTURE.md` completamente
2. Crea un nuevo componente pequeño
3. Modifica lógica de navegación
4. Refactor de código existente

---

## 📝 Notas Finales

- **Todos los docs están sincronizados** - Si algo cambia en un lado, se actualiza en todos
- **Los docs usan ejemplos reales** - Todo código es ejecutable y testeable
- **Los docs son prescriptivos** - Las reglas existen por una razón
- **Los docs son vivos** - Se actualizan conforme el proyecto evoluciona

---

**Última actualización:** 2026-08-01  
**Versión:** 1.0  
**Mantenido por:** v0 AI  

¡Comienza a leer! Sugiero empezar con `README.md` ahora. ✨
