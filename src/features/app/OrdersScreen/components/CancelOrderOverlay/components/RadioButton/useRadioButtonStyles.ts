import { StyleSheet } from 'react-native';

export function useRadioButtonStyles() {
  return styles;
}

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.9 }]
  }
});
