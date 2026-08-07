import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useCancelOrderOverlayStyles() {
  return styles;
}

const { bold, medium, light, regular } = theme.typography.families;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background.yellowBase,
    zIndex: 10
  },
  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  formBody: {
    paddingHorizontal: theme.spacing.md * 2
  },
  successLayer: {
    paddingTop: 190,
    paddingHorizontal: theme.spacing.md * 2,
    alignItems: 'center'
  },
  description: {
    fontFamily: light,
    fontSize: 14,
    lineHeight: 17,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.divider
  },
  reasonLabel: {
    flex: 1,
    marginRight: theme.spacing.md,
    fontFamily: regular,
    fontSize: 15,
    color: theme.colors.text.primary
  },
  othersField: {
    marginTop: 9
  },
  othersLabel: {
    marginBottom: theme.spacing.sm,
    fontFamily: regular,
    fontSize: 15,
    color: theme.colors.text.primary
  },
  othersValue: {
    fontFamily: light
  },
  othersBox: {
    minHeight: 95
  },
  submitBtn: {
    alignSelf: 'center',
    width: 142,
    minHeight: 0,
    marginTop: theme.spacing.xl,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  submitLabel: {
    fontFamily: theme.typography.families.semiBold,
    fontSize: 17,
    letterSpacing: -0.085
  },
  successTitle: {
    marginTop: 24,
    fontFamily: bold,
    fontSize: 24,
    color: theme.colors.text.primary
  },
  successSubtitle: {
    marginTop: 8,
    textAlign: 'center',
    fontFamily: medium,
    fontSize: 16,
    color: theme.colors.text.primary
  },
  supportNote: {
    marginTop: 'auto',
    marginBottom: 24
  }
});
