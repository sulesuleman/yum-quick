# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npx expo start          # Start dev server (opens QR for Expo Go)
npx expo start --android
npx expo start --ios
npx expo start --web
npm run format          # Prettier write
npm run format:check    # Prettier check
```

No lint or test suite is configured.

## Architecture

**Routing** — Expo Router v6 (file-based). Three navigation contexts, each owns its own `_layout.tsx`:

- `app/_layout.tsx` — root Stack. Loads League Spartan fonts, gates the native splash, wraps the tree in `SafeAreaProvider` and `<AuthProvider>` (from `@features/auth/AuthContext`). `headerShown: false` at the root so children opt in.
- `app/index.tsx` — auth-aware entry redirect: `/(app)/(tabs)` when signed in, else `/splash`.
- `app/splash.tsx`, `app/welcome.tsx` — onboarding routes at the root (no header, no tab bar). Splash auto-advances to Welcome via `router.replace('/welcome')`.
- `app/(auth)/` — auth group (Log In, Hello, New Account, Set Password). The group's `_layout.tsx` configures a yellow native header with centered title + back chevron. **No bottom tab bar.** Per-screen titles are declared centrally in `(auth)/_layout.tsx`.
- `app/(app)/` — main-app group, gated by `useAuth()`. The layout redirects unauthenticated users to `/welcome` (covers deep links into any `(app)/*` route). Outer Stack carries the yellow header so future detail pushes inherit it.
- `app/(app)/(tabs)/` — five-tab navigator (`index`/Home, Dashboard, Favorites, Notifications, Profile). Orange tab bar with rounded top corners, icons only (`tabBarShowLabel: false`), header titles set per-tab via `Tabs.Screen options`. Icons sourced from `assets/*.png` with `tintColor: theme.colors.text.inverse`.

Navigation rule: use `router.replace` when the source screen must NOT be back-reachable (splash, post-login transition, logout). Use `router.push` when back navigation is part of the flow (auth multi-step).

**Design system** — tokens live in `src/theme/`, re-exported as `theme` from `@theme`:

- `colors` — `background.*`, `button.*`, `brand.*`, `text.*` semantic groups (light-only app; no dark variants).
- `typography` — League Spartan family + `sizes`/`lineHeights`/`letterSpacing` scales.
- `spacing`, `radii`, `field` — numeric scales.

Always import via `import { theme } from '@theme'` rather than reaching into individual files.

**Auth** — `src/features/auth/AuthContext.tsx` exposes `useAuth()` with `{ isAuthenticated, isLoading, signIn(token), signOut() }`. Token persisted in `AsyncStorage` under key `yumquick.authToken`. The `(app)/_layout.tsx` gate enforces this for the whole main-app group.

**Path aliases** (`tsconfig.json`):

- `@/*` → project root (used for `require('@/assets/...')`)
- `@components` / `@components/*` → `src/components`
- `@features` / `@features/*` → `src/features`
- `@theme` / `@theme/*` → `src/theme`

## File & Folder Conventions

Every screen and component lives in its **own folder**, not a bare `.tsx` file. Each folder contains exactly these files:

```
ComponentName/
├── index.tsx          # component/screen logic and JSX
└── useComponentNameStyles.ts  # all StyleSheet definitions, exported as a hook
```

The styles file must be a hook (named `use<ComponentName>Styles.ts`) that returns the stylesheet. No inline `StyleSheet.create` calls inside `index.tsx`.

**Example:**

```
app/
  (tabs)/
    home/
      index.tsx
      useHomeStyles.ts
      components/
        FeaturedBanner/
          index.tsx
          useFeaturedBannerStyles.ts
```

**Component placement rule:**

- If a component is used **only within one screen/feature**, place it in a `components/` subfolder inside that screen's folder.
- If a component is used in **two or more places**, move it to the top-level `components/` folder at the project root.
