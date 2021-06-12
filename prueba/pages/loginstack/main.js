//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, StatusBar, ImageBackground} from 'react-native';
import { ThemeProvider, useTheme } from '@react-navigation/native';
const image = {uri: "https://raw.githubusercontent.com/ColaDuMacaco/TICs-WarmUp/main/Maqueta/mikasa.png"};
// create a component
const main = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.profileImgContainer}></ImageBackground>
            <Text>Welcum</Text>
        <Button title='Login' color='orange' onPress={() => {navigation.navigate("Login")}}/>
        <Button title='Register' color='orange' onPress={() => {navigation.navigate("Registro")}}/>
        <Button title='VerInfo' color='orange'/>
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
    button: {
        flex: 0.3,
        backgroundColor: "pink",
        borderWidth: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

    },
    profileImgContainer: {
        height: 200,
        width: 200,
        borderRadius: 100,
        borderWidth: 3
      }
});

//make this component available to the app
export default main;
