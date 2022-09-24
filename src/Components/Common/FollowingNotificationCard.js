import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import moment from 'moment';

const FollowingNotificationCard = ({navigation, item}) => {
  let text = item.text;
  let index = text.indexOf(' ');
  let notification = text.slice(index, text.length);
  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.8}>
      <Image source={{uri: item.profilePic}} style={styles.image} />
      <View style={styles.textBox}>
        <Text style={styles.text}>
          <Text style={styles.name}>{item.username}</Text> {notification}
        </Text>
        <Text style={styles.time}>
          {moment(item?.created_at).fromNow(true)}
        </Text>
      </View>
      {/* <View style={styles.box} /> */}
      {/* <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <Text style={styles.followText}>Follow</Text>
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  image: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(50),
  },
  textBox: {
    paddingHorizontal: moderateScale(20),
    flex: 1,
  },
  text: {
    fontSize: fonts.smallText,
    color: colors.colorWhite,
  },
  name: {
    fontWeight: 'bold',
  },
  time: {
    color: '#8F9596',
    fontSize: fonts.extraSmallText,
  },
  box: {
    width: moderateScale(70),
    height: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: moderateScale(70),
    height: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.colorPrimary,
    borderRadius: moderateScale(70),
  },
  followText: {
    fontSize: fonts.smallText,
    color: colors.colorBlack,
  },
});

export default FollowingNotificationCard;
