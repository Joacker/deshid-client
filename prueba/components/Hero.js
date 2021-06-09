//import liraries
import React, { Component } from 'react';
import {ImageBackground, View, Text, StyleSheet,TouchableHighlight} from 'react-native';

const image = {uri: "https://raw.githubusercontent.com/ColaDuMacaco/TICs-WarmUp/main/Maqueta/mikasa.png"};
// create a component

class Hero extends Component{
    render() {
    return (
  <View style={styles.profileImgContainer}>
    <ImageBackground source={image} style={styles.profileImgContainer}>
      <Text></Text>
    </ImageBackground>
  </View>
        )
    }
}

const styles = StyleSheet.create({
  profileImgContainer: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 3
  }

});

export default Hero;