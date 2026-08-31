# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this app (`apps/admin`). See the repo root [CLAUDE.md](../../CLAUDE.md) for monorepo-wide commands and layout.

This is a **web app** — React + Vite + TypeScript + Tailwind CSS + React Router. It is a separate
stack from `apps/mobile` (Expo/React Native); the two do not share UI components, only the data
layer (`@yumquick/api`).

## Commands

Run from the repo root, or `cd apps/admin` and drop the `--workspace` flag:

```bash
npm run admin              # Start Vite dev server (http://localhost:5173)
npm run admin:build        # Type-check + production build (outputs apps/admin/dist)
npm run admin:preview      # Serve the production build locally
npm run mobile:mock-api      # shared fake backend — see Data below
npm run format               # Prettier write (whole repo, from root)
npm run format:check         # Prettier check (whole repo, from root)
```

No lint or test suite is configured.

## Data — shared backend with `apps/mobile`

This app does **not** have its own database or mock data. It reads/writes the exact same json-server
backend as the mobile app (`apps/mobile/db.json`), via `@yumquick/api`'s `apiClient` — so admin edits
and what customers see in the mobile app stay in sync.

- Start the backend once (from repo root): `npm run mobile:mock-api` (json-server on port 3001,
  serving `apps/mobile/db.json`).
- Copy `apps/admin/.env.example` to `.env` and set `VITE_API_URL` — since this runs in a browser on
  the same machine (not a physical device), `http://localhost:3001` is fine, unlike mobile's
  LAN-IP requirement.
- `main.tsx` calls `configureApiBaseUrl(import.meta.env.VITE_API_URL ?? 'http://localhost:3001')`
  once at startup.
- Data access goes through `@yumquick/api`: `ordersApi.listAll()`, `productsApi.list()`,
  `usersApi.list()`, etc. Add new endpoints there (not ad hoc `fetch` calls in pages) so mobile can
  adopt them later too.

## Shared workspace package

`@yumquick/api` (`packages/api`) is the **only** package shared with `apps/mobile` — `apiClient`,
domain types (`Order`, `Product`, `User`, ...), and `ordersApi` / `productsApi` / `usersApi`.
`apps/mobile` does not consume it yet (it keeps its own local `src/services` copy untouched), but the
shapes are kept identical on purpose so it's a drop-in swap later.

There is no shared UI-component or design-token package. Mobile is React Native (Expo); admin is
plain React/DOM — their component primitives are fundamentally different (View/Text/StyleSheet vs.
div/span/Tailwind), so a `packages/ui`/`packages/theme` pair was tried and then removed once admin
moved off Expo — it added indirection with nothing left to share. The brand palette is duplicated
directly as Tailwind tokens in `src/index.css` (see below), matching `apps/mobile/src/theme/colors.ts`
by value. If a value changes in one place, update it in the other — there's no single source of truth
enforcing it.

## Styling

Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`). `src/index.css` defines the brand palette
as an `@theme` block (`--color-orange-base`, `--color-brand`, `--color-success`, etc.), which Tailwind
turns into utility classes (`bg-orange-base`, `text-brand`, `bg-success-bg`, ...). Use those utilities
directly in JSX `className` — no CSS Modules, no inline `style` objects except for truly dynamic values
(e.g. `FoodImage`'s computed width/height/borderRadius). The League Spartan font is loaded via Google
Fonts `<link>` tags in `index.html` and set as `--font-sans`.

## Architecture

- `src/main.tsx` — entry point: configures the API base URL, mounts `<App />` inside a `BrowserRouter`.
- `src/App.tsx` — route table (`react-router-dom`), all routes nested under `AdminLayout`.
- `src/layout/AdminLayout/` — the persistent shell: left sidebar nav (orange, matches mobile's tab bar
  color) + top bar showing the current page title + `<Outlet />` for the active page.
- `src/features/<feature>/<Name>Page/` — one folder per route (`DashboardPage`, `OrdersPage`,
  `MenuPage`, `CustomersPage`, `ProfilePage`), each `index.tsx` only (no separate styles file — Tailwind
  classes live in the JSX directly, so there's nothing to extract into a hook the way `apps/mobile`
  does with `use<Name>Styles.ts`).
- `src/components/` — reusable pieces: domain rows/badges (`OrderRow`, `ProductRow`, `CustomerRow`,
  `StatusBadge`, `StatCard`, `SectionHeader`, `FilterChips`) plus `src/components/ui/` for generic
  primitives (`Button`, `TextField`, `FoodImage`) and `src/components/icons/` for the hand-rolled inline
  SVG icon set (no icon library dependency).
- `FoodImage` + `resolveProductImage` (`src/components/ui/FoodImage/`) reproduce mobile's rounded
  thumbnail + price-badge treatment for order/product images, backed by the same placeholder asset
  (`src/assets/mexican-appetizer.png`, copied from `apps/mobile/assets/`) — the mock backend only has
  that one real product photo, same as mobile.

## File & Folder Conventions

One folder per page/component. Pages are `index.tsx` only. A component gets a second file only if it
needs one (rare here, since Tailwind utilities replace the separate-styles-file convention `apps/mobile`
uses). Component used only within one page → colocate or keep in that feature folder. Component used in
two or more places → `src/components/` (domain) or `src/components/ui/` (generic).
