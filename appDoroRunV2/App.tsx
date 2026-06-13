import { StyleSheet, Text, View } from 'react-native';
import { PlayerProvider } from './PlayerContext';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';

import { play } from './MusicController';
import NavController from './NavController';

export default function App(){
    useEffect(() => {
        play();
    }, []);

    return(
        <View style={{ flex: 1}}>
            <NavigationContainer>
                <PlayerProvider>
                    <NavController/>
                </PlayerProvider>
            </NavigationContainer>
        </View>
    )
}