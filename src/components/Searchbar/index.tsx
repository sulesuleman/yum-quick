import { Image, Pressable, TextInput } from 'react-native';

import { useSearchbarStyles } from './useSearchBarStyles';

export function Searchbar() {
  const styles = useSearchbarStyles();

  return (
    <Pressable style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#aaa"
      />
      <Pressable
        style={({ pressed }) => [
          styles.filterButton,
          pressed && styles.filterButtonPressed,
        ]}
      >
        <Image
          source={require('@/assets/filter-icon.png')}
          style={styles.filterIcon}
        />
      </Pressable>
    </Pressable>
  );
}
