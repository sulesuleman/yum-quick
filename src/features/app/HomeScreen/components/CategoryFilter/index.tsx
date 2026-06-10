import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import DessertsIcon from '@/assets/Desserts.svg';
import DrinksIcon from '@/assets/Drinks.svg';
import MealsIcon from '@/assets/Meals.svg';
import SnacksIcon from '@/assets/Snacks.svg';
import VeganIcon from '@/assets/Vegan.svg';

import { useCategoryFilterStyles } from './useCategoryFilterStyles';

const CATEGORIES: { id: string; label: string; Icon: React.FC<SvgProps> }[] = [
  { id: 'Snacks', label: 'Snacks', Icon: SnacksIcon },
  { id: 'Meals', label: 'Meal', Icon: MealsIcon },
  { id: 'Vegan', label: 'Vegan', Icon: VeganIcon },
  { id: 'Desserts', label: 'Dessert', Icon: DessertsIcon },
  { id: 'Drinks', label: 'Drinks', Icon: DrinksIcon }
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
                <cat.Icon width={36} height={36} />
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
