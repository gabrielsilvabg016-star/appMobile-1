import { StyleSheet, Text, View } from 'react-native';
import BackgroundLoop from '../BackgroundLoop';
import Player from '../Player';
import GameEngine from '../src/game/GameEngine';
import { useState } from 'react';

//rodar a engine aqui

export default function Game(): React.JSX.Element {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);//precisa estar fora da gameEngine para poder mostrar uma tela de gameOver
  return (                                        //e para ser melhor controlado
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GameEngine setScore={setScore} setGameOver={setGameOver} gameOver={gameOver}/>
      <BackgroundLoop style={{ zIndex: 0 }} /> {/*ignorar esse style sublinhado, o negocio ta funcionando, zIndex define a ordem de empilhamento,
                                                 zIndex:0 = base do jogo, o resto das coisas ficam acima dele*/}
      <Player />
      <Text style={{
        position: 'absolute',
        top: 50,
        left: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        backgroundColor: 'lightpink',
        borderWidth: 2,
        borderRadius: 10,
      }}>Pontuação: {score}</Text>
    </View>
  );
}
