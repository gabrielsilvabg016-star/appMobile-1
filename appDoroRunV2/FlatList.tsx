import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { useContext } from 'react';
import * as Speech from 'expo-speech';

import { PlayerContext } from './PlayerContext';
import Player from './Player';

interface Skin {
  id: number;
  nome: string;
  preco: number;
  desc: string;
  imagem: any;
}

const Skins: Skin[] = [
  {
    id: 1,
    nome: 'Dorothy / Doro',
    preco: 0,
    desc: 'Doro',
    imagem: require('./assets/doroRunning.gif'),
  },
  {
    id: 2,
    nome: 'Dorumon',
    preco: 10,
    desc: 'Digimon',
    imagem: require('./assets/dorumon-digimon.gif'),
  },
  {
    id: 3,
    nome: 'Pato',
    preco: 20,
    desc: 'Um pato dançante utilizando um boné descolado',
    imagem: require('./assets/shuba.gif'),
  },
];

export default function ListSkins(): React.JSX.Element {
  const { setPlayerSkin } = useContext(PlayerContext);//ignorar, ta funcionando

  const falar = (texto: string): void => {
    Speech.stop();
    Speech.speak(texto, {
      language: 'pt-br',
      pitch: 1.0,
      rate: 1.0,
    });
    
  };

  const criaItem = ({ item }: { item: Skin }): React.JSX.Element => (
    <TouchableOpacity
      style={styles.listaItem}
      onPress={() => {
        setPlayerSkin(item.imagem);
        falar(item.desc);
      }}
    >
      <Image source={item.imagem} style={styles.listaImagem} />

      <View style={styles.listaDetalhes}>
        <Text style={styles.textoForte}>
          Nome: <Text style={styles.textoNormal}>{item.nome}</Text>
        </Text>

        <Text style={styles.textoForte}>
          Desc: <Text style={styles.textoNormal}>{item.desc}</Text>
        </Text>

        <Text style={styles.textoForte}>
          Preço: <Text style={styles.textoNormal}>{item.preco}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.titulo}>Loja de Skins</Text>

      <FlatList
        data={Skins}
        renderItem={criaItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  listaItem: {
    backgroundColor: '#d8e4ed',
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  listaImagem: {
    width: 75,
    height: 90,
    borderRadius: 8,
  },
  listaDetalhes: {
    marginLeft: 15,
    flex: 1,
  },
  textoForte: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#222',
  },
  textoNormal: {
    fontWeight: 'normal',
    color: '#444',
  },
});