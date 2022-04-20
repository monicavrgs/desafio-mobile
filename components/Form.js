import React, { useContext } from 'react';
import { StyleSheet, Pressable, Text, TextInput, View} from 'react-native';
import { AppContext } from '../context'

export default function Form() {
    const { produtos } = useContext(AppContext)
    const { dispatchProdutoEvent } = useContext(AppContext)
    const {listaIdsDeletados} = useContext(AppContext)
    const [produto, setProduto] = React.useState({
        nome: '',
        quantidade: '',
        valor: '',
        valorTotal: '',
        id: '',
        filtrado: true
    })

    function handleInput(valor, nome){
        setProduto({
            ...produto,
            [nome]: valor
        })
    }

    function handleSubmit(produto){
        let regexNumero = /[^0-9 | .,]+$/
        let regexLetra = /[^a-z | A-Z]/

        if(produto.nome == '' || produto.quantidade == '' || produto.valor == ''){
            alert('Todos os campos devem ser preenchidos.')
        }else if(regexNumero.test(produto.quantidade)){
            alert('Valor digitado no campo quantidade é inválido. Por favor, insira um número.')
        }else if(produto.quantidade % 1 !== 0){
            alert('Valor digitado no campo quantidade é inválido. Por favor, insira um valor inteiro')
        }else if(regexLetra.test(produto.nome)){
            alert('Valor digitado no campo nome é inválido. Por favor, insira um nome válido.')
        }else if(regexNumero.test(produto.valor)){
            alert('Valor digitado no campo preço é inválido. Por favor, insira um número.')
        }else if(produto.quantidade <= 0){
            alert('Quantidade em estoque inválida. Por favor, informe um número maior que zero.')
        }else{
            produto.quantidade = produto.quantidade.replace(',', '.')
            produto.valor = produto.valor.replace(',', '.')

            if(listaIdsDeletados.length == 0){
                produto.id = produtos.length + 1
            }else{
                produto.id = listaIdsDeletados[0]
            }
            produto.valorTotal = produto.quantidade * produto.valor
            produto.valorTotal = produto.valorTotal.toFixed(2)
            produto.filtrado = true

            dispatchProdutoEvent('ADICIONAR_PRODUTO', {produto: produto, id: produto.id})

            setProduto({
                nome: '',
                quantidade: '',
                valor: '',
                valorTotal: '',
                id: '',
                filtrado: false
            })
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.titulo}>Criar novo produto</Text>

                <Text style={styles.label}>Nome do produto:</Text>
                <TextInput placeholder='Nome'  onChangeText={value => handleInput(value, 'nome')} style={styles.input} value={produto.nome}/>

                <Text style={styles.label}>Quantidade em estoque:</Text>
                <TextInput placeholder='Quantidade' keyboardType="numeric" onChangeText={value => handleInput(value, 'quantidade')} style={styles.input} value={produto.quantidade}/>

                <Text style={styles.label}>Preço do produto:</Text>
                <TextInput placeholder='Preço' keyboardType="numeric" onChangeText={value => handleInput(value, 'valor')} style={styles.input} value={produto.valor}/>        

                <Pressable onPress={() => handleSubmit(produto)} style={styles.botao}>
                    <Text style={styles.textoBotao}>Submit</Text>
                </Pressable>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    titulo: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFF',
        alignSelf: 'center',
        marginBottom: 10
    },
    form: {
        alignSelf: 'center',
    },
    input: {
        backgroundColor: 'white',
        padding: 5,
        marginBottom: 15,
        borderRadius: 5
    },
    label: {
        color: '#FFF',
        marginVertical: 5,
        fontSize: 20
    },
    botao: {
        padding: 20,
        marginTop: 20,
        marginBottom: 30,
        alignItems: 'center',
        width: 300,
        backgroundColor: '#FFF',
        borderRadius: 5,
    }, 
    textoBotao: {
        color: 'pink',
        fontWeight: 'bold',
        fontSize: 20
    }
})