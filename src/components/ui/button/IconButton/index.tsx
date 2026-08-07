import { Image, ImageSourcePropType, Pressable, StyleProp, ViewStyle } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { useIconButtonStyles } from './useIconButtonStyles';

type IconButtonProps = {
  icon?: ImageSourcePropType;
  SvgIcon?: React.FC<SvgProps>;
  iconWidth?: number;
  iconHeight?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function IconButton({ icon, SvgIcon, iconWidth = 16, iconHeight = 16, onPress, style }: IconButtonProps) {
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
      {SvgIcon ? (
        <SvgIcon width={iconWidth} height={iconHeight} />
      ) : (
        <Image source={icon} style={styles.icon} />
      )}
    </Pressable>
  );
}
