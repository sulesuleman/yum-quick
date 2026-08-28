import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useFavoritesScreenStyles() {
  return styles;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background.card
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.layout.tabBarHeight + theme.spacing.lg
  },
  emptyScreen: {
    flex: 1,
    backgroundColor: theme.colors.background.card,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg
  },
  title: {
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.title,
    color: theme.colors.text.primary
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7
  }
});
