import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
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

let OtpScreen = ({navigation, route}) => {
  let [data, setData] = useState({
    otp: route.params.data.code.toString(),
    uid: route.params.data.id,
    otpError: false,
    loading: false,
  });

  let pressHandler = () => {
    navigation.navigate('ForgotPassword', {uid: data.uid});
    // let err = 0
    // if(data.otp == ''){
    //     err=1
    //     setData({...data,otpError:true})
    // }

    // if(err == 0 ){
    //     let uploadData = {
    //         otp:data.otp,
    //     }
    //     console.log(uploadData);
    //     // setData({...data,loading:true})
    //     // postToApiCalling(Constant.URL_generateOtp,uploadData)
    // }
  };

  // const postToApiCalling = (apiUrl, uploadData) =>{
  //     NetInfo.fetch().then(state => {
  //         if(state.isConnected){
  //             new Promise((resolve) => {
  //                 resolve(WebServices.applicationService(apiUrl, uploadData));
  //             }).then((jsonRes) => {
  //                 console.log(jsonRes);
  //                 if( jsonRes.success == 1){
  //                     apiSuccessfullResponse(jsonRes)
  //                 }
  //                 else if( jsonRes.success==0 ){
  //                     setData({...data,loading:false})
  //                     Alert.alert('Incorrect data',"Entered email didn't match any account.")
  //                 }
  //             }).catch((error) => {
  //                 console.log(error);
  //                 setData({...data,loading:false})
  //             })
  //         }
  //     })
  // }

  // const apiSuccessfullResponse = async ( jsonRes ) => {
  //     console.log(jsonRes);
  //     setData({...data,loading:false})
  //     navigation.navigate('OtpScreen',{data:jsonRes.generateOtp})
  // }

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <KeyboardAvoidingView
          style={{width: '100%', height: fonts.deviceHeight}}>
          <Image resizeMode="contain" source={image} style={styles.image} />
          <View style={styles.subContainer}>
            <Text allowFontScaling={false} style={styles.title}>
              Enter Otp
            </Text>
            <View style={styles.inputContainer}>
              <Fontisto
                name="locked"
                color={colors.colorWhite}
                size={moderateScale(20)}
              />
              <TextInput
                placeholder="Enter otp"
                placeholderTextColor={colors.colorWhite}
                style={styles.textInput}
                keyboardType="phone-pad"
                autoCorrect={false}
                defaultValue={data.otp}
                editable={false}
                autoCapitalize="none"
                allowFontScaling={false}
                onFocus={() => setData({...data, otpError: false})}
                onChangeText={text => setData({...data, email: text})}
              />
              {data.otpError ? (
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

export default OtpScreen;
