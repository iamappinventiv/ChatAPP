import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import {Color} from '../uikit/color';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation<any>();
  const handlePress = () => {
    navigation.navigate('SignUp');
  };
  const buttonPressed = async () => {
    loginUser();
  };
  const loginUser = () => {
    setVisible(true);
    firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(res => {
        setVisible(false);
        if (res.docs) {
          goToNext(
            res.docs[0].data().name,
            res.docs[0].data().email,
            res.docs[0].data().userId,
          );
        } else {
          Alert.alert('User Not Found');
        }
      })
      .catch(error => {
        setVisible(false);
        console.log(error);
        Alert.alert('User Not Found', 'Please Create Account');
      });
    const goToNext = async (name: string, email: string, userId: string) => {
      await AsyncStorage.setItem('NAME', name);
      await AsyncStorage.setItem('EMAIL', email);
      await AsyncStorage.setItem('USERID', userId);
      navigation.navigate('Main');
    };
  };
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/Landing.png')}
          resizeMode="contain"
          style={styles.image}>
          <Text style={styles.title}>Login </Text>

          <TextInput
            placeholder="Enter Email"
            style={[styles.input, styles.allInput]}
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <TextInput
            placeholder="Enter Password"
            style={[styles.input, styles.allInput]}
            value={password}
            onChangeText={text => setPassword(text)}
          />

          <View style={styles.btnContainer}>
            <Button title={'Login'} onPress={buttonPressed} />
          </View>
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.footerText}>Or SignUp</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <Loader visible={visible} />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    color: Color.white,
    alignSelf: 'center',
    marginTop: 100,
    fontFamily: 'Poppins-Bold',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
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
    marginTop: 30,
  },
  allInput: {
    marginTop: 20,
  },
});

export default Login;
