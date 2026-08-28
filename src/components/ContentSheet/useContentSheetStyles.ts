import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useContentSheetStyles() {
  return styles;
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: theme.colors.background.card,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  content: {
    paddingTop: theme.spacing.md
  }
});
