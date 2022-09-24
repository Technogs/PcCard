/* eslint-disable prettier/prettier */
import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  Keyboard,
  Alert,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Button from '../Common/Button';
import * as commonFunctions from '../../Utils/CommonFunctions';
import NetInfo from '@react-native-community/netinfo';
import Spinner from '../Common/Spinner';
import {Constant, WebServices} from '../../api/ApiRules';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {authKey} from '../../Utils/CometChatKeys';

const image = require('../../Images/login.png');

const Signup = ({navigation}) => {
  const emailRef = useRef();
  const [data, setData] = useState({
    page: 1,
    email: '',
    username: '',
    password: '',
    userError: '',
    emailError: '',
    passwordError: '',
    deviceToken: '',
    loading: false,
  });

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    AsyncStorage.getItem('deviceToken').then(token => {
      setData({...data, deviceToken:token});
    });

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const pressHandler = () => {
    if (data.page === 1) {
      Keyboard.dismiss();
      if (data.emailError === 'false' && data.userError === 'false') {
        setData({...data, page: 2});
      }
    } else {
      validationAndApiParameters('signup');
    }
  };

  const validationAndApiParameters = apikey => {
    if (apikey === 'signup') {
      let err = 0;

      if (data.password === '') {
        err = 1;
        setData({...data, passwordError: 'true'});
      } else if (data.password.length < 6) {
        err = 1;
        setData({...data, passwordError: 'true'});
      } else {
        setData({...data, passwordError: 'false'});
      }

      if (err === 0) {
        let uploadData = {
          email: data.email,
          username: data.username,
          password: data.password,
          device_type: fonts.deviceType,
          device_token: data.deviceToken,
        };
        console.log(uploadData);
        let url = Constant.URL_signup + '/en';
        console.log(url);
        setData({...data, loading: true});
        postToApiCalling(url, uploadData, apikey);
      }
    }
    if (apikey === 'checkUsername') {
      let err = 0;
      if (data.username === '') {
        err = 1;
        setData({...data, userError: 'true'});
      } else if (!commonFunctions.validateUserName(data.username)) {
        err = 1;
        setData({...data, userError: 'true'});
      }

      if (err === 0) {
        let uploadData = {
          email: '',
          username: data.username,
        };
        console.log(uploadData);
        let url = Constant.URL_checkUnique + '/en';
        setData({...data, loading: true});
        postToApiCalling(url, uploadData, apikey);
      }
    }
    if (apikey === 'checkEmail') {
      let err = 0;
      if (data.email === '') {
        err = 1;
        setData({...data, emailError: 'true'});
      } else if (!commonFunctions.validateEmail(data.email)) {
        err = 1;
        setData({...data, emailError: 'true'});
      } else {
        setData({...data, emailError: 'false'});
      }

      if (err === 0) {
        let uploadData = {
          username: '',
          email: data.email,
        };
        console.log(uploadData);
        let url = Constant.URL_checkUnique + '/en';
        setData({...data, loading: true});
        postToApiCalling(url, uploadData, apikey);
      }
    }
  };

  const postToApiCalling = (apiUrl, uploadData, apikey) => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        new Promise(resolve => {
          resolve(WebServices.applicationService(apiUrl, uploadData));
        })
          .then(jsonRes => {
            setData({...data, loading: false});
            console.log(jsonRes);
            if (apikey == 'checkUsername') {
              if (jsonRes.success == 1) {
                setData({...data, userError: 'true'});
              }
              if (jsonRes.success == 0) {
                setData({...data, userError: 'false'});
              }
            }
            if (apikey == 'checkEmail') {
              if (jsonRes.success == 1) {
                setData({...data, emailError: 'true'});
              }
              if (jsonRes.success == 0) {
                setData({...data, emailError: 'false'});
              }
            }
            if (apikey == 'signup') {
              if (jsonRes.success == 1) {
                apiSuccessfullResponse(jsonRes, apikey);
              }
              if (jsonRes.success == 0) {
                Alert.alert(
                  'Incorrect data',
                  'Entered email or username already exists.',
                );
              }
            }
          })
          .catch(error => {
            console.log(error);
            setData({...data, loading: false});
          });
      }
    });
  };

  const apiSuccessfullResponse = async (jsonRes, apikey) => {
    if (apikey === 'signup') {
      let userData = jsonRes.Pccarduser;
      let user = new CometChat.User(userData.id.toString());
      user.setName(userData.username);
      CometChat.createUser(user, authKey).then(
        user => {
          console.log('User created : ', user);
        },
        error => {
          console.log('Login failed with exception:', {error});
        },
      );
      const firstPair = ['loggedIn', JSON.stringify(true)];
      const secondPair = ['userData', JSON.stringify(jsonRes.Pccarduser)];
      const thirdPair = ['selectedLang','en'];
      await AsyncStorage.multiSet([firstPair, secondPair, thirdPair]);
      navigation.navigate('MyTabs');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <KeyboardAvoidingView
          style={{width: '100%', height: fonts.deviceHeight}}>
          <Image resizeMode="contain" source={image} style={styles.image} />
          <View style={styles.subContainer}>
            <Text allowFontScaling={false} style={styles.title}>
              Sign Up
            </Text>
            <Text allowFontScaling={false} style={styles.subTitle}>
              Pick up a username for your account.
            </Text>
            {data.page === 1 ? (
              <>
                <View style={styles.inputContainer}>
                  <FontAwesome5
                    name="user-alt"
                    color={colors.colorWhite}
                    size={moderateScale(20)}
                  />
                  <TextInput
                    placeholder="Username"
                    placeholderTextColor={colors.colorWhite}
                    style={styles.textInput}
                    blurOnSubmit={false}
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={false}
                    value={data.username}
                    maxLength={12}
                    allowFontScaling={false}
                    onFocus={() => setData({...data, userError: ''})}
                    onChangeText={text => setData({...data, username: text})}
                    onEndEditing={() =>
                      validationAndApiParameters('checkUsername')
                    }
                    onSubmitEditing={() => emailRef.current.focus()}
                  />
                  {data.userError === 'true' ? (
                    <SimpleLineIcons
                      name="close"
                      color={colors.colorRed}
                      size={moderateScale(20)}
                    />
                  ) : data.userError === 'false' ? (
                    <SimpleLineIcons
                      name="check"
                      color={colors.colorGreen}
                      size={moderateScale(20)}
                    />
                  ) : null}
                </View>
                <View style={styles.inputContainer}>
                  <Fontisto
                    name="email"
                    color={colors.colorWhite}
                    size={moderateScale(20)}
                  />
                  <TextInput
                    ref={emailRef}
                    placeholder="Enter your email"
                    placeholderTextColor={colors.colorWhite}
                    style={styles.textInput}
                    keyboardType="email-address"
                    allowFontScaling={false}
                    autoCapitalize="none"
                    autoFocus={false}
                    onChangeText={text => setData({...data, email: text})}
                    onEndEditing={() =>
                      validationAndApiParameters('checkEmail')
                    }
                  />
                  {data.emailError == 'true' ? (
                    <SimpleLineIcons
                      name="close"
                      color={colors.colorRed}
                      size={moderateScale(20)}
                    />
                  ) : data.emailError == 'false' ? (
                    <SimpleLineIcons
                      name="check"
                      color={colors.colorGreen}
                      size={moderateScale(20)}
                    />
                  ) : null}
                </View>
              </>
            ) : (
              <View style={styles.inputContainer}>
                <Fontisto
                  name="locked"
                  color={colors.colorWhite}
                  size={moderateScale(20)}
                />
                <TextInput
                  placeholder="******"
                  secureTextEntry
                  placeholderTextColor={colors.colorWhite}
                  style={styles.textInput}
                  allowFontScaling={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onFocus={() => setData({...data, passwordError: ''})}
                  onChangeText={text => setData({...data, password: text})}
                />
                {data.passwordError == 'true' ? (
                  <SimpleLineIcons
                    name="close"
                    color={colors.colorRed}
                    size={moderateScale(20)}
                  />
                ) : data.passwordError == 'false' ? (
                  <SimpleLineIcons
                    name="check"
                    color={colors.colorGreen}
                    size={moderateScale(20)}
                  />
                ) : null}
              </View>
            )}
            <Button
              label={data.page === 1 ? 'Next' : 'Sign Up'}
              parentCallback={() => pressHandler()}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: moderateScale(80),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              allowFontScaling={false}
              style={{color: colors.colorWhite, fontSize: fonts.smallText}}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Login')}>
              <Text
                allowFontScaling={false}
                style={{color: colors.colorPrimary, fontSize: fonts.smallText}}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Spinner visible={data.loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBlack,
  },
  image: {
    width: '100%',
    height: moderateScale(250),
  },
  subContainer: {
    flex: 1,
    padding: moderateScale(20),
    alignItems: 'center',
  },
  title: {
    color: colors.colorWhite,
    fontSize: fonts.title,
    fontWeight: 'bold',
    marginBottom: moderateScale(5),
  },
  subTitle: {
    color: colors.colorWhite,
    marginVertical: moderateScale(10),
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

export default Signup;
