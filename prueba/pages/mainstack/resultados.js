//import liraries
import { View, Text, StyleSheet, Button, StatusBar, TextInput,
    SafeAreaView,
    Dimensions,
    ScrollView,TouchableHighlight } from 'react-native';
import React, { Component } from 'react';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
  } from 'react-native-chart-kit';
import ProgressCircle from 'react-native-progress-circle'
import { render } from 'react-native-web';
// create a component
const Resultados = () => {
  return(
    <View style={{alignItems:'center',flex:1,marginTop:100,marginBottom:200,flexDirection:'column'}}>
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
      }}>850g</Text>
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
      }}>25°C</Text>
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
  /*return(
    <TouchableHighlight
    style = {{
      borderRadius: 45,
      width: 45,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#f00',
      alignItems: 'center'
    }}
    underlayColor = '#ccc'
    onPress = { () => alert('Yaay!') }
    >
    <Text> Mom, look, I am a circle! </Text>
   </TouchableHighlight>
  );*/  )
    };

// define your styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: 10,
    },
    header: {
      textAlign: 'center',
      fontSize: 18,
      padding: 16,
      marginTop: 16,
    },
  });

//make this component available to the app
export default Resultados;
