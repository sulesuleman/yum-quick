import { Text, View } from 'react-native';

import { useNotificationsScreenStyles } from './useNotificationsScreenStyles';

export function NotificationsScreen() {
  const styles = useNotificationsScreenStyles();
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Notifications</Text>
    </View>
  );
}
