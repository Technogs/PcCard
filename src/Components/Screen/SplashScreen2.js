import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../Utils/Colors';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Languages from '../../lang/i18n';

let logo = require('../../Images/logo.png');
let post = require('../../Images/Splash2.png');

const SplashScreen2 = ({navigation}) => {
  async function onPress() {
    await AsyncStorage.getItem('loggedIn').then(val => {
      let logged = JSON.parse(val);
      if (logged) {
        navigation.navigate('MyTabs');
      } else {
        AsyncStorage.getItem('userData').then(user => {
          let data = JSON.parse(user);
          if (data && data.Is_Active === '1') {
            navigation.navigate('SwitchScreen');
          } else {
            navigation.navigate('Login');
          }
        });
      }
    });
  }

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={logo} style={styles.logo} />
      <Text style={styles.topText}>{Languages.splash2.heading}</Text>
      <Image resizeMode="contain" source={post} style={styles.postImage} />
      <View style={styles.bottomBox}>
        <Text style={styles.bottomText}>{Languages.splash2.bottom}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => onPress()}>
          <Icon
            name={'arrow-right-circle'}
            size={moderateScale(40)}
            color={colors.colorWhite}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: moderateScale(20),
    backgroundColor: colors.colorBlack,
  },
  logo: {
    width: moderateScale(100),
    height: moderateScale(100),
  },
  topText: {
    fontSize: fonts.extraSmallText,
    color: '#E5E5E5',
    fontWeight: 'bold',
    lineHeight: moderateScale(30),
    letterSpacing: moderateScale(4),
    marginVertical: moderateScale(20),
  },
  postImage: {
    width: '100%',
    flex: 1,
  },
  bottomBox: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: moderateScale(90),
    padding: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.colorPrimary,
  },
  bottomText: {
    color: colors.colorWhite,
    fontSize: fonts.extraSmallText,
    fontWeight: 'bold',
    lineHeight: moderateScale(25),
    letterSpacing: moderateScale(4),
  },
});

export default SplashScreen2;
