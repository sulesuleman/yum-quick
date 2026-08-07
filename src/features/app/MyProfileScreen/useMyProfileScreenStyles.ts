import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useMyProfileScreenStyles() {
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
  avatarRow: {
    alignItems: 'center',
    marginBottom: 47
  },
  avatarWrapper: {
    width: 127,
    height: 127
  },
  avatar: {
    width: 127,
    height: 127,
    borderRadius: 20
  },
  cameraBadge: {
    position: 'absolute',
    right: -8,
    bottom: -6,
    width: 26,
    height: 26,
    borderRadius: 10,
    backgroundColor: theme.colors.background.orangeBase,
    alignItems: 'center',
    justifyContent: 'center'
  },
  field: {
    marginBottom: 38
  },
  fieldLabel: {
    fontSize: theme.typography.sizes.subHeading
  },
  fieldValue: {
    fontSize: theme.typography.sizes.subHeading
  },
  submitBtn: {
    alignSelf: 'center',
    width: 142,
    minHeight: 0,
    marginTop: 38,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  submitLabel: {
    fontFamily: theme.typography.families.semiBold,
    fontSize: 17,
    letterSpacing: -0.085
  }
});
