import { StyleSheet, Text, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';

export default function Map({ route }) {

    const { coords } = route.params;
    const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    })

    const save = () => {
        Alert.alert("Button pressed");
    };

    return (
        <View style={styles.container}>

            <MapView
                style={{ width: '100%', height: '80%' }}
                region={region}
            >
                <Marker
                    coordinate={region}
                    title='Haaga-Helia'
                />
            </MapView><View>
                <Button onPress={save} title="Save" />
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
    },
});