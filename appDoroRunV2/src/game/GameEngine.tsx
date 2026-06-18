import React, { useEffect, useRef, useState, useContext } from 'react';
import { View } from 'react-native';
import { SharedValue, useSharedValue, runOnJS } from 'react-native-reanimated';
import { PlayerContext } from '../../PlayerContext';

type Obstacle = {
  x: number;
  width: number;
  height: number;
};

type GameEngineProps = {
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  gameOver: boolean;
};

export default function GameEngine({setScore, setGameOver, gameOver}: GameEngineProps) { //precisa tipar o setScore pro react não encomodar
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error('PlayerContext não encontrado');
  }

  const { playerY } = context;
  //const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const lastScoreTime = useRef(0); //ultimo aumento de pontos

  const speed = useSharedValue(6);
  const objetos = useRef<Obstacle[]>([]);

  const frameRef = useRef<number>(0);

  const PLAYER_X = 15;
  const PLAYER_WIDTH = 140;
  const PLAYER_HEIGHT = 140;
  const GROUND_Y = 270;

  //Loop
  const loop = () => {
    try {
        if (gameOver) return;

        const agora = Date.now();

        if (agora - lastScoreTime.current > 100){
            scoreRef.current +=1;
            setScore(scoreRef.current);//passa o valor de scoreRef para score na tela de jogo
            lastScoreTime.current = agora;//registra o momento que aumentou os pontos
        }

        // move obstáculos
        for (let i = 0; i < objetos.current.length; i++) {
        objetos.current[i].x -= speed.value;
        }

        // remove fora da tela
        objetos.current = objetos.current.filter(o => o.x > -100);

        // colisão
        checkColisao();
    } catch (error) {
        console.log('Loop quebrou: ', error);
    }

    frameRef.current = requestAnimationFrame(loop);
  };

  const checkColisao = () => {
    for (const o of objetos.current) {
      const hit =
        PLAYER_X < o.x + o.width &&
        PLAYER_X + PLAYER_WIDTH > o.x &&
        playerY.value < GROUND_Y + o.height &&
        playerY.value + PLAYER_HEIGHT > GROUND_Y;

      if (hit) {
        setGameOver(true);
        cancelAnimationFrame(frameRef.current);
      }
    }
  };

  // spawn de obstáculos
  /*useEffect(() => {
      if (gameOver) return;

      const interval = setInterval(() => {

      objetos.current.push({
        x: 500,
        width: 50,
        height: 80,
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [gameOver]);*/

  // speed + loop
  useEffect(() => {
    const start = () => {
      loop();
    };

    start();

    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [gameOver]);

  return (
    <View
      style={{
        position: 'absolute',
        top: 40,
        left: 20,
      }}
    >
      {/* UI do jogo */}
      {/* Score */}
      {/* Game Over */}
    </View>
  );
}