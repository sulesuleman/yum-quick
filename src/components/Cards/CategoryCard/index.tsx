import { Pressable, Text, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { useCategoryCardStyles } from './useCategoryCardStyles';

type CategoryCardProps = {
  icon: React.FC<SvgProps>;
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export function CategoryCard({ icon: Icon, label, selected = false, onPress }: CategoryCardProps) {
  const styles = useCategoryCardStyles();

  return (
    <Pressable
      style={({ pressed }) => [styles.container, { opacity: pressed ? 0.7 : 1 }]}
      onPress={onPress}
    >
      {selected && (
        <>
          <View style={styles.selectedBackdrop} />

          <View style={[styles.invertedCornerMask, styles.bottomLeftMask]}>
            <View style={styles.orangeCurveFillerLeft} />
          </View>

          <View style={[styles.invertedCornerMask, styles.bottomRightMask]}>
            <View style={styles.orangeCurveFillerRight} />
          </View>
        </>
      )}

      <View style={[styles.iconWrapper, selected && styles.iconWrapperSelected]}>
        <Icon width='100%' height='100%' style={styles.icon} />
      </View>
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}
