# Quick Start - Rutas de Justicia ⚡

Una guía super rápida para empezar.

---

## En 30 Segundos

```bash
pnpm install    # Instala dependencias
pnpm dev        # Inicia servidor (http://localhost:3000)
```

¡Listo! Accede a `http://localhost:3000` en tu navegador.

---

## Las 7 Vistas (Click en Navigation)

| Vista | Qué es | Interacción |
|-------|--------|-------------|
| 🏠 **Inicio** | Hero + casos destacados | Scroll + click |
| 📋 **Casos** | Todos los casos | Grilla + filtros |
| 👨‍⚖️ **Profesionales** | Abogados/Jueces | Directorio |
| 📚 **Información** | Leyes y recursos | Biblioteca legal |
| 📊 **Detalle Caso** | Grafo interactivo | Click en nodos |
| 💼 **Perfil Profesional** | Bio + estadísticas | Ver detalles |
| 🤖 **Simulador** | IA 3 pasos | Desc. → Casos → Resultado |

---

## Cambios Más Comunes

### Agregar Caso
📄 Archivo: `app/page.tsx` línea 90

```typescript
{
  id: 'case-007',
  title: 'Tu Nuevo Caso',
  jurisdiction: 'Juzgado X - Distrito Y',
  status: 'active',
  year: 2024,
}
```

### Agregar Profesional
📄 Archivo: `app/page.tsx` línea 30

```typescript
{
  id: 'prof-7',
  name: 'Dr. Nombre',
  role: 'judge', // lawyer, prosecutor
  casesCount: 50,
  successRate: 90,
}
```

### Cambiar Colores
📄 Archivo: `app/globals.css` línea 70

```css
.dark {
  --background: oklch(0.165 0 0); /* Cambiar aquí */
}
```

### Cambiar Texto
📄 Archivo: `components/Navigation.tsx`, `app/page.tsx`, etc.

Busca el texto en el componente y cámbialo. ✨

---

## Estructura de Carpetas

```
app/
  ├── page.tsx              ← LÓGICA PRINCIPAL + DATA
  ├── layout.tsx            ← No tocar
  └── globals.css           ← Tema (colores)

components/
  ├── Navigation.tsx        ← Navegación
  ├── CaseCard.tsx          ← Tarjetas caso
  ├── ProfessionalCard.tsx  ← Tarjetas profesional
  ├── CaseGraphVisualization.tsx ← Grafo
  ├── SimulatorView.tsx     ← Simulador
  └── ui/
      └── button.tsx        ← Botón (no tocar)
```

**Regla de Oro:** Si cambias data, es en `app/page.tsx`. Si cambias estilos, es en componentes o `globals.css`.

---

## Comandos Importantes

```bash
pnpm dev              # Desarrollo (hot reload)
pnpm build            # Build de producción
pnpm tsc --noEmit     # Type check
pnpm start            # Start (producción)
```

---

## Verificación de Cambios

Después de cambiar ALGO, ejecuta:

```bash
✓ pnpm build          # ¿Compila sin errores?
✓ pnpm tsc --noEmit   # ¿Sin tipos rotos?
✓ http://localhost:3000  # ¿Se ve correcto?
```

Si todo es ✓, estás listo. ✨

---

## Errores Comunes

| Error | Solución |
|-------|----------|
| "Module not found" | Verifica path: `import X from '@/...'` |
| "Type X is not assignable" | TypeScript está siendo estricto, revisa tipos |
| Estilos no aplican | Limpia `.next/` y reinicia servidor |
| Animación no funciona | Verifica `<AnimatePresence>` si es condicional |

---

## Puntos Críticos (NO CAMBIAR)

❌ No cambies:
- Nombres de archivos en `components/`
- Path imports (siempre `@/`)
- Estructura de `page.tsx`
- Sistema Tailwind v4

✅ Puedes cambiar:
- Arrays PROFESSIONALS, CASES
- Tailwind clases
- Textos
- Colores en globals.css

---

## Documentación Rápida

| Necesito | Leo |
|----------|-----|
| Entender proyecto | `README.md` |
| Cambiar estilos | `DESIGN.md` |
| Entender arquitectura | `ARCHITECTURE.md` |
| Agregar animación | `FRAMER_MOTION_GUIDE.md` |
| Modificar (como IA) | `AI_GUIDE.md` |
| Index de todo | `DOCS_INDEX.md` |

---

## Proyecto Desplegado

Para llevar a producción en Vercel:

```bash
# 1. Pushea a GitHub
git add .
git commit -m "Changes description"
git push origin main

# 2. Vercel auto-deploya
# O manualmente: vercel deploy
```

---

## Stack Tech

- ⚡ **Next.js 16** - Framework React
- 🎨 **Tailwind v4** - Estilos
- ✨ **Framer Motion** - Animaciones
- 🦾 **TypeScript** - Tipado
- 📦 **pnpm** - Package manager

---

## Estado del Proyecto

✅ **100% Funcional**
- 7 vistas interactivas
- 6 casos + 6 profesionales
- Grafo con 6 nodos
- Simulador de IA
- Responsive (desktop + móvil)
- Animaciones suaves

---

## Próximos Pasos

```
1. ✓ Lee README.md                    (5 min)
2. ✓ Ejecuta pnpm install             (2 min)
3. ✓ Ejecuta pnpm dev                 (1 min)
4. ✓ Explora el proyecto en navegador (5 min)
5. ✓ Haz un cambio pequeño (caso)     (5 min)
6. ✓ Verifica que compila              (1 min)
7. ✓ Lee context.md para profundidad  (15 min)

Total: ~35 minutos para ser operativo
```

---

## Links Útiles

- 📖 [Next.js Docs](https://nextjs.org)
- 🎨 [Tailwind Docs](https://tailwindcss.com)
- ✨ [Framer Motion](https://framer.com/motion)
- 📘 [React Docs](https://react.dev)

---

## Soporte Rápido

**¿Error al instalar?**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**¿El navegador no se refresca?**
```bash
Ctrl+C (detener servidor)
pnpm dev
```

**¿Necesito limpiar?**
```bash
rm -rf .next
pnpm build
```

---

## Última Verificación

Antes de hacer cambios grandes:

```
☐ ¿Leí README.md?
☐ ¿Sé dónde está el código?
☐ ¿Sé qué NO cambiar?
☐ ¿Puedo compilar con pnpm build?
☐ ¿Las 7 vistas funcionan?
☐ ¿Sin console errors?
```

Si todo es ✓, ¡adelante! 🚀

---

**Pronto estarás:**
- ✨ Entendiendo la arquitectura
- 📝 Modificando datos
- 🎨 Cambiando estilos
- 💫 Agregando animaciones
- 🚀 Deployando a producción

---

**Última actualización:** 2026-08-01  
¡Bienvenido a Rutas de Justicia! 🏛️
