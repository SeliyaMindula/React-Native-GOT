import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert  } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Voice from '@react-native-voice/voice';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';




const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);


    const handleForgotPassword = () => {

        console.warn('Forgot Password pressed');
    };

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Logged in with:', user.email);
                navigation.navigate('Welcome');
                
                Alert.alert("Login Successful", `Welcome back, ${user.displayName || 'user'}!`, [
                    { text: "OK", onPress: () => navigation.navigate('Welcome') }
                ]);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert("Login Failed", `Please enter a valid email and password `);
            });
    };

    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        const onSpeechResults = (e) => {
            setEmail(e.value[0]); 
            setIsListening(false);
        };

        Voice.onSpeechResults = onSpeechResults;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const startListening = async () => {
        setIsListening(true);
        try {
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.headerText}>My App</Text>
                <View style={styles.inputField}>

                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        placeholderTextColor="#aaa"
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.inputField}>

                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={passwordVisibility}
                        style={styles.input}
                        placeholderTextColor="#aaa"
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                        <Icon name={passwordVisibility ? 'eye-with-line' : 'eye'} size={24} color="#aaa" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotButton}>
                    <Text style={styles.forgotButtonText}>Forgot Password ?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={startListening} style={styles.voiceButton}>
                    <Icon name="mic" size={24} color="#aaa" />
                    {isListening && <Text>Listening...</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>


                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Don't have an account?{' '}
                        <Text onPress={() => navigation.navigate('SignUp')} style={styles.signUpText}>
                            Sign Up
                        </Text>
                    </Text>
                </View>
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
        justifyContent: 'center',
        backgroundColor: '#333',
    },
    headerText: {
        fontSize: 32,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 80,
    },
    input: {
        backgroundColor: '#3D3D3D',
        color: '#C0C0C0',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 6,
        marginTop: 12,
    },
    button: {
        backgroundColor: '#FFD482',
        color: '#000000',
        padding: 16,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 44,
    },
    buttonText: {
        color: '#000000',
        fontWeight: '600',
        fontSize: 16,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    footerText: {
        color: '#FFFFFF',
    },
    signUpText: {
        textDecorationLine: 'underline',
        color: '#FFD482', 
        fontWeight: 'bold',
    },
    forgotButton: {
        marginTop: 12,
        alignSelf: 'flex-end',
    },
    forgotButtonText: {
        color: '#FFFFFF', 
        fontSize: 16,
    },
    inputField: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3D3D3D',
        borderRadius: 6,
        marginTop: 12,
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute', 
        right: 10, 
        top: 20, 
        height: 24, 
        width: 40, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    voiceButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3D3D3D',
        padding: 10,
        borderRadius: 6,
        marginTop: 12,
    },
});

export default LoginScreen;
