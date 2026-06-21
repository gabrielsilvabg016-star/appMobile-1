import React, { useRef, useState, useContext } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  configureReanimatedLogger,
  ReanimatedLogLevel,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';

import { PlayerContext } from './PlayerContext';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

export default function Player(): React.JSX.Element {
  const context = useContext(PlayerContext);

  if (!context) {//typeScript exige que o context seja validado
    throw new Error('PlayerContext não encontrado');
  }

  const {
    playerSkin,
    playerY,
  } = context;

  const posiInicial = 270;
  //const translateY = useSharedValue<number>(playerY.value);

  const isJumping = useSharedValue<boolean>(false);
  const pressStart = useSharedValue<number>(0);

  const timeOutRef = useRef<any>(null);

  const max_hold_time: number = 500;
  const max_jump: number = -390;
  const min_jump: number = -150;

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

    //duas maneiras de fazer esse percent, usando math max + math pow e a mais direta clamped/max
    //const percent = Math.max(0.25, Math.pow(clamped / max_hold_time, 0.1));//ajusta a altura do toque rapido
    const percent = clamped/max_hold_time;
    const jumpHeight = min_jump + (max_jump - min_jump) * percent;

    isJumping.value = true;

    playerY.value = withTiming(
      posiInicial + jumpHeight,
      { duration: 300, easing: Easing.out(Easing.quad) },
      () => {
        playerY.value = withTiming(
          posiInicial,
          { duration: 500, easing: Easing.in(Easing.quad) },
          () => {
            isJumping.value = false;
          }
        );
      }
    );
  };

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: playerY.value }],
  }));

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={{
        left: 15,
        alignSelf: 'flex-start',
        transform: [{scaleX: -1}]
      }}
    >

        <Animated.View 
        style={[
          {
            position: 'absolute',
            left: 19,
            width: 90,
            height: 115,
            borderWidth: 2,
            borderColor: 'red',
          },
          style,
        ]}
      />

      <Animated.Image
        source={playerSkin}
        style={[
          {
            width: 140,
            height: 140,
          },
          style,
        ]}
      />
    </Pressable>
  );
}