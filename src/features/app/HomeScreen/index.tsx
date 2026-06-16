import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { ProfileDrawer } from '@components/ProfileDrawer';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Searchbar } from '@components/Searchbar';
import { IconButton } from '@/src/components/ui/button/IconButton';
import { CategoryCard } from '@components/Cards/CategoryCard';
import { FoodItemCard } from '@components/Cards/FoodItemCard';
import { useHomeScreenStyles } from './useHomeScreenStyles';

// Placeholder data — replace with API data later
const MOCK_ITEMS = [
  {
    id: '1',
    image: require('@/assets/mexican-appetizer.png'),
    name: 'Mexican Appetizer',
    rating: 5.0,
    price: '$15.00',
    description: 'Tortilla Chips With Toppings',
  },
  {
    id: '2',
    image: require('@/assets/mexican-appetizer.png'),
    name: 'Pork Skewer',
    rating: 4.0,
    price: '$12.99',
    description: 'Marinated in a rich blend of herbs and spices, then grilled to perfection, served with a side of zesty dipping sauce.',
  },
];

const CATEGORIES = [
  { id: 'snacks', label: 'Snacks', icon: require('@/assets/snacks-icon.png') },
  { id: 'meal', label: 'Meal', icon: require('@/assets/meal-icon.png') },
  { id: 'vegan', label: 'Vegan', icon: require('@/assets/vegan-icon.png') },
  { id: 'dessert', label: 'Dessert', icon: require('@/assets/dessert-icon.png') },
  { id: 'drinks', label: 'Drinks', icon: require('@/assets/drinks-icon.png') },
];

function getGreeting(): { heading: string; subtext: string } {
  const hour = new Date().getHours();
  if (hour < 12) return { heading: 'Good Morning', subtext: "Rise And Shine! It's Breakfast Time" };
  if (hour < 17) return { heading: 'Good Afternoon', subtext: "Hope You're Having A Great Day" };
  return { heading: 'Good Evening', subtext: "Time To Wind Down And Eat Well" };
}

export function HomeScreen() {
  const styles = useHomeScreenStyles();
  const insets = useSafeAreaInsets();
  const greeting = getGreeting();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          header: () => (
            <View style={[styles.customHeader, { paddingTop: insets.top + 30 }]}>

              <View style={styles.headerRow}>
                <Searchbar />

                <View style={styles.iconGroup}>
                  <IconButton icon={require('@/assets/cart-icon.png')} />
                  <IconButton icon={require('@/assets/bell-icon.png')} />
                  <IconButton icon={require('@/assets/profile-icon.png')} onPress={() => setDrawerVisible(true)} />
                </View>
              </View>

              <View style={styles.greetingRow}>
                <Text style={styles.greetingText}>{greeting.heading}</Text>
                <Text style={styles.greetingSubtext}>{greeting.subtext}</Text>
              </View>

            </View>
          ),
        }}
      />

      <View style={styles.contentCard}>

        {/* Horizontal scrollable category row */}
        <View style={styles.categoryScrollView}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
          >
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                icon={cat.icon}
                label={cat.label}
                selected={selectedCategory === cat.id}
                onPress={() => setSelectedCategory(cat.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Conditional content — default home view or filtered category view */}
        {selectedCategory === null ? (
          <View>{/* Default: Best Seller + Promo Banner + Recommend sections — next step */}</View>
        ) : (
          <ScrollView
            style={styles.filteredView}
            showsVerticalScrollIndicator={false}
          >
            {/* Sort By row */}
            <View style={styles.sortByRow}>
              <View style={styles.sortByLeft}>
                <Text style={styles.sortByLabel}>Sort By</Text>
                <Text style={styles.sortByValue}>Popular</Text>
              </View>
              <IconButton icon={require('@/assets/filter-icon.png')} style={styles.filterButton} />
            </View>

            {/* Food item list */}
            {MOCK_ITEMS.map((item) => (
              <FoodItemCard
                key={item.id}
                image={item.image}
                name={item.name}
                rating={item.rating}
                price={item.price}
                description={item.description}
              />
            ))}
          </ScrollView>
        )}

      </View>

      <ProfileDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </View>
  );
}
