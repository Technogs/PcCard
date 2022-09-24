import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';

const ChatCard = ({data, uid}) => {
  let current = uid.toString() === data.rawMessage.sender;
  console.log(data.type, data);
  return (
    <View
      style={{
        width: '100%',
        alignItems: current ? 'flex-end' : 'flex-start',
      }}>
      <View style={current ? styles.senderBox : styles.receiverBox}>
        {(data.category === 'action' && data.action === 'deleted') ||
        data.rawMessage.deletedBy ? (
          <Text>This message was deleted {data.id}</Text>
        ) : data?.type === 'file' ? (
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{uri: data?.data?.url}}
          />
        ) : data?.type === 'Post' ? (
          <View style={styles.postContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{uri: data?.data?.customData?.user?.profilePic}}
                style={styles.profilePic}
                resizeMode="contain"
              />
              <Text>{data?.data?.customData?.user?.username}</Text>
            </View>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={{uri: data?.data?.customData?.postMedia[0].mediaUrl}}
            />
          </View>
        ) : (
          <Text style={styles.message}>{data.text}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  receiverBox: {
    margin: moderateScale(10),
    width: 'auto',
    alignItems: 'flex-start',
    backgroundColor: '#2E313C',
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
  },
  senderBox: {
    margin: moderateScale(10),
    width: 'auto',
    alignItems: 'flex-end',
    backgroundColor: colors.colorPrimary,
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
  },
  message: {
    fontSize: fonts.smallText,
    color: colors.colorBlack,
  },
  image: {
    width: moderateScale(80),
    height: moderateScale(100),
  },
  postContainer: {
    width: moderateScale(80),
    height: moderateScale(150),
    justifyContent: 'space-between',
  },
  profilePic: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(50),
  },
});

export default ChatCard;
