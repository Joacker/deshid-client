import React from 'react';
import { View, Text, StyleSheet, Button, StatusBar, TextInput, TouchableOpacity } from 'react-native';
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
          component={profile}
        />
        <Tab.Screen
          name="Add"
          component={add}
        />
        <Tab.Screen
          name="Resultados"
          component={resultados}
        />
        <Tab.Screen
          name="Soporte"
          component={soporte}
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