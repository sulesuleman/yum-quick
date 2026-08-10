import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useProductDetailsScreenStyles() {
  return styles;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background.yellowBase
  },

  customHeader: {
    backgroundColor: theme.colors.background.yellowBase,
    paddingHorizontal: theme.spacing.md * 2,
    paddingBottom: 13
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 7,
    marginBottom: 5
  },
  headerIcon: {
    backgroundColor: 'transparent'
  },
  favoriteIcon: {
    width: 21,
    height: 21,
    borderRadius: 10.5,
    backgroundColor: theme.colors.brand.primary
  },
  headerTitle: {
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.subHeading,
    color: theme.colors.text.primary
  },

  sheetContent: {
    paddingTop: 29,
    paddingHorizontal: 36
  },

  imageWrapper: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 25
  },
  image: {
    width: '100%',
    height: 'auto',
    aspectRatio: 321 / 224
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.divider,
    marginBottom: 18
  },

  titleLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm
  },
  titleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.brand.primary
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    alignSelf: 'flex-start',
    marginLeft: 26 + 7,
    backgroundColor: theme.colors.brand.primary,
    borderRadius: theme.radii.pill,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2
  },
  ratingText: {
    fontFamily: theme.typography.families.medium,
    fontSize: theme.typography.sizes.input,
    color: theme.colors.text.inverse
  },

  subtitle: {
    fontFamily: theme.typography.families.regular,
    fontSize: 16,
    letterSpacing: 0,
    color: theme.colors.text.primary,
    marginBottom: 7
  },
  description: {
    fontFamily: theme.typography.families.light,
    fontSize: theme.typography.sizes.body,
    lineHeight: theme.typography.sizes.body * 0.95,
    letterSpacing: -0.48,
    color: theme.colors.text.primary,
    opacity: 0.8,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8.93
  },
  price: {
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.title,
    color: theme.colors.brand.primary
  },

  sectionTitle: {
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.subHeading,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.text.primary,
    paddingTop: 29,
    paddingBottom: 0
  },

  toppingsList: {
    paddingTop: 17,
    marginBottom: theme.spacing.md
  },

  ctaWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  ctaButton: {
    width: 180.32,
    height: 33,
    minHeight: 33,
    paddingVertical: 0,
    paddingHorizontal: 0
  },
  ctaButtonLabel: {
    fontFamily: theme.typography.families.medium,
    fontSize: 20.04,
    letterSpacing: -0.1002
  }
});
