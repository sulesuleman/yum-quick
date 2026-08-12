import { StyleSheet } from 'react-native';

import { theme, useScale } from '@theme';

export function useCategoryCardStyles() {
  const { scale } = useScale();

  const CAP_INSET = scale(6);
  const BUMP = scale(11);
  const MERGE = scale(24);
  const INVERTED_RADIUS = scale(16);

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: scale(theme.spacing.xs)
    },
    selectedBackdrop: {
      position: 'absolute',
      top: -BUMP,
      bottom: -MERGE,
      left: -CAP_INSET,
      right: -CAP_INSET,
      backgroundColor: theme.colors.background.card,
      borderTopLeftRadius: scale(26),
      borderTopRightRadius: scale(26)
    },
    invertedCornerMask: {
      position: 'absolute',
      bottom: 0,
      width: INVERTED_RADIUS,
      height: INVERTED_RADIUS,
      backgroundColor: theme.colors.background.card
    },
    bottomLeftMask: {
      left: -(CAP_INSET + INVERTED_RADIUS)
    },
    bottomRightMask: {
      right: -(CAP_INSET + INVERTED_RADIUS)
    },
    orangeCurveFillerLeft: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.colors.brand.primary,
      borderBottomRightRadius: INVERTED_RADIUS
    },
    orangeCurveFillerRight: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.colors.brand.primary,
      borderBottomLeftRadius: INVERTED_RADIUS
    },
    iconWrapper: {
      width: scale(49),
      height: scale(62),
      borderRadius: scale(30),
      backgroundColor: theme.colors.background.yellow2,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      paddingVertical: scale(12.5),
      paddingHorizontal: scale(6)
    },
    iconWrapperSelected: {
      backgroundColor: theme.colors.background.yellowBase
    },
    icon: { 
      width: '100%',
      height: '100%'
    },
    label: {
      fontFamily: theme.typography.families.regular,
      fontSize: theme.typography.sizes.input,
      lineHeight: theme.typography.lineHeights.input,
      color: theme.colors.text.primary,
      textAlign: 'center',
      textTransform: 'capitalize'
    },
    labelSelected: {
      fontFamily: theme.typography.families.semiBold
    }
  });
}
