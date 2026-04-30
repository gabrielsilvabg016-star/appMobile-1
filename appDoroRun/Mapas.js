/*import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

export default function Mapas() {

  const [regiao, setRegiao] = useState({
    latitude: -31.33205710251284,
    longitude: -54.07182959673741,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });
  return (
    <View style={styles.container}>
      <MapView
      style={styles.mapa}
        region={regiao}
        onRegionChangeComplete={(novaRegiao) =>
          setRegiao(novaRegiao)}
      >
        <Marker
          coordinate={{latitude: -31.33205710251284,
            longitude: -54.07182959673741}}
            title="Ifsul campus Bagé"
            description="Um lugar para aprender legal"
        />
      </MapView>
      <View style={styles.header}>
        <Text style={styles.textoHeader}>Meu Primeiro Mapa </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  mapa: {
    width: '100%',
    height: '100%',
  },
  header: {
    position: 'absolute', 
    top: 50,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    elevation: 5, 
  },
  textoHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});*/