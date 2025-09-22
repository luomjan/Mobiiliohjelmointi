import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';

const db = SQLite.openDatabaseSync('productdb');

export default function App() {

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [list, setList] = useState([]);

  const initialize = async () => {
    try {
      await db.execAsync(`
      CREATE TABLE IF NOT EXISTS item (id INTEGER PRIMARY KEY NOT NULL, product TEXT, amount TEXT);
    `);
      updateList();
    } catch (error) {
      console.error('Could not open database', error);
    }
  }

  useEffect(() => { initialize() }, []);

  const saveItem = async () => {
    try {
      await db.runAsync('INSERT INTO item (product, amount) VALUES (?, ?)', product, amount);
      updateList();
    } catch (error) {
      console.error('Could not add item', error);
    }
  };

  const updateList = async () => {
    try {
      const list = await db.getAllAsync('SELECT * from item');
      setList(list);
    } catch (error) {
      console.error('Could not get items', error);
    }
  }

  const deleteItem = async (id) => {
    try {
      await db.runAsync('DELETE FROM item WHERE id=?', id);
      await updateList();
    }
    catch (error) {
      console.error('Could not delete item', error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Product'
        onChangeText={product => setProduct(product)}
        value={product} />
      <TextInput
        placeholder='Amount'
        onChangeText={amount => setAmount(amount)}
        value={amount} />

      <Button onPress={saveItem} title="Save" />

      <FlatList
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
          <View style={{
            flex: 1, flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text>{item.product}</Text>
            <Text>{item.amount} </Text>
            <Text style={{ color: '#2f00ffff' }} onPress={() => deleteItem(item.id)}>Bought</Text>
          </View>
        }
        data={list}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
});
