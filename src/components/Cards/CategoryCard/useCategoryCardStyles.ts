import { StyleSheet } from 'react-native';

import { theme, useScale } from '@theme';

export function useCategoryCardStyles() {
  const { scale } = useScale();

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: scale(theme.spacing.xs)
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
      backgroundColor: theme.colors.brand.primary
    },
    icon: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      tintColor: theme.colors.brand.primary
    },
    iconSelected: {
      tintColor: theme.colors.text.inverse
    },
    label: {
      fontFamily: theme.typography.families.regular,
      fontSize: theme.typography.sizes.input,
      lineHeight: theme.typography.lineHeights.input,
      color: theme.colors.text.primary,
      textAlign: 'center',
      textTransform: 'capitalize'
    }
  });
}
