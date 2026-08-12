import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useCreditCardStyles() {
  return styles;
}

const styles = StyleSheet.create({
  card: {
    width: 324,
    height: 195,
    borderRadius: 16,
    backgroundColor: theme.colors.background.yellowBase,
    overflow: 'hidden'
  },
  topRightBadge: {
    position: 'absolute',
    left: 255.6,
    top: 16.2,
    width: 51.5,
    height: 12.1,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.colors.text.primary
  },
  chip: {
    position: 'absolute',
    left: 278,
    top: 143
  },
  cardNumber: {
    position: 'absolute',
    left: 29.3,
    top: 107,
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.subHeading,
    color: theme.colors.text.primary
  },
  footerLeft: {
    position: 'absolute',
    left: 29.3,
    top: 142.5,
    width: 124
  },
  footerRight: {
    position: 'absolute',
    left: 163.7,
    top: 142.5
  },
  smallLabel: {
    fontFamily: theme.typography.families.regular,
    fontSize: 12,
    color: theme.colors.text.primary
  },
  boldValue: {
    marginTop: 2,
    width: '100%',
    fontFamily: theme.typography.families.bold,
    fontSize: 14,
    color: theme.colors.text.primary
  }
});
