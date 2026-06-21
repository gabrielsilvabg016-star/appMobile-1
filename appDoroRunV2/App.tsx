import React, { useEffect } from 'react';
import { View } from 'react-native';
import { PlayerProvider } from './PlayerContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import { play } from './MusicController';
import NavController from './NavController';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

export default function App(): React.JSX.Element {
  useEffect(() => {
    play();
  }, []);

  return (
    
      <PlayerProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='App' component={NavController}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PlayerProvider>
    
  );
}