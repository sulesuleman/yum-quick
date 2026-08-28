import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { Circle, G, Line, Svg } from 'react-native-svg';

import { theme } from '@theme';

import { useCancelledAnimationStyles } from './useCancelledAnimationStyles';

const SIZE = 139;
const STROKE_WIDTH = 7;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CENTER = SIZE / 2;
const DOT_RADIUS = 7;
const DOT_SPACING = 22;
const CROSS_ARM = RADIUS * 0.6;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedG = Animated.createAnimatedComponent(G);

export function CancelledAnimation() {
  const styles = useCancelledAnimationStyles();

  const ringProgress = useSharedValue(0);
  const dot1Scale = useSharedValue(0);
  const dot2Scale = useSharedValue(0);
  const dot3Scale = useSharedValue(0);
  const dotsOpacity = useSharedValue(1);
  const crossOpacity = useSharedValue(0);

  useEffect(() => {
    ringProgress.value = withTiming(1, { duration: 650, easing: Easing.out(Easing.cubic) });
    dot1Scale.value = withDelay(650, withSpring(1, { damping: 9, stiffness: 180 }));
    dot2Scale.value = withDelay(820, withSpring(1, { damping: 9, stiffness: 180 }));
    dot3Scale.value = withDelay(990, withSpring(1, { damping: 9, stiffness: 180 }));

    dotsOpacity.value = withDelay(1700, withTiming(0, { duration: 250 }));
    crossOpacity.value = withDelay(
      1750,
      withTiming(1, { duration: 300, easing: Easing.out(Easing.cubic) })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ringAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - ringProgress.value)
  }));

  const dotsGroupAnimatedProps = useAnimatedProps(() => ({
    opacity: dotsOpacity.value
  }));

  const dot1AnimatedProps = useAnimatedProps(() => ({ r: DOT_RADIUS * dot1Scale.value }));
  const dot2AnimatedProps = useAnimatedProps(() => ({ r: DOT_RADIUS * dot2Scale.value }));
  const dot3AnimatedProps = useAnimatedProps(() => ({ r: DOT_RADIUS * dot3Scale.value }));

  const crossAnimatedProps = useAnimatedProps(() => ({
    opacity: crossOpacity.value
  }));

  return (
    <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={styles.svg}>
      <AnimatedCircle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        stroke={theme.colors.brand.primary}
        strokeWidth={STROKE_WIDTH}
        fill='none'
        strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
        strokeLinecap='round'
        rotation={-90}
        originX={CENTER}
        originY={CENTER}
        animatedProps={ringAnimatedProps}
      />

      <AnimatedG animatedProps={dotsGroupAnimatedProps}>
        <AnimatedCircle
          cx={CENTER - DOT_SPACING}
          cy={CENTER}
          fill={theme.colors.brand.primary}
          animatedProps={dot1AnimatedProps}
        />
        <AnimatedCircle
          cx={CENTER}
          cy={CENTER}
          fill={theme.colors.brand.primary}
          animatedProps={dot2AnimatedProps}
        />
        <AnimatedCircle
          cx={CENTER + DOT_SPACING}
          cy={CENTER}
          fill={theme.colors.brand.primary}
          animatedProps={dot3AnimatedProps}
        />
      </AnimatedG>

      <AnimatedG animatedProps={crossAnimatedProps}>
        <Line
          x1={CENTER - CROSS_ARM}
          y1={CENTER - CROSS_ARM}
          x2={CENTER + CROSS_ARM}
          y2={CENTER + CROSS_ARM}
          stroke={theme.colors.brand.primary}
          strokeWidth={8}
          strokeLinecap='round'
        />
        <Line
          x1={CENTER - CROSS_ARM}
          y1={CENTER + CROSS_ARM}
          x2={CENTER + CROSS_ARM}
          y2={CENTER - CROSS_ARM}
          stroke={theme.colors.brand.primary}
          strokeWidth={8}
          strokeLinecap='round'
        />
      </AnimatedG>
    </Svg>
  );
}
