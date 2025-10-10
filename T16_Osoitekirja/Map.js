import { StyleSheet, Text, View } from 'react-native';

export default function Map({ route }) {

    const { infoToPass } = route.params;
    
    return (
        <View style={styles.container}>
            <Text>Welcome to our App! </Text>
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