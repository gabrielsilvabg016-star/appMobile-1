import Animated, {useSharedValue, useAnimatedStyle, withTiming, withRepeat, Easing} from "react-native-reanimated";
import React, {useEffect} from 'react';
import { Dimensions, Image, View } from "react-native";
import { scheduleOnRN } from "react-native-worklets";

const {width: TelaLargura, height: TelaAltura} = Dimensions.get('window'); //Dimension retorna um objeto com as caracteristicas da tela,
const source = require("./assets/imgBackground.png");

export default function BackgroundLoop() {
    const prog = useSharedValue(0);
    const vell = 15000; //velocidade
    const imageLargura = 3995; //dados tirados direto da imgBackground
    const imageAltura = 742;

    const escala = TelaAltura/imageAltura;
    const display = imageLargura*escala;

    useEffect(() => {
        prog.value = withRepeat(
            withTiming(display, {
                duration: vell, 
                easing: Easing.linear,
            }),
            -1,
            false
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{translateX: -(prog.value%display)}]
    }));

    /*const animatedStyle2 = useAnimatedStyle(() => {
        const translateX = -(prog.value % display) + display;
        return {
            transform: [{translateX}],
        };
    });*/

  return (
    <View style={{position:'absolute', width:TelaLargura, height: TelaAltura, overflow: 'hidden'}}>
    <Animated.View style={[{flexDirection: "row", height: TelaAltura}, animatedStyle]}>
        <Image source={source} style={{width: display, height: TelaAltura}} resizeMode="cover"/>
        <Image source={source} style={{width: display, height: TelaAltura}} resizeMode="cover"/>
        <Image source={source} style={{width: display, height: TelaAltura}} resizeMode="cover"/>
    </Animated.View>
    
    </View>
  );
}