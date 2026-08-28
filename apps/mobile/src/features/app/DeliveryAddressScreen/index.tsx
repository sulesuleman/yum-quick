import { useCallback, useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BackArrowIcon from '@/assets/back-arrow.svg';
import HomeAddressIcon from '@/assets/home-address-icon.svg';

import { ContentSheet } from '@components/ContentSheet';
import { Button } from '@components/ui/button';
import { TextField } from '@components/ui/field';
import { useAuth } from '@features/auth/AuthContext';
import { addressesApi } from '@services/addressesApi';
import { Address } from '@services/types';

import { AddressRow } from './components/AddressRow';
import { useDeliveryAddressScreenStyles } from './useDeliveryAddressScreenStyles';

type Mode = 'list' | 'add';

export function DeliveryAddressScreen() {
  const styles = useDeliveryAddressScreenStyles();
  const insets = useSafeAreaInsets();
  const { userId } = useAuth();
  const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();

  const [mode, setMode] = useState<Mode>('list');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    if (!userId) return;
    addressesApi.listForUser(userId).then((fetched) => {
      setAddresses(fetched);
      setSelectedId(fetched.find((a) => a.isDefault)?.id ?? fetched[0]?.id ?? null);
    });
  }, [userId]);

  const handleSelectAddress = async (address: Address) => {
    if (selectedId === address.id) return;
    const previousDefault = addresses.find((a) => a.isDefault && a.id !== address.id);
    setSelectedId(address.id);
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === address.id })));
    await addressesApi.setDefault(address.id);
    if (previousDefault) await addressesApi.clearDefault(previousDefault.id);
  };

  useFocusEffect(
    useCallback(() => {
      return () => Keyboard.dismiss();
    }, [])
  );

  const canApply = newName.trim().length > 0 && newAddress.trim().length > 0;

  const handleBack = () => {
    if (mode === 'add') {
      setMode('list');
    } else if (returnTo) {
      router.replace(returnTo);
    } else {
      router.back();
    }
  };

  const handleOpenAddAddress = () => {
    setNewName('');
    setNewAddress('');
    setMode('add');
  };

  const handleApply = async () => {
    if (!canApply || !userId) return;
    const previousDefault = addresses.find((a) => a.isDefault);
    const created = await addressesApi.create({
      userId,
      label: newName.trim(),
      address: newAddress.trim(),
      isDefault: true
    });
    setAddresses((prev) => [...prev.map((a) => ({ ...a, isDefault: false })), created]);
    setSelectedId(created.id);
    if (previousDefault) await addressesApi.clearDefault(previousDefault.id);
    setNewName('');
    setNewAddress('');
    setMode('list');
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Stack.Screen
        options={{
          header: () => (
            <View style={[styles.customHeader, { paddingTop: insets.top + 41 }]}>
              <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
                <BackArrowIcon width={7} height={13} />
              </TouchableOpacity>
              <Text style={styles.title}>
                {mode === 'add' ? 'Add New Address' : 'Delivery Address'}
              </Text>
              <View style={styles.backBtn} />
            </View>
          )
        }}
      />

      {mode === 'list' ? (
        <ContentSheet paddingBottom={insets.bottom + 40} contentStyle={styles.sheetContent}>
          {addresses.map((item) => (
            <AddressRow
              key={item.id}
              label={item.label}
              address={item.address}
              selected={selectedId === item.id}
              onSelect={() => handleSelectAddress(item)}
            />
          ))}

          <TouchableOpacity
            style={styles.addBtn}
            onPress={handleOpenAddAddress}
            activeOpacity={0.8}
          >
            <Text style={styles.addBtnText}>Add New Address</Text>
          </TouchableOpacity>
        </ContentSheet>
      ) : (
        <ContentSheet paddingBottom={insets.bottom + 40} contentStyle={styles.sheetContent}>
          <View style={styles.formBody}>
            <View style={styles.iconRow}>
              <HomeAddressIcon width={76} height={67} />
            </View>

            <TextField
              label='Name'
              value={newName}
              onChangeText={setNewName}
              placeholder='e.g. My Home'
              fullWidth={false}
              containerStyle={styles.field}
              labelStyle={styles.nameFieldLabel}
              inputStyle={styles.nameFieldValue}
            />
            <TextField
              label='Address'
              value={newAddress}
              onChangeText={setNewAddress}
              placeholder='Street address, city, state'
              multiline
              fullWidth={false}
              labelStyle={styles.nameFieldLabel}
              inputStyle={styles.nameFieldValue}
            />

            <Button
              title='Apply'
              variant='cta'
              fullWidth={false}
              onPress={handleApply}
              disabled={!canApply}
              style={styles.applyBtn}
              labelStyle={styles.applyLabel}
            />
          </View>
        </ContentSheet>
      )}
    </KeyboardAvoidingView>
  );
}
