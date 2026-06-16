import { Image, ImageSourcePropType, Pressable, StyleProp, ViewStyle } from 'react-native';

import { useIconButtonStyles } from './useIconButtonStyles';

type IconButtonProps = {
  icon: ImageSourcePropType;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function IconButton({ icon, onPress, style }: IconButtonProps) {
  const styles = useIconButtonStyles();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        style,
      ]}
    >
      <Image source={icon} style={styles.icon} />
    </Pressable>
  );
}
