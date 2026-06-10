import { useState } from 'react';
import { View } from 'react-native';

import { AppHeader } from '@components/AppHeader';
import { ContentSheet } from '@components/ContentSheet';

import { CategoryFilter } from './components/CategoryFilter';
import { useHomeScreenStyles } from './useHomeScreenStyles';

export function HomeScreen() {
  const styles = useHomeScreenStyles();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  function handleCategorySelect(category: string) {
    setActiveCategory((prev) => (prev === category ? null : category));
  }

  return (
    <View style={styles.screen}>
      <AppHeader showGreeting showSearch showActions />
      <ContentSheet>
        <CategoryFilter activeCategory={activeCategory} onSelect={handleCategorySelect} />
      </ContentSheet>
    </View>
  );
}

