import React from 'react';
import BottomTabs from './BottomTabs';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Ranking from '../appDoroRunV2/screens/Ranking';
//import Musica from '../appDoroRunV2/screens/Musica';

const Drawer = createDrawerNavigator();

export default function NavController(): React.JSX.Element {
  return (
    <Drawer.Navigator
      screenOptions={{
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
            }}
          >
            DoroRun
          </Text>
        ),
        headerTitleAlign: 'center',
      }}
    >
      <Drawer.Screen name="Home" component={BottomTabs} />
      <Drawer.Screen name="Ranking" component={Ranking} />
    </Drawer.Navigator>
  );
}