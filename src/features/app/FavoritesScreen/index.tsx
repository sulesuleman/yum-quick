import { Text, View } from 'react-native';

import { useFavoritesScreenStyles } from './useFavoritesScreenStyles';

export function FavoritesScreen() {
  const styles = useFavoritesScreenStyles();
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Favorites</Text>
    </View>
  );
}
