import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useProfileDrawerStyles() {
  return styles;
}

const { bold, medium, regular } = theme.typography.families;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  drawer: {
    width: '82%',
    backgroundColor: theme.colors.background.orangeBase,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: -6, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12
  },
  scrollContent: {
    flexGrow: 1
  },
  backdrop: {
    flex: 1
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingBottom: 24
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30
  },
  profileName: {
    fontFamily: medium,
    fontSize: 33,
    color: '#FFFFFF'
  },
  profileEmail: {
    fontFamily: regular,
    fontSize: 16,
    color: theme.colors.background.yellow2,
    marginTop: 2
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
    paddingHorizontal: 24,
    paddingVertical: 17
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconBoxSmall: {
    width: 32,
    height: 32,
    borderRadius: 15,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuLabel: {
    fontFamily: medium,
    fontSize: 24,
    color: theme.colors.background.yellow2
  },
  divider: {
    height: 1,
    backgroundColor: '#FFD8C7',
    marginHorizontal: 24
  }
});

