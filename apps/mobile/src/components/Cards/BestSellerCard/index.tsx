import React from 'react';
import { ImageSourcePropType, Pressable, Text, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import StarIcon from '@/assets/star-icon.svg';
import HeartIcon from '@/assets/heart-icon.svg';
import CartIcon from '@/assets/cart-icon.svg';
import { ImageCard } from '@components/Cards/ImageCard';
import { IconButton } from '@components/ui/button/IconButton';
import { formatCurrency } from '@/src/utils/currency';
import { theme } from '@theme';

import { useBestSellerCardStyles } from './useBestSellerCardStyles';

type BestSellerCardProps = {
  name: string;
  description: string;
  price: number;
  rating: number;
  categoryIcon?: React.FC<SvgProps>;
  image: ImageSourcePropType;
  onPress?: () => void;
  /** Explicit pixel width for a responsive N-column grid — omit to fall back to a fixed 48% (2-column) width. */
  width?: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onAddToCart?: () => void;
};

const RADIUS = 20;

export function BestSellerCard({
  name,
  description,
  price,
  rating,
  categoryIcon: CategoryIcon,
  image,
  onPress,
  width,
  isFavorite = false,
  onToggleFavorite,
  onAddToCart
}: BestSellerCardProps) {
  const styles = useBestSellerCardStyles();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={
        onPress ? `${name}, rating ${rating.toFixed(1)}, ${formatCurrency(price)}` : undefined
      }
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
        {CategoryIcon && (
          <View
            style={styles.categoryBadge}
            importantForAccessibility='no-hide-descendants'
            accessibilityElementsHidden
          >
            <CategoryIcon width={styles.categoryIcon.width} height={styles.categoryIcon.height} />
          </View>
        )}

        <IconButton
          SvgIcon={HeartIcon}
          iconWidth={11}
          iconHeight={10}
          iconColor={isFavorite ? theme.colors.text.inverse : theme.colors.brand.primary}
          onPress={onToggleFavorite}
          style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
          accessibilityRole='button'
          accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          accessibilityState={{ selected: isFavorite }}
          testID={`best-seller-card-favorite-${name.toLowerCase().trim().replace(/\s+/g, '-')}`}
        />

        <View style={styles.priceTag}>
          <Text style={styles.priceText}>{formatCurrency(price)}</Text>
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
        <IconButton
          SvgIcon={CartIcon}
          iconWidth={11.7}
          iconHeight={11.7}
          iconColor={theme.colors.text.inverse}
          onPress={onAddToCart}
          style={styles.cartBadge}
          accessibilityRole='button'
          accessibilityLabel={`Add ${name} to cart`}
          testID={`best-seller-card-add-to-cart-${name.toLowerCase().trim().replace(/\s+/g, '-')}`}
        />
      </View>
    </Pressable>
  );
}
