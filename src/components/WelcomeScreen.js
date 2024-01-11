import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView ,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const WelcomeScreen = ({ navigation }) => {

    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch('https://thronesapi.com/api/v2/Characters');
                const data = await response.json();
                setCharacters(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCharacters();
    }, []);


    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('CharacterDetail', { characterId: item.id })}>
            <Text style={styles.cell}>{item.id}</Text>
            <Text style={styles.cell}>{item.fullName}</Text>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
        </TouchableOpacity>
    );

    const handleSettingsPress = () => {
        navigation.navigate('Profile');
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Characters</Text>
                        <Icon name="settings-outline" size={30} color="#fff" onPress={handleSettingsPress} style={styles.settingsIcon} />
                    </View>
                }
                data={characters}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A2A2A',
    },
    row: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    cell: {
        color: 'white',
        fontSize: 16,
        flex: 1,
        fontFamily: 'monospace',
    },
    image: {
        width: 70, 
        height: 70, 
        borderRadius: 35, 
        marginRight: 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#444', 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    headerText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    settingsIcon: {
        padding: 10, 
    },
});

export default WelcomeScreen;
