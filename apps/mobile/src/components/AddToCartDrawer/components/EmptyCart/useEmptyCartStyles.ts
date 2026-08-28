import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useEmptyCartStyles() {
  return styles;
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 18.86,
    paddingLeft: 35,
    paddingRight: 37.83
  },
  addToCartGroup: {
    flex: 1,
    width: '100%',
    marginTop: 125,
    alignItems: 'center'
  },
  emptyCartText: {
    flexShrink: 0,
    fontFamily: theme.typography.families.medium,
    fontWeight: theme.typography.weights.medium,
    fontSize: theme.typography.sizes.subHeading,
    lineHeight: theme.typography.sizes.subHeading,
    letterSpacing: 0,
    color: theme.colors.text.inverse
  },
  headerText: {
    width: 158,
    textAlign: 'center',
    fontSize: 24,
    color: theme.colors.text.inverse,
    fontWeight: 'bold'
  }
});
