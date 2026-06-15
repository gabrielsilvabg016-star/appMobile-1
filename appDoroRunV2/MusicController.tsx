/*import { Audio, AVPlaybackStatus } from 'expo-av';

interface Music {
  name: string;
  source: number;
}

const PlayList: Music[] = [
  {
    name: 'Teste1',
    source: require('./assets/Audios/BunnyBunnyCarrot.mp3'),
  },
  {
    name: 'Teste2',
    source: require('./assets/Audios/BunnyBunnyCarrot.mp3'),
  },
  {
    name: 'teste3',
    source: require('./assets/Audios/BunnyBunnyCarrot.mp3'),
  },
];

let sound: Audio.Sound = new Audio.Sound();
let Index: number = 0;

export async function play(): Promise<void> {
  await sound.loadAsync(PlayList[Index].source);
  await sound.setIsLoopingAsync(false);
  await sound.playAsync();

  sound.setOnPlaybackStatusUpdate(async (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      await next();
    }
  });
}

export async function next(): Promise<void> {
  await sound.unloadAsync();

  Index = (Index + 1) % PlayList.length;

  await sound.loadAsync(PlayList[Index].source);
  await sound.playAsync();
}

export async function previous(): Promise<void> {
  await sound.unloadAsync();

  Index = (Index - 1 + PlayList.length) % PlayList.length;

  await sound.loadAsync(PlayList[Index].source);
  await sound.playAsync();
}*/