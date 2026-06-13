import React from 'react'; 
import { Button, StyleSheet, Text, View } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

function Inicial({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Tela de Início</Text>
     
      <Button 
        title="Fazer Pedido" 
        onPress={() => navigation.navigate('Pedido')} 
      />
    </View>
  );
}


function Pedido({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Tela de Pedido</Text>
     
      <Button onPress={() => navigation.goBack()} title="Voltar" />
    </View>
  );
}


export default function NavDrawer() {
  return (
    
    <NavigationContainer>
      
     
      <Drawer.Navigator 
        initialRouteName="Tela Inicial" 
        screenOptions={{
        
          drawerStyle: {
            backgroundColor: "#bdd6ff",
            width: "60%"
          },
        
          drawerActiveTintColor: "white", 
          drawerActiveBackgroundColor: "gray", 
          drawerInactiveTintColor: "black", 
        }}
      >
        
     
        <Drawer.Screen 
          name="Tela Inicial" 
          component={Inicial} 
          options={{
            drawerLabel: "Página do Começo", 
            headerShown: true,
            
          
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            
          
            headerTintColor: "red", 
            headerStyle: { backgroundColor: "black" } 
          }}
        />        

        
        <Drawer.Screen 
          name="Pedido" 
          component={Pedido} 
          options={{
           
            drawerIcon: ({ color, size }) => (
              <Ionicons name="cart" size={size} color={color} />
            )
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    alignItens: 'center', 
    justifyContent: 'center', 
  },
});