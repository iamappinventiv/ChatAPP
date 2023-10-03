import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {LANDINGSCREEN, LOGIN, MAINSCREEN, SIGNUP} from '../screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Chat from '../screens/Chat';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const userToken = await AsyncStorage.getItem('USERID');
        if (userToken) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    }

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="MAIN"
              component={MAINSCREEN}
              options={{headerShown: false}}
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
          </>
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
