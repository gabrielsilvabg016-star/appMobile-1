import { pause } from 'expo-speech';
import React, { useEffect } from 'react';
import { Dimensions, Image, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

type Props = {
  paused: boolean;
}
const { width: telaLargura, height: telaAltura } = Dimensions.get('window');
const source = require('./assets/imgBackground.png');

export default function BackgroundLoop({paused}: Props): React.JSX.Element {
  const prog = useSharedValue<number>(0);

  const vell: number = 15000; // velocidade
  const imageLargura: number = 3995; // dados da imagem
  const imageAltura: number = 742;

  const escala: number = telaAltura / imageAltura;
  const display: number = imageLargura * escala;

  useEffect(() => {
    //console.log('entrou no useEffect paused: ',paused);

    if(paused){
      //console.log('paused: ',paused);
      cancelAnimation(prog);
      return;
    }

    const atual = prog.value%display;
    const resto = display - atual; 
    
    prog.value = withRepeat(
      withTiming(prog.value + resto, {
        duration: (resto/display)*vell,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [paused]);

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