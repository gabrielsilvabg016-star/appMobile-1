import { Audio } from "expo-av";

const PlayList = [
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
    }
];

let sound = new Audio.Sound();
let Index = 0;

export async function play(){
    await sound.loadAsync(PlayList[Index].source);
    await sound.setIsLoopingAsync(false);
    await sound.playAsync();

    sound.setOnPlaybackStatusUpdate(async(status) => {
        if(status.didJustFinish){
            next();
        }
    });
}

export async function next(){
    await sound.unloadAsync();

    Index = (Index+1)%PlayList.length;

    await sound.loadAsync(PlayList[Index].source);
    await sound.playAsync();
}

export async function previous(){
    await sound.unloadAsync();

    Index = (Index - 1 + PlayList.length)%PlayList.length;

    await sound.loadAsync(PlayList[Index].source);
    await sound.playAsync();
}