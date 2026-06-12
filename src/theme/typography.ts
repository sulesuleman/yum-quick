/**
 * These names must match the keys passed to `useFonts` in `app/_layout.tsx`
 * (League Spartan from Google Fonts via `@expo-google-fonts/league-spartan`).
 */
export const typography = {
  families: {
    /** Default body / UI copy */
    light: 'LeagueSpartan-Light',
    regular: 'LeagueSpartan-Regular',
    medium: 'LeagueSpartan-Medium',
    bold: 'LeagueSpartan-Bold',
    extraBold: 'LeagueSpartan-ExtraBold'
  },
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    bold: '700',
    extraBold: '800'
  },
  sizes: {
    body: 14,
    heading: 30,
    title: 24,
    brand: 35,
    subTitle: 13,
    input: 12
  },
  lineHeights: {
    body: 24,
    title: 30,
    brand: 38,
    subTitle: 13,
    input: 12,
  },
  letterSpacing: {
    body: 0,
    title: -0.2,
    brand: -1.2
  }
} as const;
