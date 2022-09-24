/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  BackHandler,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import Header from '../Common/BackHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Languages from '../../lang/i18n';

const english = require('../../Images/english.png');
const french = require('../../Images/french.png');

const Language = ({navigation}) => {
  const [lang, setLang] = useState('en');
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    AsyncStorage.getItem('selectedLang').then(val => {
      setLang(val);
    });

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  let saveChanges = async() => {
    Languages.setLanguage(lang);
    await AsyncStorage.setItem('selectedLang',lang);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header label="Language" parentCallback={() => navigation.pop()} />
      <View style={styles.subContainer}>
        <View style={styles.box}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.row}
            onPress={() => setLang('en')}>
            <Image resizeMode="contain" source={english} style={styles.flag} />
            <Text allowFontScaling={false} style={styles.text}>
              English
            </Text>
            {lang === 'en' ? (
              <Icon name="check" size={moderateScale(20)} color="#29ED6C" />
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.row}
            onPress={() => setLang('fr')}>
            <Image resizeMode="contain" source={french} style={styles.flag} />
            <Text allowFontScaling={false} style={styles.text}>
              French
            </Text>
            {lang === 'fr' ? (
              <Icon name="check" size={moderateScale(20)} color="#29ED6C" />
            ) : null}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => saveChanges()}
          style={styles.button}
          activeOpacity={0.8}>
          <Text allowFontScaling={false} style={styles.buttonText}>
            Save
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
    padding: moderateScale(20),
  },
  box: {
    width: '100%',
    height: moderateScale(150),
    backgroundColor: colors.colorWhite,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    marginBottom:moderateScale(20),
  },
  row: {
    flex: 1,
    borderBottomWidth: moderateScale(1),
    borderColor: '#DEE8EE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flag: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  text: {
    flex: 1,
    fontSize: fonts.smallText,
    paddingHorizontal: moderateScale(15),
  },
  button: {
    width: '100%',
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(10),
    backgroundColor: colors.colorPrimary,
  },
  buttonText: {
    color: colors.colorWhite,
    fontSize: fonts.text,
    fontWeight: 'bold',
  },
});

export default Language;
