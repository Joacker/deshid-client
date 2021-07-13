//import liraries
import React, { useState, useEffect, useMemo,Component}  from 'react';
import { Button, ScrollView, ActivityIndicator, TextInput,AppRegistry,StyleSheet,Text, 
View, SafeAreaView, FlatList, TouchableHighlight, AlertIOS, Alert,TouchableOpacity, Dimensions} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components";
import { render } from 'react-native-web';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
  } from 'react-native-chart-kit';
  const API = 'http://localhost:3000';
  const Add = ({ navigation }) => {
    var width = Dimensions.get("window").width
    const [deshidratacionesl, setDeshidratacionesl] = useState("");
    const [stats, setStats] = useState([]);
    const [item, setItem] = useState([]);
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
        CheckData();
        setTab(0);
    };
    const pass1 = () => {
        CheckData();
        setTab(1);
    };
    const pass2 = () => {
        CheckData();
        setTab(2);
    };
    const pass3 = () => {
        CheckData();
        setTab(3);
    };
    const pass4 = () => {
        CheckData();
        setTab(4);
    };
    const pass5 = () => {
        setTab(5);
    };
    const pass6 = () => {
        setTab(6);
    };
    const renderItem = ({item}) => {
                return(
                <View style = {styles.itemg}>
                    <View style = {styles.consulta}>
                        <Text>ID: {item.id}</Text>
                        <Text>Tipo: {item.tipo}</Text>
                    </View>
                        <Button styles={styles.borrar} title='VerData' color='purple' onPress={()=>ViewData(item)}/>
                        <Button styles={styles.borrar} title='Desvincular' color='blue' onPress={()=>DesLink({item})}/>
                </View>
                );    
    };
    const renderItem2 = ({item}) => {
        return(
        <View style = {styles.itemg}>
            <View style = {styles.consulta}>
                <Text>Alimento: {item.alimento}</Text>
                <Text>Tiempo de inicio: {new Date(item.tiempo*1000).toLocaleString()}</Text>
            </View>
                <Button styles={styles.borrar} title='Ver estadisticas' color='purple' onPress={()=>ViewStads(item.tiempo)}/>
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
            const json1 = await json;
            //console.log(json1);
            setData(JSON.parse(JSON.stringify(json1)));
        }).catch((error) => {console.error(error);});
    };
    const ViewData = async (item) => {
        //Mostrar Datos Tiempo Real
        //Botón Historial
        setItem(item);
        setProcess(item.inprocess);
        console.log("Checking Estado");
        console.log(process);
        console.log(item);
        fetch(API + '/API-getDato', { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+ await AsyncStorage.getItem("token"),
            },
            body: 
            JSON.stringify({
                id:item.id
            }),
        }).then((response) => response.json(
        )).then(async (json) => { 
            const json1 = await json;
            setEstado(JSON.parse(JSON.stringify(json1))[0]);
            console.log("Entrando");
            console.log(json1);
        }).catch((error) => {console.error(error);});
        console.log(estado);
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
        pass2();
    };
    const StartProcess = async () =>{
        console.log("Inciando procesos");
        console.log(item.id);
        fetch(API + '/API-startProcess', { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+await AsyncStorage.getItem("token"),
            },
            body: 
                JSON.stringify({
                    id:item.id,
                    alimento:alimento
                })
                
            })
            CheckData();
    };
    const StopProcess = async () => {
        console.log("Parando procesos");
        console.log(item.id);
        fetch(API + '/API-stopProcess', { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+await AsyncStorage.getItem("token"),
            },
            body: 
                JSON.stringify({
                    id:item.id
                })
                
            })
            CheckData();
            pass2();
    };
    const ViewAllDato = async () => {
        const id = item.id;
        const deshidrataciones2 = [];
        const deshidrataciones3 = [];
        fetch(API + '/API-getAllDato', { 
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
                
            }).then((response) => response.json(
                )).then(async (json) => { 
                    const json1 = await json;
                    var aux1 = true;
                    var i = 0;
                    var j = 0;
                    json1.forEach(element => {
                        if (aux1) {
                            deshidrataciones3[i]=element;
                            console.log('-----');
                            console.log(element);
                            deshidrataciones2[i]=[];
                            aux1=false;
                        }
                        if (element.peso == "-100") {
                            aux1 = true;
                            i = i + 1;
                            j = 0;
                        }else{
                            deshidrataciones2[i][j] = element;
                            j = j + 1;
                        }
                    }
                    );
                    setDeshidratacionesl(deshidrataciones3);
                    console.log(deshidrataciones2)
                }).catch((error) => {console.error(error);});
        pass5();
    }; 
    const ViewStads = async (time) => {
        const id = item.id;
        const deshidrataciones3 = [];
        fetch(API + '/API-getAllDato', { 
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
                
            }).then((response) => response.json(
                )).then(async (json) => { 
                    const json1 = await json;
                    var aux1 = false;
                    var i = 0;
                    var j = 0;
                    json1.forEach(element => {
                        if (element.tiempo == time){
                            aux1 = true;
                        }
                        if (element.peso == "-100"){
                            aux1 = false;
                        }
                        if (aux1){
                            deshidrataciones3[i]=element;
                            i = i + 1;
                        }
                        
                    }
                    );
                    setStats(deshidrataciones3);
                }).catch((error) => {console.error(error);});
        pass6();
    }; 
    if (aux) {
        setAux(false);
        CheckData();
    }
    if (tab == 0) {
        return (
            <View style={styles.container}>
                <Button title='Añadir' color='blue' onPress={() => pass1()}/>
                <Button title='Ver Deshidratadores' color='purple' onPress={() => pass2()}/>
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
        if(estado===undefined && process){
            return(
                <View style={{alignItems:'center',flex:1,marginTop:100,marginBottom:200,flexDirection:'column'}}>
                    <View style = {styles.consulta}>
                        <Text>Esperando Data</Text>
                        <Button title=' STOP PROCESS' color='blue' onPress={() => {StopProcess()}}/>
                        <Button title=' VER DATA HISTORICA' color='blue' onPress={() => {ViewAllDato()}}/>
                        <Button title='Back' color='blue' onPress={() => pass2()}/>
                    </View>
                </View>
            );    
        }
        if (process && estado.peso != "-100") {
        return(
            <View style={{alignItems:'center',flex:1,marginTop:100,marginBottom:200,flexDirection:'column'}}>
            <View style = {styles.consulta}>
                        <Text>Alimento: {estado.alimento}</Text>
                        
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
        }}>{estado.temperatura}°C</Text>
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
        }}>{estado.peso}g</Text>
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
        }}>{estado.gas}%</Text>
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
        }}>{estado.humedad}%</Text>
        </View>
        </View>
        <View style = {styles.consulta}>
            <Button title=' STOP PROCESS' color='blue' onPress={() => {StopProcess()}}/>
            <Button title=' VER DATA HISTORICA' color='blue' onPress={() => {ViewAllDato()}}/>
            <Button title='Back' color='blue' onPress={() => pass2()}/>           
        </View>
        </View>
            );
    }else if(process && estado.peso=="-100"){
        return(
            <View style={{alignItems:'center',flex:1,marginTop:100,marginBottom:200,flexDirection:'column'}}>
                <View style = {styles.consulta}>
                    <Text>Esperando Data</Text>
                    <Button title=' STOP PROCESS' color='blue' onPress={() => {StopProcess()}}/>
                    <Button title=' VER DATA HISTORICA' color='blue' onPress={() => {ViewAllDato()}}/>
                    <Button title='Back' color='blue' onPress={() => pass2()}/>
                </View>
            </View>
        );
        
    }else{
            return(
                <View style={{alignItems:'center',flex:1,marginTop:100,marginBottom:200,flexDirection:'column'}}>
                    <View style = {styles.consulta}>
                                <Text>Sin captura de datos en este momento</Text>
                                <Button title='Iniciar Proceso' color='blue' onPress={() => pass4()}/>
                                <Button title=' VER DATA HISTORICA' color='blue' onPress={() => {ViewAllDato()}}/>
                                <Button title='Back' color='blue' onPress={() => pass2()}/>
                    </View>
                </View>
            );
        }
    };
    if (tab == 4) {
        return (
            <View style={styles.container}>
            <TextInput
                value={alimento}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                secureTextEntry={false}
                onChangeText={(text) => setAlimento(text)}
                placeholder={'Ingrese Alimento'}
            />
            <Button title=' START PROCESS' color='blue' onPress={() => {StartProcess()}}/>
            </View>
            
            );     
    };
    if (tab == 5) {
        //stop process
        console.log("Entrando a tab 5");
        return (
            <View style={styles.container}>
                <FlatList 
                    data = {deshidratacionesl}
                    renderItem = {renderItem2}
                    
                />
                <Button title='Back' color='blue' onPress={() => pass3()}/>
            </View>    
        );
    };
    if (tab == 6) {
        //stop process
        console.log("Entrando a tab 6");
        var tiems = [];
        var temps = [];
        var humes = [];
        var pesos = [];
        var i = 0
        stats.forEach(element => {
            tiems[i] = parseInt(element.tiempo);
            temps[i] = parseInt(element.temperatura);
            humes[i] = parseInt(element.humedad);
            pesos[i] = parseInt(element.peso);
            i = i + 1;
        });
        return (
            <ScrollView>
            <View style={{alignItems:'center',flex:1,marginTop:100,marginBottom:200,flexDirection:'column'}}> 
            <Text>Temperatura:</Text>
            <LineChart //     Temperatura
                    data={{
                        labels: [new Date(tiems[0]*1000).toLocaleString(),'',new Date(tiems[tiems.length - 1]*1000).toLocaleString()],
                        datasets: [{
                            data: temps,
                            strokeWidth: 2
                        }]
                    }}
                    width={width-20} // from react-native
                    height={220}
                    withDots={false}
                    withShadow={false}
                    withInnerLines={false}
                    withOuterLines={true}
                    //fromZero={true}
                    segments={5}
                    formatYLabel = {(yValue) => {
                        return yValue + ' [°C]';
                    }}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#bfbfbf',
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
                    }}
                    />
            <Text>Humedad:</Text>
            <LineChart //     humedad
                    data={{
                        labels: [new Date(tiems[0]*1000).toLocaleString(),'',new Date(tiems[tiems.length - 1]*1000).toLocaleString()],
                        datasets: [{
                            data: humes,
                            strokeWidth: 2
                        }]
                    }}
                    width={width-20} // from react-native
                    height={220}
                    withDots={false}
                    withShadow={false}
                    withInnerLines={false}
                    withOuterLines={true}
                    //fromZero={true}
                    segments={5}
                    formatYLabel = {(yValue) => {
                        return yValue + ' [%]';
                    }}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#bfbfbf',
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
                    }}
                    />
                    <Text>Peso:</Text>
            <LineChart //     peso
                    data={{
                        labels: [new Date(tiems[0]*1000).toLocaleString(),'',new Date(tiems[tiems.length - 1]*1000).toLocaleString()],
                        datasets: [{
                            data: pesos,
                            strokeWidth: 2
                        }]
                    }}
                    width={width-20} // from react-native
                    height={220}
                    withDots={false}
                    withShadow={false}
                    withInnerLines={false}
                    withOuterLines={true}
                    //fromZero={true}
                    segments={5}
                    formatYLabel = {(yValue) => {
                        return yValue + ' [g]';
                    }}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#bfbfbf',
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
                    }}
                    />
                <Button title='Back' color='blue' onPress={() => pass3()}/>
            </View>
            </ScrollView>
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