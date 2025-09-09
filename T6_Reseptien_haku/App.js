import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Image, ActivityIndicator } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const buttonPressed = () => {
    setLoading(true);

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`)
      .then(response => {
        if (!response.ok)
          throw new Error("Error in fetch:" + response.statusText);

        return response.json()
      })
      .then(data => setResults(data.meals))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));


  };

  return (
    <View style={styles.container}>

      <TextInput
        placeholder='Enter ingredient'
        onChangeText={text => setText(text)}
        value={text}
      />

      <View style={{width: 100}}>
        <Button onPress={buttonPressed} title="Find" />
      </View>

      {loading && <ActivityIndicator size="large" />}

      <FlatList
        data={results}
        keyExtractor={(item) => item.idMeal}
        ListHeaderComponent={() =>
          results.length > 0 ? (
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, marginTop: 10 }}>
              Meals with ingredient "{text}"
            </Text>
          ) : null
        }
        renderItem={({ item }) =>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.strMeal}
            </Text>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: item.strMealThumb }}
            />
          </View>}
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
    marginTop: 50,
  },
});
