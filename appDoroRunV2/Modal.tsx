import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet
} from 'react-native';

type Props = {
    visible: boolean;
    score: number;
    onRestart: () => void;
    onSave: () => void;
};

//a ideia e fazer todos os modais aqui dentro, ai so exportar eles
export default function Modal({
    visible,
    score,
    onRestart,
    onSave
}: Props) {
    if(!visible) return null;

    return(
        <View style={styles.overlay}>
            <View style={styles.modal}>
                <Text style={styles.title}>GAME OVER</Text>
                <Text style={styles.score}>Pontuação: {score}</Text>
                <Pressable style={styles.button} onPress={onRestart}>
                    <Text>Recomeçar</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={onSave}>
                    <Text>Salvar Pontuação</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

  overlay:{
    position:'absolute',
    width:'100%',
    height:'100%',
    backgroundColor:'rgba(0,0,0,0.6)',
    justifyContent:'center',
    alignItems:'center',
    zIndex:100,
  },


  modal:{
    width:300,
    padding:30,
    backgroundColor:'white',
    borderRadius:30,
    alignItems:'center',
  },


  title:{
    fontSize:32,
    fontWeight:'bold',
    color: '#ffb6c1',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },


  score:{
    fontSize:20,
    marginVertical:20,
  },


  button:{
    width:'100%',
    padding:15,
    backgroundColor:'#ddd',
    marginTop:10,
    alignItems:'center',
    borderRadius:10,
  }

});