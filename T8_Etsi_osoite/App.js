import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';
import { EXPO_PUBLIC_API_KEY } from "@env";

export default function App() {

  const [text, setText] = useState("");
  const [coords, setCoords] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  });
  const [error, setError] = useState(null);

  const buttonPressed = async () => {
    try {
      const trimmedAddress = text.trim().replace(/\s+/g, "+");

      const response = await fetch(
        `https://geocode.maps.co/search?q=${trimmedAddress}&api_key=${EXPO_PUBLIC_API_KEY}`);

      if (!response.ok) {
        const msg = await response.text();
        throw new Error("Failed to fetch coords: " + msg);
      }

      const json = await response.json();

      if (json && json.length > 0) {
        setCoords({
          latitude: parseFloat(json[0].lat),
          longitude: parseFloat(json[0].lon),
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        });
        setError(null);
      } else {
        setError("No results found.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>


      <TextInput
        placeholder='Enter some text'
        onChangeText={text => setText(text)}
        value={text}
      />

      <View style={{ width: 100 }}>
        <Button
          onPress={buttonPressed}
          title="Find"
        />
      </View>

      <MapView
        style={{ width: '100%', height: '80%' }}
        region={coords}
      >
        <Marker
          coordinate={coords}
        />
      </MapView>

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
});
