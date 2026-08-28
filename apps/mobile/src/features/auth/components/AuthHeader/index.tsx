import { Ionicons } from '@expo/vector-icons';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@theme';

import { useAuthHeaderStyles } from './useAuthHeaderStyles';

const PADDING_TOP = 44;
const PADDING_BOTTOM = 59;

export function AuthHeader({ navigation, options, back }: NativeStackHeaderProps) {
  const insets = useSafeAreaInsets();
  const styles = useAuthHeaderStyles();
  const title = typeof options.title === 'string' ? options.title : '';

  return (
    <View
      style={[styles.wrap, { paddingTop: insets.top + PADDING_TOP, paddingBottom: PADDING_BOTTOM }]}
    >
      <View style={styles.row}>
        {back ? (
          <Pressable
            accessibilityRole='button'
            accessibilityLabel='Go back'
            hitSlop={12}
            onPress={navigation.goBack}
            style={styles.back}
          >
            <Ionicons name='chevron-back' size={24} color={theme.colors.brand.primary} />
          </Pressable>
        ) : null}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </View>
  );
}
