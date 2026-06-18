import { View, Text, ImageBackground, StyleSheet, Button, Pressable } from 'react-native';

export default function Home({ navigation }: any): React.JSX.Element {
  return (
    <ImageBackground
      source={require('../assets/doro-dance.gif')}
      style={styles.background}
      resizeMode="cover"
    >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>
            DoroRun
        </Text>

        <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('App')}
        >
            <Text style={styles.buttonText}>▶︎</Text>
        </Pressable>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: '900',
    color: '#ffb6c1', // rosa fraco
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    marginBottom: 40,
    backgroundColor: '#da3688',
    width:170,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
   button: {
    backgroundColor: '#ff69b4',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
   // texto do botão
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    textShadowColor: '#ffb6c1',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});