//import liraries
import React, { useState, useEffect, useMemo,Component}  from 'react';
import { Button, ActivityIndicator, TextInput,AppRegistry,StyleSheet,Text, View, TouchableHighlight, AlertIOS, Alert} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { AuthContext } from '../../../components2/context';
const API = 'http://localhost:3000'; // aca la importe, pero la puedes escribir a mano abajo xd
const Stack2 = createStackNavigator();
const Login = ({ navigation }) => {
    const [correo, setcorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [loading, setLoading] = useState(false);
    const [userToken, setUserToken] = React.useState(null);
    const verify = async () => {
    console.log("1234");
    if (!loading) {

            console.log("verify");
            setLoading(true);
            //console.log();
            fetch(API + '/API-login', { // la ruta de tu api
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ // aca van lo que pide tu api en body (si no tiene body borra esto)
                    correo: correo, //antes de 2 puntos el nombre de la variable de la api después la variable almacenada en el frontend
                    contrasena: contrasena
                    //para transformar JSON.parse(string) de string a json
                }),
                
            })
                .then((response) => response.json())
                .then(async (json) => {
                    console.log(json.token);
                    if (json.token) { 
                        await AsyncStorage.setItem("token",json.token);//llave y resultado
                        setLoading(false);
                        navigation.navigate("MainStack");
                    }
                    else{ 
                        setLoading(false);
                        Alert.alert('','');//titulo y descripción
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
            setLoading(false);
        }
    }
    return (
        <View style={styles.container}>
            <TextInput
                value={correo}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                onChangeText={(text) => setcorreo(text)}
                placeholder={'Ingrese correo'}
            />
            <TextInput
                value={contrasena}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(text) => setContrasena(text)}
                placeholder={'Ingrese contraseña'}
            />
            <Button title='Iniciar Sesion' color='green' onPress={() => {/*navigation.navigate("MainStack")}*/verify()}}/>
        </View>
    );
};/*onPress={() => {navigation.navigate("MainStack",{screen:"Soporte"})}}*/ 

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
