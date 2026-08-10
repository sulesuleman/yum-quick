import { Image, ImageSourcePropType, Text, View } from 'react-native';

import StarIcon from '@/assets/star-icon.svg';
import { useFoodItemCardStyles } from './useFoodItemCardStyles';

type FoodItemCardProps = {
  image: ImageSourcePropType;
  name: string;
  rating: number;
  price: string;
  description: string;
};

export function FoodItemCard({ image, name, rating, price, description }: FoodItemCardProps) {
  const styles = useFoodItemCardStyles();

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />

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
    </View>
  );
}
