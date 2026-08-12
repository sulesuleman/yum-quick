import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useDeliveryAddressScreenStyles() {
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
  iconRow: {
    alignItems: 'center',
    marginBottom: 60
  },
  field: {
    marginBottom: 39
  },
  nameFieldLabel: {
    fontSize: theme.typography.sizes.subHeading
  },
  nameFieldValue: {
    fontSize: theme.typography.sizes.subHeading
  },
  applyBtn: {
    alignSelf: 'center',
    width: 116,
    minHeight: 0,
    marginTop: 109,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  applyLabel: {
    fontFamily: theme.typography.families.medium,
    fontSize: 17,
    letterSpacing: -0.085
  }
});
