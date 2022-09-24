import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';

const StoryCard = ({navigation, data, index}) => {
  let [userData, setUserData] = useState({});

  useEffect(() => {
    AsyncStorage.getItem('userData').then(val => {
      let data = JSON.parse(val);
      setUserData(data);
    });
  }, [1]);

  if (index === 0) {
    return (
      <>
        <View style={styles.storyContainer}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              borderWidth: moderateScale(2),
              borderColor: '#3CCA28',
              borderRadius: moderateScale(50),
              padding: moderateScale(2),
            }}
            activeOpacity={0.8}>
            <Image
              source={{uri: userData.profilePic}}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text allowFontScaling={false} style={styles.text}>
            {userData.username}
          </Text>
        </View>
      </>
    );
  }

  return (
    <View style={styles.storyContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Stories', {data: data})}
        style={{
          alignItems: 'center',
          borderWidth: moderateScale(2),
          borderColor: '#3CCA28',
          borderRadius: moderateScale(50),
          padding: moderateScale(2),
        }}
        activeOpacity={0.8}>
        <Image source={{uri: data.profilePic}} style={styles.profileImage} />
      </TouchableOpacity>
      <Text allowFontScaling={false} style={styles.text}>
        {data.username}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  storyContainer: {
    width: moderateScale(70),
    height: moderateScale(85),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(50),
  },
  addBox: {
    position: 'absolute',
    bottom: moderateScale(0),
    right: moderateScale(0),
    backgroundColor: colors.colorPrimary,
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.colorBlack,
    textAlign: 'center',
    fontSize: fonts.extraSmallText,
  },
  liveBox: {
    width: '100%',
    height: moderateScale(18),
    borderRadius: moderateScale(50),
    backgroundColor: '#3CCA28',
    position: 'absolute',
    bottom: -moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveText: {
    color: colors.colorBlack,
    fontSize: fonts.extraSmallText,
    fontWeight: 'normal',
  },
});

export default StoryCard;
