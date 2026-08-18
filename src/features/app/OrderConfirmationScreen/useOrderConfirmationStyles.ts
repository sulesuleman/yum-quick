import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useOrdersScreenStyles() {
  return styles;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background.yellowBase
  },
  customHeader: {
    backgroundColor: theme.colors.background.yellowBase,
    paddingHorizontal: theme.spacing.md * 2,
    paddingBottom: 22,
    flexDirection: 'row',
    alignItems: 'center'
  },
  backBtn: {
    width: 32
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.screenTitle,
    color: theme.colors.text.inverse
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.lg
  },
  sectionLabel: {
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.title,
    color: theme.colors.text.primary
  },
  shippingAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    gap:theme.spacing.sm,
    paddingVertical: theme.spacing.sm
  },
  headerChip: {
    borderRadius: theme.spacing.md,
    backgroundColor: theme.colors.background.yellow2,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.lg
  },
  chipText: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.sizes.body1
  },
  orderSummaryHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm
  },
  editButton: {
    backgroundColor: theme.colors.background.orange2,
    borderRadius: theme.spacing.md,
    width: 58,
    alignItems: 'center',
    justifyContent: 'center',
    height: 14
  },
  editButtonText: {
    color: theme.colors.background.orangeBase,
    fontSize: theme.typography.sizes.input
  },
  orderItem: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.background.divider
  },
  deleteButton: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: 0,
    zIndex: 1,
    padding: 1
  },
  orderItemImage: {
    width: 60,
    height: 60,
    borderRadius: theme.radii.field
  },
  orderItemDetails: {
    flex: 1,
    gap: theme.spacing.xs
  },
  orderItemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingRight: theme.spacing.lg
  },
  orderItemName: {
    fontFamily: theme.typography.families.medium,
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.text.primary
  },
  orderItemPrice: {
    fontFamily: theme.typography.families.semiBold,
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.background.orangeBase
  },
  orderItemMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  orderItemMeta: {
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.input,
    color: theme.colors.text.placeholder
  },
  orderItemActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xs
  },
  cancelButton: {
    backgroundColor: theme.colors.background.orange2,
    borderRadius: theme.radii.pill,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs
  },
  cancelButtonText: {
    color: theme.colors.background.orangeBase,
    fontSize: theme.typography.sizes.input
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm
  },
  stepperButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.colors.background.orangeBase,
    alignItems: 'center',
    justifyContent: 'center'
  },
  stepperButtonText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.sizes.body,
    fontFamily: theme.typography.families.bold
  },
  stepperCount: {
    minWidth: 16,
    textAlign: 'center',
    fontFamily: theme.typography.families.medium,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs
  },
  summaryLabel: {
   fontSize: theme.typography.sizes.subHeading,
    color: theme.colors.text.primary,
    fontWeight:theme.typography.weights.medium
  },
  summaryValue: {
    fontSize: theme.typography.sizes.subHeading,
    color: theme.colors.text.primary,
    fontWeight:theme.typography.weights.medium
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: theme.colors.background.divider,
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.sm
  },
  totalLabel: {
   fontSize: theme.typography.sizes.subHeading,
    color: theme.colors.text.primary,
    fontWeight:theme.typography.weights.medium
  },
  totalValue: {
  fontSize: theme.typography.sizes.subHeading,
    color: theme.colors.text.primary,
    fontWeight:theme.typography.weights.medium
  },
  placeOrderButton: {
    alignSelf: 'center',
    backgroundColor: theme.colors.background.orange2,
    borderRadius: theme.radii.pill,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.sm,
    marginTop: theme.spacing.lg
  },
  placeOrderButtonText: {
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.background.orangeBase
  }
});
