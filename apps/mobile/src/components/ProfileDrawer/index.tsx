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
import { useScale } from '@theme';

import { useProfileDrawerStyles } from './useProfileDrawerStyles';

const NAV_ITEMS: { id: string; label: string; Icon?: React.FC<SvgProps> }[] = [
  { id: 'orders', label: 'My Orders', Icon: OrderIcon },
  { id: 'profile', label: 'My Profile', Icon: ProfileMenuIcon },
  { id: 'address', label: 'Delivery Address', Icon: PinIcon },
  { id: 'payment', label: 'Payment Methods', Icon: CardIcon },
  { id: 'contact', label: 'Contact Us', Icon: PhoneIcon },
  { id: 'faqs', label: 'Help & FAQs', Icon: ChatIcon },
  { id: 'settings', label: 'Settings', Icon: SettingIcon }
];

const LOGOUT_ITEM = { id: 'logout', label: 'Log Out', Icon: LogoutIcon };

type Props = {
  visible: boolean;
  onClose: () => void;
  onItemPress?: (id: string) => void;
};

export function ProfileDrawer({ visible, onClose, onItemPress }: Props) {
  const styles = useProfileDrawerStyles();
  const insets = useSafeAreaInsets();
  const { scale } = useScale();
  const { userName, userEmail, signOut } = useAuth();
  const menuIconSize = scale(20);

  const handleItemPress = async (id: string) => {
    onItemPress?.(id);
    onClose();
    if (id === 'orders') {
      router.push('/(app)/(tabs)/my-orders');
    } else if (id === 'profile') {
      router.push('/(app)/(tabs)/my-profile');
    } else if (id === 'address') {
      router.push('/(app)/(tabs)/delivery-address');
    } else if (id === 'payment') {
      router.push('/(app)/(tabs)/payment-methods');
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
          <View style={[styles.profileHeader, { paddingTop: insets.top + 20 }]}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userName ?? ''}</Text>
              <Text style={styles.profileEmail} numberOfLines={1}>
                {userEmail ?? ''}
              </Text>
            </View>
          </View>

          <ScrollView style={styles.navScroll} showsVerticalScrollIndicator={false}>
            {NAV_ITEMS.map((item) => (
              <View key={item.id}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleItemPress(item.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.iconBox}>
                    {item.Icon && <item.Icon width={menuIconSize} height={menuIconSize} />}
                  </View>
                  <Text style={styles.menuLabel} numberOfLines={1}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
                <View style={styles.divider} />
              </View>
            ))}
          </ScrollView>

          <View style={[styles.logoutFooter, { paddingBottom: insets.bottom + 20 }]}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleItemPress(LOGOUT_ITEM.id)}
              activeOpacity={0.7}
            >
              <View style={styles.iconBoxSmall}>
                <LOGOUT_ITEM.Icon width={menuIconSize} height={menuIconSize} />
              </View>
              <Text style={styles.menuLabel} numberOfLines={1}>
                {LOGOUT_ITEM.label}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
