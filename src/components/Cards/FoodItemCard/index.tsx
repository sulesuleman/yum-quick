import { Image, ImageSourcePropType, Pressable, Text, View } from 'react-native';

import StarIcon from '@/assets/star-icon.svg';
import { useFoodItemCardStyles } from './useFoodItemCardStyles';

type FoodItemCardProps = {
  image: ImageSourcePropType;
  name: string;
  rating: number;
  price: string;
  description: string;
  onPress?: () => void;
};

export function FoodItemCard({ image, name, rating, price, description, onPress }: FoodItemCardProps) {
  const styles = useFoodItemCardStyles();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={onPress ? `${name}, rating ${rating}, ${price}` : undefined}
      testID={onPress ? `food-item-card-${name.toLowerCase().trim().replace(/\s+/g, '-')}` : undefined}
      style={({ pressed }) => [styles.container, { opacity: pressed && onPress ? 0.85 : 1 }]}
    >
      <Image source={image} style={styles.image} accessibilityElementsHidden importantForAccessibility='no-hide-descendants' />

      <View style={styles.infoRow}>
        {/* Left side: name + rating badge */}
        <View style={styles.nameRatingRow}>
          <Text style={styles.name}>{name}</Text>

          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{rating}</Text>
            <StarIcon width={styles.starIcon.width} height={styles.starIcon.height} />
          </View>
        </View>

        {/* Right side: price */}
        <Text style={styles.price}>{price}</Text>
      </View>

      <Text style={styles.description} numberOfLines={2}>{description}</Text>
    </Pressable>
  );
}
