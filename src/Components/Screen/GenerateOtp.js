import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {colors} from '../../Utils/Colors';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/Fonts';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Button from '../Common/Button';
import * as commonFunctions from '../../Utils/CommonFunctions';
import NetInfo from '@react-native-community/netinfo';
import Spinner from '../Common/Spinner';
import {Constant, WebServices} from '../../api/ApiRules';

const image = require('../../Images/login.png');

let GenerateOtp = ({navigation}) => {
  let [data, setData] = useState({
    email: '',
    emailError: false,
    loading: false,
  });

  let pressHandler = () => {
    let err = 0;
    if (data.email === '') {
      err = 1;
      setData({...data, emailError: true});
    } else if (!commonFunctions.validateEmail(data.email)) {
      err = 1;
      setData({...data, emailError: true});
    }

    if (err === 0) {
      let uploadData = {
        email: data.email,
      };
      console.log(uploadData);
      let url = Constant.URL_generateOtp + '/en';
      setData({...data, loading: true});
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
              setData({...data, loading: false});
              Alert.alert(
                'Incorrect data',
                "Entered email didn't match any account.",
              );
            }
          })
          .catch(error => {
            console.log(error);
            setData({...data, loading: false});
          });
      }
    });
  };

  const apiSuccessfullResponse = async jsonRes => {
    console.log(jsonRes);
    setData({...data, loading: false});
    navigation.navigate('OtpScreen', {data: jsonRes.generateOtp});
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <KeyboardAvoidingView
          style={{width: '100%', height: fonts.deviceHeight}}>
          <Image resizeMode="contain" source={image} style={styles.image} />
          <View style={styles.subContainer}>
            <Text allowFontScaling={false} style={styles.title}>
              Generate Otp
            </Text>
            <View style={styles.inputContainer}>
              <Fontisto
                name="email"
                color={colors.colorWhite}
                size={moderateScale(20)}
              />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={colors.colorWhite}
                style={styles.textInput}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                allowFontScaling={false}
                onFocus={() => setData({...data, emailError: false})}
                onChangeText={text => setData({...data, email: text})}
              />
              {data.emailError ? (
                <SimpleLineIcons
                  name="close"
                  color={colors.colorRed}
                  size={moderateScale(20)}
                />
              ) : null}
            </View>
            <Button label="Submit" parentCallback={() => pressHandler()} />
          </View>
          <View
            style={{
              width: '100%',
              height: moderateScale(80),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.pop()}>
              <Text
                allowFontScaling={false}
                style={{color: colors.colorPrimary, fontSize: fonts.smallText}}>
                Back to Login
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Spinner visible={data.loading} />
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

export default GenerateOtp;
