import { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Stack, router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BackArrowIcon from '@/assets/back-arrow.svg';
import CameraIcon from '@/assets/camera-icon.svg';

import { ContentSheet } from '@components/ContentSheet';
import { Button } from '@components/ui/button';
import { DatePickerField, TextField } from '@components/ui/field';
import { useAuth } from '@features/auth/AuthContext';
import { usersApi } from '@services/usersApi';

import { useMyProfileScreenStyles } from './useMyProfileScreenStyles';

const DEFAULT_AVATAR_URI = 'https://randomuser.me/api/portraits/men/32.jpg';

export function MyProfileScreen() {
  const styles = useMyProfileScreenStyles();
  const insets = useSafeAreaInsets();
  const { userId, userName, userEmail } = useAuth();

  const [avatarUri, setAvatarUri] = useState(DEFAULT_AVATAR_URI);
  const [fullName, setFullName] = useState(userName ?? '');
  const [email, setEmail] = useState(userEmail ?? '');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

  useEffect(() => {
    if (!userId) return;
    usersApi.get(userId).then((user) => {
      setAvatarUri(user.avatarUri || DEFAULT_AVATAR_URI);
      setFullName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setDateOfBirth(user.dob ? new Date(user.dob) : null);
    });
  }, [userId]);

  const handleUpdateProfile = () => {
    if (!userId) return;
    usersApi.update(userId, {
      name: fullName,
      email,
      phone,
      dob: dateOfBirth ? dateOfBirth.toISOString() : ''
    });
  };

  useFocusEffect(
    useCallback(() => {
      return () => Keyboard.dismiss();
    }, [])
  );

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Stack.Screen
        options={{
          header: () => (
            <View style={[styles.customHeader, { paddingTop: insets.top + 41 }]}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                <BackArrowIcon width={7} height={13} />
              </TouchableOpacity>
              <Text style={styles.title}>My profile</Text>
              <View style={styles.backBtn} />
            </View>
          )
        }}
      />
      <ContentSheet paddingBottom={insets.bottom + 40}>
        <View style={styles.avatarRow}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
            <TouchableOpacity style={styles.cameraBadge} activeOpacity={0.8}>
              <CameraIcon width={18} height={16} />
            </TouchableOpacity>
          </View>
        </View>

        <TextField
          label='Full Name'
          value={fullName}
          onChangeText={setFullName}
          containerStyle={styles.field}
          labelStyle={styles.fieldLabel}
          inputStyle={styles.fieldValue}
        />
        <DatePickerField
          label='Date of Birth'
          value={dateOfBirth}
          onChange={setDateOfBirth}
          containerStyle={styles.field}
          labelStyle={styles.fieldLabel}
          valueStyle={styles.fieldValue}
        />
        <TextField
          label='Email'
          type='email'
          value={email}
          onChangeText={setEmail}
          containerStyle={styles.field}
          labelStyle={styles.fieldLabel}
          inputStyle={styles.fieldValue}
        />
        <TextField
          label='Phone Number'
          type='phone'
          value={phone}
          onChangeText={setPhone}
          labelStyle={styles.fieldLabel}
          inputStyle={styles.fieldValue}
        />

        <Button
          title='Update Profile'
          variant='cta'
          fullWidth={false}
          onPress={handleUpdateProfile}
          style={styles.submitBtn}
          labelStyle={styles.submitLabel}
        />
      </ContentSheet>
    </KeyboardAvoidingView>
  );
}
