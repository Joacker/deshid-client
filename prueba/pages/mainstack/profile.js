//import liraries
import React, { Component } from 'react';
import { Button,View, Text, StyleSheet } from 'react-native';

import { BottomTabBarHeightContext,createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
// create a component
const Profile = ({ navigation }) => {
    const Logout = async() =>{
        await AsyncStorage.removeItem("token");
        navigation.navigate("LoginStack");
    }
    return (
        <View style={styles.container}>
            <Text>MyComponent</Text>
            <Button title='Cierre de sesión' color='orange' onPress={() => Logout()} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

//make this component available to the app
export default Profile;
