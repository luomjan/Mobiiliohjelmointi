import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, } from 'react-native';
import { useState } from 'react';

export default function Calculator({navigation}) {

    const [eka, setEka] = useState("");
    const [toka, setToka] = useState("");
    const [result, setResult] = useState("");
    const [results, setResults] = useState(["History"]);

    const buttonPlus = () => {
        const sum = parseFloat(eka) + parseFloat(toka);
        const memory = eka + "+" + toka + "=" + sum;
        setResults([...results, { key: memory }]);
        setResult(sum);
        setEka("");
        setToka("");
    };

    const buttonMinus = () => {
        const minus = parseFloat(eka) - parseFloat(toka);
        setResult(minus);
        const mem = eka + "-" + toka + "=" + minus;
        setResults([...results, { key: mem }]);
        setEka("");
        setToka("");
    };

    return (
        <View style={styles.container}>
            <Text>Result: {result}</Text>
            <View>
                <TextInput
                    style={styles.nums}
                    placeholder='Give number'
                    keyboardType="numeric"
                    onChangeText={eka => setEka(eka)}
                    value={eka}
                />
                <TextInput
                    style={styles.nums}
                    placeholder='Give number'
                    keyboardType="numeric"
                    onChangeText={toka => setToka(toka)}
                    value={toka}
                />
            </View>
            <View style={styles.button}>
                <View style={styles.onebutton}>
                    <Button onPress={buttonPlus} title="+" />
                </View>
                <View style={styles.onebutton}>
                    <Button onPress={buttonMinus} title="-" />
                </View>
                <View style={styles.container}>
                    <Text>History</Text>
                    <Button
                        title="Settings"
                        onPress={() => navigation.navigate('History', {results})}
                    />
                </View>
            </View>

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
        marginTop: 100,
    },
    nums: {
        borderWidth: 1,
        width: 200,
    },
    button: {
        flexDirection: 'row',
        marginTop: 15,
    },
    onebutton: {
        marginHorizontal: 10,
        width: 35,
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