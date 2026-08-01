# Plantilla de Cambios

Use este documento para documentar cambios realizados en el proyecto. Cópialo, renómbralo con la fecha, y registra todos los cambios.

---

## Cambios - [FECHA: YYYY-MM-DD]

**Realizado por:** [IA / Persona]  
**Tipo de cambio:** [Feature / Bug Fix / Refactor / Docs / Hotfix]  
**Duración:** [Tiempo empleado]

---

## Resumen

[Descripción corta de qué se cambió y por qué]

---

## Cambios Detallados

### 1. [Descripción del Cambio]

**Archivo(s) modificado(s):**
- `app/page.tsx` (líneas 80-120)
- `components/CaseCard.tsx` (línea 45)

**Antes:**
```typescript
// Código anterior aquí
```

**Después:**
```typescript
// Código nuevo aquí
```

**Razón:** [Por qué se hizo este cambio]  
**Impacto:** [Qué se ve afectado]

---

### 2. [Otro Cambio si aplica]

**Archivo(s) modificado(s):**
- `app/globals.css` (línea 70)

**Antes:**
```css
--background: oklch(0.145 0 0);
```

**Después:**
```css
--background: oklch(0.165 0 0);
```

**Razón:** [Por qué]  
**Impacto:** [Qué se ve afectado]

---

## Testing Realizado

- [ ] `pnpm build` - Compila sin errores
- [ ] `pnpm tsc --noEmit` - Sin errores TypeScript
- [ ] `pnpm dev` - Funciona en desarrollo
- [ ] Navegación entre vistas - Todas funcionan
- [ ] Responsive - Desktop y móvil
- [ ] Animaciones - Suaves
- [ ] No hay console errors - ✓
- [ ] No hay console warnings - ✓

**Pruebas Manuales Realizadas:**
- [ ] Probé Home view
- [ ] Probé Cases view - Casos se muestran
- [ ] Probé Professionals view - Se filtran correctamente
- [ ] Probé Information view
- [ ] Probé Case Detail - Grafo interactivo
- [ ] Probé Professional Detail
- [ ] Probé Simulator - 3 pasos funcionan

---

## Posibles Efectos Secundarios

[Describe si hay algo que podría afectar otras partes del proyecto]

- Cambio de color afecta tema oscuro general
- Nuevo caso requiere actualizar filtros
- Etc.

---

## Notas Importantes

[Cosas que el próximo dev debe saber]

- Si cambias X, también cambia Y
- Esta sección de código es crítica
- Recuerda hacer esto si agregas más

---

## Checklist de Completitud

- [ ] ✅ Código sigue convenciones del proyecto
- [ ] ✅ Sin archivos huérfanos creados
- [ ] ✅ Imports usan path alias (`@/`)
- [ ] ✅ TypeScript strict mode respetado
- [ ] ✅ Tailwind clases, no CSS custom
- [ ] ✅ Documentación actualizada si aplica
- [ ] ✅ Sin console.log debug statements
- [ ] ✅ Build exitoso
- [ ] ✅ No rompe vistas existentes

---

## Reverso (Si es necesario revertir)

**Comando para revertir (si aplica):**
```bash
# git revert COMMIT_HASH
# o editar los archivos mencionados arriba
```

**Pasos para revertir manualmente:**
1. Revertir cambios en [archivo]
2. Revertir cambios en [archivo]
3. Ejecutar `pnpm build`

---

## Próximos Pasos

[Qué debe hacerse después]

- [ ] Deploy a Vercel
- [ ] Notificar al team
- [ ] Crear Issue para seguimiento
- [ ] Nada - Change is complete

---

## Comentarios Adicionales

[Observaciones finales, aprendizajes, etc.]

---

---

# Ejemplos de Cambios Comunes

## Ejemplo 1: Agregar un Nuevo Caso

**Archivo:** `app/page.tsx`  
**Línea:** ~90

```typescript
// ANTES
const CASES: Case[] = [
  { id: 'case-001', title: '...', ... },
  { id: 'case-002', title: '...', ... },
  // ... 4 más
];

// DESPUÉS
const CASES: Case[] = [
  { id: 'case-001', title: '...', ... },
  { id: 'case-002', title: '...', ... },
  // ... 4 más
  {
    id: 'case-007',
    title: 'Nuevo Caso de Ejemplo',
    jurisdiction: 'Juzgado de Prueba - Distrito 1',
    status: 'active',
    year: 2024,
  },
];
```

---

## Ejemplo 2: Cambiar Color de Fondo

**Archivo:** `app/globals.css`  
**Línea:** ~70

```css
/* ANTES */
.dark {
  --background: oklch(0.145 0 0);
}

/* DESPUÉS */
.dark {
  --background: oklch(0.165 0 0);  /* Levemente más claro */
}
```

---

## Ejemplo 3: Agregar Animación a Componente

**Archivo:** `components/CaseCard.tsx`  
**Línea:** ~30

```typescript
// ANTES
return (
  <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
    {/* Content */}
  </div>
);

// DESPUÉS
return (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
    className="bg-slate-900 border border-slate-700 rounded-lg p-6"
  >
    {/* Content */}
  </motion.div>
);
```

---

## Ejemplo 4: Refactor de Componente

**Archivo:** `components/Navigation.tsx`  
**Cambios:** Lógica simplificada

```typescript
// ANTES
const getIcon = (view) => {
  if (view === 'home') return <Home />;
  if (view === 'cases') return <Briefcase />;
  // ... 5 más
};

// DESPUÉS
const iconMap = {
  home: <Home />,
  cases: <Briefcase />,
  // ... resto
};

const getIcon = (view) => iconMap[view];
```

**Razón:** Código más mantenible y legible.

---

# Pauta de Registro

**Cada cambio debe tener:**
1. ✅ Archivo(s) modificado
2. ✅ Línea(s) de código
3. ✅ Antes/Después
4. ✅ Razón del cambio
5. ✅ Impacto en el proyecto
6. ✅ Testing completado

**Mantén el registro actualizado:**
- Semanal
- Antes de cada deploy
- Después de cambios grandes

---

**Última actualización:** 2026-08-01  
**Versión:** 1.0  
**Propósito:** Documentar cambios de forma clara y consistente
