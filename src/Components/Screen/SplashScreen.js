/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StatusBar, StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Languages from '../../lang/i18n';
// import Orientation from 'react-native-orientation';
// import PushNotification from 'react-native-push-notification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import messaging from '@react-native-firebase/messaging';

let logo = require('../../Images/logo.png');
let imageGroup = require('../../Images/splash1.png');

export default class SplashScreen extends Component {
  constructor(props){
    super(props);
    // PushNotification.configure({
    //   onNotification: function (notification) {
    //     if (notification?.userInteraction) {
    //       PushNotification.removeAllDeliveredNotifications();
    //       props.navigation.navigate('MyTabs',{screen: 'Notification'});
    //     }
    //   },
    //   popInitialNotification: true,
    //   requestPermissions: true,
    // });
  }

  componentDidMount(){
    // Orientation.lockToPortrait();
    AsyncStorage.getItem('selectedLang').then(lang => {
      if (lang) {
        Languages.setLanguage(lang);
      }
      else {
        Languages.setLanguage('en');
      }
    });

    // async function requestUserPermission() {
    //   const authStatus = await messaging().requestPermission();
    //   const enabled =
    //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    //   if (enabled) {
    //     console.log('Authorization status:', authStatus);
    //   }
    // }

    // requestUserPermission();

    // PushNotification.createChannel({
    //   channelId: 'default',
    //   channelName: 'defaultChannel',
    //   channelDescription: 'default des',
    //   importance: 5,
    //   vibrate: true,
    //   playSound: true,
    // });

    // messaging()
    //   .getToken()
    //   .then(token => {
    //     AsyncStorage.setItem('deviceToken', token);
    //   });

    // messaging()
    //   .onTokenRefresh(token => {
    //     AsyncStorage.setItem('deviceToken', token);
    //   });

    // messaging().onNotificationOpenedApp(message => {
    //   console.log('onNotification', message.notification);
    //   this.onNotificationPress();
    // });

    // messaging().getInitialNotification(message => {
    //   console.log('initial', message.notification);
    // });

    // messaging().onMessage(message => {
    //   console.log('message', message);
    //   PushNotification.localNotification({
    //     smallIcon: '',
    //     channelId: 'default',
    //     title: message?.data.title,
    //     bigText: message?.data.body,
    //     message: message?.data.body,
    //     importance: 'max',
    //   });
    // });
  }

  // async onNotificationPress() {
  //   await AsyncStorage.getItem('loggedIn').then(val => {
  //     let logged = JSON.parse(val);
  //     if (logged) {
  //       this.props.navigation.navigate('MyTabs',{screen: 'Notification'});
  //     } else {
  //       this.props.navigation.navigate('SplashScreen2');
  //     }
  //   });
  // }

  render(){
    return (
      <>
        <StatusBar backgroundColor={colors.colorBlack} barStyle="light-content" />
        <View style={styles.container}>
          <View>
            <Text allowFontScaling={false} style={styles.topText}>{Languages.splash1.heading}</Text>
            <View style={styles.line} />
          </View>
          <Image resizeMode="contain" source={logo} style={styles.logo} />
          <Image resizeMode="contain" style={styles.bottomImage} source={imageGroup} />
          <TouchableOpacity activeOpacity={0.8} style={styles.cornerBox} onPress={()=>this.props.navigation.navigate('SplashScreen2')}>
            <Icon name={'arrow-right-circle'} size={moderateScale(40)} color={colors.colorWhite} />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.colorBlack,
    paddingTop:moderateScale(20),
    justifyContent:'space-between',
  },
  line: {
    width:'100%',
    height:StyleSheet.hairlineWidth,
    backgroundColor:'#fff',
  },
  topText: {
    fontSize:fonts.extraSmallText,
    color:'#E5E5E5',
    fontWeight: 'bold',
    lineHeight: moderateScale(30),
    letterSpacing: moderateScale(4),
  },
  logo: {
    width: moderateScale(120),
    height: moderateScale(120),
    marginVertical: moderateScale(30),
  },
  text: {
    color: colors.colorWhite,
    fontSize: fonts.extraSmallText,
    fontWeight: 'bold',
    lineHeight: moderateScale(25),
    letterSpacing: moderateScale(4),
  },
  bottomImage: {
    flex:1,
    width:'100%',
  },
  cornerBox: {
    position:'absolute',
    bottom: 0,
    right: 0,
    width:moderateScale(80),
    height:moderateScale(80),
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:colors.colorPrimary,
  },
});