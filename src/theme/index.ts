import type { StatusBarStyle } from 'expo-status-bar';

import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { layout } from './layout';

export const theme = {
  colors,
  spacing,
  typography,
  layout,
  radii: {
    screen: 20,
    pill: 30,
    /** Figma text field / date field */
    field: 13,
    /** Bottom navbar top corners */
    navbar: 30
  },
  field: {
    width: 322,
    height: 45
  },
  statusBarStyle: 'dark' as StatusBarStyle
} as const;

export { colors, spacing, typography, layout };
export { useScale, scale, getScaleFactor } from './responsive';
