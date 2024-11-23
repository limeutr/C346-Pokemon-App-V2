import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; // Importing RNPickerSelect
import * as ImagePicker from 'expo-image-picker'; // Importing expo-image-picker
import { useNavigation } from '@react-navigation/native';
import { datasource } from './Data'; // Import your existing datasource

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
    imagePreview: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Add = () => {
    const [pokemon, setPokemon] = useState('');
    const [category, setCategory] = useState('🧚Fairy'); // Default category
    const [image, setImage] = useState(null); // State to hold image URI
    const navigation = useNavigation();

    const categories = [
        { label: '🧚 Fairy', value: '🧚Fairy' },
        { label: '🔥 Fire', value: '🔥Fire' },
        { label: '🍀 Leaf', value: '🍀Leaf' },
    ];

    const pickImage = async () => {
        // Request permission to access the media library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri); // Set the selected image's URI
        }
    };

    const handleSubmit = () => {
        if (!pokemon) {
            Alert.alert('Error', 'Please enter a valid Pokémon name.');
            return;
        }

        const categoryIndex = categories.findIndex((cat) => cat.value === category);
        if (categoryIndex === -1) {
            Alert.alert('Error', 'Invalid category selected.');
            return;
        }

        // If no image is selected, use a default placeholder or no image
        const selectedImage = image ? { uri: image } : null;

        const newPokemon = { key: pokemon, img: selectedImage };

        // Add the new Pokémon to the correct category in the datasource
        datasource[categoryIndex].data.push(newPokemon);

        Alert.alert('Success', `${pokemon} added to ${category} category.`);
        navigation.goBack(); // Navigate back to the previous screen after submitting
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Pokémon Name:</Text>
            <TextInput
                style={styles.input}
                value={pokemon}
                onChangeText={setPokemon}
                maxLength={20}
            />
            <Text style={styles.label}>Category:</Text>
            <RNPickerSelect
                onValueChange={setCategory}
                items={categories}
                value={category}
                style={{
                    inputAndroid: styles.input,
                    inputIOS: styles.input,
                }}
            />

            <Button title="Pick an Image" onPress={pickImage} />

            {image ? (
                <View style={styles.imagePreview}>
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                </View>
            ) : (
                <Text>No image selected</Text>
            )}

            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

export default Add;
