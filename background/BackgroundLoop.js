import Animated, {useSharedValue, useAnimatedStyle, withTiming, Easing} from "react-native-reanimated";
import React, {useEffect} from 'react';
import { Dimensions, Image } from "react-native";
import { scheduleOnRN } from "react-native-worklets";

const {width: TelaLargura, height: TelaAltura} = Dimensions.get('window'); //Dimension retorna um objeto com as caracteristicas da tela,
                                                //{width: tela} pega so o width e bota numa variavel [tela]
export default function BackgroundLoop() {
    const translateX = useSharedValue(TelaLargura); //começa fora da tela na direita
                                             //useSharedValue e para criar um valor com gets e sets porque e mais seguro alterar apenas ele do que direto na variavel
                                             //em teoria deve ser possivel fazer um tela.set() e tela.get()

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{translateX: translateX.value}],
    }));

    useEffect(() => {
        const animate = () => {
            translateX.value = withTiming(//permite criar um loop com duração e tipo de saida[easing]
                -500, //move para a esquerda // velocidade de movimento para a esquerda   
                { duration: 15000, easing: Easing.linear},
                () => {
                    translateX.value = TelaLargura;
                    scheduleOnRN(animate)(); //fazer a função ser chamada dnv num loop
                }
            );
        };
        animate();
    }, []);

  return (
    <Animated.Image
    source={require('./assets/backgroundtemp.webp')}
      style={[{
        flex: 1,
        width: TelaLargura,
        height: TelaAltura,
        position: 'absolute',
        //borderWidth: 1,
        //backgroundColor: 'purple',
        }, animatedStyle]}
      resizeMode={'cover'}
    />
  );
}