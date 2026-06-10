import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useCategoryFilterStyles } from './useCategoryFilterStyles';

const CATEGORIES = [
  { id: 'Snacks', label: 'Snacks', icon: require('@/assets/Snacks.png') },
  { id: 'Meals', label: 'Meal', icon: require('@/assets/Meals.png') },
  { id: 'Vegan', label: 'Vegan', icon: require('@/assets/Vegan.png') },
  { id: 'Desserts', label: 'Dessert', icon: require('@/assets/Desserts.png') },
  { id: 'Drinks', label: 'Drinks', icon: require('@/assets/Drinks.png') }
];

type Props = {
  activeCategory: string | null;
  onSelect: (category: string) => void;
};

export function CategoryFilter({ activeCategory, onSelect }: Props) {
  const styles = useCategoryFilterStyles();

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={styles.item}
              onPress={() => onSelect(cat.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.oval, isActive && styles.ovalActive]}>
                <Image source={cat.icon} style={[styles.icon]} resizeMode='contain' />
              </View>
              <Text style={[styles.label, isActive && styles.labelActive]}>{cat.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.divider} />
    </View>
  );
}

