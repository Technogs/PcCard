import React, {useEffect, useState, useRef} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  Text,
  VirtualizedList,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CometChat} from '@cometchat-pro/react-native-chat';
import ChatCard from '../Common/ChatCard';
import {launchImageLibrary} from 'react-native-image-picker';

const ChatScreen = ({route, navigation}) => {
  let [userData, setUserData] = useState({});
  let [chatUser] = useState(route.params.data);
  let [messages, setMessages] = useState([]);
  let [message, setMessage] = useState('');
  let [messageType, setMessageType] = useState('text');
  let [selectedMedia, setSelectedMedia] = useState({});

  const scrollViewRef = useRef();

  useEffect(() => {
    console.log(route.params.data);
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    AsyncStorage.getItem('userData').then(val => {
      let data = JSON.parse(val);
      setUserData(data);
    });

    CometChat.addMessageListener(
      chatUser.uid,
      new CometChat.MessageListener({
        onTextMessageReceived: textMessage => {
          messages.push(textMessage);
          scrollViewRef.current.scrollToEnd({animated: true});
          console.log('Text message received successfully', textMessage);
        },

        onMediaMessageReceived: mediaMessage => {
          messages.push(mediaMessage);
          scrollViewRef.current.scrollToEnd({animated: true});
          console.log('Media message received successfully', mediaMessage);
        },
        onCustomMessageReceived: customMessage => {
          messages.push(customMessage);
          scrollViewRef.current.scrollToEnd({animated: true});
          console.log('Custom message received successfully', customMessage);
        },
      }),
    );

    let messagesRequest = new CometChat.MessagesRequestBuilder()
      .setUID(chatUser.uid.toString())
      .setLimit(100)
      .build();

    messagesRequest.fetchPrevious().then(
      messages => {
        console.log('messages', messages);
        setMessages(messages);
        setTimeout(() => {
          scrollViewRef.current.scrollToEnd({animated: true});
        }, 10);
      },
      error => {
        console.log('Message fetching failed with error:', error);
      },
    );

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  let send = () => {
    console.log(chatUser);
    if (messageType === 'text') {
      let receiverID = chatUser.uid.toString();
      let receiverType = CometChat.RECEIVER_TYPE.USER;
      let textMessage = new CometChat.TextMessage(
        receiverID,
        message,
        receiverType,
      );

      CometChat.sendMessage(textMessage).then(
        msg => {
          console.log('Message sent successfully:', msg);
          setMessage('');
          messages.push(msg);
          scrollViewRef.current.scrollToEnd({animated: true});
        },
        error => {
          console.log('Message sending failed with error:', error);
        },
      );
    } else {
      let receiverID = chatUser.uid.toString();
      let type = CometChat.MESSAGE_TYPE.FILE;
      let receiverType = CometChat.RECEIVER_TYPE.USER;
      let mediaMessage = new CometChat.MediaMessage(
        receiverID,
        selectedMedia,
        type,
        receiverType,
      );

      CometChat.sendMediaMessage(mediaMessage).then(
        msg => {
          console.log('Media message sent successfully', msg);
          setSelectedMedia({});
          messages.push(msg);
          scrollViewRef.current.scrollToEnd({animated: true});
        },
        error => {
          console.log('Media message sending failed with error', error);
        },
      );
    }
  };

  let pickImage = async () => {
    await launchImageLibrary(
      {mediaType: 'photo', quality: 0, cameraType: 'back'},
      photo => {
        console.log(photo);
        if (photo.didCancel) {
          return;
        }
        let response = photo?.assets[0];
        if (Platform.OS === 'ios' && response.fileName !== undefined) {
          var ext = response.fileName.split('.')[1].toLowerCase();
          var type = this.getMimeType(ext);
          var name = response.fileName;
        } else {
          var type = response.type;
          var name = 'Camera_001.jpeg';
        }
        var file = {
          name: Platform.OS === 'android' ? response.fileName : name,
          type: Platform.OS === 'android' ? response.type : type,
          uri:
            Platform.OS === 'android'
              ? response.uri
              : response.uri.replace('file://', ''),
        };
        setMessageType('file');
        setSelectedMedia(file);
      },
    );
  };

  function onclose() {
    console.log('hi');
    setMessageType('text');
    setSelectedMedia({});
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}>
          <EvilIcons
            name="arrow-left"
            color={colors.colorWhite}
            size={moderateScale(30)}
          />
        </TouchableOpacity>
        <Image source={{uri: chatUser.avatar}} style={styles.image} />
        <View
          style={{
            flex: 1,
            paddingHorizontal: moderateScale(10),
            justifyContent: 'center',
          }}>
          {chatUser.name !== '' && (
            <Text style={{color: colors.colorWhite}}>{chatUser.name}</Text>
          )}
          <Text style={{color: colors.colorWhite}}>{chatUser.username}</Text>
        </View>
      </View>
      <VirtualizedList
        ref={scrollViewRef}
        data={messages}
        initialNumToRender={20}
        renderItem={({item}) => (
          <ChatCard data={item} navigation={navigation} uid={userData.id} />
        )}
        keyExtractor={item => item.id}
        getItemCount={data => data.length}
        getItem={(data, index) => data[index]}
      />
      <View style={{width: '100%', height: moderateScale(50)}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.commentContainer}>
            {messageType === 'file' ? (
              <View style={styles.imageContainer}>
                {/* <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => onclose()}
                  style={{
                    borderRadius: moderateScale(20),
                    backgroundColor: colors.colorPrimary,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 99,
                  }}>
                  <MaterialCommunityIcons
                    name={'close'}
                    size={moderateScale(20)}
                    color={colors.colorWhite}
                  />
                </TouchableOpacity> */}
                <Image
                  resizeMode="contain"
                  source={{uri: selectedMedia.uri}}
                  style={styles.photo}
                />
              </View>
            ) : null}
            <TextInput
              placeholder="Type a message"
              placeholderTextColor={colors.colorWhite}
              style={styles.textInput}
              autoCapitalize="sentences"
              value={message}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({animated: true})
              }
              onChangeText={text => {
                setMessage(text);
                setMessageType('text');
              }}
              onSubmitEditing={() => send()}
            />
            <TouchableOpacity
              onPress={() => pickImage()}
              activeOpacity={0.8}
              style={styles.photoButton}>
              <Foundation
                name={'photo'}
                size={moderateScale(20)}
                color={colors.colorPrimary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => send()}
              activeOpacity={0.8}
              style={styles.sendButton}>
              <MaterialCommunityIcons
                name={'send'}
                size={moderateScale(20)}
                color={colors.colorPrimary}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBlack,
  },
  header: {
    width: '100%',
    height: fonts.headerHeight,
    borderColor: '#2E313C',
    borderBottomWidth: moderateScale(1),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  image: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(40),
    marginHorizontal: moderateScale(10),
  },
  commentContainer: {
    flexDirection: 'row',
    width: '100%',
    height: moderateScale(50),
    padding: moderateScale(5),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.colorWhite,
  },
  textInput: {
    flex: 1,
    color: colors.colorWhite,
    paddingHorizontal: moderateScale(5),
    fontSize: fonts.smallText,
  },
  sendButton: {
    width: moderateScale(40),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.colorGrey,
    borderRadius: moderateScale(5),
  },
  photoButton: {
    width: moderateScale(40),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.colorGrey,
    borderRadius: moderateScale(5),
    marginEnd: moderateScale(10),
  },
  imageContainer: {
    position: 'absolute',
    top: -moderateScale(80),
    width: moderateScale(80),
    height: moderateScale(80),
  },
  photo: {
    width: '100%',
    height: '100%',
  },
});

export default ChatScreen;
