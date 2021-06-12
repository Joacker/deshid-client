//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, StatusBar, TextInput, Alert } from 'react-native';
import { ThemeProvider, useTheme } from '@react-navigation/native';
// create a component
const API = 'http://localhost:3000'; // aca la importe, pero la puedes escribir a mano abajo xd
//nombre, contrasena, correo, direccion y rut
const Registro = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [correo, setcorreo] = useState('');
    const [direccion, setdireccion] = useState('');
    const [rut, setrut] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const verify = async () => {
    if (!loading) {
            setLoading(true);
            if(password.length<8){
                Alert.alert('Error','Contraseña muy corta');
                setLoading(false);
                return;
            }
            fetch(API + '/API-registro', { // la ruta de tu api
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ // aca van lo que pide tu api en body (si no tiene body borra esto)
                    rut: rut,
                    nombre: nombre, //antes de 2 puntos el nombre de la variable de la api después la variable almacenada en el frontend
                    contrasena: password,
                    correo: correo,
                    direccion: direccion,
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
                value={nombre}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                onChangeText={(text) => setNombre(text)}
                placeholder={'Ingrese nombre'}
            />
            <TextInput
                value={rut}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                onChangeText={(text) => setrut(text)}
                placeholder={'Ingrese rut'}
            />
            <TextInput
                value={correo}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                onChangeText={(text) => setcorreo(text)}
                placeholder={'Ingrese correo'}
            />
            <TextInput
                value={direccion}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                onChangeText={(text) => setdireccion(text)}
                placeholder={'Ingrese dirección'}
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
            <Button title='Registrarse' color='orange' onPress={() => verify()} />
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
export default Registro;
