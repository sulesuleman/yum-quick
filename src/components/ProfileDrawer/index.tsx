import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { SvgProps } from 'react-native-svg';

import CardIcon from '@/assets/card-icon.svg';
import ChatIcon from '@/assets/chat-icon.svg';
import OrderIcon from '@/assets/order-icon.svg';
import PhoneIcon from '@/assets/phone-icon.svg';
import PinIcon from '@/assets/pin-icon.svg';
import ProfileMenuIcon from '@/assets/profile-icon.svg';
import SettingIcon from '@/assets/setting-icon.svg';
import LogoutIcon from '@/assets/logout-icon.svg';

import { useAuth } from '@features/auth/AuthContext';

import { useProfileDrawerStyles } from './useProfileDrawerStyles';

const MENU_ITEMS: { id: string; label: string; Icon?: React.FC<SvgProps> }[] = [
  { id: 'orders', label: 'My Orders', Icon: OrderIcon },
  { id: 'profile', label: 'My Profile', Icon: ProfileMenuIcon },
  { id: 'address', label: 'Delivery Address', Icon: PinIcon },
  { id: 'payment', label: 'Payment Methods', Icon: CardIcon },
  { id: 'contact', label: 'Contact Us', Icon: PhoneIcon },
  { id: 'faqs', label: 'Help & FAQs', Icon: ChatIcon },
  { id: 'settings', label: 'Settings', Icon: SettingIcon },
  { id: 'logout', label: 'Log Out', Icon: LogoutIcon }
];

type Props = {
  visible: boolean;
  onClose: () => void;
  onItemPress?: (id: string) => void;
};

export function ProfileDrawer({ visible, onClose, onItemPress }: Props) {
  const styles = useProfileDrawerStyles();
  const insets = useSafeAreaInsets();
  const { userName, userEmail, signOut } = useAuth();

  const handleItemPress = async (id: string) => {
    onItemPress?.(id);
    onClose();
    if (id === 'orders') {
      router.push('/(app)/(tabs)/myOrders');
    } else if (id === 'logout') {
      await signOut();
      router.replace('/welcome');
    }
  };
  const slideAnim = useRef(new Animated.Value(400)).current;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      slideAnim.stopAnimation();
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }).start();
    } else {
      slideAnim.stopAnimation();
      Animated.timing(slideAnim, {
        toValue: 400,
        duration: 250,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true
      }).start(({ finished }) => {
        if (finished) setModalVisible(false);
      });
    }
  }, [visible]);

  return (
    <Modal visible={modalVisible} transparent animationType='none' onRequestClose={onClose}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }
            ]}
          >
            <View style={styles.profileHeader}>
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.profileName}>{userName ?? ''}</Text>
                <Text style={styles.profileEmail}>{userEmail ?? ''}</Text>
              </View>
            </View>

            {MENU_ITEMS.map((item, index) => (
              <View key={item.id} style={item.id === 'logout' ? { marginTop: 48 } : undefined}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleItemPress(item.id)}
                  activeOpacity={0.7}
                >
                  <View style={item.id === 'logout' ? styles.iconBoxSmall : styles.iconBox}>
                    {item.Icon && <item.Icon width={20} height={20} stroke='#FFFFFF' />}
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </TouchableOpacity>
                {index < MENU_ITEMS.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

