import React from "react";
import BottomTabs from "./BottomTabs";
import Creditos from "./screens/Creditos"
import { Text } from "react-native-web";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Musica from "./screens/Musica";

const Drawer = createDrawerNavigator();

export default function NavController(){
    return(
            <Drawer.Navigator screenOptions={{
                headerTitle: () => (
                    <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '900',
                        color: '#FFB6C1',
                        textShadowColor: '#000',
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 2,
                        textAlign: 'center',
                    }}>
                        DoroRun
                    </Text>
                ),
                headerTitleAlign: 'center'
            }}>
                <Drawer.Screen name="Home" component={BottomTabs}/>
                <Drawer.Screen name="Creditos" component={Creditos}/>
                <Drawer.Screen name="Musica" component={Musica}/>
            </Drawer.Navigator>
    );
}