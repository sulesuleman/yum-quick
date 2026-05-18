import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

import { AppScreen, BrandLogo, Button } from "@/components";
import { theme } from "@/theme";

const welcomeLogo = require("../../../assets/yumQuick-welcome.png");

const ENTER_MS = 500;
const STAGGER_MS = 120;

export function WelcomeScreen() {
  const screenOpacity = useRef(new Animated.Value(0)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const buttonsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(screenOpacity, {
        toValue: 1,
        duration: ENTER_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.stagger(STAGGER_MS, [
        createEnterAnimation(logoAnim),
        createEnterAnimation(titleAnim),
        createEnterAnimation(buttonsAnim),
      ]),
    ]).start();
  }, [buttonsAnim, logoAnim, screenOpacity, titleAnim]);

  return (
    <>
      <StatusBar style={theme.statusBarStyle} />
      <Animated.View style={[styles.screen, { opacity: screenOpacity }]}>
        <AppScreen
          backgroundColor={theme.colors.background.orangeBase}
          contentStyle={styles.content}
        >
          <Animated.View
            style={[
              styles.brandLockup,
              {
                opacity: logoAnim,
                transform: [
                  {
                    translateY: logoAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [24, -20],
                    }),
                  },
                  {
                    scale: logoAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.92, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <BrandLogo source={welcomeLogo} />
          </Animated.View>

          <Animated.View
            style={[
              styles.titleContainer,
              {
                opacity: titleAnim,
                transform: [
                  {
                    translateY: titleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.title}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.buttonContainer,
              {
                opacity: buttonsAnim,
                transform: [
                  {
                    translateY: buttonsAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [28, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Button title="Get Started" variant="primary" onPress={() => {}} />
            <Button title="Sign Up" variant="signUp" onPress={() => {}} />
          </Animated.View>
        </AppScreen>
      </Animated.View>
    </>
  );
}

function createEnterAnimation(value: Animated.Value) {
  return Animated.timing(value, {
    toValue: 1,
    duration: ENTER_MS,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
  });
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  brandLockup: {
    alignItems: "center",
  },
  titleContainer: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  title: {
    color: theme.colors.text.inverse,
    fontFamily: theme.typography.families.bold,
    fontSize: theme.typography.sizes.body,
    textAlign: "center",
    paddingHorizontal: 46,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 10,
    alignItems: "stretch",
    paddingHorizontal: 93,
  },
});
