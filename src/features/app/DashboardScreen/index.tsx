import { Text, View } from 'react-native';

import { useDashboardScreenStyles } from './useDashboardScreenStyles';

export function DashboardScreen() {
  const styles = useDashboardScreenStyles();
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Dashboard</Text>
    </View>
  );
}
