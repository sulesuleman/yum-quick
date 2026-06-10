import { Ionicons } from '@expo/vector-icons';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BellIcon from '@/assets/Bell.svg';
import CartIcon from '@/assets/Cart.svg';
import ProfileIcon from '@/assets/Profile.svg';
import FilterIcon from '@/assets/Vector.svg';

import { theme } from '@theme';

import { useAppHeaderStyles } from './useAppHeaderStyles';

function getGreeting(): { greeting: string; subtitle: string } {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return { greeting: 'Good Morning', subtitle: "Rise And Shine! It's Breakfast Time" };
  }
  if (hour >= 12 && hour < 17) {
    return { greeting: 'Good Afternoon', subtitle: 'Time For A Delicious Lunch' };
  }
  if (hour >= 17 && hour < 21) {
    return { greeting: 'Good Evening', subtitle: 'End Your Day With Great Food' };
  }
  return { greeting: 'Good Night', subtitle: "Midnight Cravings? We've Got You" };
}

type Props = {
  title?: string;
  showGreeting?: boolean;
  showSearch?: boolean;
  showActions?: boolean;
  onBack?: () => void;
  onSearchPress?: () => void;
  onCartPress?: () => void;
  onBellPress?: () => void;
  onProfilePress?: () => void;
};

export function AppHeader({
  title,
  showGreeting = false,
  showSearch = false,
  showActions = false,
  onBack,
  onSearchPress,
  onCartPress,
  onBellPress,
  onProfilePress
}: Props) {
  const styles = useAppHeaderStyles();
  const insets = useSafeAreaInsets();
  const { greeting, subtitle } = getGreeting();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 44 }]}>
      <View style={styles.topRow}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backBtn} hitSlop={12}>
            <Ionicons name='chevron-back' size={24} color={theme.colors.brand.primary} />
          </TouchableOpacity>
        )}

        {showSearch ? (
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder='Search'
              placeholderTextColor='#B0B0B0'
              onFocus={onSearchPress}
            />
            <TouchableOpacity style={styles.filterBtn}>
              <FilterIcon width={12} height={12} stroke={theme.colors.text.inverse} />
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        )}

        {showActions && (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.iconBox} onPress={onCartPress}>
              <CartIcon width={20} height={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBox} onPress={onBellPress}>
              <BellIcon width={20} height={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBox} onPress={onProfilePress}>
              <ProfileIcon width={20} height={20} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {showGreeting && (
        <>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </>
      )}
    </View>
  );
}
