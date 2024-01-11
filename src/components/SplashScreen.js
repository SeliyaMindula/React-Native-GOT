import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';

const window = Dimensions.get('window');

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appName}>My App</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
    height: window.height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2A2A', 

  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SplashScreen;
