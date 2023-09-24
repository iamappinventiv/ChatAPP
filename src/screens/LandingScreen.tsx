import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color} from '../uikit/color';

const LandingScreen = () => {
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
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnTxt}>Get Started</Text>
        </TouchableOpacity>
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
  btn: {
    width: '80%',
    height: '50%',
    backgroundColor: '#438875',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },
  textContainer: {
    flex: 2.5,
    alignItems: 'center',
  },
  imgContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  btnContainer: {
    flex: 1,
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
