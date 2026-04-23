import {Text, View, Button} from 'react-native';
import { next, previous } from '../MusicController';


export default function Musica (){
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Button title='Anterior' onPress={previous}/>
                <Button title='proxima' onPress={next}/>
            </View>
        </View>
    )
}