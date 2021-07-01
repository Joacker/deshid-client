//import liraries
import React, { useState, useEffect, useMemo,Component}  from 'react';
import { Button, ActivityIndicator, TextInput,AppRegistry,StyleSheet,Text, 
    View, SafeAreaView, FlatList, TouchableHighlight, AlertIOS, Alert,TouchableOpacity, Dimensions} from 'react-native';
    import { createStackNavigator } from '@react-navigation/stack';
    import * as Notifications from 'expo-notifications';
    import AsyncStorage from "@react-native-async-storage/async-storage";
    import styled from "styled-components";
import { render } from 'react-native-web';
    // create a component
var loopdata = [];
const {aheight, awidth} = Dimensions.get('window');
var a = awidth*0.9;
const API = 'http://localhost:3000'; // aca la importe, pero la puedes escribir a mano abajo xd
const Stack2 = createStackNavigator();
const Soporte = ({ navigation }) => {
    //const consultas = [];
    const [value, setValue] = useState("");

        const onChangeText = (text) => {
            setValue(text);
        };
    const [data,setData] = useState([]); 
    const [aux,setAux] = useState(true);
    const [tab, setTab] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [descripción, setDescripcion] = useState('');
    const [userToken, setUserToken] = React.useState(null);
    const [loading, setLoading] = useState(false);
    //const line = 'bearer '+AsyncStorage.getItem("token");
    const verify2 = async () => {
        if (!loading) {

            console.log("verify2");
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
                    setTab(0),
                    setAux(true)
                ))
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
            setLoading(false);
        }
    };
    const pass1 = () => {
        setTab(1);
    };
    const pass2 = () => {
        setTab(2);
    };
    const pass3 = () => {
        setTab(0);
    };
    const renderItem = ({item}) => {
            if (item.estado) {
                //contestado
                return(
                <View style = {styles.itemg}>
                    <Text>{item.titulo}</Text>
                </View>
                );
            }else{
                return(
                <View style = {styles.itemr}>
                    <Text>{item.titulo}</Text>
                </View>
                );
            }
        
        
    };
    const verify = async () => {
    if (!loading && aux) {

            console.log("verify");
            setLoading(true);
            //console.log();
            fetch(API + '/API-getConsultas', { // la ruta de tu api
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer '+await AsyncStorage.getItem("token"),
                }
                
            })
            .then((response) => response.json())
            .then(async (json) => {
                setData(JSON.parse(JSON.stringify(await json)));
                //console.log(consultas);
                console.log(data);
                //loopdata=JSON.parse(JSON.stringify(consultas));
                //return JSON.stringify(consultas);
            })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
            setLoading(false);
            setAux(false);
        }
    };
    if (tab == 0) {
        verify();
        return (
            <View style={styles.container}>
                <Button title='Añadir' color='blue' onPress={() => pass1()}/>
                <Button title='Ver Historial de Consultas' color='purple' onPress={() => pass2()}/>
            </View>
        );
    } 
    if (tab == 1){
        //console.log(loopdata);
        return(
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
            <Button title='ADD NEW QUERY' color='blue' onPress={() => {verify2()}}/>
        </View>
        );
    }
    if (tab == 2){
            return (
            <View style={styles.container}>
                <FlatList 
                    data = {data}
                    renderItem = {renderItem}
                    
                />
                <Button title='Back' color='blue' onPress={() => pass3()}/>
            </View>
            
            );
            
        }
    };

// define your styles
const styles = StyleSheet.create({
    container: {
        marginTop:10,
        marginBottom:110,
        marginHorizontal:10,
        flex: 1,
        justifyContent:"center",
        backgroundColor: '#ffff'
    },
    itemg: {
        justifyContent:"center",
        padding:5,
        marginVertical:5,
        backgroundColor:"#caffbf"
    },
    itemr: {
        justifyContent:"center",
        padding:5,
        marginVertical:5,
        backgroundColor:"#ffadad"
    }
});

export default Soporte;