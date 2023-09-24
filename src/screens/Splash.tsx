import React from 'react';

import {StyleSheet, View, Text} from 'react-native';
import {Color} from '../uikit/color';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chatee</Text>
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
  title: {
    color: '#438875',
    fontSize: 40,
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
  },
});
export default Splash;
