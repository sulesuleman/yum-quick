import { StyleSheet } from 'react-native';

import { theme } from '@theme';

type Params = {
  width: number;
  height: number;
  borderRadius: number;
};

export function useFoodImageStyles({ width, height, borderRadius }: Params) {
  return StyleSheet.create({
    container: {
      width,
      height,
      borderRadius,
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius
    },
    placeholder: {
      width: '100%',
      height: '100%',
      backgroundColor: '#F0E8D8'
    },
    priceOverlay: {
      position: 'absolute',
      bottom: 10,
      right: -1.32,
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
      color: '#FFFFFF'
    }
  });
}
