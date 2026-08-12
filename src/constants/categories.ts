import type { SvgProps } from 'react-native-svg';

import SnacksIcon from '@/assets/snacks-icon.svg';
import MealIcon from '@/assets/meal-icon.svg';
import VeganIcon from '@/assets/vegan-icon.svg';
import DessertIcon from '@/assets/dessert-icon.svg';
import DrinksIcon from '@/assets/drinks-icon.svg';

export type CategoryId = 'snacks' | 'meal' | 'vegan' | 'dessert' | 'drinks';

export type Category = {
  id: CategoryId;
  label: string;
  icon: React.FC<SvgProps>;
};

export const CATEGORIES: Category[] = [
  { id: 'snacks', label: 'Snacks', icon: SnacksIcon },
  { id: 'meal', label: 'Meal', icon: MealIcon },
  { id: 'vegan', label: 'Vegan', icon: VeganIcon },
  { id: 'dessert', label: 'Dessert', icon: DessertIcon },
  { id: 'drinks', label: 'Drinks', icon: DrinksIcon }
];
