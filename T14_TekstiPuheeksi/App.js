import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import SegmentedControl from '@react-native-segmented-control/segmented-control';


export default function App() {

  const [word, setWord] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const speak = () => {

    let language = null;
    if (selectedIndex === 0) {
      language = "en-US"
    };
    if (selectedIndex === 1) {
      language = "fi-FI"
    };
    if (selectedIndex === 2) {
      language = "sv-SE"
    };

    if (language != null && word.length > 0) {
      Speech.speak(word, { language: language });
    }
    else {
      Alert.alert("Give word and select language")
    }
  };


  return (
    <View style={styles.container}>
      <SegmentedControl
        style={styles.selections}
        values={['English', 'Finnish', 'Swedish']}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder='Type something here...'
        onChangeText={text => setWord(text)}
        value={word}
      />
      <View style={styles.button}>
        <Button title="Say it" onPress={speak} />
      </View>
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
  selections: {
    width: '80%',
    marginBottom: 20,
  },
  button: {
    width: 60,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginVertical: 12,
  },
});
