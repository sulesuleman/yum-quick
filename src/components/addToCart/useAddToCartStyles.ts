import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useAddToCartDrawerStyles() {
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
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingVertical: 70,
    paddingHorizontal: 24,
  },
  scrollContentWithCartItems:{
        flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
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
  },
  cartItemImage: {
    width: 60,
    height: 60,
    // borderWidth: 1,
    // borderColor: theme.colors.button.primary,
    borderRadius: 15
  },

  divider: {
    height: 1,
    backgroundColor: '#FFD8C7',
    marginHorizontal: 24
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
   
    borderBottomColor: theme.colors.background.orange2,
  },
  descriptionRow: {},
  priceText: {
    fontSize: 13,
    color: theme.colors.text.inverse
  },
  dateRow: {
    // flexDirection: 'row',
    marginLeft:"auto",
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
  BottomRowText: {
    fontSize: 20,
    fontWeight: '500',
    color: theme.colors.text.inverse
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
    marginTop: 'auto',
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E95322'
  }
});
