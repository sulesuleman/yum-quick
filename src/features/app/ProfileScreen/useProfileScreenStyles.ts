import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useProfileScreenStyles() {
  return styles;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background.card,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    gap: theme.spacing.xl
  },
  title: {
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.title,
    color: theme.colors.text.primary
  },
  actions: {
    width: '80%'
  }
});
