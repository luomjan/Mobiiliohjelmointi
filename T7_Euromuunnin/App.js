import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Image, } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { API_KEY } from "@env";


export default function App() {

  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("EUR");
  const [result, setResult] = useState("");
  const [currencies, setCurrencies] = useState([]);

  const myHeaders = new Headers();
  myHeaders.append("apikey", API_KEY);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions);

        if (!response.ok) {
          const text = await response.text();
          throw new Error("Failed to fetch currencies: " + text);
        }
        const data = await response.json();

        if (!data.symbols) {
          throw new Error("Symbols not found in API response");
        }
        setCurrencies(Object.keys(data.symbols));
      }
      catch (err) {
        console.error(err);
      }
    };

    fetchCurrencies();
  }, []);

  const buttonPressed = () => {

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
      .then(response => {
        if (!response.ok)
          throw new Error("Error in fetch:" + response.statusText);

        return response.json()
      })
      .then(data => setResult(data.result))
      .catch(err => console.error(err));


  };
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 100, height: 100 }}
        source={{ uri: "https://cdn.pixabay.com/photo/2013/07/13/01/21/euro-155597_960_720.png" }}
      />

      {result !== "" && (
        <Text style={{ fontSize: 18, marginTop: 20 }}>
          {Number(result).toFixed(2)} €
        </Text>
      )}
      <View style={styles.side}>
        <TextInput
          placeholder="Enter amount"
          keyboardType="numeric"
          onChangeText={text => setAmount(text)}
          value={amount}
          style={styles.amount}
        />

        {currencies.length === 0 ? (
          <Text>Loading currencies...</Text>
        ) : (
          <Picker
            selectedValue={from}
            onValueChange={(itemValue) => setFrom(itemValue)}
            style={styles.picker}
          >
            {currencies.map(code => (
              <Picker.Item key={code} label={code} value={code} />
            ))}
          </Picker>
        )}
      </View>

      <View style={{ width: 100 }}>
        <Button
          onPress={buttonPressed}
          title="Convert"
          disabled={!amount || !from} />
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
  picker: {
    width: 120,
    height: 50,
    marginLeft: 10,
  },
  side: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  amount: {
    fontSize: 16,
    width: 140,
  },
});
