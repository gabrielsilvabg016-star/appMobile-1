import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { useContext } from 'react';

import { PlayerContext } from './PlayerContext';
import Player from './Player'

const Skins = [
  {
    id: 1,
    nome: 'Dorothy / Doro',
    preco: 0,
    imagem: require('./assets/doroRunning.gif'),
  },
  {
    id: 2,
    nome: 'Omatsuri Mambo',
    preco: 10,
    imagem: require('./assets/mambo.gif'),
  },
  {
    id: 3,
    nome: 'Pato',
    preco: 20,
    imagem: require('./assets/shuba.gif'),
  },
];

export default function ListSkins() {
  const {setPlayerSkin} = useContext(PlayerContext);

  const criaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listaItem} 
      onPress={() => setPlayerSkin(item.imagem)}
    >
      <Image source={item.imagem} style={styles.listaImagem} />

      <View style={styles.listaDetalhes}>
        
        <Text style={styles.textoForte}>Nome: <Text style={styles.textoNormal}>{item.nome}</Text></Text>
        <Text style={styles.textoForte}>Preço: <Text style={styles.textoNormal}>{item.preco}</Text></Text>
      </View>

    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      <Text style={styles.titulo}>Loja de Skins</Text>

      <FlatList
        data={Skins} 
        renderItem={criaItem} 
        keyExtractor={item => item.id.toString()} 
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
  }
});