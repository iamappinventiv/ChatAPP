import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';
import {Color} from '../uikit/color';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Fix the typo here

  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate('Login');
  };

  const buttonPressed = () => {
    registerUser();
  };

  const registerUser = async () => {
    try {
      const userId: string = uuid.v4() as string;
      await firestore().collection('users').doc(userId).set({
        name,
        email,
        password,
        number,
        userId,
      });

      console.log('User Created');
      Alert.alert('User Created Successfully', 'Horray', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
          style: 'default',
        },
      ]);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/Landing.png')}
        resizeMode="contain"
        style={styles.image}>
        <Text style={styles.title}>SignUp</Text>
        <TextInput
          placeholder="Enter Name"
          style={[styles.input, styles.topInput]}
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          placeholder="Enter Email"
          style={[styles.input, styles.allInput]}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholder="Enter Mobile"
          style={[styles.input, styles.allInput]}
          value={number}
          onChangeText={text => setNumber(text)}
        />
        <TextInput
          placeholder="Enter Password"
          style={[styles.input, styles.allInput]}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry // Use secureTextEntry for password input
        />
        <TextInput
          placeholder="Enter Confirm Password"
          style={[styles.input, styles.allInput]}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry // Use secureTextEntry for password input
        />
        <View style={styles.btnContainer}>
          <Button title={'SignUp'} onPress={buttonPressed} />
        </View>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.footerText}>Or Login</Text>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
  },
  title: {
    fontSize: 50,
    color: Color.white,
    alignSelf: 'center',
    marginTop: 30,
    fontFamily: 'Poppins-Bold',
  },
  input: {
    alignSelf: 'center',
    backgroundColor: Color.white,
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 10,
  },
  btnContainer: {
    height: '14%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: Color.white,
    alignSelf: 'center',
    fontSize: 30,
    marginBottom: 40,
    fontFamily: 'Poppins-SemiBold',
    textDecorationLine: 'underline',
  },
  topInput: {
    marginTop: 50,
  },
  allInput: {
    marginTop: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
});

export default SignUp;
