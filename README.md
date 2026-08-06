# Plan Verde 🌿

App personal para elegir un plan de salida al azar, hecha con Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion.

## Flujo

1. **Bienvenida** — saludo animado.
2. **Quiz** — dos preguntas ("¿movida o tranqui?", "¿aire libre o bajo techo?") que filtran los planes.
3. **Cartas** — barajado animado, se elige una carta, flip con confetti y detalle del plan.
4. **Carta sorpresa** — foto y mensaje tierno final.

## Correr en local

```bash
npm install
npm run dev
```

Abrí http://localhost:3000

## Agregar tus fotos

Poné los archivos en `public/images/` con estos nombres (ver `public/images/README.md`):

- `tigre.jpg`, `carlos-keen.jpg`, `cine.jpg`, `parque-de-la-costa.jpg`, `cafeteria.jpg`
- `sorpresa.jpg` — la foto de ustedes dos

Si falta alguna foto, se muestra automáticamente un fallback con degradé + emoji (no rompe la app).

## Editar los planes

Todo está en `src/data/planes.ts`. Cada plan tiene: `nombre`, `categoria`, `ritmo` (`movida`/`tranqui`), `ambiente` (`aire libre`/`bajo techo`), `vegetarianoFriendly`, `foto`, `frase`, `direccionOMapa` y `requisitos`. Para agregar un plan nuevo, sumá un objeto más al array — no requiere tocar componentes.

## Deploy en Vercel

1. Subí el repo a GitHub.
2. Entrá a [vercel.com/new](https://vercel.com/new) e importá el repo.
3. Vercel detecta Next.js automáticamente — no hace falta configurar nada (sin backend, sin variables de entorno, sin base de datos).
4. Deploy.

## Stack

- Next.js 14.2.35 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (shuffle, flip, transiciones)
- canvas-confetti
- Sin librería de estado externa (useReducer/useState)
- Sin backend ni base de datos — datos estáticos en `src/data/planes.ts`
