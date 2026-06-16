# RESONATE

A cinematic, dark-themed web app for "RESONATE — Algorithmic Sanctuary", a platform designed to eradicate digital isolation through high-performance, algorithmic empathy.

## Run & Operate

- `pnpm --filter @workspace/resonate run dev` — run the frontend (port assigned by workflow)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite + Tailwind v4
- 3D/Animation: Three.js, @react-three/fiber, @react-three/drei, GSAP, Framer Motion, Lenis
- Routing: wouter (replaced Next.js file-based routing)
- Shaders: Custom GLSL (`.vert`/`.frag`) loaded via vite glsl-loader plugin

## Where things live

- `artifacts/resonate/` — main frontend artifact (React + Vite)
- `artifacts/resonate/src/app/` — page components (one per route)
- `artifacts/resonate/src/presentation/` — canvas components, UI components, layouts
- `artifacts/resonate/src/index.css` — global styles + Tailwind v4 theme tokens
- `artifacts/resonate/vite.config.ts` — Vite config with inline GLSL loader

## Architecture decisions

- Migrated from Next.js 16 → Vite + React (Replit doesn't support Next.js artifacts).
- `next/link` replaced with wouter `<Link>`, `usePathname` → `useLocation`.
- Google Fonts (Inter, Oswald, Geist Mono) loaded via `<link>` tags in `index.html` (replaced `next/font/google`).
- GLSL shader files (`.vert`, `.frag`) handled by an inline Vite plugin that exports them as raw strings.
- animejs upgraded from v3 → v4 (API differences: `easing` → `ease`, `complete` → `onComplete`, named import `animate`).
- App layout (CustomCursor, GlobalNav, LenisProvider, AppProvider) handled in `App.tsx`, not `layout.tsx`.

## Product

- Cinematic loading screen with acoustic engine initialization
- Full navigation across ~25 pages: home, features, engine, about, impact, protocol, etc.
- 3D Three.js/R3F canvases for hero sections (neural network, singularity, mesh topology, etc.)
- GSAP + ScrollTrigger animations throughout
- Custom cursor, context menu, Lenis smooth scrolling

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- GLSL shaders imported as raw strings — the inline vite plugin in `vite.config.ts` handles `.vert`/`.frag`/`.glsl` files.
- animejs v4 is installed (the original used v3 syntax; migration: `easing` → `ease`, `complete` → `onComplete`).
- `"use client"` directives from Next.js have been stripped — they are no-ops in Vite/React.
- Do NOT run `pnpm dev` at the workspace root — use the workflow or `pnpm --filter @workspace/resonate run dev`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
