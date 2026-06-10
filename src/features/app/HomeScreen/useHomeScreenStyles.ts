import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useHomeScreenStyles() {
  return styles;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background.yellowBase
  }
});

