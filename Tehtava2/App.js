import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [counter, setCounter] = useState(0);
  const [random, setRandom] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [text, setText] = useState("Guess a number between 1-100");

  const compare = () => {
    const numGuess = parseFloat(guess);
    setCounter(counter + 1);

    if (numGuess === random) {
      Alert.alert(
        "You guessed the number in " + (counter + 1) + " guesses",
      );

    }
    else if (numGuess > random) {
      setText("Your guess " + guess + " is too high");
    }
    else {
      setText("Your guess " + guess + " is too low");
    }
  };


  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput
        style={styles.nums}
        placeholder=''
        keyboardType="numeric"
        onChangeText={guess => setGuess(guess)}
        value={guess}
      />
      <View style={styles.button}>
        <Button onPress={compare} title="MAKE GUESS" />
      </View>
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
  nums: {
    marginTop: 15,
    borderWidth: 1,
    width: 200,
  },
  button: {
    marginTop: 15,
  },
});
