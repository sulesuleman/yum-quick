import { StyleSheet } from 'react-native';

export function useIconButtonStyles() {
  return styles;
}

const styles = StyleSheet.create({
  button: {
    width: 26,
    height: 26,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.6,
  },
  icon: {
    width: 16,
    aspectRatio: 1/1,
    objectFit: 'contain'
  },
});
