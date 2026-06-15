import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons as Icon } from '@expo/vector-icons';

import Game from './screens/Game';
import Loja from './screens/Loja';
//import Musica from './screens/Musica';

const Tab = createBottomTabNavigator();

export default function BottomTabs(): React.JSX.Element {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            paddingBottom: 5,
            height: 65,
          },
          tabBarActiveTintColor: '#8A2BE2',
          tabBarActiveBackgroundColor: '#F8C8DC',
          tabBarInactiveTintColor: '#a0a0a0',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '900',
          },
        }}
      >
        <Tab.Screen
          name="Game"
          component={Game}
          options={{
            sceneContainerStyle: { backgroundColor: 'transparent' },//ignorar, ta funcionando;
            tabBarIcon: ({
              color,
              size,
            }: {
              color: string;
              size: number;
            }) => (
              <Icon
                name="game-controller-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Loja"
          component={Loja}
          options={{
            tabBarIcon: ({
              color,
              size,
            }: {
              color: string;
              size: number;
            }) => (
              <Icon name="cart-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>

      <StatusBar style="auto" />
    </View>
  );
}