import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import BackgroundLoop from '../BackgroundLoop';
import Player from '../Player';
import GameEngine from '../src/game/GameEngine';
import { useState, useRef } from 'react';
import Modal from '../Modal';

//rodar a engine aqui

export default function Game(): React.JSX.Element {
  const resetRef = useRef<()=>void>(()=>{});
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);//precisa estar fora da gameEngine para poder mostrar uma tela de gameOver
  return (                                        //e para ser melhor controlado
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GameEngine setScore={setScore} setGameOver={setGameOver} gameOver={gameOver} paused={paused} resetRef={resetRef}/>
      <Modal visible={gameOver} score={score} onRestart={()=>{resetRef.current(); setGameOver(false)}} onSave={()=>{console.log("salvar pontuação")}}/>
      <BackgroundLoop paused={paused}/>
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
      <TouchableOpacity onPress={()=> setPaused(prev => !prev)}>
        <Text style={{
        position: 'absolute',
        top: -385,
        left: 40,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        backgroundColor: 'lightpink',
        borderWidth: 2,
        borderRadius: 10,
      }}>{paused ? 'Continuar':'Pausar'}</Text>
      </TouchableOpacity>
    </View>
  );
}
