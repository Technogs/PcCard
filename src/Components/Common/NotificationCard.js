import React from 'react';
import {TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import moment from 'moment';

const NotificationCard = ({navigation, item}) => {
  let text = item.text;
  let index = text.indexOf(' ');
  let notification = text.slice(index, text.length);
  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.8}>
      <Image source={{uri: item.profilePic}} style={styles.image} />
      <View style={{paddingHorizontal: moderateScale(20)}}>
        <Text style={styles.text}>
          <Text style={{fontWeight: 'bold'}}>{item.username}</Text>
          {notification}
        </Text>
        <Text style={styles.time}>
          {moment(item?.created_at).fromNow(true)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    height: moderateScale(60),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(5),
  },
  image: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(50),
  },
  text: {
    fontSize: fonts.smallText,
    color: colors.colorWhite,
  },
  time: {
    color: '#8F9596',
    fontSize: fonts.extraSmallText,
  },
});

export default NotificationCard;
