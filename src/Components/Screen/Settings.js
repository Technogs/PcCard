/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  BackHandler,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import Header from '../Common/BackHeader';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {fonts} from '../../Utils/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Languages from '../../lang/i18n';
import {CometChat} from '@cometchat-pro/react-native-chat';

const Settings = ({navigation}) => {
  let [userData, setUserData] = useState({});

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    AsyncStorage.getItem('userData').then(val => {
      let user = JSON.parse(val);
      setUserData(user);
    });

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [1]);

  const logout = async () => {
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

  const switchAccount = async ()=>{
    // let keys = await AsyncStorage.getAllKeys();
    // console.log(keys);
    // const index = keys.indexOf('userData');
    // if (index > -1) {
    //   keys.splice(index, 1);
    // }
    // await AsyncStorage.multiRemove(keys);
    await AsyncStorage.removeItem('loggedIn');
    await CometChat.logout().then(
      () => {
        console.log("Logout completed successfully");
      },error=>{
        console.log("Logout failed with exception:",{error});
      }
    );
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'SwitchScreen'}],
      }),
    );
  }

  return (
    <View style={styles.container}>
      <Header label={Languages.settings.header} parentCallback={() => navigation.pop()} />
      <View style={styles.subContainer}>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Language')}>
          <Icon
            name="language"
            size={moderateScale(25)}
            color={colors.colorWhite}
          />
          <Text allowFontScaling={false} style={styles.text}>
            {Languages.settings.language}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ChangePassword')}>
          <Icon
            name="lock-closed-outline"
            size={moderateScale(25)}
            color={colors.colorWhite}
          />
          <Text allowFontScaling={false} style={styles.text}>
            {Languages.settings.password}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('NotificationSetting')}>
          <Icon
            name="notifications-outline"
            size={moderateScale(25)}
            color={colors.colorWhite}
          />
          <Text allowFontScaling={false} style={styles.text}>
            {Languages.settings.notification}
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.8}
          onPress={logout}>
          <Text style={styles.text3} allowFontScaling={false}>
            {Languages.settings.logout}
            <Text style={styles.text2} allowFontScaling={false}>
              {' '}
              @{userData.username}
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>switchAccount()} style={styles.row} activeOpacity={0.8}>
          <Text style={styles.text2} allowFontScaling={false}>
            {Languages.settings.switch}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBlack,
  },
  subContainer: {
    flex: 1,
    padding: moderateScale(25),
  },
  row: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: moderateScale(10),
  },
  text: {
    color: colors.colorWhite,
    fontSize: fonts.largeText,
    fontWeight: 'bold',
    marginStart: moderateScale(20),
  },
  text2: {
    color: colors.colorBlue,
    fontSize: fonts.text,
    fontWeight: 'bold',
  },
  text3: {
    color: colors.colorWhite,
    fontSize: fonts.text,
    fontWeight: 'bold',
  },
});

export default Settings;
