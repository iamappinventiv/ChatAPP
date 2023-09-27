// import React, {useCallback, useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from 'react-native';
// import {useRoute} from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';
// const Chat = () => {
//   const route = useRoute();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     const chatId = route.params.id + route.params.data.userId;

//     const unsubscribe = firestore()
//       .collection('chats')
//       .doc(chatId)
//       .collection('messages')
//       .orderBy('createdAt', 'asc')
//       .onSnapshot(
//         querySnapshot => {
//           const messageList = querySnapshot.docs.map(doc => doc.data());
//           setMessages(prevMessages => [...prevMessages, messageList[0].text]);
//           console.log('Received messages:=======>', messageList);
//           console.log('messages:=======>', messages);
//         },
//         error => {
//           console.error('Error fetching messages:', error);
//         },
//       );

//     return () => unsubscribe();
//   }, [route.params.data.userId, route.params.id]);

//   const onSend = useCallback(async () => {
//     try {
//       if (newMessage.trim() === '') {
//         return;
//       }

//       const chatId = route.params.id + route.params.data.userId;
//       const message = {
//         text: newMessage,
//         createdAt: new Date(),
//         sendBy: route.params.id,
//         sendTo: route.params.data.userId,
//       };
//       console.log('created====>', message.createdAt);

//       await firestore()
//         .collection('chats')
//         .doc(chatId)
//         .collection('messages')
//         .add(message);

//       setNewMessage('');
//       console.log('sent====>', message);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   }, [newMessage, route.params.id, route.params.data.userId]);

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         keyExtractor={item => item.id}
//         renderItem={({item}) => (
//           <View
//             style={[
//               styles.messageContainer,
//               item.sendBy === route.params.id
//                 ? styles.sentMessageContainer
//                 : styles.receivedMessageContainer,
//             ]}>
//             <Text
//               style={[
//                 styles.messageText,
//                 item.sendBy === route.params.id
//                   ? styles.sentMessageText
//                   : styles.receivedMessageText,
//               ]}>
//               {item}
//             </Text>
//           </View>
//         )}
//         inverted={false} // Display messages in reverse order (newest at the bottom)
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Type your message..."
//           value={newMessage}
//           onChangeText={text => setNewMessage(text)}
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={onSend}>
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {GiftedChat} from 'react-native-gifted-chat';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const Chat = () => {
  const route = useRoute();
  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    subscriber.onSnapshot(querysnapshot => {
      const allmessages = querysnapshot.docs.map(item => {
        return {...item._data, createdAt: Date.parse(new Date())};
      });
      setMessagesList(allmessages);
    });
    return () => subscriber();
  }, []);

  const onSend = useCallback((messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userId,
    };
    setMessagesList(previousMessages =>
      GiftedChat.append(previousMessages, myMsg),
    );
    firestore()
      .collection('chats')
      .doc('' + route.params.id + route.params.data.userId)
      .collection('messages')
      .add(myMsg);
    firestore()
      .collection('chats')
      .doc('' + route.params.data.userId + route.params.id)
      .collection('messages')
      .add(myMsg);
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messagesList}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f5f5f5',
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  receivedMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#e1e1e1',
  },
  sentMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#007aff',
  },
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  receivedMessageText: {
    color: 'black',
  },
  sentMessageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007aff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Chat;
