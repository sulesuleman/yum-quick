# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo layout

npm workspaces. Two independent apps on **different stacks** — they share a data layer, not UI:

```
yumQuick/
  package.json        # workspace root — delegates to app scripts, no app code here
  apps/
    mobile/            # customer-facing app — Expo / React Native — see apps/mobile/CLAUDE.md
    admin/             # admin dashboard — React web (Vite + Tailwind) — see apps/admin/CLAUDE.md
  packages/
    api/               # @yumquick/api — apiClient, domain types, ordersApi/productsApi/usersApi.
                        # Shared with admin; mobile keeps its own local copy (see below).
```

`apps/mobile` and `apps/admin` do **not** share UI components or design tokens — mobile renders with
React Native primitives (View/Text/StyleSheet), admin is plain React DOM styled with Tailwind. A
`packages/theme` + `packages/ui` pair was built and then removed once admin moved off Expo/React
Native onto a web stack — there was nothing left in common to share at the component level. Admin's
Tailwind palette in `apps/admin/src/index.css` is a manually-kept-in-sync duplicate of
`apps/mobile/src/theme/colors.ts`'s values, not a shared source of truth.

Run `npm install` once from the repo root — it installs and hoists dependencies for every workspace
under `apps/*` and `packages/*`. Don't run `npm install` inside an individual app/package folder.

## Commands

```bash
npm run mobile           # Start apps/mobile dev server (Expo, QR for Expo Go)
npm run mobile:android
npm run mobile:ios
npm run mobile:web
npm run mobile:mock-api  # json-server fake backend — apps/mobile/db.json, port 3001

npm run admin            # Start apps/admin dev server (Vite, http://localhost:5173)
npm run admin:build      # Type-check + production build
npm run admin:preview    # Serve the production build locally

npm run format            # Prettier write, whole repo
npm run format:check      # Prettier check, whole repo
```

No lint or test suite is configured.

## Data — one shared backend

Both apps talk to the **same** json-server instance (`apps/mobile/db.json`, started via
`npm run mobile:mock-api`) so admin edits and what customers see in the mobile app stay in sync —
there is no separate admin database or mock data. Mobile reaches it through its own local
`src/services/*` (unchanged); admin reaches it through the shared `@yumquick/api` package. Both must
point at the same running instance (matching `EXPO_PUBLIC_API_URL` / `VITE_API_URL`), not separate
copies. See each app's `CLAUDE.md` for exact env var setup.

## Adding a new app or shared package

- New app: add a folder under `apps/`, give it its own `package.json` (npm workspaces auto-detects it
  via the root `"workspaces": ["apps/*"]` glob — no root config change needed), then add its
  delegator scripts (`npm run <name> ...`) to the root `package.json`.
- Shared code: create `packages/<name>/` with its own `package.json`, add `"packages/*"` to the root
  `workspaces` array if not already there, and depend on it from an app via `"@yumquick/<name>": "*"`.
  Only add a shared package when there's a real, concrete duplication to remove — see the
  `packages/theme`/`packages/ui` removal above for why that matters.

## Per-app documentation

- [apps/mobile/CLAUDE.md](apps/mobile/CLAUDE.md) — routing, design system, auth, file/folder
  conventions for the Expo/React Native customer-facing app.
- [apps/admin/CLAUDE.md](apps/admin/CLAUDE.md) — routing, Tailwind styling, data layer, file/folder
  conventions for the React/Vite admin web app. Different conventions from mobile — read it separately,
  don't assume mobile's conventions carry over.
