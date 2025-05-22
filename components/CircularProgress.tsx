import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  progress: number; // 0 to 1
  radius?: number;
  strokeWidth?: number;
  duration?: number;
  color?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

export const CircularProgress = ({
  progress,
  radius = 60,
  strokeWidth = 10,
  duration = 800,
  color = '#3485FF',
  backgroundColor = '#e8e8e8',
  children,
}: Props) => {
  const animatedProgress = useSharedValue(0);
  const scale = useSharedValue(1);

  const size = (radius + strokeWidth / 2) * 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration,
      easing: Easing.out(Easing.ease),
    });

    if (progress >= 1) {
      scale.value = withSpring(1.2, { damping: 5 }, () => {
        scale.value = withSpring(1);
      });
    }
  }, [progress]);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference * (1 - animatedProgress.value),
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          justifyContent: 'center',
          alignItems: 'center',
        },
        animatedContainerStyle,
      ]}>
      <Svg width={size} height={size}>
        <Circle
          stroke={backgroundColor}
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          stroke={color}
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference}, ${circumference}`}
          animatedProps={animatedProps}
          strokeLinecap="round"
          rotation="-90"
          originX={center}
          originY={center}
        />
      </Svg>
      <View style={StyleSheet.absoluteFill} className="items-center justify-center">
        {children}
      </View>
    </Animated.View>
  );
};
