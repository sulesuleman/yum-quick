import { Pressable, TextInput } from 'react-native';

import SearchFilterIcon from '@/assets/search-filter-icon.svg';

import { useSearchbarStyles } from './useSearchBarStyles';

export function Searchbar() {
  const styles = useSearchbarStyles();

  return (
    <Pressable style={styles.container}>
      <TextInput style={styles.input} placeholder='Search' placeholderTextColor='#aaa' />
      <Pressable
        style={({ pressed }) => [styles.filterButton, pressed && styles.filterButtonPressed]}
      >
        <SearchFilterIcon width={20} height={20} />
      </Pressable>
    </Pressable>
  );
}
