import { useEffect, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { ProfileDrawer } from '@components/ProfileDrawer';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Searchbar } from '@components/Searchbar';
import { IconButton } from '@/src/components/ui/button/IconButton';
import { CategoryCard } from '@components/Cards/CategoryCard';
import { FoodItemCard } from '@components/Cards/FoodItemCard';
import { FoodImage } from '@components/FoodImage';
import { RecommendCard } from '@components/Cards/RecommendCard';
import { useScale } from '@theme';
import { useHomeScreenStyles } from './useHomeScreenStyles';

import BestSeller1 from '@/assets/best-seller1.svg';
import BestSeller2 from '@/assets/best-seller-2.svg';
import BestSeller3 from '@/assets/best-seller-3.svg';
import BestSeller4 from '@/assets/best-seller-4.svg';
import BannerPizza from '@/assets/banner-pizza.svg';
import Recommended1 from '@/assets/recommended-1.svg';
import Recommended2 from '@/assets/recommended-2.svg';
import CartIcon from '@/assets/cart-icon.svg';
import BellIcon from '@/assets/bell-icon.svg';
import ProfileIcon from '@/assets/profile-icon.svg';

const MOCK_ITEMS = [
  {
    id: '1',
    image: require('@/assets/mexican-appetizer.png'),
    name: 'Mexican Appetizer',
    rating: 5.0,
    price: '$15.00',
    description: 'Tortilla Chips With Toppings'
  },
  {
    id: '2',
    image: require('@/assets/mexican-appetizer.png'),
    name: 'Pork Skewer',
    rating: 4.0,
    price: '$12.99',
    description:
      'Marinated in a rich blend of herbs and spices, then grilled to perfection, served with a side of zesty dipping sauce.'
  }
];

const CATEGORIES = [
  { id: 'snacks', label: 'Snacks', icon: require('@/assets/snacks-icon.png') },
  { id: 'meal', label: 'Meal', icon: require('@/assets/meal-icon.png') },
  { id: 'vegan', label: 'Vegan', icon: require('@/assets/vegan-icon.png') },
  { id: 'dessert', label: 'Dessert', icon: require('@/assets/dessert-icon.png') },
  { id: 'drinks', label: 'Drinks', icon: require('@/assets/drinks-icon.png') }
];

const BEST_SELLERS = [
  { id: '1', SvgComponent: BestSeller1, price: 103.0 },
  { id: '2', SvgComponent: BestSeller2, price: 50.0 },
  { id: '3', SvgComponent: BestSeller3, price: 12.99 },
  { id: '4', SvgComponent: BestSeller4, price: 8.2 }
];

const RECOMMEND_ITEMS = [
  { id: '1', SvgComponent: Recommended1, rating: 5.0, price: '$10.0' },
  { id: '2', SvgComponent: Recommended2, rating: 5.0, price: '$25.0' }
];

const PROMO_BANNERS = [
  {
    id: '1',
    label1: 'Experience our',
    label2: 'delicious new dish',
    discount: '30% OFF',
    BannerSvg: BannerPizza
  },
  {
    id: '2',
    label1: 'Grab your',
    label2: 'favorite combo deal',
    discount: '20% OFF',
    BannerSvg: BannerPizza
  },
  {
    id: '3',
    label1: 'This weekend only',
    label2: 'family feast special',
    discount: '25% OFF',
    BannerSvg: BannerPizza
  }
];

const PROMO_AUTOPLAY_INTERVAL = 4000;

function getGreeting(): { heading: string; subtext: string } {
  const hour = new Date().getHours();
  if (hour < 12) return { heading: 'Good Morning', subtext: "Rise And Shine! It's Breakfast Time" };
  if (hour < 17) return { heading: 'Good Afternoon', subtext: "Hope You're Having A Great Day" };
  return { heading: 'Good Evening', subtext: 'Time To Wind Down And Eat Well' };
}

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const styles = useHomeScreenStyles(insets.bottom);
  const { scale } = useScale();
  const greeting = getGreeting();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activePromo, setActivePromo] = useState(0);
  const [bannerWidth, setBannerWidth] = useState(0);
  const [recommendRowWidth, setRecommendRowWidth] = useState(0);
  const promoScrollRef = useRef<ScrollView>(null);

  const recommendCardWidth = recommendRowWidth > 0 ? (recommendRowWidth - scale(7)) / 2 : undefined;

  useEffect(() => {
    if (!bannerWidth) return;

    const timer = setInterval(() => {
      setActivePromo((prev) => {
        const next = (prev + 1) % PROMO_BANNERS.length;
        promoScrollRef.current?.scrollTo({ x: next * bannerWidth, animated: true });
        return next;
      });
    }, PROMO_AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [bannerWidth]);

  const handlePromoScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!bannerWidth) return;
    const index = Math.round(event.nativeEvent.contentOffset.x / bannerWidth);
    setActivePromo(index);
  };

  const handlePromoDotPress = (index: number) => {
    setActivePromo(index);
    promoScrollRef.current?.scrollTo({ x: index * bannerWidth, animated: true });
  };

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          header: () => (
            <View style={[styles.customHeader, { paddingTop: insets.top + 30 }]}>
              <View style={styles.headerRow}>
                <Searchbar />
                <View style={styles.iconGroup}>
                  <IconButton SvgIcon={CartIcon} iconWidth={16} iconHeight={16} />
                  <IconButton SvgIcon={BellIcon} iconWidth={14} iconHeight={20} />
                  <IconButton
                    SvgIcon={ProfileIcon}
                    iconWidth={13}
                    iconHeight={18}
                    onPress={() => setDrawerVisible(true)}
                  />
                </View>
              </View>
              <View style={styles.greetingRow}>
                <Text style={styles.greetingText}>{greeting.heading}</Text>
                <Text style={styles.greetingSubtext}>{greeting.subtext}</Text>
              </View>
            </View>
          )
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentCard}>
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

        <View style={styles.divider} />

        {selectedCategory === null ? (
          <View style={styles.defaultView}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Best Seller</Text>
              <TouchableOpacity style={styles.viewAllRow} activeOpacity={0.7}>
                <Text style={styles.viewAllText}>View All</Text>
                <Text style={styles.viewAllChevron}>›</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.bestSellerRow}
            >
              {BEST_SELLERS.map((item) => (
                <FoodImage
                  key={item.id}
                  SvgComponent={item.SvgComponent}
                  showPrice
                  price={item.price}
                  width={scale(71.68)}
                  height={scale(108)}
                  borderRadius={scale(19.12)}
                />
              ))}
            </ScrollView>

            <View
              style={styles.promoBanner}
              onLayout={(e) => setBannerWidth(e.nativeEvent.layout.width)}
            >
              {bannerWidth > 0 && (
                <ScrollView
                  ref={promoScrollRef}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd={handlePromoScrollEnd}
                >
                  {PROMO_BANNERS.map((promo) => (
                    <View key={promo.id} style={[styles.promoSlide, { width: bannerWidth }]}>
                      <View style={styles.promoTextContainer}>
                        <Text style={styles.promoLabel}>{promo.label1}</Text>
                        <Text style={styles.promoLabel}>{promo.label2}</Text>
                        <Text style={styles.promoDiscount}>{promo.discount}</Text>
                      </View>
                      <View style={styles.promoImageContainer}>
                        <promo.BannerSvg width='100%' height='100%' />
                      </View>
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>

            <View style={styles.promoDots}>
              {PROMO_BANNERS.map((promo, i) => (
                <TouchableOpacity key={promo.id} onPress={() => handlePromoDotPress(i)}>
                  <View style={[styles.dot, activePromo === i && styles.dotActive]} />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.sectionTitle, styles.recommendTitle]}>Recommend</Text>

            <View
              style={styles.recommendGrid}
              onLayout={(e) => setRecommendRowWidth(e.nativeEvent.layout.width)}
            >
              {RECOMMEND_ITEMS.map((item) => (
                <RecommendCard
                  key={item.id}
                  SvgComponent={item.SvgComponent}
                  rating={item.rating}
                  price={item.price}
                  width={recommendCardWidth}
                />
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.filteredView}>
            <View style={styles.sortByRow}>
              <View style={styles.sortByLeft}>
                <Text style={styles.sortByLabel}>Sort By</Text>
                <Text style={styles.sortByValue}>Popular</Text>
              </View>
              <IconButton icon={require('@/assets/filter-icon.png')} style={styles.filterButton} />
            </View>

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
          </View>
        )}
      </ScrollView>

      <ProfileDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </View>
  );
}
