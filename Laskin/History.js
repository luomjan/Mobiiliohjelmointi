import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, } from 'react-native';


export default function History({ route }) {

    const { results } = route.params;

    return (
        <View style={styles.container}>

            <FlatList
                data={results}
                renderItem={({ item }) =>
                (<View style={styles.listItem}>
                    <Text>{item.key}</Text>
                </View>)}
                ListHeaderComponent={() => <Text style={styles.header}>History</Text>}
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
        padding: 20,
        marginTop: 10,
    },

    listItem: {
        alignItems: 'center',
        marginTop: 10,

    },
    header: {
        alignItems: 'center',
        marginTop: 10,
    }
});