import React from 'react';
import { StyleSheet, Text, Title, TextInput, View, ScrollView } from 'react-native';
import { listaProdutos } from './Form';

export default function Header() {
    const [text, setText] = React.useState()

    function handleInput(text){
        setText(text)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Desafio Mobile</Text>
            <TextInput placeholder='Pesquisa' value={text} onChangeText={text => handleInput(text)} style={styles.input} />
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: 'pink',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'white',
        width: 300,
        padding: 5,
        borderRadius: 5
    },
    text: {
        color: '#FFF',
        margin: 15,
        fontSize: 25,
        fontWeight: 'bold'
    }
})