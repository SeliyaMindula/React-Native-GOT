import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const CharacterDetailScreen = ({ route }) => {
    const { characterId } = route.params;
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                const response = await fetch(`https://thronesapi.com/api/v2/Characters/${characterId}`);
                const data = await response.json();
                setCharacter(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCharacterDetails();
    }, [characterId]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.detailBox}>
                {/* Image and details */}
                {character && (
                    <>
                        <Text style={styles.title}>{character.fullName}</Text>
                        <Image source={{ uri: character.imageUrl }} style={styles.image} />
                        <View style={styles.infoSection}>
                            <Text style={styles.info}>ID: {character.id}</Text>
                            <Text style={styles.info}>First Name: {character.firstName}</Text>
                            <Text style={styles.info}>Last Name: {character.lastName}</Text>
                            <Text style={styles.info}>Full Name: {character.fullName}</Text>
                            <Text style={styles.info}>Title: {character.title}</Text>
                            <Text style={styles.info}>Family: {character.family}</Text>
                            <Text style={styles.info}>Image: {character.image}</Text>
                            <Text style={styles.info}>Image URL: {character.imageUrl}</Text>
                        </View>
                    </>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#2A2A2A',
    },
    detailBox: {
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
    },
    info: {
        fontSize: 18,
        color: '#FFF',
        marginBottom: 10,
    },
    infoSection: {
        paddingVertical: 4,
      },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 40,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 10,
    },
});

export default CharacterDetailScreen;
