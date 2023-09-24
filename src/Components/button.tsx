import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
interface ButtonProps {
  title: string;
  onPress: () => void;
}
const Button: React.FC<ButtonProps> = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.btnTxt}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: '80%',
    height: 50,
    backgroundColor: '#438875',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },
  btnTxt: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
});
export default Button;
