//import liraries
import React from 'react';
import {
  StyleSheet
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginStack from './stacks/loginstack';
// create a component

/*const HomeScreen = () => {
  return (
    <View style ={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>
    </View>
  );
};
*/
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginStack">
        <Stack.Screen
          name="LoginStack"
          component={LoginStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
/*
class App extends Component {
  render() {
    return (
      <View style={{ flex: 1, padding: 5 }}>
        <Heading />
        <Hero />
      </View>
    );
  }
}
*/

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default App;