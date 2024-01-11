import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';


const ProfileScreen = ({ navigation }) => {

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const auth = getAuth();

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserName(user.displayName);
            setUserEmail(user.email);
        } else {
            navigation.navigate('Login');
        }
    }, []);

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigation.navigate('Login'); 
        }).catch((error) => {
            console.error("Logout Error:", error);
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.headerText}>My App</Text>
                <View style={styles.inputField}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>Name</Text>
                        <Text style={styles.infoValue}>{userName}</Text>
                    </View>
                </View>
                <View style={styles.inputField}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>Email</Text>
                        <Text style={styles.infoValue}>{userEmail}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={handleLogout} style={styles.button}>
                    <Text style={styles.buttonText}>Log out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#2A2A2A',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#333', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputField: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6,
        marginTop: 12,
        position: 'relative',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 50,
    },
    infoContainer: {
        backgroundColor: '#3D3D3D', 
        width: '100%',
        padding: 20,
        borderRadius: 10, 
        marginBottom: 20,
    },
    infoText: {
        color: '#aaa', 
        marginBottom: 5,
    },
    infoValue: {
        color: '#fff', 
        fontSize: 18,
    },
    button: {
        backgroundColor: '#FFD482', 
        padding: 15,
        borderRadius: 10,
        width: '100%', 
        alignItems: 'center',
        marginTop: 60,
        position: 'absolute', 
        bottom: 30, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    buttonText: {
        color: '#333', 
        fontWeight: '600',
        fontSize: 16,
    },
});

export default ProfileScreen;
