import type { SvgProps } from 'react-native-svg';

import type { CategoryIcon } from '@services/types';
import SnacksIcon from '@/assets/snacks-icon.svg';
import MealIcon from '@/assets/meal-icon.svg';
import VeganIcon from '@/assets/vegan-icon.svg';
import DessertIcon from '@/assets/dessert-icon.svg';
import DrinksIcon from '@/assets/drinks-icon.svg';
import DefaultIcon from '@/assets/category-default-icon.svg';

export const DEFAULT_CATEGORY_ICON: React.FC<SvgProps> = DefaultIcon;

export const ICON_BY_KEY: Record<CategoryIcon, React.FC<SvgProps>> = {
  snacks: SnacksIcon,
  meal: MealIcon,
  vegan: VeganIcon,
  dessert: DessertIcon,
  drinks: DrinksIcon,
  other: DefaultIcon
};

export function resolveCategoryIcon(icon: string | undefined): React.FC<SvgProps> {
  return ICON_BY_KEY[icon as CategoryIcon] ?? DEFAULT_CATEGORY_ICON;
}
