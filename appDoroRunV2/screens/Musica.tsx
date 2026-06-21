import { Text, View, Button } from 'react-native';
import { getMusicaAtual, next, pause, previous, resume } from '../MusicController';

export default function Musica(): React.JSX.Element {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{getMusicaAtual().name}</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Button title="Anterior" onPress={previous}/>
        <Button title="Proxima" onPress={next}/>
        <Button title="Pause" onPress={pause}/>
        <Button title='Continuar' onPress={resume}/>
      </View>
    </View>
  );
}