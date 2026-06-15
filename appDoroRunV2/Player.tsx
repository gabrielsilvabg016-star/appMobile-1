import React, { useRef, useState, useContext } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

import { PlayerContext } from './PlayerContext';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

export default function Player(): React.JSX.Element {
  const { playerSkin } = useContext(PlayerContext);

  const posiInicial = useSharedValue<number>(270);
  const translateY = useSharedValue<number>(posiInicial.value);
  const isJumping = useSharedValue<boolean>(false);
  const pressStart = useSharedValue<number>(0);

  const timeOutRef = useRef<any>(null);

  const max_hold_time: number = 500;
  const max_jump: number = -250;
  const min_jump: number = -10;

  const onPressIn = (): void => {
    if (isJumping.value) return;

    pressStart.value = Date.now();

    timeOutRef.current = setTimeout(() => {
      TriggerPulo();
    }, max_hold_time);
  };

  const onPressOut = (): void => {
    if (isJumping.value) return;

    clearTimeout(timeOutRef.current);
    TriggerPulo();
  };

  const TriggerPulo = (): void => {
    if (isJumping.value) return;

    const holdTime = Date.now() - pressStart.value;
    const clamped = Math.min(holdTime, max_hold_time);

    const percent = Math.pow(clamped / max_hold_time, 2.5);
    const jumpHeight = min_jump + (max_jump - min_jump) * percent;

    isJumping.value = true;

    translateY.value = withTiming(
      jumpHeight,
      { duration: 300, easing: Easing.out(Easing.quad) },
      () => {
        translateY.value = withTiming(
          posiInicial.value,
          { duration: 300, easing: Easing.in(Easing.quad) },
          () => {
            isJumping.value = false;
          }
        );
      }
    );
  };

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={{
        left: 15,
        alignSelf: 'flex-start',
        transform: [{ scaleX: -1 }],
      }}
    >
      <Animated.Image
        source={playerSkin}
        style={[
          {
            width: 140,
            height: 140,
            //borderWidth: 1,
            //borderRadius: 80,
          },
          style,
        ]}
      />
    </Pressable>
  );
}