import React, { useEffect } from 'react';
import { Dimensions, Image, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

const { width: telaLargura, height: telaAltura } = Dimensions.get('window');

const source = require('./assets/imgBackground.png');

export default function BackgroundLoop(): React.JSX.Element {
  const prog = useSharedValue<number>(0);

  const vell: number = 15000; // velocidade
  const imageLargura: number = 3995; // dados da imagem
  const imageAltura: number = 742;

  const escala: number = telaAltura / imageAltura;
  const display: number = imageLargura * escala;

  useEffect(() => {
    prog.value = withRepeat(
      withTiming(display, {
        duration: vell,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [display, prog, vell]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: -(prog.value % display),
        },
      ],
    };
  });

  return (
    <View
      style={{
        position: 'absolute',
        width: telaLargura,
        height: telaAltura,
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={[
          {
            flexDirection: 'row',
            height: telaAltura,
          },
          animatedStyle,
        ]}
      >
        <Image
          source={source}
          style={{ width: display, height: telaAltura }}
          resizeMode="cover"
        />
        <Image
          source={source}
          style={{ width: display, height: telaAltura }}
          resizeMode="cover"
        />
        <Image
          source={source}
          style={{ width: display, height: telaAltura }}
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
}