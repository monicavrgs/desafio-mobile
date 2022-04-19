import React, {useContext, useState} from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { AppContext } from '../context'

export default function Busca() {
    const [texto, setTexto] = useState()
    const { produtos } = useContext(AppContext)
    const { dispatchProdutoEvent } = useContext(AppContext)
    
    function handleInput(texto){
        for(let i = 0; i < produtos.length; i++){
            if(!produtos[i].nome.includes(texto)){
                produtos[i].filtrado = false
                dispatchProdutoEvent('ATUALIZAR_PRODUTO', '')
            }else if(texto == ''){
                    produtos[i].filtrado = true
                    dispatchProdutoEvent('ATUALIZAR_PRODUTO', '')
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Desafio Mobile</Text>
            <TextInput placeholder='Pesquisa' value={texto} onChangeText={texto => handleInput(texto)} style={styles.input} />
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        // padding: 8,
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'white',
        width: 300,
        padding: 5,
        borderRadius: 5
    },
    titulo: {
        color: '#FFF',
        margin: 15,
        fontSize: 25,
        fontWeight: 'bold'
    }
})