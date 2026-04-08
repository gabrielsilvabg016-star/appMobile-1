import Animated, {useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS} from "react-native-reanimated";
import React, {useEffect} from 'react';
import { Dimensions, Image } from "react-native";

const {width: Tela} = Dimensions.get('window'); //Dimension retorna um objeto com as caracteristicas da tela,
                                                //{width: tela} pega so o width e bota numa variavel [tela]
export default function BackgroundLoop() {
    const translateX = useSharedValue(Tela); //começa fora da tela na direita
                                             //useSharedValue e para criar um valor com gets e sets porque e mais seguro alterar apenas ele do que direto na variavel
                                             //em teoria deve ser possivel fazer um tela.set() e tela.get()

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{translateX: translateX.value}],
    }));

    useEffect(() => {
        const animate = () => {
            translateX.value = withTiming(//permite criar um loop com duração e tipo de saida[easing]
                -500, //move para a esquerda // velocidade de movimento para a esquerda   
                { duration: 6000, easing: Easing.linear},
                () => {
                    translateX.value = Tela;
                    runOnJS(animate)(); //fazer a função ser chamada dnv num loop
                }
            );
        };
        animate();
    }, []);
  return (
    <Animated.Image
    source={require('./assets/doroRunning.gif')}
      style={[{ width: '100%', height: '100%', position: 'absolute'}, animatedStyle]}
      resizeMode={'contain'}
    />
  );
}
