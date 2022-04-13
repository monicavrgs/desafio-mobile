import React from 'react';
import { StyleSheet, Pressable, Text, TextInput, View, FlatList, ScrollView} from 'react-native';


export default function Form() {
    const [listaProdutos, setListaProdutos] = React.useState([
        // {
        //     nome: 'Linha',
        //     quantidade: 10,
        //     preco: 19.99,
        //     id: 1,
        //     valorTotal: 199.9
        // },
        // {
        //     nome: 'Agulha',
        //     quantidade: 22,
        //     preco: 8,
        //     id: 2,
        //     valorTotal: 176
        // },
        // {
        //     nome: 'Marcador de ponto',
        //     quantidade: 150,
        //     preco: 2,
        //     id: 3,
        //     valorTotal: 300
        // },
        // {
        //     nome: 'Dedal',
        //     quantidade: 26,
        //     preco: 4,
        //     id: 4,
        //     valorTotal: 104
        // }
    ])
    const [produto, setProduto] = React.useState({
        nome: '',
        quantidade: '',
        valor: '',
        valorTotal: '',
        id: ''
    })

    function handleInput(valor, nome){
        setProduto({
            ...produto,
            [nome]: valor
        })
    }

    function handleSubmit(produto){
        let numberRegex = /[^0-9 | .,]+$/
        let letterRegex = /[^a-z | A-Z]/

        if(produto.nome == '' || produto.quantidade == '' || produto.valor == ''){
            alert('Todos os campos devem ser preenchidos.')
        }else if(numberRegex.test(produto.quantidade)){
            alert('Valor digitado no campo quantidade é inválido. Por favor, insira um número.')
        // }else if(letterRegex.test(produto.nome)){
        //     alert('Valor digitado no campo nome é inválido. Por favor, insira um nome válido.')
        }else if(numberRegex.test(produto.valor)){
            alert('Valor digitado no campo preço é inválido. Por favor, insira um número.')
        }else if(produto.quantidade <= 0){
            alert('Quantidade em estoque inválida. Por favor, informe um número maior que zero.')
        }else{
            produto.id = listaProdutos.length + 1
            produto.valorTotal = produto.quantidade * produto.valor
            setListaProdutos([
                produto,
                ...listaProdutos
                ]
            )
            setProduto({
                nome: '',
                quantidade: '',
                valor: '',
                valorTotal: '',
                id: ''
            })
        }
    }

    function deleteItem(id){
        setListaProdutos(listaProdutos.filter(item => item.id !== id))
    }

    function changeAmount(id, action){
        let index = listaProdutos.findIndex(item => item.id == id)
        if(action == 'sum'){
            listaProdutos[index].quantidade += 1
            listaProdutos[index].valorTotal = listaProdutos[index].quantidade * listaProdutos[index].valor
            setListaProdutos(listaProdutos.slice())
        }else if(action =='decrease'){
            listaProdutos[index].quantidade -= 1
            listaProdutos[index].valorTotal = listaProdutos[index].quantidade * listaProdutos[index].valor
            setListaProdutos(listaProdutos.slice())

            if(listaProdutos[index].quantidade == 0){
                setListaProdutos(listaProdutos.filter((item) => item.id != id))
            }
        }
    }

    function orderList(atributo){
        atributo = atributo
        switch(atributo){
            case 'nome':
                setListaProdutos(listaProdutos.sort((a, b) => a.nome > b.nome ? 1 : -1).slice())
                break
            case 'quantidade':
                setListaProdutos(listaProdutos.sort((a, b) => a.quantidade > b.quantidade ? 1 : -1).slice())
                break
            case 'valor':
                setListaProdutos(listaProdutos.sort((a, b) => a.valor > b.valor ? 1 : -1).slice())
                break
            case 'valorTotal':
                setListaProdutos(listaProdutos.sort((a, b) => a.valorTotal > b.valorTotal ? 1 : -1).slice())
                break
        }
    }

    const Item = ({ nome, quantidade, valor, valorTotal, id }) => (
        <View style={styles.item}>
            <Pressable style={styles.itemButton} onPress={() => deleteItem(id)}><Text>Excluir</Text></Pressable>
          <Text style={styles.itemText}>Nome do produto: {nome}</Text>
          
          <View style={styles.itemAmountContainer}>
                <Pressable id={id} style={styles.itemAmountButton} onPress={() => changeAmount(id, 'sum')}><Text >+</Text></Pressable>

                <Text  style={styles.itemText}>Quantidade: {quantidade}</Text>

                <Pressable id={id} style={styles.itemAmountButton} onPress={() => changeAmount(id, 'decrease')}><Text>-</Text></Pressable>
          </View>

          <Text  style={styles.itemText}>Preço: {valor}</Text>
          <Text  style={styles.itemText}>Valor total: {valorTotal}</Text>
        </View>
      );
     
    const headerLista = () => {
        return(
            <View style={styles.headerLista}><Text style={styles.headerListaTexto}>Produtos</Text></View>
        )
    }  

    const renderItem = ({ item }) => (
        <Item nome={item.nome} valor={item.valor} quantidade={item.quantidade} valorTotal = {item.valorTotal} id={item.id}/>
      );

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Criar novo produto</Text>

                <Text style={styles.text}>Nome do produto:</Text>
                <TextInput placeholder='Nome'  onChangeText={value => handleInput(value, 'nome')} style={styles.input} value={produto.nome}/>

                <Text style={styles.text}>Quantidade em estoque:</Text>
                <TextInput placeholder='Quantidade' keyboardType="numeric" onChangeText={value => handleInput(value, 'quantidade')} style={styles.input} value={produto.quantidade}/>

                <Text style={styles.text}>Preço do produto:</Text>
                <TextInput placeholder='Preço' keyboardType="numeric" onChangeText={value => handleInput(value, 'valor')} style={styles.input} value={produto.valor}/>        

                <Pressable onPress={() => handleSubmit(produto)} style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
            </View>

            <View style={styles.listHeader}>
                <Pressable onPress={() => orderList('nome')} style={styles.listHeaderItem}>
                    <Text style={styles.listHeaderItemText}>
                        Nome
                    </Text>
                </Pressable>
                <Pressable onPress={() => orderList('quantidade')} style={styles.listHeaderItem}>
                    <Text style={styles.listHeaderItemText}>
                        Quantidade
                    </Text>
                </Pressable>
                <Pressable onPress={() => orderList('valor')} style={styles.listHeaderItem}>
                    <Text style={styles.listHeaderItemText}>
                        Valor do produto
                    </Text>
                </Pressable>
                <Pressable onPress={() => orderList('valorTotal')} style={styles.listHeaderItem}>
                    <Text style={styles.listHeaderItemText}>
                        Valor Total
                    </Text>
                </Pressable>
            </View>

            <FlatList
            data={listaProdutos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id} 
            ListHeaderComponent={headerLista}
            style={styles.listaProdutos}
            />
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink',
        alignSelf: 'stretch',
        alignItems: 'center',
        marginTop: 20
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 15,
        color: '#FFF',
        alignSelf: 'center'
    },
    form: {
        alignSelf: 'center',
        marginVertical: 'auto'
    },
    input: {
        backgroundColor: 'white',
        width: 300,
        padding: 5,
        marginBottom: 15,
        borderRadius: 5
    },
    text: {
        color: '#FFF',
        margin: 10,
        fontSize: 20
    },
    button: {
        padding: 20,
        marginTop: 20,
        marginBottom: 30,
        alignItems: 'center',
        width: 300,
        backgroundColor: '#FFF',
        borderRadius: 5,
    }, 
    buttonText: {
        color: 'pink',
        fontWeight: 'bold',
        fontSize: 20
    },
    listHeader: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    listHeaderItem: {
        backgroundColor: '#FFF',
        marginRight: 10,
        marginTop: 10,
        padding: 10,
        borderRadius: 5
    },
    listHeaderItemText: {
        color: "pink",
        fontSize: 16
    },
    listaProdutos: {
        width: 320,
        marginBottom: 20,
        alignSelf: 'center'
    },
    item: {
        backgroundColor: "#FFF",
        margin: 10,
        color: 'pink',
        borderRadius: 5,
        padding: 15,
        width: 275,
        textAlign: 'center',
        alignItems: 'flex-start'
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    itemText: {
        color: 'pink',
        marginTop: 8,
        fontSize: 20
    },
    itemButton: {
        // fontFamily: '"Gill Sans", sans-serif',
        alignSelf: 'flex-end',
        backgroundColor: 'pink',
        color: "#FFF",
        borderRadius: 5,
        padding: 8,
        // marginLeft: 5
    },
    itemAmountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    itemAmountButton: {
        backgroundColor: 'pink',
        paddingHorizontal: 6,
        paddingVertical: 3,
        marginTop: 5,
        marginHorizontal: 8,
        borderRadius: 5,
    },
    headerListaTexto: {
        // fontFamily: '"Gill Sans", sans-serif',
        color: '#FFF',
        marginTop: 20,
        fontSize: 25,
        alignSelf: 'center'
    },
    closedForm: {
        display: 'none'
    },
    openedForm: {
        display: 'flex'
    }
})