import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import {
  PaperProvider, Appbar, TextInput, Button, List, Text, MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default function App() {
  const [text, setText] = useState('');
  const [list, setList] = useState([]);

  const add = () => {
    if (text.trim() === '') return;
    setList([...list, { key: text }]);
    setText('');
  };

  const clear = () => {
    setList([]);
    setText('');
  };

  return (
    <PaperProvider theme={theme}>
      <Appbar.Header elevated>
        <Appbar.Content title="Shopping list" />
      </Appbar.Header>

      <TextInput
        label="Add item"
        mode="outlined"
        style={styles.textBox}
        onChangeText={setText}
        value={text}
      />

      <View style={styles.buttons}>
        <Button mode="contained" onPress={add}>
          Add
        </Button>
        <Button mode="outlined" onPress={clear}>
          Clear
        </Button>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.key}
            left={(props) => <List.Icon {...props} icon="cart" />}
          />
        )}
        ListEmptyComponent={<Text>List empty</Text>}
        ListHeaderComponent={() => (
          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            Shopping List
          </Text>
        )}
        contentContainerStyle={styles.list}
      />

      <StatusBar style="auto" />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  textBox: {
    marginTop: 100,
    width: '80%',
    alignSelf: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
    alignSelf: 'center',
  },
  list: {
    alignItems: 'center',
  },
});
