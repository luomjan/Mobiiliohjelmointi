import { StyleSheet, Text, View } from 'react-native';

export default function Main({navigation}) {

    const [infoToPass, setInfoToPass] = useState("");

  return (
    <View style={styles.container}>
      <Text>Welcome to our App!</Text>
      <Button
        title="Map"
        onPress={() => navigation.navigate('Map', {infoToPass})}
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