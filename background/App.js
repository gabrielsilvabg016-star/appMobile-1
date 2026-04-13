import { StyleSheet, Text, View } from 'react-native';
import BottomTabs from './BottomTabs';
import NavDrawer from './NavDrawer';
//concertar o navDrawer depois, esta ocupando a tela inteira, talvez fazer um unico arquivo que armazena tabs e drawer?//
export default function App(){
    return(
        <View style={{ flex: 1}}>
            <BottomTabs style = {{bottom: 5}}/>
        </View>
    )
}