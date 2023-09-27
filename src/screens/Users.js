import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Color} from '../uikit/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
let id = '';
const Users = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [id, setId] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const id = await AsyncStorage.getItem('USERID');
      const email = await AsyncStorage.getItem('EMAIL');

      if (!id || !email) {
        console.error('USERID or EMAIL not found in AsyncStorage');
        return;
      }

      setId(id);

      const querySnapshot = await firestore()
        .collection('users')
        .where('email', '!=', email)
        .get();

      const userData = querySnapshot.docs.map(doc => doc.data());
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => navigation.navigate('Chat', {data: item, id: id})}>
            <MaterialCommunityIcons
              name="account-circle"
              color={Color.green}
              size={60}
            />
            <Text style={styles.nameText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.backgroundColor,
    flex: 1,
  },
  header: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    elevation: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 50,
    color: Color.green,
    fontFamily: 'Poppins-Bold',
  },
  userItem: {
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    height: 60,
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: Color.white,
  },
  nameText: {
    color: 'black',
    fontSize: 40,
    fontFamily: 'Poppins-SemiBold',
  },
});
export default Users;
