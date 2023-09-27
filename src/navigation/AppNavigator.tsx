import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {LANDINGSCREEN, LOGIN, MAINSCREEN, SIGNUP} from '../screens';
import TabNavigator from './TabNavigator';
import Chat from '../screens/Chat';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LandingScreen"
          component={LANDINGSCREEN}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SIGNUP}
          options={{headerShown: false, headerLeft: () => null}}
        />
        <Stack.Screen
          name="Login"
          component={LOGIN}
          options={{headerShown: false, headerLeft: () => null}}
        />
        <Stack.Screen
          name="Main"
          component={MAINSCREEN}
          options={{headerShown: false, headerLeft: () => null}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
