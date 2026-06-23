import { Text, View } from 'react-native';

import { useProfileScreenStyles } from './useProfileScreenStyles';

export function ProfileScreen() {
  const styles = useProfileScreenStyles();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Profile</Text>
    </View>
  );
}
