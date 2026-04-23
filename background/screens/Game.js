import { StyleSheet, Text, View } from 'react-native';
import BackgroundLoop from '../BackgroundLoop';
import Player from '../Player';

export default function Game() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <BackgroundLoop style={{zIndex:0}}/>
      <Player/>
    </View>
  );
}