//import liraries
import React, { useState, useEffect, useMemo,Component}  from 'react';
import { Button, ActivityIndicator, TextInput,AppRegistry,StyleSheet,Text, View, TouchableHighlight, AlertIOS, Alert} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";
// create a component
const API = 'http://localhost:3000'; // aca la importe, pero la puedes escribir a mano abajo xd
const Stack2 = createStackNavigator();
const Add = ({ navigation }) => {
    const [titulo, setTitulo] = useState('');
    const [descripción, setDescripcion] = useState('');
    const [userToken, setUserToken] = React.useState(null);
    const [loading, setLoading] = useState(false);
    //const line = 'bearer '+AsyncStorage.getItem("token");
    const verify = async () => {
    if (!loading) {

            console.log("verify");
            setLoading(true);
            //console.log();
            fetch(API + '/API-addConsulta', { // la ruta de tu api
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer '+await AsyncStorage.getItem("token"),
                },
                body: JSON.stringify({ // aca van lo que pide tu api en body (si no tiene body borra esto)
                    titulo: titulo,
                    descripcion: descripción
                    //para transformar JSON.parse(string) de string a json
                }),
                
            })
                .then((response) => response.json(
                    navigation.navigate("Support")
                ))
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
                value={titulo}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                secureTextEntry={false}
                onChangeText={(text) => setTitulo(text)}
                placeholder={'Ingrese titulo'}
            />
            <TextInput
                value={descripción}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                secureTextEntry={false}
                onChangeText={(text) => setDescripcion(text)}
                placeholder={'Ingrese descripción'}
            />
            <Button title='ADD NEW DESHID' color='blue' onPress={() => {/*navigation.navigate("MainStack")}*/verify()}}/>
        </View>
    );
};/*onPress={() => {navigation.navigate("MainStack",{screen:"Soporte"})}}*/ 

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff',
    },
});


//make this component available to the app
export default Add;