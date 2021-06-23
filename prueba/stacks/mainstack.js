import React from 'react';
import { View, Text, StyleSheet, Image,Button, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import profile from '../pages/mainstack/profile';
import resultados from '../pages/mainstack/resultados';
import add from '../pages/mainstack/add';
import soporte from '../pages/mainstack/soporte';
const Tab = createBottomTabNavigator();
const Mainstack = () => {
  return (
    <Tab.Navigator 
    initialRouteName="Profile"
    tabBarOptions={{
      showLabel: false,
      style: { 
        position: 'absolute',
        bottom: 25,
        left: 30,
        right: 20,
        elevation:0,
        backgroundColor: '#ffdead',
        borderRadius: 15,
        height: 90,
        ...styles.shadow
      }
    }}
    >
        <Tab.Screen
          name="Profile"
          component={profile} options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                <Image
                source={require('../assets/user.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height:25,
                  tintColor: focused ? '#e32f45' : '#748c94',
                }}
                />      
              <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                PROFILE
                </Text>
              </View>
            ),
          }}/>
          <Tab.Screen
            name="Add"
            component={add} options={{
              tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                  <Image
                  source={require('../assets/plus.png')}
                  resizeMode='contain'
                  style={{
                    width: 25,
                    height:25,
                    tintColor: focused ? '#e32f45' : '#748c94',
                  }}
                  />      
                <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                  NEWDESHID
                  </Text>
                </View>
              ),
            }}
          />
        <Tab.Screen
          name="Resultados"
          component={resultados} options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                <Image
                source={require('../assets/bar-graph.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height:25,
                  tintColor: focused ? '#e32f45' : '#748c94',
                }}
                />      
              <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                RESULTS
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Soporte"
          component={soporte} options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                <Image
                source={require('../assets/support.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height:25,
                  tintColor: focused ? '#e32f45' : '#748c94',
                }}
                />      
              <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                SUPPORT
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
});
export default Mainstack;