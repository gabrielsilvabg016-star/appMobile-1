import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, Image } from 'react-native';
import { SharedValue, useSharedValue, runOnJS } from 'react-native-reanimated';
import { PlayerContext } from '../../PlayerContext';
import { pause, resume } from 'expo-speech';

const obstaculo_sprite = require('../../assets/rock.webp')

type Obstacle = {
  id: number;
  x: number;
  width: number;
  height: number;
  sprite: any;
};

type GameEngineProps = {
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  gameOver: boolean;
  paused: boolean;
  resetRef: React.MutableRefObject<()=>void>;
};

export default function GameEngine({
  setScore,
  setGameOver,
  gameOver,
  paused,
  resetRef
}: GameEngineProps) { //precisa tipar o setScore pro react não encomodar
  
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
  const [renderObjetos, setRenderObjetos] = useState<Obstacle[]>([]);

  const frameRef = useRef<number>(0);

  //esse valores abaixo são da hitbox do player, x, width e height tem que ser os mesmos valores da animated.view no player.tsx
  //animated.view mostra a hitbox de forma visual apenas
  const PLAYER_X = 19;
  const PLAYER_WIDTH = 90;
  const PLAYER_HEIGHT = 115;

  const GROUND_Y = 270;

  //Loop
  const loop = () => {
    if (gameOver || paused) return;

    try {

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

        //atualizar o render
        setRenderObjetos([...objetos.current]);//[...] copia o que esta dentro do array, diferente de arrayA = arrayB

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

      /*console.log({
      obstaculoX: o.x,
      playerY: playerY.value,
      hit
    });*/

      if (hit) {
        setGameOver(true);
        cancelAnimationFrame(frameRef.current);
        return;
      }
    }
  };

  // spawn de obstáculos
  useEffect(() => {
      //console.log('spawn effect');
      //console.log({ gameOver, paused });

      if (gameOver|| paused) return;

      const interval = setInterval(() => {
      //console.log('obstáculos:', objetos.current.length);
      objetos.current.push({//tamanho do objt?
        id: Date.now(),
        x: 375,
        width: 40,
        height: 40,
        sprite: obstaculo_sprite,
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [gameOver, paused]);

  // speed + loop
  useEffect(() => {
    if(gameOver||paused){
      cancelAnimationFrame(frameRef.current);
      //pause();
      return;
    }
    /*else
      resume();*/

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [gameOver, paused]);

  const resetGame = () => {
    objetos.current = [];
    setRenderObjetos([]);

    scoreRef.current = 0;
    setScore(0);

    playerY.value = 270;
  }

  useEffect(()=> {
    resetRef.current = resetGame;
  }, []);

  return (
    <View
      style={{
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
      }}
    >
      {renderObjetos.map(o=>(
        <View
          key={o.id}
          style={{
            position:'absolute',
            left:o.x,
            top:GROUND_Y - o.height + 375,
            width:o.width,
            height:o.height,
            borderWidth:2,
            borderColor:'blue',
          }}>
        <Image
        source={o.sprite}
        style ={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: o.width,
          height: o.height,
        }}
        />
        </View>
      ))}
      {/* UI do jogo */}
      {/* Score */}
      {/* Game Over */}
    </View>
  );
}