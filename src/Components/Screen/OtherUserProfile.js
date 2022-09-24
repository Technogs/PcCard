import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import Header from '../Common/BackHeader';
import {Constant, WebServices} from '../../api/ApiRules';
import NetInfo from '@react-native-community/netinfo';
import {fonts} from '../../Utils/Fonts';
import Spinner from '../Common/Spinner';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FolderSection from '../Common/FolderSection';
import ListSection from '../Common/ListSection';
import {CometChat} from '@cometchat-pro/react-native-chat';

const OtherUserProfile = ({navigation, route}) => {
  let [uid, setUid] = useState('');
  let [otherUserId, setOtherUserId] = useState(route.params.item);
  let [userData, setUserData] = useState({});
  let [userPosts, setUserPosts] = useState([]);
  let [collections, setCollectionData] = useState([]);
  let [followers, setFollowers] = useState(0);
  let [following, setFollowing] = useState(0);
  let [follow, setFollow] = useState();
  let [loading, setLoading] = useState(false);
  let [selectedLang, setSelectedLang] = useState('');
  let [selectedTab, setSelectedTab] = useState(1);
  let [followingList, setFollowingList] = useState([]);
  let [followerList, setFollowerList] = useState([]);

  useEffect(() => {
    if (route?.params?.tab === undefined) {
      setSelectedTab(1);
    } else {
      setSelectedTab(route?.params?.tab);
    }
    AsyncStorage.getItem('userData').then(val => {
      let users = JSON.parse(val);
      setUid(users.id);
      AsyncStorage.getItem('selectedLang').then(lang => {
        setSelectedLang(lang);
        validationAndApiParameters('getData', users.id, lang);
      });
    });
  }, [1]);

  const validationAndApiParameters = (apikey, val, lang) => {
    if (apikey === 'getData') {
      let url =
        Constant.URL_userDetails +
        '/' +
        lang +
        '?id=' +
        otherUserId +
        '&selfId=' +
        val;
      console.log(url);
      postToApiCalling('Get', apikey, url);
    }
  };

  const postToApiCalling = (method, apikey, apiUrl, uploadData) => {
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
            setLoading(false);
            if (jsonRes.success === 1) {
              apiSuccessfullResponse(jsonRes, apikey);
            } else if (jsonRes.success === 0) {
              console.log(jsonRes);
            }
          })
          .catch(error => {
            setLoading(false);
            console.log(error);
          });
      }
    });
  };

  let apiSuccessfullResponse = (jsonRes, apikey) => {
    if (apikey === 'getData') {
      console.log(jsonRes);
      setUserData(jsonRes.user);
      setUserPosts(jsonRes.userposts);
      setCollectionData(jsonRes.collectionsData);
      setFollowers(jsonRes.Followers);
      setFollowing(jsonRes.Followings);
      setFollow(jsonRes.user.isFollow === 1);
      setFollowerList(jsonRes.FollowersList);
      setFollowingList(jsonRes.FollowingsList);
    }
    if (apikey === 'followUser') {
      setFollow(!follow);
    }
    if (apikey === 'unfollowUser') {
      setFollow(!follow);
    }
  };

  let onFollowPress = () => {
    if (follow) {
      let unfollowData = {
        pcuserid: uid,
        following_pcuserid: otherUserId,
      };
      let url = Constant.URL_unfollowUsers + '/' + selectedLang;
      setLoading(true);
      postToApiCalling('Post', 'unfollowUser', url, unfollowData);
    } else {
      let followData = {
        pcuserid: uid,
        following_pcuserid: otherUserId,
      };
      let url = Constant.URL_followUsers + '/' + selectedLang;
      console.log(followData);
      console.log(url);
      setLoading(true);
      postToApiCalling('Post', 'followUser', url, followData);
    }
  };

  let sendMessage = () => {
    console.log(userData);
    let UID = userData.id.toString();
    CometChat.getUser(UID).then(
      user => {
        navigation.navigate('ChatScreen', {data: user});
      },
      error => {
        console.log('User details fetching failed with error:', error);
      },
    );
  };

  return (
    <View style={styles.container}>
      <Header label="Profile" parentCallback={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        style={styles.subContainer}>
        <View style={styles.topBox}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('FollowersList', {data: followerList})
            }
            style={styles.box}>
            <Text style={styles.count}>{followers}</Text>
            <Text style={styles.text}>Followers</Text>
          </TouchableOpacity>
          <Image source={{uri: userData?.profilePic}} style={styles.image} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('FollowingList', {data: followingList})
            }
            style={styles.box}>
            <Text style={styles.count}>{following}</Text>
            <Text style={styles.text}>Following</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{userData?.username}</Text>
        {userData?.bio !== '' ? (
          <Text style={styles.descriptionHeading}>{userData?.bio}</Text>
        ) : null}
        <View style={styles.buttonBox}>
          <TouchableOpacity
            onPress={() => onFollowPress()}
            activeOpacity={0.8}
            style={styles.button}>
            <Text style={styles.buttonText}>
              {follow ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
          {follow ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => sendMessage()}
              style={styles.button}>
              <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setSelectedTab(1)}
            activeOpacity={0.8}
            style={styles.tab1}>
            <MaterialIcons
              name="grid-on"
              size={moderateScale(20)}
              color={
                selectedTab === 1 ? colors.colorPrimary : colors.colorWhite
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedTab(2)}
            activeOpacity={0.8}
            style={styles.tab2}>
            <SimpleLineIcons
              name="folder"
              size={moderateScale(20)}
              color={
                selectedTab === 2 ? colors.colorPrimary : colors.colorWhite
              }
            />
          </TouchableOpacity>
        </View>
        <View style={{width: '100%', flex: 1}}>
          {selectedTab === 1
            ? userPosts.length > 0 && (
                <ListSection
                  data={userPosts}
                  uid={uid}
                  navigation={navigation}
                />
              )
            : collections.length > 0 && (
                <FolderSection
                  data={collections}
                  uid={uid}
                  navigation={navigation}
                  otherUserId={otherUserId}
                />
              )}
        </View>
      </ScrollView>
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
  },
  topBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(10),
  },
  image: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
  },
  name: {
    fontSize: fonts.largeText,
    color: colors.colorWhite,
    fontWeight: 'bold',
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: fonts.text,
    fontWeight: 'bold',
    color: colors.colorWhite,
  },
  text: {
    fontSize: fonts.smallText,
    color: colors.colorWhite,
  },
  descriptionHeading: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
    marginVertical: moderateScale(10),
  },
  buttonBox: {
    width: '100%',
    height: moderateScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: moderateScale(15),
  },
  button: {
    width: moderateScale(110),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(50),
    marginHorizontal: moderateScale(5),
    borderColor: '#444A5E',
    borderWidth: moderateScale(1),
  },
  buttonText: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
  },
  itemBox: {
    width: '32.5%',
    marginVertical: moderateScale(10),
  },
  itemImage: {
    width: '100%',
    height: moderateScale(100),
  },
  tabContainer: {
    width: '100%',
    height: moderateScale(40),
    borderTopWidth: moderateScale(1),
    borderBottomWidth: moderateScale(1),
    borderColor: '#444A5E',
    flexDirection: 'row',
    marginTop: moderateScale(30),
  },
  tab1: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#444A5E',
    borderRightWidth: moderateScale(0.5),
  },
  tab2: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#444A5E',
    borderLeftWidth: moderateScale(0.5),
  },
});

export default OtherUserProfile;
