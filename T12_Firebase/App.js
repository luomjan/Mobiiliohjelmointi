import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { app } from './firebaseConfig';
import { getDatabase, ref, push, onValue, remove } from "firebase/database";

const database = getDatabase(app);

export default function App() {

  const [product, setProduct] = useState({
    title: '',
    amount: ''
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemsArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setItems(itemsArray);
      } else {
        setItems([]);
      }
    });
  }, []);

  const handleSave = () => {
    if (product.amount && product.title) {
      push(ref(database, 'items/'), product);
      setProduct({ title: '', amount: '' });
    }
    else {
      Alert.alert('Error', 'Type product and amount first');
    }
  }

  const deleteItem = (id) => {
    remove(ref(database, 'items/' + id));
  };


  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Product title'
        onChangeText={text => setProduct({ ...product, title: text })}
        value={product.title}
        style={styles.input} />
      <TextInput
        placeholder='Amount'
        onChangeText={text => setProduct({ ...product, amount: text })}
        value={product.amount}
        style={styles.input} />
      <Button onPress={handleSave} title="Save" />

      <FlatList
        ListHeaderComponent={
          <Text style={styles.header}>Shopping list</Text>
        }
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <View style={styles.listcontainer}>
            <Text style={styles.itemText}>{item.title}, {item.amount}</Text>
            <Text
              style={styles.deleteText}
              onPress={() => deleteItem(item.id)}
            >
              delete
            </Text>
          </View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 220,
    height: 40,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,

  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
  },
  listcontainer: {
    flexDirection: 'row',
    fontSize: 20,
    justifyContent: 'space-between',
    width: 150,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 16,
  },
  deleteText: {
    color: '#2f00ffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
