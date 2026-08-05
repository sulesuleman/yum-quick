import type { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

import { theme } from '@theme';

export type ButtonVariant = 'primary' | 'signUp' | 'cta';

export type ButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  title: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: theme.colors.background.yellowBase
  },
  signUp: {
    backgroundColor: theme.colors.button.signUp
  },
  cta: {
    backgroundColor: theme.colors.background.orangeBase
  }
});

/** Swapped palette on press (primary ↔ signUp). */
const variantPressedStyles = StyleSheet.create({
  primary: {
    backgroundColor: theme.colors.button.signUp
  },
  signUp: {
    backgroundColor: theme.colors.background.yellowBase
  },
  cta: {
    backgroundColor: theme.colors.brand.primary,
    opacity: 0.92
  }
});

const variantLabelStyles = StyleSheet.create({
  primary: {
    color: theme.colors.brand.primary
  },
  signUp: {
    color: theme.colors.brand.primary
  },
  cta: {
    color: theme.colors.text.inverse
  }
});

export function Button({
  title,
  variant = 'primary',
  fullWidth = true,
  style,
  labelStyle,
  disabled,
  ...pressableProps
}: ButtonProps) {
  return (
    <Pressable
      accessibilityRole='button'
      accessibilityLabel={title}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        fullWidth && styles.fullWidth,
        pressed && !disabled && variantPressedStyles[variant],
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style
      ]}
      {...pressableProps}
    >
      <Text
        style={[styles.label, variantLabelStyles[variant], disabled && styles.labelDisabled, labelStyle]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 35,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.radii.pill
  },
  fullWidth: {
    width: '100%'
  },
  pressed: {
    transform: [{ scale: 0.98 }]
  },
  disabled: {
    opacity: 0.5
  },
  label: {
    fontFamily: theme.typography.families.medium,
    fontSize: theme.typography.sizes.title,
    letterSpacing: theme.typography.letterSpacing.title
  },
  labelDisabled: {
    opacity: 0.7
  }
});
