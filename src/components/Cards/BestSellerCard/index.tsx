import React, { useState } from 'react';
import { Image, ImageSourcePropType, Pressable, Text, View } from 'react-native';

import StarIcon from '@/assets/star-icon.svg';
import HeartIcon from '@/assets/heart-icon.svg';
import CartIcon from '@/assets/cart-icon.svg';
import { ImageCard } from '@components/Cards/ImageCard';
import { IconButton } from '@components/ui/button/IconButton';
import { CATEGORIES, CategoryId } from '@/src/constants/categories';
import { theme } from '@theme';

import { useBestSellerCardStyles } from './useBestSellerCardStyles';

type BestSellerCardProps = {
  name: string;
  description: string;
  price: number;
  rating: number;
  category: CategoryId;
  image: ImageSourcePropType;
  onPress?: () => void;
  /** Explicit pixel width for a responsive N-column grid — omit to fall back to a fixed 48% (2-column) width. */
  width?: number;
};

const RADIUS = 20;

export function BestSellerCard({
  name,
  description,
  price,
  rating,
  category,
  image,
  onPress,
  width
}: BestSellerCardProps) {
  const styles = useBestSellerCardStyles();
  const [isFavorite, setIsFavorite] = useState(false);

  const categoryIcon = CATEGORIES.find((cat) => cat.id === category)?.icon;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={onPress ? `${name}, rating ${rating.toFixed(1)}, $${price.toFixed(2)}` : undefined}
      testID={`best-seller-card-${name.toLowerCase().trim().replace(/\s+/g, '-')}`}
      style={({ pressed }) => [
        styles.container,
        width !== undefined && { width },
        { opacity: pressed && onPress ? 0.85 : 1 }
      ]}
    >
      <ImageCard
        source={image}
        borderRadius={RADIUS}
        style={styles.imageCard}
        accessibilityLabel={name}
      >
        {categoryIcon && (
          <View
            style={styles.categoryBadge}
            importantForAccessibility='no-hide-descendants'
            accessibilityElementsHidden
          >
            <Image source={categoryIcon} style={styles.categoryIcon} />
          </View>
        )}

        <IconButton
          SvgIcon={HeartIcon}
          iconWidth={11}
          iconHeight={10}
          iconColor={isFavorite ? theme.colors.text.inverse : theme.colors.brand.primary}
          onPress={() => setIsFavorite((prev) => !prev)}
          style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
          accessibilityRole='button'
          accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          accessibilityState={{ selected: isFavorite }}
          testID={`best-seller-card-favorite-${name.toLowerCase().trim().replace(/\s+/g, '-')}`}
        />

        <View style={styles.priceTag}>
          <Text style={styles.priceText}>${price.toFixed(2)}</Text>
        </View>
      </ImageCard>

      <View style={styles.nameRatingRow}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          <StarIcon width={10} height={10} />
        </View>
      </View>

      <View style={styles.descriptionRow}>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.cartBadge} importantForAccessibility='no-hide-descendants' accessibilityElementsHidden>
          <CartIcon width={11.70} height={11.70} color={theme.colors.text.inverse} />
        </View>
      </View>
    </Pressable>
  );
}
