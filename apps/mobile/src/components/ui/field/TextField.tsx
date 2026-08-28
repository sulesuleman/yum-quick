import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import type { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

import { theme } from '@theme';

import { fieldStyles } from './fieldStyles';

export type TextFieldType = 'text' | 'password' | 'email' | 'number' | 'phone';

export type TextFieldProps = Omit<TextInputProps, 'style' | 'secureTextEntry'> & {
  label?: string;
  error?: string;
  type?: TextFieldType;
  containerStyle?: StyleProp<ViewStyle>;
  boxStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
};

export function TextField({
  label,
  error,
  type = 'text',
  containerStyle,
  boxStyle,
  labelStyle,
  inputStyle,
  fullWidth = true,
  editable = true,
  multiline,
  placeholderTextColor = theme.colors.text.placeholder,
  ...inputProps
}: TextFieldProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = type === 'password';

  const keyboardType =
    type === 'email'
      ? 'email-address'
      : type === 'number'
        ? 'numeric'
        : type === 'phone'
          ? 'phone-pad'
          : inputProps.keyboardType;

  const autoCapitalize =
    type === 'email' || type === 'password' ? 'none' : inputProps.autoCapitalize;

  return (
    <View style={[fullWidth && fieldStyles.wrapper, containerStyle]}>
      {label ? <Text style={[fieldStyles.label, labelStyle]}>{label}</Text> : null}

      <View
        style={[
          fieldStyles.container,
          multiline && fieldStyles.containerMultiline,
          !editable && fieldStyles.containerDisabled,
          boxStyle
        ]}
      >
        <TextInput
          {...inputProps}
          multiline={multiline}
          editable={editable}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={isPassword && !passwordVisible}
          style={[fieldStyles.input, multiline && fieldStyles.inputMultiline, inputStyle]}
        />

        {isPassword ? (
          <Pressable
            accessibilityRole='button'
            accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
            hitSlop={8}
            onPress={() => setPasswordVisible((visible) => !visible)}
            style={fieldStyles.adornment}
          >
            <Ionicons
              name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
              size={22}
              color={theme.colors.background.orangeBase}
            />
          </Pressable>
        ) : null}
      </View>

      {error ? <Text style={fieldStyles.error}>{error}</Text> : null}
    </View>
  );
}
