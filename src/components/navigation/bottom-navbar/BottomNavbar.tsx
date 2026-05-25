import { Image, Pressable, StyleSheet, View } from "react-native";
import type { ImageSourcePropType } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { theme } from "@/theme";

const ICON_SIZE = 24;
const BAR_HEIGHT = 61;

const homeIcon = require("../../../../assets/home.png");
const foodIcon = require("../../../../assets/food.png");
const favoritesIcon = require("../../../../assets/favorites.png");
const ordersIcon = require("../../../../assets/orders.png");
const supportIcon = require("../../../../assets/support.png");

export const bottomNavTabs = [
  "home",
  "food",
  "favorites",
  "orders",
  "support",
] as const;
export type BottomNavTab = (typeof bottomNavTabs)[number];

type NavItem = {
  id: BottomNavTab;
  label: string;
  icon: ImageSourcePropType;
};

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: homeIcon },
  { id: "food", label: "Food", icon: foodIcon },
  { id: "favorites", label: "Favorites", icon: favoritesIcon },
  { id: "orders", label: "Orders", icon: ordersIcon },
  { id: "support", label: "Support", icon: supportIcon },
];

type BottomNavbarProps = {
  activeTab?: BottomNavTab;
  onTabPress?: (tab: BottomNavTab) => void;
};

export function BottomNavbar({
  activeTab = "home",
  onTabPress,
}: BottomNavbarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        {NAV_ITEMS.map((item) => (
          <Pressable
            key={item.id}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            accessibilityState={{ selected: activeTab === item.id }}
            hitSlop={8}
            onPress={() => onTabPress?.(item.id)}
            style={({ pressed }) => [styles.tab, pressed && styles.tabPressed]}
          >
            <Image
              source={item.icon}
              resizeMode="contain"
              style={[
                styles.icon,
                activeTab === item.id ? styles.iconActive : styles.iconInactive,
              ]}
            />
          </Pressable>
        ))}
      </View>
      {insets.bottom > 0 ? (
        <View style={[styles.safeArea, { height: insets.bottom - 25 }]} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.background.orangeBase,
    borderTopLeftRadius: theme.radii.navbar,
    borderTopRightRadius: theme.radii.navbar,
    overflow: "hidden",
  },
  bar: {
    height: BAR_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.navbarIconGap,
  },
  safeArea: {
    backgroundColor: theme.colors.background.orangeBase,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  tabPressed: {
    opacity: 0.75,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  iconInactive: {
    tintColor: theme.colors.text.inverse,
    opacity: 0.85,
  },
  iconActive: {
    tintColor: theme.colors.text.inverse,
    opacity: 1,
  },
});
