import { StyleSheet } from 'react-native';

import { theme, useScale } from '@theme';

export function useHomeScreenStyles(bottomInset: number = 0) {
  const { scale } = useScale();

  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background.yellowBase
    },

    contentCard: {
      flexGrow: 1,
      backgroundColor: theme.colors.background.card,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingTop: 31,
      paddingHorizontal: 36,
      paddingBottom: theme.layout.tabBarHeight + bottomInset + theme.spacing.md
    },

    divider: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.background.divider,
      marginTop: scale(12),
      marginBottom: scale(14)
    },

    customHeader: {
      backgroundColor: theme.colors.background.yellowBase,
      paddingHorizontal: theme.spacing.md * 2,
      paddingBottom: theme.spacing.md
    },

    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm
    },

    iconGroup: {
      flexDirection: 'row',
      gap: theme.spacing.sm
    },

    defaultView: {},

    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14
    },
    sectionTitle: {
      fontFamily: theme.typography.families.regular,
      fontSize: theme.typography.sizes.subHeading,
      fontWeight: theme.typography.weights.medium,
      color: theme.colors.text.primary
    },
    viewAllRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2
    },
    viewAllText: {
      fontFamily: theme.typography.families.semiBold,
      fontSize: theme.typography.sizes.input,
      fontWeight: theme.typography.weights.semiBold,
      color: theme.colors.brand.primary
    },
    viewAllChevron: {
      fontFamily: theme.typography.families.medium,
      fontSize: 16,
      color: theme.colors.brand.primary,
      lineHeight: 20
    },

    bestSellerRow: {
      flexDirection: 'row',
      gap: scale(11.32)
    },

    promoBanner: {
      marginTop: 20,
      borderRadius: 16,
      backgroundColor: theme.colors.background.orangeBase,
      overflow: 'hidden',
      height: 120
    },
    promoSlide: {
      flexDirection: 'row',
      height: 120
    },
    promoTextContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    promoLabel: {
      fontFamily: theme.typography.families.medium,
      fontSize: theme.typography.sizes.body,
      color: theme.colors.text.inverse,
      lineHeight: 20,
      textAlign: 'center'
    },
    promoDiscount: {
      fontFamily: theme.typography.families.extraBold,
      fontSize: 26,
      color: theme.colors.text.inverse,
      lineHeight: 32,
      marginTop: 4,
      textAlign: 'center'
    },
    promoImageContainer: {
      flex: 1,
      overflow: 'hidden'
    },

    promoDots: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 6,
      marginTop: 10,
      marginBottom: 4
    },
    dot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: theme.colors.background.orange2
    },
    dotActive: {
      backgroundColor: theme.colors.brand.primary,
      width: 20
    },

    recommendTitle: {
      marginTop: 21,
      marginBottom: 14
    },
    recommendGrid: {
      flexDirection: 'row',
      columnGap: scale(7)
    },

    filteredView: {},
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
      backgroundColor: theme.colors.brand.primary
    },

    sortByLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs
    },
    sortByLabel: {
      fontFamily: theme.typography.families.light,
      fontSize: theme.typography.sizes.input,
      color: theme.colors.text.caption,
      lineHeight: theme.typography.lineHeights.input
    },
    sortByValue: {
      fontFamily: theme.typography.families.light,
      fontSize: theme.typography.sizes.input,
      color: theme.colors.brand.primary,
      lineHeight: theme.typography.lineHeights.input
    },

    categoryScrollView: {
      height: scale(75)
    },
    categoryRow: {
      flexDirection: 'row',
      gap: scale(19),
      height: scale(75)
    },

    greetingRow: {
      marginTop: theme.spacing.md
    },
    greetingText: {
      fontFamily: theme.typography.families.extraBold,
      fontSize: theme.typography.sizes.heading,
      color: theme.colors.text.inverse,
      lineHeight: theme.typography.lineHeights.title
    },
    greetingSubtext: {
      fontFamily: theme.typography.families.medium,
      fontSize: theme.typography.sizes.subTitle,
      color: theme.colors.brand.primary,
      lineHeight: theme.typography.lineHeights.subTitle
    }
  });
}
