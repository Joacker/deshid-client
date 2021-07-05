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
const Add = ({ navigation }) => {
    const [alimento, setAlimento] = useState("");
    const [process, setProcess] = useState(false);
    const [estado, setEstado] = useState([]);
    const [data,setData] = useState([]); 
    const [aux,setAux] = useState(true);
    const [tab, setTab] = useState(0);
    const [id, setId] = useState('');
    const LinkDeshid = async () => {
            console.log("Vinculando Deshidratador");
            fetch(API + '/API-linkDeshid', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer '+await AsyncStorage.getItem("token"),
                },
                body: JSON.stringify({ 
                    id: id
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
    const pass0 = () => {
        setTab(0);
    };
    const pass1 = () => {
        setTab(1);
    };
    const pass2 = () => {
        setTab(2);
    };
    const pass3 = () => {
        setTab(3);
    };
    const renderItem = ({item}) => {
                return(
                <View style = {styles.itemg}>
                    <View style = {styles.consulta}>
                        <Text>ID: {item.id}</Text>
                        <Text>Tipo: {item.tipo}</Text>
                    </View>
                        <Button styles={styles.borrar} title='VerData' color='purple' onPress={()=>ViewData({item})}/>
                        <Button styles={styles.borrar} title='Desvincular' color='blue' onPress={()=>DesLink({item})}/>
                </View>
                );    
    };
    const CheckData = async () => {
        console.log("Checking Deshids");
        fetch(API + '/API-getDeshid', { 
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
    const ViewData = async (item) => {
        //Mostrar Datos Tiempo Real
        //Botón Historial
        setAlimento(item.item.alimento);
        setProcess(item.item.inProcess);
        console.log("Checking Estado");
        fetch(API + '/API-getDato', { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+ await AsyncStorage.getItem("token"),
            },
            body: 
            JSON.stringify({
                id:item.item.id
            }),
        }).then((response) => response.json(
        )).then(async (json) => { 
            const json1 = await json;
            console.log(json1);
            console.log(JSON.stringify(json1));
            setAlimento(JSON.parse(JSON.stringify(json1))[0].alimento);
            //setEstado(JSON.parse(JSON.stringify(await json)));
            console.log("Entrando");
        }).catch((error) => {console.error(error);});
        console.log(estado[0]);
        pass3();
    };
    const DesLink = async (item) => {
        const id = item.item.id;
        fetch(API + '/API-deslinkDeshid', { 
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
                value={id}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                secureTextEntry={false}
                onChangeText={(text) => setId(text)}
                placeholder={'Ingrese Id_Deshidratador'}
            />
            <Button title='ADD NEW QUERY' color='blue' onPress={() => {LinkDeshid()}}/>
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
    if (tab == 3) {
        return(
            <View style={{alignItems:'center',flex:1,marginTop:100,marginBottom:200,flexDirection:'column'}}>
            <View style = {styles.consulta}>
                        <Text>Deshidratando? {process}</Text>
                        <Text>Alimento? {alimento}</Text>
            </View>
        <View style={{justifyContent:'center',flex:1,flexDirection:'row',margin:10}}>
        <View style={{
        width: 140,
        height: 140,
        borderRadius: 140 / 2,
        backgroundColor: '#0a9396',
        justifyContent:'center',
        margin:10,
        alignSelf:'center'
        }}>
        <Text style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            color: 'white',
            fontSize: 15,
        }}>1</Text>
        </View>
        <View style={{
        width: 140,
        height: 140,
        borderRadius: 140 / 2,
        backgroundColor: '#000000',
        justifyContent:'center',
        margin:10,
        alignSelf:'center'
        }}>
        <Text style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            color: 'white',
            fontSize: 15,
        }}>2</Text>
        </View>
        </View>
        <View style={{justifyContent:'center',flex:1,flexDirection:'row',margin:10}}>
        <View style={{
        width: 140,
        height: 140,
        borderRadius: 140 / 2,
        backgroundColor: '#fca311',
        justifyContent:'center',
        margin:10,
        alignSelf:'center'
        }}>
        <Text style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            color: 'white',
            fontSize: 15,
        }}>11%</Text>
        </View>
        <View style={{
        width: 140,
        height: 140,
        borderRadius: 140 / 2,
        backgroundColor: '#14213d',
        justifyContent:'center',
        margin:10,
        alignSelf:'center'
        }}>
        <Text style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            color: 'white',
            fontSize: 15,
        }}>3%</Text>
        </View>
        </View>
        </View>
            );
    };
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

export default Add;