import { Pressable, TextInput } from 'react-native';

import { useSearchbarStyles } from './useSearchBarStyles';

type SearchbarProps = {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
};

export function Searchbar({ value, onChangeText, placeholder = 'Search' }: SearchbarProps) {
  const styles = useSearchbarStyles();

  return (
    <Pressable style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor='#aaa'
        value={value}
        onChangeText={onChangeText}
      />
    </Pressable>
  );
}
