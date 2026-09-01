import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function usePaymentMethodsScreenStyles() {
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
  sheetContent: {
    paddingTop: 35
  },
  addBtn: {
    alignSelf: 'center',
    backgroundColor: theme.colors.background.orange2,
    borderRadius: theme.radii.pill,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 150
  },
  addBtnText: {
    fontFamily: theme.typography.families.regular,
    fontSize: 17,
    letterSpacing: -0.085,
    color: theme.colors.brand.primary
  },
  formBody: {
    paddingHorizontal: theme.spacing.md * 2
  },
  cardPreview: {
    alignSelf: 'center',
    marginBottom: 47
  },
  field: {
    marginBottom: 32
  },
  fieldLabel: {
    fontSize: theme.typography.sizes.subHeading
  },
  fieldValue: {
    fontSize: theme.typography.sizes.subHeading
  },
  splitRow: {
    flexDirection: 'row',
    gap: 74
  },
  expiryField: {
    width: 97
  },
  cvvField: {
    width: 79
  },
  saveBtn: {
    alignSelf: 'center',
    width: 106,
    minHeight: 0,
    marginTop: 47,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  saveLabel: {
    fontFamily: theme.typography.families.medium,
    fontSize: 17,
    letterSpacing: -0.085
  }
});
