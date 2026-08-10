import { useCallback, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Stack, router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BackArrowIcon from '@/assets/back-arrow.svg';
import HomeAddressIcon from '@/assets/home-address-icon.svg';

import { ContentSheet } from '@components/ContentSheet';
import { Button } from '@components/ui/button';
import { TextField } from '@components/ui/field';

import { AddressRow } from './components/AddressRow';
import { useDeliveryAddressScreenStyles } from './useDeliveryAddressScreenStyles';

type Address = {
  id: string;
  label: string;
  address: string;
};

const INITIAL_ADDRESSES: Address[] = [
  { id: '1', label: 'My home', address: '778 Locust View Drive Oakland, CA' },
  { id: '2', label: 'My Office', address: '778 Locust View Drive Oakland, CA' },
  { id: '3', label: "Parent's House", address: '778 Locust View Drive Oakland, CA' }
];

type Mode = 'list' | 'add';

export function DeliveryAddressScreen() {
  const styles = useDeliveryAddressScreenStyles();
  const insets = useSafeAreaInsets();

  const [mode, setMode] = useState<Mode>('list');
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [selectedId, setSelectedId] = useState(INITIAL_ADDRESSES[0].id);
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');

  useFocusEffect(
    useCallback(() => {
      return () => Keyboard.dismiss();
    }, [])
  );

  const canApply = newName.trim().length > 0 && newAddress.trim().length > 0;

  const handleBack = () => {
    if (mode === 'add') {
      setMode('list');
    } else {
      router.back();
    }
  };

  const handleOpenAddAddress = () => {
    setNewName('');
    setNewAddress('');
    setMode('add');
  };

  const handleApply = () => {
    if (!canApply) return;
    const id = `${Date.now()}`;
    setAddresses((prev) => [...prev, { id, label: newName.trim(), address: newAddress.trim() }]);
    setSelectedId(id);
    setNewName('');
    setNewAddress('');
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
              <Text style={styles.title}>{mode === 'add' ? 'Add New Address' : 'Delivery Address'}</Text>
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
              onSelect={() => setSelectedId(item.id)}
            />
          ))}

          <TouchableOpacity style={styles.addBtn} onPress={handleOpenAddAddress} activeOpacity={0.8}>
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
