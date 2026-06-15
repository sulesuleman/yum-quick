import { Image, ImageSourcePropType, Pressable, Text, View } from 'react-native';

import { useCategoryCardStyles } from './useCategoryCardStyles';

type CategoryCardProps = {
  icon: ImageSourcePropType;
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export function CategoryCard({ icon, label, selected = false, onPress }: CategoryCardProps) {
  const styles = useCategoryCardStyles();

  return (
    <Pressable
      style={({ pressed }) => [styles.container, { opacity: pressed ? 0.7 : 1 }]}
      onPress={onPress}
    >
      <View style={[styles.iconWrapper, selected && styles.iconWrapperSelected]}>
        <Image source={icon} style={[styles.icon, selected && styles.iconSelected]} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}
