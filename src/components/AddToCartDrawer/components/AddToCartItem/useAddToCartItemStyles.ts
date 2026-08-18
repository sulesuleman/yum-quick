import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useAddToCartItemStyles() {
  return styles;
}

const styles = StyleSheet.create({
  scrollContentWithCartItems: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 15
  },
  addedItemCountText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#F8F8F8',
    marginBottom: 20
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    gap: 15,
    borderBottomWidth: 1,
    paddingVertical: 12,
    borderBottomColor: theme.colors.background.orange2
  },
  descriptionRow: {},
  priceText: {
    fontSize: 13,
    color: theme.colors.text.inverse
  },
  dateRow: {
    marginLeft: 'auto',
    alignItems: 'flex-start'
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: 500,
    color: '#FFFFFF'
  },
  date: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FFFFFF'
  },
  time: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FFFFFF'
  },
  cartItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  actionButton: {
    width: 14,
    height: 14,
    borderRadius: 10,
    backgroundColor: theme.colors.text.inverse,
    justifyContent: 'center',
    color: '#E95322',
    alignItems: 'center'
  },
  BottomRowText: {
    fontSize: 20,
    fontWeight: '500',
    color: theme.colors.text.inverse
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 12
  },
  rowSpaceBetweenWithBorder: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderTopColor: theme.colors.button.primary,
    paddingVertical: 10,
    marginVertical: 12
  },
  checkoutButton: {
    width: 140,
    backgroundColor: theme.colors.button.primary,
    color: '#E95322',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 'auto'
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E95322'
  }
});
