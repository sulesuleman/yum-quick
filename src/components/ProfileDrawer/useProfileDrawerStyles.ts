import { StyleSheet } from 'react-native';

import { theme, useScale } from '@theme';

const { medium, regular } = theme.typography.families;

export function useProfileDrawerStyles() {
  const { scale } = useScale();

  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'rgba(0,0,0,0.4)'
    },
    drawer: {
      width: '84%',
      maxWidth: scale(360),
      flexDirection: 'column',
      backgroundColor: theme.colors.background.orangeBase,
      borderTopLeftRadius: 50,
      borderBottomLeftRadius: 50,
      shadowColor: '#000',
      shadowOffset: { width: -6, height: 0 },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 12
    },
    navScroll: {
      flex: 1,
      minHeight: 0
    },
    backdrop: {
      flex: 1
    },
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(20),
      paddingHorizontal: scale(32),
      paddingBottom: scale(28)
    },
    profileInfo: {
      flex: 1,
      minWidth: 0
    },
    avatar: {
      width: scale(50),
      height: scale(50),
      borderRadius: scale(30)
    },
    profileName: {
      fontFamily: medium,
      fontSize: scale(28),
      color: theme.colors.text.inverse
    },
    profileEmail: {
      fontFamily: regular,
      fontSize: scale(15),
      color: theme.colors.background.yellow2,
      marginTop: 2
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(28),
      paddingHorizontal: scale(32),
      paddingVertical: scale(16)
    },
    iconBox: {
      width: scale(40),
      height: scale(40),
      borderRadius: 15,
      backgroundColor: theme.colors.text.inverse,
      alignItems: 'center',
      justifyContent: 'center'
    },
    iconBoxSmall: {
      width: scale(32),
      height: scale(32),
      borderRadius: 15,
      backgroundColor: theme.colors.text.inverse,
      alignItems: 'center',
      justifyContent: 'center'
    },
    menuLabel: {
      flexShrink: 1,
      fontFamily: medium,
      fontSize: scale(20),
      color: theme.colors.background.yellow2
    },
    divider: {
      height: 1,
      backgroundColor: '#FFD8C7',
      marginHorizontal: scale(32)
    },
    logoutFooter: {}
  });
}
