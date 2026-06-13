import { StyleSheet, Text, View } from 'react-native';
import BackgroundLoop from '../BackgroundLoop';
import Player from '../Player';

//rodar a engine aqui
/*useEffect(() => {
    let id;

    function loop() {
      engine.update();           // 👈 lógica do jogo roda aqui
      setState(engine.getState()); // 👈 UI atualiza aqui

      id = requestAnimationFrame(loop);
    }

    loop();

    return () => cancelAnimationFrame(id);
  }, []);*/

export default function Game() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <BackgroundLoop style={{zIndex:0}}/>
      <Player/>
    </View>
  );
}