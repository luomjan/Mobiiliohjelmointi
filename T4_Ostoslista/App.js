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
        onChangeText={text => setText(text)}
        value={text}
      />
      <View style={styles.buttons}>
        <Button onPress={add} title="Add" />
        <Button onPress={clear} title="Clear" />
      </View>

      <FlatList
        data={list}
        renderItem={({ item }) => <Text>{item.key}</Text>}
        ListEmptyComponent={<Text>List empty</Text>}
        ListHeaderComponent={() => (
          <Text style={styles.header}>
            Shopping List
          </Text>
        )}
        contentContainerStyle={styles.list}
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
    borderWidth: 1,
    width: '50%'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '50%',
    marginTop: 20,
  },
  list: {
    alignItems: 'center',
  },
  header: {
    color: "blue",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
});
