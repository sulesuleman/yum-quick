import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ContentSheet } from '@components/ContentSheet';
import { RadioButton } from '@components/RadioButton';
import { Button } from '@components/ui/button';
import { TextField } from '@components/ui/field';
import { theme } from '@theme';

import { CancelledAnimation } from './components/CancelledAnimation';
import { useCancelOrderOverlayStyles } from './useCancelOrderOverlayStyles';

const OTHERS_ID = 'others';

const REASONS = [
  { id: 'address', label: 'I want to change my delivery address' },
  { id: 'items', label: 'I want to modify my order items' },
  { id: 'delay', label: 'The delivery is taking too long' },
  { id: 'price', label: 'I found a better deal elsewhere' },
  { id: 'no-longer-needed', label: 'I no longer need this order' }
];

export type CancelOrderStep = 'form' | 'success';

type Props = {
  visible: boolean;
  step: CancelOrderStep;
  onStepChange: (step: CancelOrderStep) => void;
  onClose: () => void;
  onCancelled: () => void;
};

export function CancelOrderOverlay({ visible, step, onStepChange, onClose, onCancelled }: Props) {
  const styles = useCancelOrderOverlayStyles();
  const insets = useSafeAreaInsets();

  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [othersText, setOthersText] = useState('');

  const formOpacity = useSharedValue(1);
  const successOpacity = useSharedValue(0);

  useEffect(() => {
    if (!visible) return;
    onStepChange('form');
    setSelectedReason(null);
    setOthersText('');
    formOpacity.value = 1;
    successOpacity.value = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (step === 'success') {
      formOpacity.value = withTiming(0, { duration: 200, easing: Easing.out(Easing.cubic) });
      successOpacity.value = withTiming(1, { duration: 350, easing: Easing.out(Easing.cubic) });

      const timer = setTimeout(onClose, 2900);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const formAnimatedStyle = useAnimatedStyle(() => ({ opacity: formOpacity.value }));
  const successAnimatedStyle = useAnimatedStyle(() => ({ opacity: successOpacity.value }));

  if (!visible) return null;

  const canSubmit = selectedReason !== null && (selectedReason !== OTHERS_ID || othersText.trim().length > 0);

  const handleSubmit = () => {
    if (!canSubmit) return;
    onCancelled();
    onStepChange('success');
  };

  return (
    <KeyboardAvoidingView style={styles.overlay} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Animated.View
        style={[styles.layer, formAnimatedStyle]}
        pointerEvents={step === 'form' ? 'auto' : 'none'}
      >
        <ContentSheet paddingBottom={insets.bottom + 40}>
          <View style={styles.formBody}>
            <Text style={styles.description}>
              Please tell us why you're cancelling — it helps us improve your experience next time.
            </Text>

            {REASONS.map((reason) => (
              <View key={reason.id} style={styles.reasonRow}>
                <Text style={styles.reasonLabel}>{reason.label}</Text>
                <RadioButton
                  selected={selectedReason === reason.id}
                  onPress={() => {
                    setSelectedReason(reason.id);
                    setOthersText('');
                  }}
                />
              </View>
            ))}

            <TextField
              label='Others'
              value={othersText}
              onChangeText={(text) => {
                setOthersText(text);
                setSelectedReason(text.length > 0 ? OTHERS_ID : null);
              }}
              placeholder='Others reason...'
              placeholderTextColor={theme.colors.text.placeholder}
              multiline
              fullWidth={false}
              containerStyle={styles.othersField}
              labelStyle={styles.othersLabel}
              inputStyle={styles.othersValue}
              boxStyle={styles.othersBox}
            />

            <Button
              title='Submit'
              variant='cta'
              fullWidth={false}
              onPress={handleSubmit}
              disabled={!canSubmit}
              style={styles.submitBtn}
              labelStyle={styles.submitLabel}
            />
          </View>
        </ContentSheet>
      </Animated.View>

      <Animated.View
        style={[styles.layer, styles.successLayer, successAnimatedStyle]}
        pointerEvents={step === 'success' ? 'auto' : 'none'}
      >
        {step === 'success' && <CancelledAnimation />}
        <Text style={styles.successTitle}>Order Cancelled!</Text>
        <Text style={styles.successSubtitle}>Your order has been successfully cancelled</Text>
        <Text style={[styles.successSubtitle, styles.supportNote]}>
          If you have any question reach directly to our customer support
        </Text>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}
