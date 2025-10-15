import { StyleSheet, Text, View, TextInput, Alert, FlatList } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { EXPO_PUBLIC_API_KEY } from "@env";
import { Button, Card, Icon } from '@rneui/themed';
import { ListItem } from '@rneui/themed'
import { app } from './firebaseConfig';
import { getDatabase, ref, push, onValue, remove } from "firebase/database";

const database = getDatabase(app);

export default function Places({ navigation }) {

  const initial = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  }

  const [text, setText] = useState("");
  const [coords, setCoords] = useState(initial);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, 'places/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemsArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setPlaces(itemsArray);
      } else {
        setPlaces([]);
      }
    });
  }, []);


  const savePlaceToFirebase = (place) => {
    push(ref(database, 'places/'), place);
  };


  const deletePlace = (id) => {
    remove(ref(database, 'places/' + id));
  };



  const fetchCoordinates = (text) => {
    const KEY = process.env.EXPO_PUBLIC_API_KEY;
    const url = `https://geocode.maps.co/search?q=${text}&api_key=${KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon); //KESKEN 

        const newCoords = { ...coords, latitude: lat, longitude: lng };
        setCoords(newCoords);

        navigation.navigate('Map', {
          coords: newCoords,
          text: text,
          onSavePlace: (place) => {  //Tämä on funkio, jota voidaan käyttää toiselta sivulta
            savePlaceToFirebase(place);
            setText("");
          },
        });
      })


  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Type in address'
        onChangeText={text => setText(text)}
        value={text}
      />
      <Button
        icon={<Icon name="search" type="material" color="#2089dc" />}
        title="Show"
        onPress={() => fetchCoordinates(text)}
        containerStyle={{
          width: 300,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        type="outline"
      />
      <FlatList
        data={places}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ListItem
            bottomDivider
            containerStyle={{ borderRadius: 10, marginVertical: 5 }}
            onLongPress={() => {
              Alert.alert(
                'Delete place',
                `Do you want to delete "${item.text}"?`,
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', style: 'destructive', onPress: () => deletePlace(item.id) },
                ]
              );
            }} //luotu chatGPT avulla
          >


            <ListItem.Content>
              <ListItem.Title style={{ fontWeight: '600', fontSize: 14 }}>
                {item.text}
              </ListItem.Title>
            </ListItem.Content>

            <Button
              title="Show on map"
              type="clear"
              size="sm"
              onPress={() =>
                navigation.navigate('Map', {
                  coords: item.coords,
                  text: item.text,
                })
              }
            />
          </ListItem>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});