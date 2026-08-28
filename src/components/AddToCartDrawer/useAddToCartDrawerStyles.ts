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
    gap: 10.7,
    paddingTop: 66,
    paddingBottom: 38.85,
    marginLeft: 35,
    marginRight: 37.83,
    borderBottomWidth: 1,
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
