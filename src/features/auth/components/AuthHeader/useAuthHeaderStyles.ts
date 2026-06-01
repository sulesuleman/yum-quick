import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useAuthHeaderStyles() {
  return styles;
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: theme.colors.background.yellowBase,
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  back: {
    position: 'absolute',
    left: theme.spacing.md,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.title,
    color: theme.colors.text.inverse,
    textAlign: 'center'
  }
});
