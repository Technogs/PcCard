/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {CommonActions} from '@react-navigation/native';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CometChat} from '@cometchat-pro/react-native-chat';
import Languages from '../../lang/i18n';

const upArrow = require('../../Images/arrow.png');

const SideMenu = ({navigation}) => {

  const logout = async () => {
    let keys = await AsyncStorage.getAllKeys();
    console.log(keys);
    // const index = keys.indexOf('userData');
    // if (index > -1) {
    //   keys.splice(index, 1);
    // }
    // const index2 = keys.indexOf('selectedLang');
    // if (index2 > -1) {
    //   keys.splice(index2, 1);
    // }
    // console.log(keys);
    await AsyncStorage.removeItem('loggedIn');
    await CometChat.logout().then(
      () => {
        console.log('Logout completed successfully');
      },error=>{
        console.log('Logout failed with exception:',{error});
      }
    );
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Login'}],
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.topLine} />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.row}
          onPress={() => {
            navigation.closeDrawer(); navigation.navigate('Promotion');
          }}>
          <Image
            source={upArrow}
            style={{width: moderateScale(20), height: moderateScale(20)}}
            resizeMode="contain"
          />
          <Text style={styles.text} allowFontScaling={false}>
            {Languages.sidemenu.promotion}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.row}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('Bookmarks');
          }}>
          <FeatherIcon
            name="bookmark"
            color={colors.colorWhite}
            size={moderateScale(20)}
          />
          <Text style={styles.text} allowFontScaling={false}>
            {Languages.sidemenu.bookmark}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.row}
          onPress={() => {
            navigation.closeDrawer(); navigation.navigate('Settings');
          }}>
          <AntDesign
            name="setting"
            color={colors.colorWhite}
            size={moderateScale(20)}
          />
          <Text style={styles.text} allowFontScaling={false}>
            {Languages.sidemenu.settings}
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.row}
          onPress={() => {
            navigation.closeDrawer(); navigation.navigate('SupportAndFaq');
          }}>
          <Text style={styles.text2} allowFontScaling={false}>
            {Languages.sidemenu.faq}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.row}
          onPress={() => {
            navigation.closeDrawer(); navigation.navigate('PrivacyPolicy');
          }}>
          <Text style={styles.text2} allowFontScaling={false}>
            {Languages.sidemenu.policy}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoutContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => logout()}>
          <Text allowFontScaling={false} style={styles.logout}>
            {Languages.sidemenu.logout}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: moderateScale(220),
    height: '100%',
    borderTopLeftRadius: moderateScale(25),
    borderBottomLeftRadius: moderateScale(25),
    backgroundColor: '#2E2E2E',
  },
  subContainer: {
    flex: 1,
    padding: moderateScale(20),
    alignItems: 'center',
    borderBottomWidth: moderateScale(1),
    borderColor: '#444A5E',
  },
  topLine: {
    width: moderateScale(40),
    height: moderateScale(4),
    backgroundColor: '#FFFFFF20',
    borderRadius: moderateScale(2),
    marginBottom: moderateScale(20),
  },
  row: {
    width: '100%',
    marginBottom: moderateScale(20),
    flexDirection: 'row',
  },
  text: {
    fontSize: fonts.smallText,
    color: colors.colorWhite,
    fontWeight: '500',
    marginStart: moderateScale(20),
  },
  text2: {
    fontSize: fonts.smallText,
    color: colors.colorWhite,
    fontWeight: '500',
  },
  logoutContainer:{
    width: '100%',
    height: moderateScale(70),
    justifyContent: 'center',
  },
  logout: {
    color: colors.colorPrimary,
    fontSize: fonts.extraLargeText,
    fontWeight: 'bold',
    marginStart: moderateScale(20),
  },
});

export default SideMenu;
