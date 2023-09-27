import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Color} from '../uikit/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';

const Settings = () => {
  const navigation = useNavigation<any>();
  const [loggedIn, setLoggedIn] = useState(true);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('NAME');
      await AsyncStorage.removeItem('EMAIL');
      await AsyncStorage.removeItem('USERID');
      setLoggedIn(false);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Are you sure want to\nLogout?'}</Text>

      {loggedIn && (
        <View style={styles.btnContainer}>
          <Button title="Log Out" onPress={handleLogout} />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
  },

  title: {
    fontSize: 30,
    color: Color.white,
    alignSelf: 'center',
    marginTop: 100,
    fontFamily: 'Poppins-Bold',
  },
  btnContainer: {
    flex: 2,
    height: '14%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    flexDirection: 'row',
  },
});
export default Settings;
