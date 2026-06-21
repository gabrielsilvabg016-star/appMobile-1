import { createAudioPlayer, AudioPlayer } from "expo-audio";

interface Music {
  name: string;
  source: number;
}

/*Ao optar por baixar, você reconhece que o conteúdo de áudio ou vídeo acessado é apenas para uso pessoal e não comercial.
Você concorda em não distribuir, copiar, modificar ou de outra forma usar o conteúdo baixado para qualquer finalidade comercial, incluindo, mas não se limitando à revenda,
apresentação pública ou transmissão. Qualquer uso do conteúdo além do escopo destes termos pode resultar em violação da lei de direitos autorais aplicável e dos Termos de Serviço.
Não assumimos qualquer responsabilidade por uso não autorizado ou inadequado do conteúdo,
e o usuário assume total responsabilidade pelo cumprimento de todas as leis e obrigações contratuais relevantes.*/

const PlayList: Music[] = [
  {
    name: 'Go! Ninja Thief!',
    source: require('./assets/Audios/GoNinjaThief.mp3'),
  },
  {
    name: 'Bunny Bunny Carrot',
    source: require('./assets/Audios/BunnyBunnyCarrot.mp3'),
  },
  {
    name: 'I Feel So Alive',
    source: require('./assets/Audios/IFeelSoAlive.mp3'), //tentar fazer essa tocar so na tela de loja
  },
];

let player: AudioPlayer | null = null;
let Index = 0;

//Tem que trocar o nome das funções expo-speech usa os mesmos nomes, ta importando errado no outros objetos

function getPlayer(){
  if(player === null){
    player = createAudioPlayer(
      PlayList[Index].source
    );
  }
  return player;
}

let musicListeners: (() => void)[] = [];

export function subscribeMusic(callback: () => void) {

  musicListeners.push(callback);

  return () => {
    musicListeners = musicListeners.filter(
      item => item !== callback
    );
  };

}

function notifyMusicChange() {

  musicListeners.forEach(callback => {
    callback();
  });

}

function createPlayer(){

  if(player){
    player.pause();
    player.remove();
    player = null;
  }


  player = createAudioPlayer(
    PlayList[Index].source
  );


  player.loop = false;
  return player;
}

export function play(): void{
  if(!player){
    createPlayer();
  }

  player?.play();
}

export function pause(){

  player?.pause();
}

export function resume(){

  player?.play();
}

export function next(){

  Index = (Index + 1) % PlayList.length;

  createPlayer();
  player?.play();
  notifyMusicChange();
}

export function previous(){
  Index = (Index - 1 + PlayList.length) % PlayList.length;


  createPlayer();
  player?.play();
  notifyMusicChange();
}

export function stop(){
 if(player){
   player.pause();
   player.remove();
   player=null;
 }
}

export function setVolume(value:number){
  if(player){
    player.volume = value;
  }
}

export function getMusicaAtual(): Music{
  return PlayList[Index];
}