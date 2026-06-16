import { StyleSheet } from 'react-native';

import { theme } from '@theme';

export function useOrderCardStyles() {
  return styles;
}

const { orangeBase, orange2 } = theme.colors.background;
const { primary: textPrimary } = theme.colors.text;
const { primary: brandPrimary } = theme.colors.brand;
const { bold, medium, regular } = theme.typography.families;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
    gap: 13,
    borderTopWidth: 1,
    borderTopColor: '#FFD8C7',
    borderBottomWidth: 1,
    borderBottomColor: '#FFD8C7'
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    gap: 9
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  name: {
    flex: 1,
    fontFamily: bold,
    fontSize: 14,
    color: textPrimary,
    marginRight: 8
  },
  price: {
    fontFamily: bold,
    fontSize: 14,
    color: brandPrimary
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  meta: {
    fontFamily: regular,
    fontSize: 12,
    color: '#9B9B9B'
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8
  },
  cancelBtn: {
    borderRadius: 20,
    backgroundColor: orangeBase,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  cancelText: {
    fontFamily: medium,
    fontSize: 11,
    color: '#FFFFFF'
  },
  trackBtn: {
    borderRadius: 20,
    backgroundColor: orange2,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  trackText: {
    fontFamily: medium,
    fontSize: 11,
    color: orangeBase
  }
});

