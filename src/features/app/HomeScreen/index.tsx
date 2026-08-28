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
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Searchbar } from '@components/Searchbar';
import { IconButton } from '@/src/components/ui/button/IconButton';
import { CategoryCard } from '@components/Cards/CategoryCard';
import { FoodItemCard } from '@components/Cards/FoodItemCard';
import { FoodImage } from '@components/FoodImage';
import { RecommendCard } from '@components/Cards/RecommendCard';
import { theme, useScale } from '@theme';
import { CATEGORIES } from '@/src/constants/categories';
import { resolveProductImage } from '@/src/constants/productImages';
import { useCart } from '@features/cart/CartContext';
import { productsApi } from '@services/productsApi';
import { promoBannersApi } from '@services/promoBannersApi';
import { Product, PromoBanner } from '@services/types';
import { useHomeScreenStyles } from './useHomeScreenStyles';
import { getBestSellerIllustration, getRecommendIllustration } from './homeIllustrations';
import { resolveBannerIcon } from './bannerIcons';

import { AddToCartModal } from '@/src/components/AddToCartDrawer';
import CartIcon from '@/assets/cart-icon.svg';
import BellIcon from '@/assets/bell-icon.svg';
import ProfileIcon from '@/assets/profile-icon.svg';

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
  const { isDrawerOpen, openDrawer, closeDrawer } = useCart();
  const { scale } = useScale();
  const greeting = getGreeting();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activePromo, setActivePromo] = useState(0);
  const [bannerWidth, setBannerWidth] = useState(0);
  const [recommendRowWidth, setRecommendRowWidth] = useState(0);
  const promoScrollRef = useRef<ScrollView>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [promoBanners, setPromoBanners] = useState<PromoBanner[]>([]);

  useEffect(() => {
    productsApi.list().then(setProducts);
    promoBannersApi.list().then(setPromoBanners);
  }, []);

  const filteredItems = products.filter((p) => p.category === selectedCategory);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const recommendItems = products.filter((p) => p.isRecommended);

  const recommendCardWidth = recommendRowWidth > 0 ? (recommendRowWidth - scale(7)) / 2 : undefined;

  useEffect(() => {
    if (!bannerWidth || promoBanners.length === 0) return;

    const timer = setInterval(() => {
      setActivePromo((prev) => {
        const next = (prev + 1) % promoBanners.length;
        promoScrollRef.current?.scrollTo({ x: next * bannerWidth, animated: true });
        return next;
      });
    }, PROMO_AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [bannerWidth, promoBanners.length]);

  const handlePromoScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!bannerWidth) return;
    const index = Math.round(event.nativeEvent.contentOffset.x / bannerWidth);
    setActivePromo(index);
  };

  const handlePromoDotPress = (index: number) => {
    setActivePromo(index);
    promoScrollRef.current?.scrollTo({ x: index * bannerWidth, animated: true });
  };

  const handleCategoryPress = (id: string) =>
    setSelectedCategory((prev) => (prev === id ? null : id));

  const isFirstSelected = selectedCategory === CATEGORIES[0].id;
  const isLastSelected = selectedCategory === CATEGORIES[CATEGORIES.length - 1].id;

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          header: () => (
            <View
              style={[
                styles.customHeader,
                selectedCategory !== null && styles.customHeaderCollapsed,
                { paddingTop: insets.top + 30 }
              ]}
            >
              <View style={styles.headerRow}>
                <Searchbar />
                <View style={styles.iconGroup}>
                  <IconButton
                    SvgIcon={CartIcon}
                    iconWidth={16}
                    iconHeight={16}
                    onPress={openDrawer}
                    iconColor={theme.colors.brand.primary}
                  />
                  <IconButton
                    SvgIcon={BellIcon}
                    iconWidth={14}
                    iconHeight={20}
                    onPress={() => router.push('/notifications')}
                  />
                  <IconButton
                    SvgIcon={ProfileIcon}
                    iconWidth={13}
                    iconHeight={18}
                    onPress={() => setDrawerVisible(true)}
                  />
                </View>
              </View>
              {selectedCategory === null && (
                <View style={styles.greetingRow}>
                  <Text style={styles.greetingText}>{greeting.heading}</Text>
                  <Text style={styles.greetingSubtext}>{greeting.subtext}</Text>
                </View>
              )}
            </View>
          )
        }}
      />

      <View style={styles.cardFrame}>
        <View
          style={[
            styles.categorySection,
            selectedCategory !== null && styles.categorySectionSelected
          ]}
        >
          {selectedCategory === null ? (
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
                    selected={false}
                    onPress={() => handleCategoryPress(cat.id)}
                  />
                ))}
              </ScrollView>
            </View>
          ) : (
            <View style={styles.tabBarRow}>
              {CATEGORIES.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  icon={cat.icon}
                  label={cat.label}
                  selected={selectedCategory === cat.id}
                  onPress={() => handleCategoryPress(cat.id)}
                />
              ))}
            </View>
          )}
        </View>

        <View
          style={[
            styles.whiteBody,
            selectedCategory !== null && styles.whiteBodySelected,
            isFirstSelected && styles.whiteBodyNoLeftRadius,
            isLastSelected && styles.whiteBodyNoRightRadius
          ]}
        >
          {selectedCategory !== null && (
            <View style={styles.sortByRow}>
              <View style={styles.sortByLeft}>
                <Text style={styles.sortByLabel}>Sort By</Text>
                <Text style={styles.sortByValue}>Popular</Text>
              </View>
              <IconButton icon={require('@/assets/filter-icon.png')} style={styles.filterButton} />
            </View>
          )}

          <ScrollView
            style={styles.scrollArea}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentCard}
          >
            {selectedCategory === null && <View style={styles.divider} />}

            {selectedCategory === null ? (
              <View style={styles.defaultView}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Best Seller</Text>
                  <TouchableOpacity
                    style={styles.viewAllRow}
                    activeOpacity={0.7}
                    onPress={() => router.push('/best-seller')}
                    accessibilityRole='button'
                    accessibilityLabel='View all best sellers'
                    testID='home-view-all-best-seller'
                  >
                    <Text style={styles.viewAllText}>View All</Text>
                    <Text style={styles.viewAllChevron}>›</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.bestSellerRow}
                >
                  {bestSellers.map((item, index) => (
                    <FoodImage
                      key={item.id}
                      SvgComponent={getBestSellerIllustration(index)}
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
                      {promoBanners.map((promo) => {
                        const BannerSvg = resolveBannerIcon(promo.bannerKey);
                        return (
                          <View key={promo.id} style={[styles.promoSlide, { width: bannerWidth }]}>
                            <View style={styles.promoTextContainer}>
                              <Text style={styles.promoLabel}>{promo.label1}</Text>
                              <Text style={styles.promoLabel}>{promo.label2}</Text>
                              <Text style={styles.promoDiscount}>{promo.discount}</Text>
                            </View>
                            <View style={styles.promoImageContainer}>
                              <BannerSvg width='100%' height='100%' />
                            </View>
                          </View>
                        );
                      })}
                    </ScrollView>
                  )}
                </View>

                <View style={styles.promoDots}>
                  {promoBanners.map((promo, i) => (
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
                  {recommendItems.map((item, index) => (
                    <RecommendCard
                      key={item.id}
                      SvgComponent={getRecommendIllustration(index)}
                      rating={item.rating}
                      price={`$${item.price.toFixed(2)}`}
                      width={recommendCardWidth}
                    />
                  ))}
                </View>
              </View>
            ) : (
              <View style={styles.filteredView}>
                {filteredItems.map((item) => (
                  <FoodItemCard
                    key={item.id}
                    image={resolveProductImage(item.imageKey)}
                    name={item.name}
                    rating={item.rating}
                    price={`$${item.price.toFixed(2)}`}
                    description={item.description}
                    onPress={() =>
                      router.push({ pathname: '/product-details', params: { id: item.id } })
                    }
                  />
                ))}
              </View>
            )}
          </ScrollView>
          <AddToCartModal visible={isDrawerOpen} onClose={closeDrawer} />
        </View>
      </View>

      <ProfileDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </View>
  );
}
