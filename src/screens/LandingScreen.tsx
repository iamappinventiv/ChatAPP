import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Color} from '../uikit/color';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';

const LandingScreen = () => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require('../assets/images/Landing.png')} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.midText}>
          {
            'Break the\nboundaries and connect with\npeople all over the\nworld '
          }
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <Button title={'Get Started'} onPress={handlePress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
    flexDirection: 'column',
  },
  textContainer: {
    flex: 2.4,
    alignItems: 'center',
    width: '100%',
  },
  imgContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnContainer: {
    height: '14%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  midText: {
    color: 'white',
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
  },
});
export default LandingScreen;
