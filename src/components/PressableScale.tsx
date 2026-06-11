import React, { useRef } from 'react';
import { Animated, Pressable, PressableProps, ViewStyle } from 'react-native';

interface Props extends PressableProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

/**
 * Pressable with Whoop-like press motion: subtle scale-down on press,
 * spring back on release (HIG scale-feedback, 0.97 within the 0.95–1.05 band).
 * Uses transform only, so no layout shift.
 */
export default function PressableScale({ children, style, ...rest }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      speed: 40,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      speed: 24,
      bounciness: 6,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable style={style} onPressIn={pressIn} onPressOut={pressOut} {...rest}>
      <Animated.View style={{ transform: [{ scale }] }}>{children}</Animated.View>
    </Pressable>
  );
}
