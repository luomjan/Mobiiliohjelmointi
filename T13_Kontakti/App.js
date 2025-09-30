import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';

export default function App() {

  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      );
      console.log(data)

      if (data.length > 0) {
        setContacts(data);
      }
      else {
        Alert.alert("Warning", "No contacts found.");
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>
            {item.name} {item.phoneNumbers[0].number}
          </Text>
        )}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.button}>
        <Button title="Get Contacts" onPress={getContacts} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 100,
  },
  list: {
    alignSelf: 'centre'
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
