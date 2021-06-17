//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { BottomTabBarHeightContext,createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// create a component
const Profile = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>MyComponent</Text>
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
