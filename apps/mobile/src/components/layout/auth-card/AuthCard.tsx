import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import { theme } from '@theme';

export type AuthCardProps = PropsWithChildren<{
  /** Override or extend the inner white card. */
  contentStyle?: StyleProp<ViewStyle>;
  /** Override or extend the outer (yellow bleed) wrapper. */
  style?: StyleProp<ViewStyle>;
}>;

/**
 * Layout used under the (auth) Stack header. Renders a yellow bleed (same
 * color as the header) with a rounded-top white content card on top, so the
 * card visually tucks under the header chevron / title.
 */
export function AuthCard({ children, contentStyle, style }: AuthCardProps) {
  return (
    <View style={[styles.outer, style]}>
      <View style={[styles.card, contentStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: theme.colors.background.yellowBase
  },
  card: {
    flex: 1,
    backgroundColor: theme.colors.background.card,
    borderTopLeftRadius: theme.radii.navbar,
    borderTopRightRadius: theme.radii.navbar,
    overflow: 'hidden'
  }
});
