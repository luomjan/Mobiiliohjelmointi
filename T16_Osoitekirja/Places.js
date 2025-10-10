import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { EXPO_PUBLIC_API_KEY } from "@env";

export default function Places({ navigation }) {

  const initial = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  }

  const [text, setText] = useState("");
  const [coords, setCoords] = useState(initial);
  const [error, setError] = useState(null);

  const fetchCoordinates = (text) => {
    const KEY = process.env.EXPO_PUBLIC_API_KEY;
    const url = `https://geocode.maps.co/search?q=${text}&api_key=${KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon); //KESKEN 

        setCoords({ ...coords, latitude: lat, longitude: lng })

      })

    //Lopuksi
    navigation.navigate('Map', { coords })
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Type in address'
        onChangeText={text => setText(text)}
        value={text}
      />
      <Button
        title="Show"
        onPress={() => fetchCoordinates(text)}
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
  },
});