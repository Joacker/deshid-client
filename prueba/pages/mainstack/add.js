//import liraries
import React, { useState, useEffect, useMemo,Component}  from 'react';
import { Button, ActivityIndicator, TextInput,AppRegistry,StyleSheet,Text, View, TouchableHighlight, AlertIOS, Alert} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
// create a component
const API = 'http://localhost:3000'; // aca la importe, pero la puedes escribir a mano abajo xd
const Stack2 = createStackNavigator();
const Add = ({ navigation }) => {
    const [rut, setrut] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descripción, setDescripcion] = useState(false);
    const [userToken, setUserToken] = React.useState(null);
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
                },
                body: JSON.stringify({ // aca van lo que pide tu api en body (si no tiene body borra esto)
                    rut: rut, //antes de 2 puntos el nombre de la variable de la api después la variable almacenada en el frontend
                    titulo: titulo,
                    descripción: descripción
                    //para transformar JSON.parse(string) de string a json
                }),
                
            })
                .then((response) => response.json())
                .then(async (json) => {
                    console.log(json.token);
                    if (json.token) { //sesion equivocada
                        await AsyncStorage.setItem("token",json.token);//llave y resultado
                        setLoading(false);
                        navigation.navigate("MainStack");
                    }
                    else{ //sesión correcta
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
                value={rut}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                onChangeText={(text) => setrut(text)}
                placeholder={'Ingrese rut'}
            />
            <TextInput
                value={titulo}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(text) => setTitulo(text)}
                placeholder={'Ingrese titulo'}
            />
            <TextInput
                value={descripción}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                secureTextEntry={true}
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
