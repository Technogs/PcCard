/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  BackHandler,
  Alert,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import Header from '../Common/BackHeader';
import Spinner from '../Common/Spinner';
import NetInfo from '@react-native-community/netinfo';
import {Constant, WebServices} from '../../api/ApiRules';
import Languages from '../../lang/i18n';

const ChangePassword = ({navigation}) => {
  let [oldPass, setOldPass] = useState('');
  let [newPass, setNewPass] = useState('');
  let [confirmPass, setConfirmPass] = useState('');
  let [uid, setUid] = useState('');
  let [loading, setLoading] = useState(false);
  let [selectedLang, setSelectedLang] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userData').then(val => {
      let userData = JSON.parse(val);
      setUid(userData.id);
    });
    AsyncStorage.getItem('selectedLang').then(lang => {
      setSelectedLang(lang);
    });
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const changePassword = () => {
    let err = 0;

    if (newPass === '' && confirmPass === '' && oldPass === '') {
      err = 1;
      Alert.alert('Password Error', 'Please enter passwords');
    } else if (newPass === '') {
      err = 1;
      Alert.alert('Password Error', 'Please enter new password');
    } else if (confirmPass === '') {
      err = 1;
      Alert.alert('Password Error', 'Please re-enter new password');
    } else if (oldPass === '') {
      err = 1;
      Alert.alert('Password Error', 'Please enter old password');
    } else if (newPass.length < 8) {
      err = 1;
      Alert.alert(
        'Password Error',
        'Password cannot be less than 8 characters.',
      );
    } else if (newPass !== confirmPass) {
      err = 1;
      Alert.alert('Password Error', "Entered passwords didn't match");
    }
    if (err === 0) {
      let uploadData = {
        userid: uid,
        oldpassword: oldPass,
        newpassword: newPass,
      };
      let url = Constant.URL_changePassword + '/' + selectedLang;
      console.log(uploadData);
      setLoading(true);
      postToApiCalling(url, uploadData);
    }
  };

  const postToApiCalling = (apiUrl, uploadData) => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        new Promise(resolve => {
          resolve(WebServices.applicationService(apiUrl, uploadData));
        })
          .then(jsonRes => {
            console.log(jsonRes);
            if (jsonRes.code === '1') {
              apiSuccessfullResponse(jsonRes);
            } else if (jsonRes.code === '2') {
              setLoading(false);
            }
          })
          .catch(error => {
            console.log(error);
            setLoading(false);
          });
      }
    });
  };

  const apiSuccessfullResponse = jsonRes => {
    setLoading(false);
    setOldPass('');
    setNewPass('');
    setConfirmPass('');
    AsyncStorage.setItem('userData', JSON.stringify(jsonRes.userData));
    Alert.alert('Success', 'Password changed successfully.');
  };

  return (
    <View style={styles.container}>
      <Header label={Languages.changePassword.heading} parentCallback={() => navigation.pop()} />
      <View style={styles.subContainer}>
        <View style={styles.box}>
          <Text allowFontScaling={false} style={styles.smallText}>
            {Languages.changePassword.subHeading1}
          </Text>
          <TextInput
            placeholder={Languages.changePassword.placeholder1}
            placeholderTextColor={colors.colorBlack}
            style={styles.textInput}
            secureTextEntry
            allowFontScaling={false}
            autoCapitalize="none"
            autoCorrect={false}
            value={oldPass}
            keyboardType="default"
            onChangeText={text => setOldPass(text)}
          />
          <Text allowFontScaling={false} style={styles.smallText}>
            {Languages.changePassword.subHeading2}
          </Text>
          <TextInput
            placeholder={Languages.changePassword.placeholder2}
            placeholderTextColor={colors.colorBlack}
            style={styles.textInput}
            secureTextEntry
            allowFontScaling={false}
            autoCapitalize="none"
            autoCorrect={false}
            value={newPass}
            keyboardType="default"
            onChangeText={text => setNewPass(text)}
          />
          <Text allowFontScaling={false} style={styles.smallText}>
            {Languages.changePassword.subHeading3}
          </Text>
          <TextInput
            placeholder={Languages.changePassword.placeholder3}
            placeholderTextColor={colors.colorBlack}
            style={styles.textInput}
            secureTextEntry
            allowFontScaling={false}
            autoCapitalize="none"
            autoCorrect={false}
            value={confirmPass}
            keyboardType="default"
            onChangeText={text => setConfirmPass(text)}
          />
        </View>
        <TouchableOpacity
          onPress={() => changePassword()}
          style={styles.button}
          activeOpacity={0.8}>
          <Text allowFontScaling={false} style={styles.buttonText}>
            {Languages.changePassword.buttonText}
          </Text>
        </TouchableOpacity>
      </View>
      <Spinner visible={loading} />
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
    backgroundColor: colors.colorWhite,
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(20),
    padding: moderateScale(10),
    justifyContent: 'space-between',
  },
  smallText: {
    fontSize: fonts.miniText,
    color: '#8F9596',
  },
  textInput: {
    color: colors.colorBlack,
    fontSize: fonts.text,
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

export default ChangePassword;
