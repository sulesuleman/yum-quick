import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import { theme } from '@theme';

import { fieldStyles } from './fieldStyles';

export type DatePickerFieldProps = {
  label?: string;
  error?: string;
  value?: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: 'date' | 'time' | 'datetime';
  containerStyle?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  disabled?: boolean;
};

function formatValue(date: Date | null | undefined, mode: DatePickerFieldProps['mode']) {
  if (!date) return '';

  if (mode === 'time') {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  if (mode === 'datetime') {
    return date.toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return date.toLocaleDateString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function DatePickerField({
  label,
  error,
  value,
  onChange,
  placeholder = 'Select date',
  minimumDate,
  maximumDate,
  mode = 'date',
  containerStyle,
  fullWidth = true,
  disabled = false,
}: DatePickerFieldProps) {
  const [showIosPicker, setShowIosPicker] = useState(false);
  const [iosDraft, setIosDraft] = useState(value ?? new Date());

  const displayText = value ? formatValue(value, mode) : placeholder;
  const hasValue = Boolean(value);

  const openPicker = () => {
    if (disabled) return;

    const current = value ?? new Date();

    if (Platform.OS === 'android') {
      const androidMode = mode === 'datetime' ? 'date' : mode;
      DateTimePickerAndroid.open({
        value: current,
        mode: androidMode,
        minimumDate,
        maximumDate,
        onChange: (event, selectedDate) => {
          if (event.type === 'set' && selectedDate) {
            onChange(selectedDate);
          }
        },
      });
      return;
    }

    setIosDraft(current);
    setShowIosPicker(true);
  };

  const confirmIosPicker = () => {
    onChange(iosDraft);
    setShowIosPicker(false);
  };

  return (
    <View style={[fullWidth && fieldStyles.wrapper, containerStyle]}>
      {label ? <Text style={fieldStyles.label}>{label}</Text> : null}

      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={openPicker}
        style={({ pressed }) => [
          fieldStyles.container,
          disabled && fieldStyles.containerDisabled,
          pressed && !disabled && { opacity: 0.92 },
        ]}
      >
        <Text
          style={[fieldStyles.valueText, !hasValue && styles.placeholder]}
          numberOfLines={1}
        >
          {displayText}
        </Text>

        <View style={fieldStyles.adornment}>
          <Ionicons
            name="calendar-outline"
            size={22}
            color={theme.colors.background.orangeBase}
          />
        </View>
      </Pressable>

      {error ? <Text style={fieldStyles.error}>{error}</Text> : null}

      {Platform.OS === 'ios' ? (
        <Modal transparent animationType="slide" visible={showIosPicker}>
          <View style={iosStyles.overlay}>
            <View style={iosStyles.sheet}>
              <View style={iosStyles.toolbar}>
                <Pressable onPress={() => setShowIosPicker(false)}>
                  <Text style={iosStyles.toolbarAction}>Cancel</Text>
                </Pressable>
                <Pressable onPress={confirmIosPicker}>
                  <Text style={[iosStyles.toolbarAction, iosStyles.toolbarConfirm]}>
                    Done
                  </Text>
                </Pressable>
              </View>
              <DateTimePicker
                value={iosDraft}
                mode={mode}
                display="spinner"
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                onChange={(_, selectedDate) => {
                  if (selectedDate) setIosDraft(selectedDate);
                }}
              />
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    opacity: 0.55,
  },
});

const iosStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: theme.colors.text.inverse,
    borderTopLeftRadius: theme.radii.screen,
    borderTopRightRadius: theme.radii.screen,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.yellow2,
  },
  toolbarAction: {
    fontFamily: theme.typography.families.medium,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary,
  },
  toolbarConfirm: {
    color: theme.colors.background.orangeBase,
    fontFamily: theme.typography.families.bold,
  },
});
