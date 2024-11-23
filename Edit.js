import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { datasource } from './Data'; // Import the existing datasource

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        fontSize: 16,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

const Edit = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { pokemon, category, categoryIndex } = route.params || {}; // Get parameters from navigation
    const [pokemonName, setPokemonName] = useState(pokemon.key); // Set the initial Pokémon name

    const handleSave = () => {
        if (!pokemonName) {
            Alert.alert('Error', 'Please enter a valid name.');
            return;
        }

        // Update the Pokémon name in the datasource
        datasource[categoryIndex].data[pokemon.key] = { key: pokemonName, img: pokemon.img };
        Alert.alert('Success', 'Pokémon updated successfully.');
        navigation.goBack(); // Navigate back to the previous screen
    };

    const handleDelete = () => {
        // Find the index of the Pokémon to delete
        const pokemonIndex = datasource[categoryIndex].data.findIndex(
            (item) => item.key === pokemon.key
        );
        if (pokemonIndex > -1) {
            datasource[categoryIndex].data.splice(pokemonIndex, 1);
            Alert.alert('Success', 'Pokémon deleted successfully.');
            navigation.goBack(); // Navigate back after deletion
        } else {
            Alert.alert('Error', 'Pokémon not found.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Edit Pokémon Name:</Text>
            <TextInput
                style={styles.input}
                value={pokemonName}
                onChangeText={setPokemonName}
            />
            <View style={styles.buttonRow}>
                <Button title="Save" onPress={handleSave} />
                <View style={{ width: 10 }} />
                <Button title="Delete" onPress={handleDelete} color="red" />
            </View>
        </View>
    );
};

export default Edit;
