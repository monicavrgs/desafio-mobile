// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, StatusBar, Text, View, ScrollView, SafeAreaView } from 'react-native';
import Busca from './components/Busca'
import Form from './components/Form'
import ListaProdutos from './components/ListaProdutos';
import React from 'react';
import { AppContext } from './context';

export default function App() {

  const [produtos, setListaProdutos] = React.useState([])
  const [listaIdsDeletados, setListaIdsDeletados] = React.useState([])
  const dispatchProdutoEvent = (tipoAcao, valor) => {
    switch(tipoAcao){
      case 'ADICIONAR_PRODUTO':
        setListaProdutos([valor.produto, ...produtos])
        setListaIdsDeletados(listaIdsDeletados.filter( id => id != valor.produto.id))
        return
      case 'REMOVER_PRODUTO':
        setListaProdutos(produtos.filter( produto => produto.id !== valor.produtoId))
        setListaIdsDeletados([...listaIdsDeletados, valor.produtoId])
        return
      case 'ATUALIZAR_PRODUTO':
        setListaProdutos(produtos.slice())
        return
      case 'ORDENAR_PRODUTOS':
        switch(valor.atributo){
          case 'nome':
              setListaProdutos(produtos.sort((a, b) => a.nome > b.nome ? 1 : -1).slice())
              return
          case 'quantidade':
              setListaProdutos(produtos.sort((a, b) => a.quantidade > b.quantidade ? 1 : -1).slice())
              return
          case 'valor':
              setListaProdutos(produtos.sort((a, b) => a.valor > b.valor ? 1 : -1).slice())
              return
          case 'valorTotal':
              setListaProdutos(produtos.sort((a, b) => a.valorTotal > b.valorTotal ? 1 : -1).slice())
              return
      }
    }
  }

  return (
        // <SafeAreaView   styles={styles.statusBar}>
          <ScrollView style={styles.container}>

            <StatusBar  style={{backgroundColor: 'pink'}}/>
            <AppContext.Provider value ={{produtos, dispatchProdutoEvent, listaIdsDeletados}}>
              <Busca/>
              <Form />
              <ListaProdutos />
            </AppContext.Provider>
          </ScrollView>

        // </SafeAreaView>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },

  statusBar: {
    backgroundColor: 'pink'
  }
});
