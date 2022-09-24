import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';

const PostFollowMessage = ({data, sentMessageTo, onsend}) => {
  console.log('sentMessageTo', sentMessageTo);
  return (
    <View style={styles.container}>
      <View style={styles.userDetailBox}>
        <Image
          resizeMode="contain"
          source={{uri: data?.user?.profilePic}}
          style={styles.profilePic}
        />
        <View>
          <Text style={styles.name}>{data?.user?.name}</Text>
          <Text style={styles.username}>{data?.user?.username}</Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onsend(data.following_pcuserid)}
        style={styles.buttonBox}>
        <Text style={styles.buttonText}>
          {sentMessageTo.includes(data.following_pcuserid) ? 'Sent' : 'Send'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

let styles = StyleSheet.create({
  container: {
    width: '100%',
    height: moderateScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userDetailBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(50),
    marginHorizontal: moderateScale(10),
  },
  name: {
    fontSize: fonts.text,
    color: colors.colorWhite,
  },
  username: {
    fontSize: fonts.smallText,
    color: colors.colorWhite,
  },
  buttonBox: {
    width: moderateScale(50),
    height: moderateScale(30),
    borderRadius: moderateScale(5),
    backgroundColor: colors.colorPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
  },
});

export default PostFollowMessage;
