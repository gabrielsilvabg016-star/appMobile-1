import { StyleSheet, Text, View } from 'react-native';
import BackgroundLoop from '../BackgroundLoop';
import Player from '../Player';

export default function Game() {
  return (
    //tem um sistema de camadas proprio do js (eu acho), quanto mais pra baixo maior a camada
    //esse <backgroundloop> ta na camada 0 o <text> ta na camada 1, ent o text aparece encima da imagem
    //ordem das camadas = 0 > 1 > 2 > etc... 
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <BackgroundLoop style={{zIndex:0}}/>
      <Player/>
    </View>
  );
}