import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Linking, Alert } from 'react-native';

const filmes = [
  {
    id: 1,
    nome: 'Transcendence: A Revolução',
    ano: 2014,
  },
  {
    id: 2,
    nome: 'Kung Fu Panda 4',
    ano: 2024,
  },
  {
    id: 3,
    nome: 'Matrix',
    ano: 1999,
  },
  {
    id: 4,
    nome: 'The Batman',
    ano: 2022,
  },
  {
    id: 5,
    nome: 'A Substância',
    ano: 2024,
  },
  {
    id: 6,
    nome: 'Minecraft',
    ano: 2025,
  },
  {
    id: 7,
    nome: 'Minecraft',
    ano: 2025,
  },
  {
    id: 8,
    nome: 'Minecraft',
    ano: 2025,
  },
  {
    id: 9,
    nome: 'Minecraft',
    ano: 2025,
  },
  {
    id: 10,
    nome: 'Minecraft',
    ano: 2025,
  },
  {
    id: 11,
    nome: 'Minecraft',
    ano: 2025,
  },
];

export default function ListSkins() {

  const criaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listaItem} 
      onPress={() => 
        Alert.alert(
          'Sinopse', 
          item.sinopse, 
          [
            {
              text: 'Assistir trailer', 
              onPress: () => Linking.openURL(item.url), 
            },
            {
              text: 'Fechar', 
              style: 'cancel', 
            }
          ]
        )}
    >
      <Image source={item.imagem} style={styles.listaImagem} />

      <View style={styles.listaDetalhes}>
        
        <Text style={styles.textoForte}>Nome: <Text style={styles.textoNormal}>{item.nome}</Text></Text>
        <Text style={styles.textoForte}>Ano: <Text style={styles.textoNormal}>{item.ano}</Text></Text>
        <Text style={styles.textoForte}>Gênero: <Text style={styles.textoNormal}>{item.genero}</Text></Text>
      </View>

    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      <Text style={styles.titulo}>Loja de Skins</Text>

      <FlatList
        data={filmes} 
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
    width: 60,
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