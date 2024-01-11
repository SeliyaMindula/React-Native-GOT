import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Voice from '@react-native-voice/voice';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';


const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState({
        minChar: false,
        oneUpperCase: false,
        oneLowerCase: false,
        oneNumber: false,
    });

    const auth = getAuth();

    const handleSignUp = () => {
        const passwordCriteriaMet = isPasswordValid.minChar && isPasswordValid.oneUpperCase && isPasswordValid.oneLowerCase && isPasswordValid.oneNumber;

        if (!passwordCriteriaMet) {
            Alert.alert(
                "Invalid Password",
                "Your password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long."
            );
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (!name.trim()) {
            Alert.alert("Invalid Input", "Name cannot be empty.");
            return;
        }
    
        if (!email.trim()) {
            Alert.alert("Invalid Input", "Email cannot be empty.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                return updateProfile(userCredential.user, {
                    displayName: name
                });
            })
            .then(() => {
                navigation.navigate('Login');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    };

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    const onPasswordChange = (password) => {
        setPassword(password);
        setIsPasswordValid({
            minChar: password.length >= 8,
            oneUpperCase: /[A-Z]/.test(password),
            oneLowerCase: /[a-z]/.test(password),
            oneNumber: /[0-9]/.test(password),
        });
    };


    useEffect(() => {
        const onSpeechResults = (e) => {
            setName(e.value[0]); 
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
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.headerText}>My App</Text>

                {/* Name Input */}
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    placeholderTextColor="#aaa"

                />

                {/* Email Input */}
                <TextInput
                    placeholder="Email Address"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholderTextColor="#aaa"

                />

                {/* Password Input */}
                <View style={styles.inputField}>
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={onPasswordChange} // Set to the new function
                        secureTextEntry={passwordVisibility}
                        style={styles.input}
                        placeholderTextColor="#aaa"
                    />


                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                        <Icon name={passwordVisibility ? 'eye-off' : 'eye'} size={24} color="#aaa" />
                    </TouchableOpacity>
                </View>

                {/* Confirm Password Input */}
                <View style={styles.inputField}>
                    <TextInput
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={passwordVisibility}
                        style={styles.input}
                        placeholderTextColor="#aaa"
                    />


                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                        <Icon name={passwordVisibility ? 'eye-off' : 'eye'} size={24} color="#aaa" />
                    </TouchableOpacity>
                </View>

                <View style={styles.validationContainer}>
                    <View style={styles.validationRow}>
                        <Text style={styles.validationText(isPasswordValid.oneLowerCase)}>
                            One lowercase character
                        </Text>
                        <Text style={styles.validationText(isPasswordValid.oneUpperCase)}>
                            One uppercase character
                        </Text>
                    </View>
                    <View style={styles.validationRow}>
                        <Text style={styles.validationText(isPasswordValid.oneNumber)}>
                            One number
                        </Text>
                        <Text style={styles.validationText(password.length >= 8)}>
                            8 characters minimum
                        </Text>
                    </View>
                </View>

                <TouchableOpacity onPress={startListening} style={styles.voiceButton}>
                    <Icon name="mic" size={24} color="#aaa" />
                    {isListening && <Text>Listening...</Text>}
                </TouchableOpacity>

                {/* Sign Up Button */}
                <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                {/* Sign In Redirect */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Have an account?{' '}
                        <Text onPress={() => navigation.navigate('Login')} style={styles.signInText}>
                            Sign In
                        </Text>
                    </Text>
                </View>
            </ScrollView>
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
        backgroundColor: '#2A2A2A',

    },
    headerText: {
        fontSize: 32,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 80,
    },
    input: {
        backgroundColor: '#3D3D3D',
        color: '#FFFFFF',
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
    signInText: {
        textDecorationLine: 'underline',
        color: '#FFD482',
        fontWeight: 'bold',
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
        top: 10,
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
    validationContainer: {
        alignSelf: 'stretch',
        marginBottom: 20,
        marginTop: 20,

    },
    validationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    validationText: (isValid) => ({
        color: isValid ? 'white' : '#bb4444',
        flex: 1,
        marginHorizontal: 4,
    }),
});

export default SignUpScreen;
