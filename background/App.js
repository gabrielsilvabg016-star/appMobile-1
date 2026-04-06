import { StyleSheet, Text, View } from 'react-native';
import Background from './BackgroundLoop';
import BackgroundLoop from './BackgroundLoop';

export default function App() {
  return (
    //tem um sistema de camadas proprio do js (eu acho), quanto mais pra baixo maior a camada
    //esse <backgroundloop> ta na camada 0 o <text> ta na camada 1, ent o text aparece encima da imagem
    //ordem das camadas = 0 > 1 > 2 > etc... 
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <BackgroundLoop />
      <Text>texto de teste</Text>
    </View>
  );
}