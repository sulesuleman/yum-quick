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
    alignItems: 'flex-end',
    gap: theme.spacing.sm
  },
  shippingAddressLabel: {
    fontFamily: theme.typography.families.bold,
    fontWeight: theme.typography.weights.bold,
    fontSize: theme.typography.sizes.title,
    lineHeight: 26,
    letterSpacing: 0,
    textTransform: 'capitalize',
    color: theme.colors.text.primary
  },
  headerChip: {
    borderRadius: theme.spacing.md,
    backgroundColor: theme.colors.background.yellow2,
    padding: theme.spacing.sm,
    marginTop: 23,
    marginBottom: 50
  },
  chipText: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.sizes.body1
  },
  orderSummaryHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  orderSummaryDivider: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.background.divider,
    marginTop: 19,
    marginBottom: 12
  },
  editButton: {
    width: 58,
    borderRadius: 19,
    paddingTop: 4,
    paddingRight: 6,
    paddingBottom: 3,
    paddingLeft: 6,
    backgroundColor: theme.colors.background.orange2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  editButtonText: {
    fontFamily: theme.typography.families.regular,
    fontWeight: theme.typography.weights.regular,
    fontSize: 12,
    lineHeight: 10,
    letterSpacing: -0.06,
    textAlign: 'center',
    color: theme.colors.background.orangeBase
  },
  orderItem: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.divider
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
    justifyContent: 'space-between'
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
    width: 19.25,
    height: 19.25,
    borderRadius: '50%',
    backgroundColor: theme.colors.background.orangeBase,
    alignItems: 'center',
    justifyContent: 'center'
  },
  stepperButtonText: {
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
    color: theme.colors.text.inverse
  },
  stepperCount: {
    minWidth: 16,
    textAlign: 'center',
    fontFamily: theme.typography.families.medium,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary
  },
  summarySection: {
    paddingTop: 17,
    gap: 26
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  summaryLabel: {
    fontSize: theme.typography.sizes.subHeading,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.weights.medium
  },
  summaryValue: {
    fontSize: theme.typography.sizes.subHeading,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.weights.medium
  },
  totalDivider: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.background.divider,
    marginTop: 20.27,
    marginBottom: 18.29
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  totalLabel: {
    fontSize: theme.typography.sizes.subHeading,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.weights.medium
  },
  totalValue: {
    fontSize: theme.typography.sizes.subHeading,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.weights.medium
  },
  placeOrderButton: {
    alignSelf: 'center',
    backgroundColor: theme.colors.background.orange2,
    borderRadius: theme.radii.pill,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.sm,
    marginTop: theme.spacing.lg,
    marginBottom: 30
  },
  placeOrderButtonText: {
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.background.orangeBase
  }
});
