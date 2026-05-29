import { Text, View } from 'react-native';

import { useHomeScreenStyles } from './useHomeScreenStyles';

export function HomeScreen() {
  const styles = useHomeScreenStyles();
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.body}>Welcome to Yum Quick.</Text>
    </View>
  );
}
