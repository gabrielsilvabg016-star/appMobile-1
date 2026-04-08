import React, { useRef } from "react";
import { Pressable } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
    Easing,
} from "react-native-reanimated"; //withSequence era utilizado no pulo antigo

export default function Player(){
    const posiInicial = useSharedValue(150); //posição inicial no eixo Y
    const translateY = useSharedValue(posiInicial.value);
    const isJumping = useSharedValue(false);//boolean para pulo
    const pressStart = useSharedValue(0);//detectar inicio do clique
    const timeOutRef = useRef(null); //impedir o usuario de segurar para sempre o clique

    const max_hold_time = 500; //tempo maximo de clique em MS
    const max_jump = -250; //altura maxima de pulo [toque segurado]
    const min_jump = -10; //altura minima para o pulo [toque rapido]

    const onPressIn = () => {
        if(isJumping.value) return;

        pressStart.value = Date.now();//MS no momento do press

        timeOutRef.value = setTimeout(() => {//pulo automatico se segurar por muito tempo
            TriggerPulo();
        }, max_hold_time);
    };

    const onPressOut = () => {
        if(isJumping.value) return;

        clearTimeout(timeOutRef.value); //cancela o auto
        TriggerPulo();
    };

    const TriggerPulo = () => {
        if(isJumping.value) return;

        const holdTime = Date.now() - pressStart.value;  //tempo que durou o seguro de clique
        const clamped = Math.min(holdTime, max_hold_time); //limitar tempo maximo de segurada

        const percent = Math.pow(clamped/max_hold_time, 2.5); //porcentagem de pulo (sempre entre 0, 1 ou um valor float)
        const jumpHeight = min_jump + (max_jump-min_jump) * percent; //transforma tempo em altura de pulo

        isJumping.value = true;

        translateY.value = withTiming(jumpHeight, {duration: 300, easing: Easing.out(Easing.quad)}, //sobe
            () => {
                translateY.value = withTiming(posiInicial.value, {duration: 300, easing: Easing.in(Easing.quad)}, //desce
                    () => {
                        isJumping.value = false;
                    }
                );
            }
        );
    };

    //versão antiga do pulo
    /*const Pulo = () => {
        if(isJumping.value){return;}
        else
            isJumping.value = true;
        translateY.value = withSequence(// executa oque estiver dentro do withSequence em ordem de leitura
            withTiming(-150, {duration:300, easing: Easing.out(Easing.quad) }), //subir
            withTiming(0, {duration: 300, easing: Easing.in(Easing.quad)}, () =>{isJumping.value = false;}) //descer
        );
    };*/

    const style = useAnimatedStyle(() => ({
        transform: [{translateY: translateY.value}]
    }));

    return(
        <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Animated.Image source={require("./assets/doroRunning.gif")}
                style = {[
                    {
                        width: 80,
                        height: 80,
                        borderWidth: 1,
                        borderRadius: 80,
                        backgroundColor: "green",
                        overflow: "hidden",
                    },
                    style,
                ]}
            />
        </Pressable>
    )
}