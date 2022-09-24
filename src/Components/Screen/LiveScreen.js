import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  FlatList,
  Alert,
} from 'react-native';
import {colors} from '../../Utils/Colors';
import {moderateScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {fonts} from '../../Utils/Fonts';
// import RtcEngine, {
//   ChannelProfile,
//   ClientRole,
//   RtcLocalView,
//   RtcRemoteView,
//   VideoRenderMode,
// } from 'react-native-agora';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Constant, WebServices} from '../../api/ApiRules';
import NetInfo from '@react-native-community/netinfo';
import requestCameraAndAudioPermission from '../../Utils/Permissions';
import KeepAwake from 'react-native-keep-awake';
import {CometChat} from '@cometchat-pro/react-native-chat';
import Languages from '../../lang/i18n';
import {CommonActions} from '@react-navigation/native';

let height = Dimensions.get('window').height;
let AppId = '30565fe82361456d85800fd8b9b492d2';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export default class LiveScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      userData: {},
      joinSucceed: false,
      peerIds: [],
      sessionId: '',
      liveData: props.route.params.data,
      isHost: false,
      from: props.route.params.from,
      message: '',
      groupjoined: false,
      liked: false,
      messageData: [],
      random: true,
      selectedLang: '',
      count: 0,
    };
    // this._engine = RtcEngine;
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission().then(() => {
        console.log('requested');
      });
    }
  }

  componentDidMount() {
    console.log(this.props.route.params.data);
    let listenerID = 'UNIQUE_LISTENER_ID';
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: textMessage => {
          console.log(textMessage.text);
          this.state.messageData.push(textMessage.text);
          this.setState({random: false});
        },
      }),
    );

    setInterval(() => {
      if (this.state.sessionId !== '') {
        this.getAndSaveCount('get');
      }
    }, 10000);

    AsyncStorage.getItem('selectedLang').then(lang => {
      this.setState({selectedLang: lang});
    });

    AsyncStorage.getItem('userData').then(val => {
      let user = JSON.parse(val);
      this.setState({
        userData: user,
        uid: user.id,
        isHost: this.state.liveData.user_data.id === user.id,
      });
      this.init(user.id);
    });
    KeepAwake.activate();
  }

  getAndSaveCount(cond) {
    if (cond === 'get') {
      AsyncStorage.getItem('userData').then(val => {
        let user = JSON.parse(val);
        AsyncStorage.getItem('selectedLang').then(lang => {
          let data = {
            userId: user.id,
            liveSessionId: this.state.sessionId,
          };
          console.log(this.state.isHost);
          console.log(data);
          let url = Constant.URL_getLiveCount + lang;
          this.postToApiCalling('Post', url, 'getCount', data);
        });
      });
    } else {
      AsyncStorage.getItem('userData').then(val => {
        let user = JSON.parse(val);
        AsyncStorage.getItem('selectedLang').then(lang => {
          let data = {
            userId: this.state.liveData.user_data.id,
            viewerId: user.id,
            liveSessionId: this.state.liveData.id,
          };
          console.log(data);
          let url = Constant.URL_saveLiveCount + lang;
          this.postToApiCalling('Post', url, 'saveCount', data);
        });
      });
    }
  }

  componentWillUnmount() {
    this._engine.destroy();
  }

  // init = async id => {
  //   this._engine = await RtcEngine.create(AppId);
  //   await this._engine.enableVideo();
  //   await this._engine?.setChannelProfile(ChannelProfile.LiveBroadcasting);
  //   await this._engine?.setClientRole(
  //     this.state.isHost ? ClientRole.Broadcaster : ClientRole.Audience,
  //   );
  //   await this._engine.switchCamera();
  //   this.startCall(id);
  //   this._engine.addListener('Warning', warn => {
  //     console.log('Warning', warn);
  //   });

  //   this._engine.addListener('Error', err => {
  //     console.log('Error', err);
  //   });

  //   this._engine.addListener('UserJoined', (uid, elapsed) => {
  //     this.getAndSaveCount('save');
  //     const {peerIds} = this.state;
  //     if (peerIds.indexOf(uid) === -1) {
  //       this.setState({peerIds: [...peerIds, uid]});
  //       var GUID = this.state.liveData.user_data.username;
  //       var password = '';
  //       var groupType = CometChat.GROUP_TYPE.PUBLIC;

  //       CometChat.joinGroup(GUID, groupType, password).then(
  //         group => {
  //           this.setState({groupjoined: true});
  //           console.log('Group joined successfully:', group);
  //         },
  //         error => {
  //           console.log('Group joining failed with exception:', error);
  //         },
  //       );
  //     }
  //   });

  //   this._engine.addListener('UserOffline', (uid, reason) => {
  //     console.log('UserOffline', reason);
  //     const {peerIds} = this.state;
  //     this.setState({peerIds: peerIds.filter(id => id !== uid)});
  //     this.props.navigation.goBack();
  //   });

  //   this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
  //     this.setState({joinSucceed: true});
  //     if (this.state.from === 'new') {
  //       var GUID = this.state.liveData.user_data.username;
  //       var groupName = this.state.liveData.user_data.username;
  //       var groupType = CometChat.GROUP_TYPE.PUBLIC;
  //       var password = '';
  //       var group = new CometChat.Group(GUID, groupName, groupType, password);

  //       CometChat.createGroup(group).then(
  //         res => {
  //           console.log('Group created successfully:', res);
  //           let data = {
  //             userId: this.state.uid,
  //             chatGroupName: res.name,
  //             chatGroupId: res.guid,
  //             token: this.state.liveData.token,
  //             channelName: this.state.liveData.channelName,
  //             userName: this.state.userData.username,
  //           };
  //           console.log(data);
  //           let url = Constant.URL_saveLiveData + '/' + this.state.selectedLang;
  //           this.postToApiCalling('Post', url, 'saveData', data);
  //         },
  //         error => {
  //           console.log('Group creation failed with exception:', error);
  //         },
  //       );
  //     }
  //   });
  // };

  async startCall(id) {
    await this._engine?.joinChannel(
      this.state.liveData.token,
      this.state.liveData.channelName,
      null,
      id,
    );
  }

  // async endCall() {
  //   if (this.state.isHost) {
  //     Alert.alert('PC Cards', Languages.liveScreen.confirm, [
  //       {
  //         text: Languages.liveScreen.yes,
  //         onPress: () => {
  //           this.setState({joinSucceed: false, peerIds: []});
  //           var GUID = this.state.liveData.user_data.username;
  //           CometChat.deleteGroup(GUID).then(
  //             response => {
  //               console.log('Groups deleted successfully:', response);
  //               let data = {liveSessionId: this.state.sessionId};
  //               let url = Constant.URL_endLive + '/' + this.state.selectedLang;
  //               console.log(data);
  //               this.postToApiCalling('Post', url, 'endCall', data);
  //             },
  //             error => {
  //               console.log('Group delete failed with exception:', error);
  //             },
  //           );
  //         },
  //       },
  //       {
  //         text: Languages.liveScreen.no,
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //     ]);
  //   } else {
  //     this.setState({joinSucceed: false, peerIds: []});
  //     this.props.navigation.goBack();
  //   }
  // }

  postToApiCalling(method, apiUrl, apikey, uploadData) {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        new Promise(resolve => {
          if (method === 'Get') {
            resolve(WebServices.get(apiUrl));
          } else {
            resolve(WebServices.applicationService(apiUrl, uploadData));
          }
        })
          .then(jsonRes => {
            console.log(jsonRes);
            if (jsonRes.success === 1) {
              this.apiSuccessfullResponse(jsonRes, apikey);
            } else if (jsonRes.success === 0) {
              console.log(jsonRes.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }

  apiSuccessfullResponse(jsonRes, apikey) {
    if (apikey === 'saveData') {
      console.log(jsonRes);
      this.setState({sessionId: jsonRes.liveSessionId});
    }
    if (apikey === 'endCall') {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Home'}],
        }),
      );
    }
    if (apikey === 'saveCount') {
      console.log(jsonRes);
      this.setState({count: this.state.count + 1});
    }
    if (apikey === 'getCount') {
      this.setState({count: jsonRes.viewCountList.length});
    }
  }

  sendMessage() {
    let receiverID = this.state.liveData.user_data.username;
    let receiverType = CometChat.RECEIVER_TYPE.GROUP;
    let textMessage = new CometChat.TextMessage(
      receiverID,
      this.state.message,
      receiverType,
    );

    CometChat.sendMessage(textMessage).then(
      message => {
        this.state.messageData.push(message.text);
        this.setState({message: ''});
        console.log('Message sent successfully:', message);
      },
      error => {
        console.log('Message sending failed with error:', error);
      },
    );
  }

  renderComment = ({item}) => {
    console.log(item);
    return (
      <View style={styles.commentBox}>
        <Image
          source={{uri: this.state.liveData?.user_data.profilePic}}
          style={{
            width: moderateScale(30),
            height: moderateScale(30),
            borderRadius: moderateScale(15),
          }}
        />
        <View>
          <Text allowFontScaling={false} style={styles.name}>
            {this.state.liveData.user_data.username}
          </Text>
          <Text allowFontScaling={false} style={styles.commentText}>
            {item}
          </Text>
        </View>
      </View>
    );
  };

  // _renderVideos = () => {
  //   return this.state.joinSucceed ? (
  //     <View style={styles.fullView}>
  //       {this.state.isHost ? (
  //         <RtcLocalView.SurfaceView
  //           style={{flex: 1}}
  //           channelId={'lajKevin'}
  //           renderMode={VideoRenderMode.Hidden}
  //           cameraDirection={0}
  //         />
  //       ) : (
  //         <></>
  //       )}
  //       {this._renderRemoteVideos()}
  //     </View>
  //   ) : null;
  // };

  // _renderRemoteVideos = () => {
  //   return (
  //     <ScrollView
  //       style={styles.remoteContainer}
  //       contentContainerStyle={{paddingHorizontal: 2.5}}
  //       horizontal={true}>
  //       {this.state.peerIds.map(value => {
  //         console.log(value);
  //         return (
  //           <RtcRemoteView.SurfaceView
  //             style={styles.remote}
  //             uid={value}
  //             key={value}
  //             channelId={'lajKevin'}
  //             renderMode={VideoRenderMode.Hidden}
  //             zOrderMediaOverlay={true}
  //           />
  //         );
  //       })}
  //     </ScrollView>
  //   );
  // };

  render() {
    return (
      <View style={styles.container}>
        {/* {this._renderVideos()} */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            padding: moderateScale(10),
          }}>
          <View style={styles.topBox}>
            <Image
              source={{uri: this.state.liveData.user_data.profilePic}}
              style={{
                width: moderateScale(30),
                height: moderateScale(30),
                borderRadius: moderateScale(20),
              }}
            />
            <View style={{flex: 1, paddingHorizontal: moderateScale(10)}}>
              <Text allowFontScaling={false} style={styles.live}>
                {Languages.liveScreen.live}
              </Text>
              <Text allowFontScaling={false} style={styles.name}>
                {this.state.liveData.user_data.username}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.endBox}
              onPress={() => this.endCall()}>
              <Text style={styles.endText}>{Languages.liveScreen.end}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewsBox}>
            <Text allowFontScaling={false} style={styles.viewText}>
              {this.state.count} views
            </Text>
          </View>
        </View>

        <FlatList
          style={{
            position: 'absolute',
            bottom: moderateScale(100),
            height: '50%',
          }}
          inverted={true}
          data={this.state.messageData}
          renderItem={this.renderComment}
          keyExtractor={item => item}
        />
        {this.state.isHost ? null : (
          <View style={styles.bottomBox}>
            <TextInput
              placeholder={Languages.liveScreen.placeholder}
              placeholderTextColor={colors.colorWhite}
              autoCapitalize="sentences"
              style={styles.input}
              value={this.state.message}
              onChangeText={text => this.setState({message: text})}
            />
            <TouchableOpacity
              onPress={() => this.setState({liked: !this.state.liked})}
              activeOpacity={0.8}>
              <Ionicons
                name={this.state.liked ? 'ios-heart' : 'ios-heart-outline'}
                color={colors.colorWhite}
                size={moderateScale(25)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.sendMessage()}
              activeOpacity={0.8}>
              <FeatherIcon
                name="send"
                color={colors.colorWhite}
                size={moderateScale(25)}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBlack,
  },
  camera: {
    width: '100%',
    height: height - moderateScale(100),
  },
  bottomBox: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    height: moderateScale(100),
    padding: moderateScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: moderateScale(50),
    padding: moderateScale(10),
    borderColor: '#2E313C',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(50),
  },
  endBox: {
    backgroundColor: colors.colorPrimary,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(50),
  },
  endText: {
    fontSize: fonts.smallText,
    color: colors.colorWhite,
  },
  viewsBox: {
    width: moderateScale(100),
    height: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: colors.colorPrimary,
  },
  viewText: {
    fontSize: fonts.extraSmallText,
    color: colors.colorWhite,
    fontWeight: 'bold',
  },
  topBox: {
    width: '100%',
    height: moderateScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  live: {
    color: '#41FF30',
    fontSize: fonts.extraSmallText,
    fontWeight: 'bold',
  },
  name: {
    color: colors.colorBlack,
    fontSize: fonts.smallText,
    fontWeight: 'bold',
  },
  commentBox: {
    width: '100%',
    height: moderateScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(5),
  },
  commentText: {
    color: colors.colorBlack,
    fontSize: fonts.extraSmallText,
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height - 100,
  },
  remoteContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 5,
  },
  remote: {
    width: dimensions.width,
    height: dimensions.height,
    marginHorizontal: moderateScale(2.5),
  },
});
