import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';

const Chat = () => {
  const route = useRoute<any>();
  const [messagesList, setMessagesList] = useState<any>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const recieverId = route.params.id + route.params.data.userId;
    const subscriber: any = firestore()
      .collection('chats')
      .doc(recieverId)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    subscriber.onSnapshot((querysnapshot: {docs: any[]}) => {
      const allmessages = querysnapshot.docs.map(item => {
        return {...item._data, createdAt: item._data.createdAt};
      });
      setIsTyping(false);
      setMessagesList(allmessages);
    });
    return () => subscriber;
  }, [route.params.id, route.params.data.userId]);

  const onSend = useCallback(
    (messages = []) => {
      const onSendSender = '' + route.params.id + route.params.data.userId;
      const onSendReceiver = '' + route.params.data.userId + route.params.id;
      const msg: any = messages[0];
      const myMsg: any = {
        ...msg,
        sendBy: route.params.id,
        sendTo: route.params.data.userId,
        createdAt: Date.parse(msg.createdAt),
      };

      setMessagesList((previousMessages: IMessage[] | undefined) =>
        GiftedChat.append(previousMessages, myMsg),
      );
      firestore()
        .collection('chats')
        .doc(onSendSender)
        .collection('messages')
        .add(myMsg);
      firestore()
        .collection('chats')
        .doc(onSendReceiver)
        .collection('messages')
        .add(myMsg);
    },

    [route.params.data.userId, route.params.id],
  );

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messagesList}
        onSend={messages => onSend(messages)}
        user={{_id: route.params.id}}
        isTyping={isTyping}
        onInputTextChanged={text => {
          const typing = text.length > 0;
          setIsTyping(typing);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
