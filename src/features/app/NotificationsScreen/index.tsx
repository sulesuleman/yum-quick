import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '@features/auth/AuthContext';
import { notificationsApi } from '@services/notificationsApi';
import { Notification } from '@services/types';

import { useNotificationsScreenStyles } from './useNotificationsScreenStyles';

export function NotificationsScreen() {
  const styles = useNotificationsScreenStyles();
  const { userId } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!userId) return;
    notificationsApi.listForUser(userId).then(setNotifications);
  }, [userId]);

  const handlePress = (notification: Notification) => {
    if (notification.read) return;
    notificationsApi.markRead(notification.id).then(() => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
      );
    });
  };

  if (notifications.length === 0) {
    return (
      <View style={styles.emptyScreen}>
        <Text style={styles.title}>No notifications yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[styles.row, !notification.read && styles.rowUnread]}
            onPress={() => handlePress(notification)}
            activeOpacity={0.7}
          >
            <Text style={styles.rowTitle}>{notification.title}</Text>
            <Text style={styles.rowMessage}>{notification.message}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
