import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [eka, setEka] = useState("");
  const [toka, setToka] = useState("");
  const [result, setResult] = useState(null);

  const buttonPlus = () => {
    const sum = parseFloat(eka) + parseFloat(toka);
    setResult(sum);
  };

  const buttonMinus = () => {
    const minus = parseFloat(eka) - parseFloat(toka);
    setResult(minus);
  };

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <View>
        <TextInput
          style={styles.nums}
          placeholder='Give number'
          keyboardType="numeric"
          onChangeText={eka => setEka(eka)}
          value={eka}
        />
        <TextInput
          style={styles.nums}
          placeholder='Give number'
          keyboardType="numeric"
          onChangeText={toka => setToka(toka)}
          value={toka}
        />
      </View>
      <View style={styles.button}>
        <View style={styles.onebutton}>
          <Button onPress={buttonPlus} title="+" />
        </View>
        <View style={styles.onebutton}>
          <Button onPress={buttonMinus} title="-" />
        </View>
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
    padding: 20,
  },
  nums: {
    borderWidth: 1,
    width: 200,
  },
  button: {
    flexDirection: 'row',
    marginTop: 15,
  },
  onebutton: {
    marginHorizontal: 10,
    width: 35,
  }
});