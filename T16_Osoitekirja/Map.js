import { StyleSheet, Text, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';

export default function Map({ route, navigation }) {

    const { coords, text, onSavePlace } = route.params; //onSave = callback function
    const [region, setRegion] = useState(coords)


    const savePlace = () => {
        if (onSavePlace) {
            onSavePlace({ text, coords: region });
        }
        navigation.goBack();
    };

    const cancel = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>

            <MapView
                style={{ width: '100%', height: '80%' }}
                region={region}
            >
                <Marker
                    coordinate={region}
                />
            </MapView>
            <View>
                <Button title="Save" onPress={savePlace} />
            </View>
            <View>
                <Button title="Cancel" onPress={cancel} />
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