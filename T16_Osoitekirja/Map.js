import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';

export default function Map({ route }) {

    const { infoToPass } = route.params;
    const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    })

    return (
        <View style={styles.container}>
            <Text>Welcome to our App! </Text>

            <MapView
                style={{ width: '100%', height: '80%' }}
                region={region}
            >
            <Marker
                coordinate={region}
                title='Haaga-Helia'
            />
            </MapView>
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