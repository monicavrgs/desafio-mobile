// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, StatusBar, Text, View, ScrollView, SafeAreaView } from 'react-native';
import Header from './components/Header'
import Form from './components/Form'
export default function App() {

  return (
        // <SafeAreaView   styles={styles.statusBar}>
          <ScrollView style={styles.container}>

            <StatusBar  style={{backgroundColor: 'pink'}}/>
            <Header></Header>
            <Form />
          </ScrollView>

        // </SafeAreaView>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    // alignItems: 'center',
  },
  text: {
    color: 'red',
  },

  statusBar: {
    backgroundColor: 'pink'
  }
});
