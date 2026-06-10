import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useAppHeaderStyles() {
  return styles;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.yellowBase,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: 20
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backBtn: {
    marginRight: theme.spacing.sm
  },
  title: {
    flex: 1,
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.title,
    color: theme.colors.text.inverse,
    textAlign: 'center'
  },
  searchBar: {
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.card,
    borderRadius: 22,
    paddingLeft: theme.spacing.md,
    paddingRight: 6,
    height: 46
  },
  searchInput: {
    flex: 1,
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary
  },
  filterBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.background.orangeBase,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actions: {
    flexDirection: 'row',
    gap: 7
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 17,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  greeting: {
    fontFamily: theme.typography.families.bold,
    fontSize: 30,
    color: theme.colors.text.inverse,
    marginTop: theme.spacing.md
  },
  subtitle: {
    fontFamily: theme.typography.families.medium,
    fontSize: 13,
    color: theme.colors.brand.primary
  }
});

