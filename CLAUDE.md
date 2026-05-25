# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npx expo start          # Start dev server (opens QR for Expo Go)
npx expo start --android
npx expo start --ios
npx expo start --web
npm run lint            # ESLint via expo lint
npm run reset-project   # Wipe app/ back to blank starter
```

No test suite is configured.

## Architecture

**Routing** — Expo Router (file-based). `app/` maps directly to routes:
- `app/_layout.tsx` — root Stack navigator; owns the 2-second splash screen (rendered in React, not native) and wraps everything in React Navigation's `ThemeProvider`
- `app/(tabs)/` — bottom-tab group; `_layout.tsx` configures two tabs (Home, Explore)
- `app/welcome/` — standalone screen outside the tab group (currently empty)
- `app/modal.tsx` — modal presentation route

**Design system** — all tokens live in `constants/theme.ts`:
- `Palette` — raw hex values (yellow `#F5C518`, orange `#E95322`)
- `Colors` — semantic tokens (`primary`, `tabBarBackground`, `inputBackground`, etc.). Dark mode mirrors light — this is intentionally a light-only app.
- `Typography`, `Spacing`, `Fonts` — scale values used across components

**Theming hook** — `hooks/use-theme-color.ts` — resolves a `Colors.light` key (or a per-component override) based on the current color scheme. Prefer this over importing `Colors` directly in components.

**Icons** — `components/ui/icon-symbol.tsx` uses SF Symbols on iOS and maps to Material Icons on Android/web. To add a new icon, extend the `MAPPING` object in that file.

**Platform-specific files** — follow Expo convention: `.ios.tsx` / `.web.ts` suffixes for platform overrides (e.g., `hooks/use-color-scheme.web.ts`, `components/ui/icon-symbol.ios.tsx`).

**Animations** — React Native Reanimated 4 + Worklets. `react-native-reanimated` is imported at the top of `app/_layout.tsx` to initialize the Reanimated runtime before any animated component mounts.

**Path alias** — `@/` maps to the project root (configured in `tsconfig.json`).

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
