/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {appID,region} from './src/Utils/CometChatKeys';
// import PushNotification from 'react-native-push-notification';
// import messaging from '@react-native-firebase/messaging';

// PushNotification.createChannel({
//   channelId: 'default',
//   channelName: 'defaultChannel',
//   channelDescription: 'default des',
//   importance: 5,
//   vibrate: true,
//   playSound: true,
// });

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
//   PushNotification.localNotification({
//     smallIcon: '',
//     channelId: 'default',
//     title: remoteMessage?.data.title,
//     bigText: remoteMessage?.data.body,
//     message: remoteMessage?.data.body,
//     importance: 'max',
//   });
// });


const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();
CometChat.init(appID, appSetting).then(
  () => {
    console.log('Initialization completed successfully');
    // You can now call login function.
  },
  (error) => {
    console.log('Initialization failed with error:', error);
    // Check the reason for error and take appropriate action.
  },
);

AppRegistry.registerComponent(appName, () => App);
