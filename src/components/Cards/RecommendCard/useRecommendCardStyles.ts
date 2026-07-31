import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useRecommendCardStyles() {
  return StyleSheet.create({
    container: {
      position: 'relative'
    },
    badgeGroup: {
      position: 'absolute',
      top: 10,
      left: 13,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5
    },
    ratingBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background.card,
      borderRadius: 20,
      paddingHorizontal: 8,
      paddingVertical: 4,
      gap: 3
    },
    ratingText: {
      fontFamily: theme.typography.families.bold,
      fontSize: theme.typography.sizes.input,
      color: theme.colors.text.primary
    },
    heartButton: {
      backgroundColor: theme.colors.background.card,
      borderRadius: 20,
      padding: 6,
      alignItems: 'center',
      justifyContent: 'center'
    },
    priceOverlay: {
      position: 'absolute',
      bottom: 17,
      right: -1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background.orangeBase,
      height: 16,
      paddingLeft: 6,
      paddingRight: 4,
      borderTopLeftRadius: 30,
      borderBottomLeftRadius: 30
    },
    priceText: {
      fontFamily: theme.typography.families.regular,
      fontSize: theme.typography.sizes.input,
      fontWeight: theme.typography.weights.regular,
      color: theme.colors.text.inverse
    }
  });
}
