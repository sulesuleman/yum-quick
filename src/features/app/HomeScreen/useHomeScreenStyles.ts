import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useHomeScreenStyles() {
  return styles;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // Yellow bg here fills the gap between the Stack header and the white card
    backgroundColor: theme.colors.background.yellowBase,
  },

  contentCard: {
    flex: 1,
    backgroundColor: theme.colors.background.card,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 31,
    paddingHorizontal: 36,
  },

  // The yellow header area at the top
  customHeader: {
    backgroundColor: theme.colors.background.yellowBase,
    paddingHorizontal: theme.spacing.md * 2,
    paddingBottom: theme.spacing.md,
  },

  // Searchbar and icon buttons sit side-by-side in this row
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },

  // Searchbar stretches to fill the leftover space
  searchbarWrapper: {
    flex: 1,
  },

  // The three icon buttons grouped together
  iconGroup: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },

  // Filtered category view
  filteredView: {
    flex: 1,
  },
  sortByRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
    marginTop: 20
  },
  filterButton: {
    width: 20,
    height: 20,
    borderRadius: 14,
    backgroundColor: theme.colors.brand.primary,
  },

  sortByLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  sortByLabel: {
    fontFamily: theme.typography.families.light,
    fontSize: theme.typography.sizes.input,
    color: theme.colors.text.caption,
    lineHeight: theme.typography.lineHeights.input,
  },
  sortByValue: {
    fontFamily: theme.typography.families.light,
    fontSize: theme.typography.sizes.input,
    color: theme.colors.brand.primary,
    lineHeight: theme.typography.lineHeights.input,
  },

  categoryScrollView: {
    height: 75,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 19,
    height: 75,
  },

  // Greeting section below the search row
  greetingRow: {
    marginTop: theme.spacing.md,
  },
  greetingText: {
    fontFamily: theme.typography.families.extraBold,
    fontSize: theme.typography.sizes.heading,
    color: theme.colors.text.inverse,
    lineHeight: theme.typography.lineHeights.title,
  },
  greetingSubtext: {
    fontFamily: theme.typography.families.medium,
    fontSize: theme.typography.sizes.subTitle,
    color: theme.colors.brand.primary,
    lineHeight: theme.typography.lineHeights.subTitle,
  },
});
