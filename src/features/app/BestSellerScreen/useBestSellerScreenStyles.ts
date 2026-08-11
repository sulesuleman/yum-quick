import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useBestSellerScreenStyles() {
  return styles;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background.yellowBase
  },

  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.yellowBase,
    paddingHorizontal: 35,
    paddingBottom: 25
  },
  headerIcon: {
    backgroundColor: 'transparent'
  },
  headerTextGroup: {
    flex: 1,
    alignItems: 'center'
  },
  headerSpacer: {
    width: 26
  },
  headerTitle: {
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.screenTitle,
    color: theme.colors.text.inverse
  },
  headerSubtitle: {
    fontFamily: theme.typography.families.medium,
    fontSize: theme.typography.sizes.subHeading,
    color: theme.colors.brand.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md
  },

  sheetContent: {
    paddingVertical: 34,
    paddingTop: 34,
    paddingHorizontal: 35
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 7,
    rowGap: theme.spacing.lg
  }
});
