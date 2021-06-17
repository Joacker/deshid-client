//import liraries
import React from 'react';
import {
  StyleSheet
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginStack from './stacks/loginstack';
import MainStack from './stacks/mainstack';

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
        <Stack.Screen
          name="MainStack"
          component={MainStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});
//make this component available to the app
export default App;