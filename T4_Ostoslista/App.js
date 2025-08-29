import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, } from 'react-native';

export default function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  const add = () => {
    setList([...list, { key: text }]);
    setText("");
  };

  const clear = () => {
    setList([]);
    setText("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textBox}
        placeholder='Enter some text'
        onChangeText={text => setText(text)}
        value={text}
      />
      <View style={styles.buttons}>
        <Button onPress={add} title="Add" />
        <Button onPress={clear} title="Clear" />
      </View>
      <Text>Shopping List</Text>
      <FlatList style={styles.list}
        data={list}
        renderItem={({ item }) => <Text>{item.key}</Text>}
        ListEmptyComponent={<Text>List empty</Text>}
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
  },
  textBox: {
    marginTop: 100,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  list: {

  },
});
