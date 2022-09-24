import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import {colors} from '../../Utils/Colors';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/Fonts';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Button from '../Common/Button';
import NetInfo from '@react-native-community/netinfo';
import Spinner from '../Common/Spinner';
import {Constant, WebServices} from '../../api/ApiRules';
const image = require('../../Images/login.png');

let ForgotPassword = ({navigation, route}) => {
  let [password, setPassword] = useState('');
  let [passError, setPassError] = useState(false);
  let [confirmPass, setConfirmPass] = useState('');
  let [confirmError, setConfirmError] = useState(false);
  let [uid, setUid] = useState(route.params.uid);
  let [loading, setLoading] = useState(false);

  let pressHandler = () => {
    let err = 0;
    if (password === '') {
      err = 1;
      setPassError(true);
    }

    if (confirmPass === '') {
      err = 1;
      setConfirmError(true);
    }

    if (password !== '' && confirmPass !== '' && password !== confirmPass) {
      err = 1;
      setConfirmError(true);
      setPassError(true);
    }

    if (err === 0) {
      let uploadData = {
        userid: uid,
        newpassword: password,
      };
      console.log(uploadData);
      let url = Constant.URL_forgotPassword + '/en';
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
            if (jsonRes.success === 1) {
              apiSuccessfullResponse(jsonRes);
            } else if (jsonRes.success === 0) {
              setLoading(false);
              Alert.alert(
                'Incorrect data',
                "Entered email didn't match any account.",
              );
            }
          })
          .catch(error => {
            console.log(error);
            setLoading(false);
          });
      }
    });
  };

  const apiSuccessfullResponse = async jsonRes => {
    console.log(jsonRes);
    setLoading(false);
    Alert.alert('PCCard', 'Password changed successfully.Please login again.', [
      {
        text: 'Ok',
        onPress: () => navigation.navigate('Login'),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <KeyboardAvoidingView
          style={{width: '100%', height: fonts.deviceHeight}}>
          <Image resizeMode="contain" source={image} style={styles.image} />
          <View style={styles.subContainer}>
            <Text allowFontScaling={false} style={styles.title}>
              Enter Password
            </Text>
            <View style={styles.inputContainer}>
              <Fontisto
                name="locked"
                color={colors.colorWhite}
                size={moderateScale(20)}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor={colors.colorWhite}
                style={styles.textInput}
                keyboardType="default"
                secureTextEntry
                autoCorrect={false}
                autoCapitalize="none"
                allowFontScaling={false}
                onFocus={() => setPassError(false)}
                onChangeText={text => setPassword(text)}
              />
              {passError ? (
                <SimpleLineIcons
                  name="close"
                  color={colors.colorRed}
                  size={moderateScale(20)}
                />
              ) : null}
            </View>
            <View style={styles.inputContainer}>
              <Fontisto
                name="locked"
                color={colors.colorWhite}
                size={moderateScale(20)}
              />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor={colors.colorWhite}
                style={styles.textInput}
                keyboardType="default"
                secureTextEntry
                autoCorrect={false}
                autoCapitalize="none"
                allowFontScaling={false}
                onFocus={() => setConfirmError(false)}
                onChangeText={text => setConfirmPass(text)}
              />
              {confirmError ? (
                <SimpleLineIcons
                  name="close"
                  color={colors.colorRed}
                  size={moderateScale(20)}
                />
              ) : null}
            </View>
            <Button label="Submit" parentCallback={() => pressHandler()} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Spinner visible={loading} />
    </View>
  );
};

let styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.colorBlack,
  },
  image: {
    width: '100%',
    height: moderateScale(250),
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    padding: moderateScale(20),
  },
  title: {
    color: colors.colorWhite,
    fontSize: fonts.title,
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
  },
  inputContainer: {
    width: '100%',
    height: moderateScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.colorWhite,
    borderBottomWidth: moderateScale(1),
    marginVertical: moderateScale(10),
  },
  textInput: {
    flex: 1,
    color: colors.colorWhite,
    paddingHorizontal: moderateScale(10),
  },
});

export default ForgotPassword;
