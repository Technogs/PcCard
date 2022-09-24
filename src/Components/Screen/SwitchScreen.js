import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {fonts} from '../../Utils/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Languages from '../../lang/i18n';

const SwitchScreen = ({navigation}) => {
  let [userData, setUserData] = useState({});

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    AsyncStorage.getItem('userData').then(val => {
      let data = JSON.parse(val);
      setUserData(data);
    });

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const login = async () => {
    await AsyncStorage.setItem('loggedIn', JSON.stringify(true));
    navigation.navigate('MyTabs');
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View>
          <Image source={{uri: userData.profilePic}} style={styles.image} />
          <View style={styles.check}>
            <Icon
              name="check"
              size={moderateScale(30)}
              color={colors.colorWhite}
            />
          </View>
        </View>
        <Text allowFontScaling={false} style={styles.name}>
          {userData.username}
        </Text>
        <TouchableOpacity
          onPress={() => login()}
          activeOpacity={0.8}
          style={styles.button}>
          <Text allowFontScaling={false} style={styles.buttonText}>
            {Languages.switchScreen.signin}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.switchText} allowFontScaling={false}>
            {Languages.switchScreen.switch}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          height: moderateScale(40),
          alignItems: 'center',
        }}>
        <Text style={styles.text} allowFontScaling={false}>
          {Languages.switchScreen.dont}{' '}
          <Text
            allowFontScaling={false}
            onPress={() => navigation.navigate('Signup')}
            style={{color: colors.colorPrimary, fontWeight: 'bold'}}>
            {Languages.switchScreen.signup}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: colors.colorWhite,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
  },
  check: {
    position: 'absolute',
    right: -moderateScale(10),
    backgroundColor: '#34D357',
    borderRadius: moderateScale(50),
  },
  name: {
    fontSize: fonts.largeText,
    color: colors.colorBlack,
    fontWeight: 'bold',
    marginVertical: moderateScale(15),
  },
  button: {
    width: moderateScale(140),
    height: moderateScale(40),
    backgroundColor: colors.colorPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(50),
    marginBottom: moderateScale(50),
  },
  buttonText: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
    fontWeight: '500',
  },
  switchText: {
    fontSize: fonts.text,
    color: colors.colorPrimary,
    fontWeight: '500',
  },
  text: {
    color: colors.colorBlack,
    fontSize: fonts.text,
    fontWeight: '500',
  },
});

export default SwitchScreen;
