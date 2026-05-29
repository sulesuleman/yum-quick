import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { AppScreen, BrandLogo } from '@components';
import { theme } from '@theme';

const SPLASH_HOLD_MS = 1400;
const FADE_IN_MS = 600;
const FADE_OUT_MS = 450;

export function SplashScreen() {
  const router = useRouter();
  const screenOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.88)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const hasNavigated = useRef(false);

  useEffect(() => {
    const entrance = Animated.parallel([
      Animated.timing(screenOpacity, {
        toValue: 1,
        duration: FADE_IN_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: FADE_IN_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: FADE_IN_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      })
    ]);

    const exit = Animated.parallel([
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: FADE_OUT_MS,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.timing(logoScale, {
        toValue: 1.06,
        duration: FADE_OUT_MS,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true
      })
    ]);

    const sequence = Animated.sequence([entrance, Animated.delay(SPLASH_HOLD_MS), exit]);

    sequence.start(({ finished }) => {
      if (!finished || hasNavigated.current) return;
      hasNavigated.current = true;
      router.replace('/welcome');
    });

    return () => sequence.stop();
  }, [logoOpacity, logoScale, router, screenOpacity]);

  return (
    <>
      <StatusBar style={theme.statusBarStyle} />
      <Animated.View style={[styles.screen, { opacity: screenOpacity }]}>
        <AppScreen contentStyle={styles.content}>
          <Animated.View
            style={[
              styles.brandLockup,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }, { translateY: -20 }]
              }
            ]}
          >
            <BrandLogo />
          </Animated.View>
        </AppScreen>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  brandLockup: {
    alignItems: 'center'
  }
});
