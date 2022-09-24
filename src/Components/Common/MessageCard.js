/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import moment from 'moment';
import {CometChat} from '@cometchat-pro/react-native-chat';

const MessageCard = ({data, navigation}) => {
  useEffect(() => {
    console.log('data', data);
    CometChat.getUnreadMessageCountForUser(data.conversationWith.uid).then(
      array => {
        console.log('Message count fetched', array);
      },
      error => {
        console.log('Error in getting message count', error);
      },
    );
  }, [1]);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ChatScreen', {data: data.conversationWith})
      }
      activeOpacity={0.8}
      style={styles.container}>
      <Image
        source={{uri: data.lastMessage.receiver.avatar}}
        style={styles.image}
      />
      <View
        style={styles.messageContainer}>
        <View style={styles.messageBox}>
          <Text allowFontScaling={false} style={styles.name}>
            {data.lastMessage.receiver.name}
          </Text>
          {data.lastMessage.deletedBy ? (
            <Text allowFontScaling={false} style={styles.deletedMessage}>
              This message was deleted
            </Text>
          ) : (
            <Text allowFontScaling={false} style={styles.message}>
              {data.lastMessage.text}
            </Text>
          )}
        </View>
        <View style={{alignItems: 'center'}}>
          <Text allowFontScaling={false} style={styles.time}>
            {moment(
              moment
                .unix(data.lastMessage.sentAt)
                .format('MM/DD/YYYY HH:MM:SS'),
            ).fromNow(true)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: moderateScale(80),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(15),
  },
  image: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(40),
  },
  name: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
    fontWeight: 'bold',
  },
  message: {
    color: colors.colorWhite,
    fontSize: fonts.extraSmallText,
    fontWeight: '500',
  },
  deletedMessage: {
    color: colors.colorWhite,
    fontSize: fonts.miniText,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  time: {
    color: colors.colorWhite,
    fontSize: fonts.miniText,
  },
  messageContainer: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: moderateScale(1),
    borderColor: '#FFFFFF80',
  },
  messageBox:{
    flex: 1,
    paddingHorizontal: moderateScale(10),
  },
});

export default MessageCard;
