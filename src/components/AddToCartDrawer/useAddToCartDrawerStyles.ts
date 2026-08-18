import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useAddToCartDrawerStyles() {
  return styles;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  drawer: {
    width: 330,
    backgroundColor: theme.colors.background.orangeBase,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: -6, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12
  },
  backdrop: {
    flex: 1
  },
  cartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 50,
    borderBottomWidth: 1,
    marginHorizontal: 30,
    borderBottomColor: theme.colors.button.primary
  },
  starIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  headerText: {
    fontSize: 24,
    color: theme.colors.text.inverse,
    fontWeight: 'bold'
  }
});
