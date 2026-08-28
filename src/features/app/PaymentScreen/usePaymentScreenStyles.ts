import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function usePaymentScreenStyles() {
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
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.subHeading,
    color: theme.colors.text.primary
  },
  shippingAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
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
  sectionHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm
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
  orderSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.divider,
    paddingBottom: theme.spacing.lg,
    marginBottom: theme.spacing.lg
  },
  orderSummaryItems: {
    gap: theme.spacing.xs
  },
  orderSummaryItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm
  },
  orderSummaryItemName: {
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary
  },
  orderSummaryItemQty: {
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.input,
    color: theme.colors.background.orangeBase
  },
  orderSummaryTotal: {
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.text.primary
  },
  paymentMethodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.divider,
    paddingBottom: theme.spacing.lg,
    marginBottom: theme.spacing.lg
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm
  },
  paymentMethodLabel: {
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary
  },
  cardChip: {
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.background.yellow2,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs
  },
  cardChipText: {
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.input,
    color: theme.colors.text.primary
  },
  deliveryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.divider,
    paddingBottom: theme.spacing.lg,
    marginBottom: theme.spacing.lg
  },
  deliveryLabel: {
    fontFamily: theme.typography.families.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text.primary
  },
  deliveryValue: {
    fontFamily: theme.typography.families.medium,
    fontSize: theme.typography.sizes.subHeading,
    color: theme.colors.background.orangeBase
  },
  payNowButtonWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  payNowButton: {
    width: 157,
    backgroundColor: theme.colors.background.orange2,
    borderRadius: theme.radii.pill,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.sm
  },
  payNowButtonText: {
    textAlign: 'center',
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.background.orangeBase
  }
});
