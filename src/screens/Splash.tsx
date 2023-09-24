import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';

import {StyleSheet, View, Text} from 'react-native';
import {Color} from '../uikit/color';

const Splash = () => {
  const navigation = useNavigation<any>();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('LandingScreen');
    }, 2000);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chatee</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.backgroundColor,
  },
  text: {
    color: '#438875',
    fontSize: 40,
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
  },
});
export default Splash;
