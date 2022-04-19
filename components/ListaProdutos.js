import React, {useContext} from 'react';
import { StyleSheet, Pressable, Text, TextInput, View, FlatList, ScrollView} from 'react-native';
import { AppContext } from '../context'

export default function listaProdutos(){
    const { produtos } = useContext(AppContext)
    const { dispatchProdutoEvent } = useContext(AppContext)
    const {listaIdsDeletados} = useContext(AppContext)
    function deletarItem(id){
        dispatchProdutoEvent('REMOVER_PRODUTO', {produtoId: id})
        console.log(listaIdsDeletados)
    }

    function atualizarQuantidade(id, acao){
        let index = produtos.findIndex(item => item.id == id)
        if(acao == 'soma'){
            produtos[index].quantidade = +produtos[index].quantidade + 1
            produtos[index].valorTotal = (produtos[index].quantidade * +produtos[index].valor).toFixed(2)
            dispatchProdutoEvent('ATUALIZAR_PRODUTO', '')
        }else if(acao =='subtracao'){
            produtos[index].quantidade -= 1
            produtos[index].valorTotal = produtos[index].quantidade * produtos[index].valor
            dispatchProdutoEvent('ATUALIZAR_PRODUTO', '')
            if(produtos[index].quantidade == 0){
                dispatchProdutoEvent('REMOVER_PRODUTO', {produtoId: id}) 
            }
        }
    }

    function ordenarLista(atributo){
        dispatchProdutoEvent('ORDENAR_PRODUTOS', {atributo: atributo})
    }

    const Item = ({ nome, quantidade, valor, valorTotal, id, filtrado }) => (
        <View filtrado={filtrado} style={[styles.item, filtrado ? {display: 'flex'} : {display: 'none'}]}>
            <Pressable style={styles.botaoItem} onPress={() => deletarItem(id)}><Text style={styles.botaoItemTexto}>Excluir</Text></Pressable>
          <Text style={styles.textoItem}>Nome do produto: {nome}</Text>
          
          <View style={styles.quantidadeContainer}>
                <Pressable id={id} style={styles.botaoQuantidade} onPress={() => atualizarQuantidade(id, 'soma')}><Text style={styles.botaoQuantidadeTexto}>+</Text></Pressable>

                <Text  style={[styles.textoItem, styles.textoQuantidade]}>Quantidade: {quantidade}</Text>

                <Pressable id={id} style={styles.botaoQuantidade} onPress={() => atualizarQuantidade(id, 'subtracao')}><Text style={styles.botaoQuantidadeTexto}>-</Text></Pressable>
          </View>

          <Text  style={styles.textoItem}>Preço: {valor}</Text>
          <Text  style={styles.textoItem}>Valor total: {valorTotal}</Text>
          <Text style={styles.textoItem}>Id: {id}</Text>
        </View>
      );
     
    const Titulo = () => {
        return(
            <View style={styles.tituloContainer}><Text style={styles.textoTitulo}>Produtos</Text></View>
        )
    }  

    const renderItem = ({ item }) => (
        <Item filtrado={item.filtrado} nome={item.nome} valor={item.valor} quantidade={item.quantidade} valorTotal = {item.valorTotal} id={item.id}/>
    );

    return(
        <>
        <View style={styles.cabecalho}>
                <Pressable onPress={() => ordenarLista('nome')} style={styles.itemCabecalho}>
                    <Text style={styles.textoItemCabecalho}>
                        Nome
                    </Text>
                </Pressable>
                <Pressable onPress={() => ordenarLista('quantidade')} style={styles.itemCabecalho}>
                    <Text style={styles.textoItemCabecalho}>
                        Quantidade
                    </Text>
                </Pressable>
                <Pressable onPress={() => ordenarLista('valor')} style={styles.itemCabecalho}>
                    <Text style={styles.textoItemCabecalho}>
                        Valor do produto
                    </Text>
                </Pressable>
                <Pressable onPress={() => ordenarLista('valorTotal')} style={styles.itemCabecalho}>
                    <Text style={styles.textoItemCabecalho}>
                        Valor Total
                    </Text>
                </Pressable>
            </View>

            <FlatList
            data={produtos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id} 
            ListHeaderComponent={Titulo}
            style={styles.listaProdutos}
            />
        </>
    )
}

const styles = StyleSheet.create({
    cabecalho: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    itemCabecalho: {
        backgroundColor: '#FFF',
        marginRight: 10,
        marginTop: 15,
        padding: 10,
        borderRadius: 5
    },
    textoItemCabecalho: {
        color: "pink",
        fontSize: 16
    },
    listaProdutos: {
        marginBottom: 20,
        alignSelf: 'center'
    },
    textoTitulo: {
        color: '#FFF',
        marginTop: 20,
        fontSize: 25,
        alignSelf: 'center'
    },
    item: {
        backgroundColor: '#FFF',
        margin: 10,
        color: 'pink',
        borderRadius: 5,
        padding: 15,
        width: 300,
        textAlign: 'center',
        alignItems: 'flex-start'
    },
    textoItem: {
        color: 'pink',
        marginTop: 8,
        fontSize: 22
    },
    botaoItem: {
        alignSelf: 'flex-end',
        backgroundColor: 'pink',
        color: "#FFF",
        borderRadius: 5,
        padding: 8,
    },
    botaoItemTexto: {
        color: "#FFF",
        fontSize: 16,
        letterSpacing: 1.3
    },
    quantidadeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textoQuantidade: {
        marginHorizontal: 10
    },
    botaoQuantidade: {
        backgroundColor: 'pink',
        paddingHorizontal: 6,
        paddingVertical: 3,
        marginTop: 5,
        borderRadius: 5,
    },
    botaoQuantidadeTexto: {
        color: "#FFF",
        // fontSize: 18,
        fontWeight: 'bold'
    }
})