export type CategoryId = 'snacks' | 'meal' | 'vegan' | 'dessert' | 'drinks';

export type Category = {
  id: CategoryId;
  label: string;
  icon: ReturnType<typeof require>;
};

export const CATEGORIES: Category[] = [
  { id: 'snacks', label: 'Snacks', icon: require('@/assets/snacks-icon.png') },
  { id: 'meal', label: 'Meal', icon: require('@/assets/meal-icon.png') },
  { id: 'vegan', label: 'Vegan', icon: require('@/assets/vegan-icon.png') },
  { id: 'dessert', label: 'Dessert', icon: require('@/assets/dessert-icon.png') },
  { id: 'drinks', label: 'Drinks', icon: require('@/assets/drinks-icon.png') }
];
