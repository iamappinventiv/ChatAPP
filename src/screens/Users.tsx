import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color} from '../uikit/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Users = () => {
  const navigation = useNavigation<any>();
  const [users, setUsers] = useState<any>([]);
  const [id, setId] = useState<any>('');
  const [userName, setUserName] = useState<any>('');

  useEffect(() => {
    getUsers();
    loadUserName();
  }, []);

  const loadUserName = async () => {
    try {
      const name = await AsyncStorage.getItem('NAME');
      if (name) {
        setUserName(name);
      }
    } catch (error) {
      console.error('Error loading user name:', error);
    }
  };

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
    <LinearGradient colors={['#4e54c8', '#8f94fb']} style={styles.container}>
      <Text style={styles.headerText}>Welcome, {userName}</Text>
      <FlatList
        data={users}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => navigation.navigate('Chat', {data: item, id: id})}>
            <View style={styles.avatarContainer}>
              <MaterialCommunityIcons
                name="account-circle"
                color={Color.green}
                size={60}
              />
            </View>
            <Text style={styles.nameText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 28,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    paddingHorizontal: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  userItem: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  nameText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Users;
