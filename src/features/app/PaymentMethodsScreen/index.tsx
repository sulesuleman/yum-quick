import { useCallback, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Stack, router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ApplePayIcon from '@/assets/apple-pay-icon.svg';
import BackArrowIcon from '@/assets/back-arrow.svg';
import GooglePayIcon from '@/assets/google-play-icon.svg';
import PaymentCardIcon from '@/assets/payment-card-icon.svg';
import PaypalIcon from '@/assets/paypal-icon.svg';

import { ContentSheet } from '@components/ContentSheet';
import { Button } from '@components/ui/button';
import { TextField } from '@components/ui/field';

import { CreditCard } from './components/CreditCard';
import { PaymentMethodRow } from './components/PaymentMethodRow';
import { usePaymentMethodsScreenStyles } from './usePaymentMethodsScreenStyles';

type PaymentMethod = {
  id: string;
  label: string;
  SvgIcon: typeof PaymentCardIcon;
  iconWidth: number;
  iconHeight: number;
};

const INITIAL_METHODS: PaymentMethod[] = [
  { id: 'card', label: '*** *** *** 43', SvgIcon: PaymentCardIcon, iconWidth: 40, iconHeight: 27 },
  { id: 'apple', label: 'Apple Pay', SvgIcon: ApplePayIcon, iconWidth: 35, iconHeight: 47 },
  { id: 'paypal', label: 'PayPal', SvgIcon: PaypalIcon, iconWidth: 32, iconHeight: 40 },
  { id: 'google', label: 'Google Pay', SvgIcon: GooglePayIcon, iconWidth: 33, iconHeight: 40 }
];

function formatCardNumber(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

type Mode = 'list' | 'add';

export function PaymentMethodsScreen() {
  const styles = usePaymentMethodsScreenStyles();
  const insets = useSafeAreaInsets();

  const [mode, setMode] = useState<Mode>('list');
  const [methods] = useState<PaymentMethod[]>(INITIAL_METHODS);
  const [selectedId, setSelectedId] = useState(INITIAL_METHODS[0].id);

  const [holderName, setHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  useFocusEffect(
    useCallback(() => {
      return () => Keyboard.dismiss();
    }, [])
  );

  const canSave = holderName.trim().length > 0 && cardNumber.replace(/\D/g, '').length === 16;

  const handleBack = () => {
    if (mode === 'add') {
      setMode('list');
    } else {
      router.back();
    }
  };

  const handleOpenAddCard = () => {
    setHolderName('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setMode('add');
  };

  const handleSaveCard = () => {
    if (!canSave) return;
    setHolderName('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setMode('list');
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Stack.Screen
        options={{
          header: () => (
            <View style={[styles.customHeader, { paddingTop: insets.top + 41 }]}>
              <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
                <BackArrowIcon width={7} height={13} />
              </TouchableOpacity>
              <Text style={styles.title}>{mode === 'add' ? 'Add Card' : 'Payment Methods'}</Text>
              <View style={styles.backBtn} />
            </View>
          )
        }}
      />

      {mode === 'list' ? (
        <ContentSheet paddingBottom={insets.bottom + 40} contentStyle={styles.sheetContent}>
          {methods.map((method) => (
            <PaymentMethodRow
              key={method.id}
              SvgIcon={method.SvgIcon}
              iconWidth={method.iconWidth}
              iconHeight={method.iconHeight}
              label={method.label}
              selected={selectedId === method.id}
              onSelect={() => setSelectedId(method.id)}
            />
          ))}

          <TouchableOpacity style={styles.addBtn} onPress={handleOpenAddCard} activeOpacity={0.8}>
            <Text style={styles.addBtnText}>Add New Card</Text>
          </TouchableOpacity>
        </ContentSheet>
      ) : (
        <ContentSheet paddingBottom={insets.bottom + 40} contentStyle={styles.sheetContent}>
          <View style={styles.formBody}>
            <CreditCard
              cardNumber={cardNumber ? formatCardNumber(cardNumber) : '000 000 000 00'}
              holderName={holderName || 'John Smith'}
              expiryDate={expiryDate || '04/28'}
              style={styles.cardPreview}
            />

            <TextField
              label='Card holder name'
              value={holderName}
              onChangeText={setHolderName}
              placeholder='John Smith'
              maxLength={24}
              fullWidth={false}
              containerStyle={styles.field}
              labelStyle={styles.fieldLabel}
              inputStyle={styles.fieldValue}
            />
            <TextField
              label='Card Number'
              value={cardNumber}
              onChangeText={(text) => setCardNumber(formatCardNumber(text))}
              placeholder='000 000 000 00'
              keyboardType='number-pad'
              fullWidth={false}
              containerStyle={styles.field}
              labelStyle={styles.fieldLabel}
              inputStyle={styles.fieldValue}
            />

            <View style={styles.splitRow}>
              <TextField
                label='Expiry date'
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(formatExpiry(text))}
                placeholder='04/28'
                keyboardType='number-pad'
                fullWidth={false}
                containerStyle={styles.expiryField}
                labelStyle={styles.fieldLabel}
                inputStyle={styles.fieldValue}
              />
              <TextField
                label='CVV'
                value={cvv}
                onChangeText={(text) => setCvv(text.replace(/\D/g, '').slice(0, 4))}
                placeholder='0000'
                keyboardType='number-pad'
                fullWidth={false}
                containerStyle={styles.cvvField}
                labelStyle={styles.fieldLabel}
                inputStyle={styles.fieldValue}
              />
            </View>

            <Button
              title='Save Card'
              variant='cta'
              fullWidth={false}
              onPress={handleSaveCard}
              disabled={!canSave}
              style={styles.saveBtn}
              labelStyle={styles.saveLabel}
            />
          </View>
        </ContentSheet>
      )}
    </KeyboardAvoidingView>
  );
}
