import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Ionicons as Icon} from '@expo/vector-icons';

import Game from '../appDoroRunV2/screens/Game';
import Loja from '../appDoroRunV2/screens/Loja';
import Musica from '../appDoroRunV2/screens/Musica';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return(
        <View style={{flex:1}}>
            <Tab.Navigator screenOptions ={{
            headerShown: false,
            tabBarStyle: {paddingBottom: 5, height: 65,},
            tabBarActiveTintColor: "#8A2BE2",
            tabBarActiveBackgroundColor: "#F8C8DC",
            tabBarInactiveTintColor: "#a0a0a0",
            tabBarLabelStyle:{ fontSize: 12, fontWeight: '900', }
            }}>

            <Tab.Screen name="Game" component = {Game}
                options={{
                    sceneContainerStyle: {backgroundColor: 'transparent'},
                    tabBarIcon: ({color, size}) =>
                        <Icon name="game-controller-outline" size={size} color={color}/>
                }}/>

            <Tab.Screen name="Loja" component = {Loja}
                    options={{
                      tabBarIcon: ({color, size}) => 
                      <Icon name='cart-outline' size={size} color={color}/>
                }}/>
            </Tab.Navigator>
            <StatusBar style='auto'/>
        </View>
    )
}