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
      height: '100%'
    },
    placeholder: {
      width: '100%',
      height: '100%',
      backgroundColor: '#F0E8D8'
    },
    priceOverlay: {
      position: 'absolute',
      bottom: 10,
      right: 0,
      backgroundColor: theme.colors.background.orangeBase,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10
    },
    priceText: {
      fontFamily: theme.typography.families.bold,
      fontSize: 14,
      color: '#FFFFFF'
    }
  });
}
