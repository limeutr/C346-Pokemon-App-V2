import React from 'react';
import { Image, Text, View, SectionList, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { datasource } from './Data'; // Import datasource

const styles = StyleSheet.create({
    opacityStyle: {
        padding: 10,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#dedede',
        paddingTop: 40,
        paddingBottom: 40,
        borderWidth: 1,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#66aede',
    },
});

const renderItem = ({ item, section, navigation }) => (
    <View style={styles.item}>
        <View style={styles.textContainer}>
            <TouchableOpacity
                style={styles.opacityStyle}
                onPress={() => {
                    // Find the index of the section and pass to the Edit screen
                    const categoryIndex = datasource.findIndex(
                        (cat) => cat.title === section.title
                    );

                    // Navigate to Edit screen and pass Pokemon data and categoryIndex
                    navigation.navigate('Edit', {
                        pokemon: item,
                        category: section.title,
                        categoryIndex: categoryIndex, // Pass index of the section
                    });
                }}
            >
                <Text style={styles.textStyle}>{item.key}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
            <Image source={item.img} style={styles.img} />
        </View>
    </View>
);


const renderSectionHeader = ({ section: { title, bgColor, textcolor } }) => (
    <View style={{ borderWidth: 1, backgroundColor: bgColor }}>
        <Text style={[styles.headerText, { color: textcolor }]}>{title}</Text>
    </View>
);

const Home = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, paddingBottom: 60, paddingLeft: 20, paddingRight: 20 }}>
            <StatusBar hidden={true} />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add')}>
                <Text style={{ color: 'white' }}> ADD POKEMON</Text>
            </TouchableOpacity>
            <SectionList
                sections={datasource}
                renderItem={(props) => renderItem({ ...props, navigation })}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item, index) => item.key + index}
            />
        </View>
    );
};

export default Home;
