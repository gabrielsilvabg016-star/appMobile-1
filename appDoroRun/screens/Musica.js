import {Text, View, Button} from 'react-native';
//import { useState } from 'react'; seria utilizado para mostrar o nome da musica, mas fica para depois
import { next, previous } from '../MusicController';


export default function Musica (){
    //const [currentMusicName, setCurrentMusicName] = useState('');

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Button title='Anterior' onPress={previous}/>
                <Button title='proxima' onPress={next}/>
            </View>
        </View>
    )
}