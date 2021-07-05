//import liraries
import React, { useState, useEffect, useMemo,Component}  from 'react';
import { Button, ActivityIndicator, TextInput,AppRegistry,StyleSheet,Text, 
View, SafeAreaView, FlatList, TouchableHighlight, AlertIOS, Alert,TouchableOpacity, Dimensions} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components";
import { render } from 'react-native-web';
const API = 'http://localhost:3000';
const Soporte = ({ navigation }) => {
    const [data,setData] = useState([]); 
    const [aux,setAux] = useState(true);
    const [tab, setTab] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [descripción, setDescripcion] = useState('');
    const AddConsulta = async () => {
            console.log("Añadiendo Consulta");
            fetch(API + '/API-addConsulta', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer '+await AsyncStorage.getItem("token"),
                },
                body: JSON.stringify({ 
                    titulo: titulo,
                    descripcion: descripción
                }),
                
            })
                .then((response) => response.json())
                    .catch((error) => {
                        console.error(error);
                        Alert.alert(Error);
                        alert(error);
                    });
        CheckData();    
        setTab(0);
    };
    const pass1 = () => {
        setTab(1);
    };
    const pass2 = () => {
        setTab(2);
    };
    const pass0 = () => {
        setTab(0);
    };
    const renderItem = ({item}) => {
            if (item.estado) {
                return(
                <View style = {styles.itemg}>
                    <View style = {styles.consulta}>
                        <Text>Titulo: {item.titulo}</Text>
                        <Text>Descripción: {item.descripcion}</Text>
                        <Text>Respuesta: {item.respuesta}</Text>
                    </View>
                        <Button styles={styles.borrar} title='BORRAR' color='blue' onPress={()=>borrar({item})}/>
                </View>
                );
            }else{
                return(
                    <View style = {styles.itemr}>
                    <View style = {styles.consulta}>
                        <Text>Titulo: {item.titulo}</Text>
                        <Text>Descripción: {item.descripcion}</Text>
                    </View>
                        <Button styles={styles.borrar} title='BORRAR' color='blue' onPress={()=>borrar({item})}/>
                </View>
                );
            }
        
        
    };
    const CheckData = async () => {
        console.log("Checking Data");
        fetch(API + '/API-getConsultas', { 
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+ await AsyncStorage.getItem("token"),
            }
        }).then((response) => response.json(
        )).then(async (json) => { 
            setData(JSON.parse(JSON.stringify(await json)));
        }).catch((error) => {console.error(error);});
    };
    const borrar = async (item) => {
        const id = item.item.id;
        fetch(API + '/API-delConsulta', { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+await AsyncStorage.getItem("token"),
            },
            body: 
                JSON.stringify({
                    id:id
                })
                
            })
        CheckData();
    };
    if (aux) {
        setAux(false);
        CheckData();
    }
    if (tab == 0) {
        return (
            <View style={styles.container}>
                <Button title='Añadir' color='blue' onPress={() => pass1()}/>
                <Button title='Ver Historial de Consultas' color='purple' onPress={() => pass2()}/>
            </View>
        );
    } 
    if (tab == 1){
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
            <Button title='ADD NEW QUERY' color='blue' onPress={() => {AddConsulta()}}/>
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
                <Button title='Back' color='blue' onPress={() => pass0()}/>
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
        flex:1,
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
    },
    consulta: {

    },
    borrar: {
        width: 50,

    }
});

export default Soporte;