//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, StatusBar, TextInput } from 'react-native';
import { ThemeProvider, useTheme } from '@react-navigation/native';
// create a component
const API = 'http://localhost:3000'; // aca la importe, pero la puedes escribir a mano abajo xd

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const verify = async () => {
    if (!loading) {
            setLoading(true);
            console.log(username, password);
            fetch(API + '/API-login', { // la ruta de tu api
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ // aca van lo que pide tu api en body (si no tiene body borra esto)
                    username: email, //antes de 2 puntos el nombre de la variable de la api después la variable almacenada en el frontend
                    password: password,
                }),
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                })
                .catch((error) => {
                    console.error(error);
                });
            setLoading(false);
        }
    }
    return (
        <View style={styles.container}>
            <TextInput
                value={username}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                onChangeText={(text) => setUsername(text)}
                placeholder={'Ingrese nombre de usuario'}
            />
            <TextInput
                value={password}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                placeholder={'Ingrese contraseña'}
            />
            <Button title='Iniciar Sesion' color='orange' onPress={() => verify()} />
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
export default Login;
