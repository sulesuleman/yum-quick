import React from 'react';
import { ImageSourcePropType, Pressable, Text, View } from 'react-native';

import StarIcon from '@/assets/star-icon.svg';
import HeartIcon from '@/assets/heart-icon.svg';
import { ImageCard } from '@components/Cards/ImageCard';
import { useScale } from '@theme';

import { useRecommendCardStyles } from './useRecommendCardStyles';

type RecommendCardProps = {
  image?: ImageSourcePropType;
  SvgComponent?: React.ComponentType<{ width?: number | string; height?: number | string }>;
  rating: number;
  price: string;
  width?: number;
  onPress?: () => void;
};

const BASE_WIDTH = 159;
const HEIGHT_RATIO = 140 / BASE_WIDTH;
const RADIUS_RATIO = 20 / BASE_WIDTH;

export function RecommendCard({
  image,
  SvgComponent,
  rating,
  price,
  width,
  onPress
}: RecommendCardProps) {
  const styles = useRecommendCardStyles();
  const { scale } = useScale();
  const cardWidth = width ?? scale(BASE_WIDTH);
  const cardHeight = cardWidth * HEIGHT_RATIO;
  const cardRadius = cardWidth * RADIUS_RATIO;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      style={({ pressed }) => [{ opacity: pressed && onPress ? 0.85 : 1 }]}
    >
      <ImageCard
        variant='lg'
        source={image}
        SvgComponent={SvgComponent}
        width={cardWidth}
        height={cardHeight}
        borderRadius={cardRadius}
        style={styles.container}
      >
        <View style={styles.badgeGroup}>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
            <StarIcon width={10} height={10} />
          </View>
          <View style={styles.heartButton}>
            <HeartIcon width={14} height={14} fill='#E95322' />
          </View>
        </View>
        <View style={styles.priceOverlay}>
          <Text style={styles.priceText}>{price}</Text>
        </View>
      </ImageCard>
    </Pressable>
  );
}
