import { AccessibilityRole, AccessibilityState, Image, ImageSourcePropType, Pressable, StyleProp, ViewStyle } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { useIconButtonStyles } from './useIconButtonStyles';

type IconButtonProps = {
  icon?: ImageSourcePropType;
  SvgIcon?: React.FC<SvgProps>;
  iconWidth?: number;
  iconHeight?: number;
  /** Forwarded to the SvgIcon as `color`, resolving any `currentColor` fill/stroke in the source SVG. */
  iconColor?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  /** Optional a11y/testing props — all opt-in so existing call sites are unaffected. */
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel?: string;
  accessibilityState?: AccessibilityState;
  testID?: string;
};

export function IconButton({
  icon,
  SvgIcon,
  iconWidth = 16,
  iconHeight = 16,
  iconColor,
  onPress,
  style,
  accessibilityRole,
  accessibilityLabel,
  accessibilityState,
  testID
}: IconButtonProps) {
  const styles = useIconButtonStyles();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
      testID={testID}
      hitSlop={8}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        style,
      ]}
    >
      {SvgIcon ? (
        <SvgIcon width={iconWidth} height={iconHeight} color={iconColor} />
      ) : (
        <Image source={icon} style={styles.icon} />
      )}
    </Pressable>
  );
}
