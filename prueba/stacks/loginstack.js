import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import main from '../pages/loginstack/main';
import login from '../pages/loginstack/login';
import registro from '../pages/loginstack/registro';
const Stack = createStackNavigator();
const LoginStack = () => {
  return (
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={main}
        />
        <Stack.Screen
          name="Registro"
          component={registro}
        />
        <Stack.Screen
          name="Login"
          component={login}
        />
      </Stack.Navigator>
  );
};

export default LoginStack;