/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  BackHandler,
  StyleSheet,
  View,
  VirtualizedList,
  Text,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {checkMultiple, PERMISSIONS, request} from 'react-native-permissions';
import {colors} from '../../Utils/Colors';
import HomeCard from '../Common/HomeCard';
import Header from '../Common/HomeHeader';
import NetInfo from '@react-native-community/netinfo';
import Spinner from '../Common/Spinner';
import {Constant, WebServices} from '../../api/ApiRules';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StoryCard from '../Common/StoryCard';
import {fonts} from '../../Utils/Fonts';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {authKey} from '../../Utils/CometChatKeys';
import Icon from 'react-native-vector-icons/Ionicons';
import Languages from '../../lang/i18n';

const HomeScreen = ({navigation}) => {
  let [uid, setUid] = useState('');
  let [userData, setUserData] = useState({});
  let [page, setPage] = useState(1);
  let [loading, setLoading] = useState(false);
  let [storyData, setStoryData] = useState([]);
  let [postData, setPostData] = useState([]);
  let [renderFooter, setRenderFooter] = useState(false);
  let [loadFooter, setLoadFooter] = useState(false);
  let [refresh, setRefresh] = useState(false);
  let [selectedLang,setSelectedLang] = useState('');
  let [showEmpty, setShowEmpty] = useState(false);
  let [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    checkMultiple(
      Platform.select({
        ios: [
          PERMISSIONS.IOS.CAMERA,
          PERMISSIONS.IOS.MEDIA_LIBRARY,
          PERMISSIONS.IOS.PHOTO_LIBRARY,
          PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
          PERMISSIONS.IOS.LOCATION_ALWAYS,
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        ],
        android: [
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ],
      }),
    ).then(statuses => {
        if (Platform.OS === 'android') {
          if (statuses[PERMISSIONS.ANDROID.CAMERA] === 'denied') {
            request(PERMISSIONS.ANDROID.CAMERA).then(result => {
              console.log(result);
            });
          }
          if (statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === 'denied') {
            request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
              console.log(result);
            });
          }
          if (
            statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === 'denied'
          ) {
            request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(result => {
              console.log(result);
            });
          }
          if (
            statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === 'denied'
          ) {
            request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
              console.log(result);
            });
          }
          if (
            statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === 'denied'
          ) {
            request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then(result => {
              console.log(result);
            });
          }
        } else if (Platform.OS === 'ios') {
        }
    })
    .catch(error => {
        console.log(error);
    });
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    AsyncStorage.getItem('userData').then(val => {
      let data = JSON.parse(val);
      setUserData(data);
      var user = new CometChat.User(data.id.toString());
      user.setName(data.username);
      CometChat.getLoggedinUser().then(
        user => {
          if (!user) {
            CometChat.login(data.id.toString(), authKey).then(user => {
              console.log('Comet User',user);
            });
          }
        },
        error => {
          console.log('Some Error Occured', {error});
        },
      );
    });

    navigation.addListener('focus',()=>{
      AsyncStorage.getItem('userData').then(val => {
        let data = JSON.parse(val);
        setUserData(data);
        setPage(1);
        AsyncStorage.getItem('selectedLang').then(lang => {
          setSelectedLang(lang);
          Languages.setLanguage(lang);
          validationAndApiParameters('getData', data.id, lang);
        });
      });
    });

    return () => backHandler.remove();
  }, [navigation, storyData]);

  useEffect(() => {
    AsyncStorage.getItem('userData').then(val => {
      let data = JSON.parse(val);
      setUid(data.id);
    });
  },[navigation]);

  const validationAndApiParameters = (apikey, param, lang) => {
    if (apikey === 'getData') {
      let url = Constant.URL_getPosts + param + '/index-paging/' + lang + '?page=' + page;
      setLoading(true);
      postToApiCalling('Get', url, apikey);
    }
  };

  const postToApiCalling = (method, apiUrl, apikey, uploadData) => {
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
            apiSuccessfullResponse(jsonRes, apikey);
          } else if (jsonRes.success === 0) {
            setLoading(false);
            setRefresh(false);
            setShowEmpty(true);
          }
          else if (jsonRes.success === 2){
            setLoading(false);
            setRefresh(false);
            setShowEmpty(true);
            setPostData([]);
            setStoryData([]);
          }
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
          setRefresh(false);
        });
      }
    });
  };

  function apiSuccessfullResponse(jsonRes, apikey) {
    if (apikey === 'getData') {
      console.log(jsonRes);
      let post = jsonRes.pcuserposts;
      setPage(page + 1);
      setPostData(post);
      if (jsonRes.stories.length > 0) {
        setStoryData(jsonRes.stories);
      }
      else if (jsonRes.stories === 0){
        setStoryData([]);
      }
      setLoading(false);
      setShowEmpty(false);
      setFollowingList(jsonRes.followingData);
      setRenderFooter(post.length === 10);
    }
    if (apikey === 'page') {
      let post = jsonRes.pcuserposts;
      setPage(page + 1);
      setLoading(false);
      setLoadFooter(false);
      setPostData([...postData, ...post]);
      setFollowingList(jsonRes.followingData);
      setRenderFooter(post.length === 10);
    }
    if (apikey === 'refresh') {
      console.log(jsonRes);
      setPostData([]);
      let post = jsonRes.pcuserposts;
      setPage(2);
      setLoading(false);
      if (jsonRes.stories.length > 0) {
        setStoryData(jsonRes.stories);
      } else if (jsonRes.stories.length === 0) {
        setStoryData([]);
      }
      setPostData(post);
      setRefresh(false);
      setFollowingList(jsonRes.followingData);
      setRenderFooter(post.length === 10);
    }
    if (apikey === 'refreshList') {
      console.log(jsonRes);
      let post = jsonRes.pcuserposts;
      setPage(page + 1);
      setPostData(post);
      if (jsonRes.stories.length > 0) {
        setStoryData(jsonRes.stories);
      }
      else if (jsonRes.stories === 0){
        setStoryData([]);
      }
      setLoading(false);
      setShowEmpty(false);
      setFollowingList(jsonRes.followingData);
      setRenderFooter(post.length === 10);
    }
  }

  const renderItem = ({item, index}) => {
    return (
      <>
        {item.type === 'live' ? (
          <View style={styles.storyContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('LiveScreen', {data: item, from: 'home'})
              }
              style={{
                alignItems: 'center',
                borderWidth: moderateScale(2),
                borderColor: '#3CCA28',
                borderRadius: moderateScale(50),
                padding: moderateScale(2),
              }}
              activeOpacity={0.8}>
              <Image
                source={{uri: item.user_data.profilePic}}
                style={styles.profileImage}
              />
              <View style={styles.liveBox}>
                <Text allowFontScaling={false} style={styles.liveText}>
                  {Languages.home.live}
                </Text>
              </View>
            </TouchableOpacity>
            <Text allowFontScaling={false} style={styles.text}>
              {item.user_data.username}
            </Text>
          </View>
        ) : (
          <StoryCard data={item} navigation={navigation} index={index} />
        )}
      </>
    );
  };

  let endReached = () => {
    if (renderFooter) {
      setRenderFooter(false);
      setLoadFooter(true);
      let url = Constant.URL_getPosts + uid + '/index-paging/' + selectedLang + '?page=' + page;
      console.log(url);
      postToApiCalling('Get', url, 'page');
    }
  };

  let swipeRefresh = () => {
    let url = Constant.URL_getPosts + uid + '/index-paging' + selectedLang + '?page=1';
    setRefresh(true);
    postToApiCalling('Get', url, 'refresh');
  };

  let footer = () => {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.colorPrimary} />
      </View>
    );
  };

  let header = () => {
    return (
      <View style={styles.topContainer}>
        <View style={styles.storyContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{padding: moderateScale(2)}}
            onPress={() => navigation.navigate('AddStory')}>
            <Image
              source={{uri: userData.profilePic}}
              style={styles.profileImage}
            />
            <View style={styles.addBox}>
              <Icon
                name="add"
                color={colors.colorWhite}
                size={moderateScale(18)}
              />
            </View>
          </TouchableOpacity>
          <Text allowFontScaling={false} style={styles.text}>
            {Languages.home.live}
          </Text>
        </View>
        <FlatList
          style={{width: '100%'}}
          contentContainerStyle={{alignItems: 'center'}}
          data={storyData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };

  function refreshList(){
    console.log('hi');
    let url = Constant.URL_getPosts + uid + '/index-paging/' + selectedLang + '?page=1';
    console.log(url);
    setLoading(true);
    postToApiCalling('Get', url, 'refreshList');
  }

  return (
    <View style={styles.container}>
      <Header
        onCameraPress={() => navigation.navigate('CreatePosts')}
        onMessagePress={() => navigation.navigate('MessageScreen')}
      />
      <View style={styles.subContainer}>
        <VirtualizedList
          style={{width: '100%'}}
          data={postData}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <HomeCard
              navigation={navigation}
              item={item}
              uid={uid}
              from="Home"
              height={height => console.log(height)}
              lang={selectedLang}
              followingData={followingList}
              refreshList={()=>refreshList()}
            />
          )}
          keyExtractor={item => item.id}
          onRefresh={swipeRefresh}
          refreshing={refresh}
          ListHeaderComponent={header}
          getItemCount={data => data.length}
          getItem={(data, index) => data[index]}
          onEndReachedThreshold={0.1}
          onEndReached={endReached}
          ListFooterComponent={loadFooter ? footer : null}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                paddingTop: moderateScale(150),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {showEmpty ?
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: fonts.largeText,
                    fontWeight: 'bold',
                    color: '#ffffff',
                  }}>
                  {Languages.home.noPost}
                </Text>
              :
                null
              }
            </View>
          )}
        />
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
    backgroundColor: colors.colorBlack,
  },
  topContainer: {
    width: '100%',
    height: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.colorWhite,
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
  cardContainer: {
    width: '100%',
    height: '80%',
    backgroundColor: colors.colorBlack,
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
  storyContainer: {
    width: moderateScale(70),
    height: moderateScale(80),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(50),
  },
  liveBox: {
    width: '100%',
    height: moderateScale(18),
    borderRadius: moderateScale(50),
    backgroundColor: '#3CCA28',
    position: 'absolute',
    bottom: -moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveText: {
    color: colors.colorBlack,
    fontSize: fonts.extraSmallText,
    fontWeight: 'normal',
  },
  text: {
    color: colors.colorBlack,
    textAlign: 'center',
    fontSize: fonts.extraSmallText,
  },
  addBox: {
    position: 'absolute',
    bottom: moderateScale(0),
    right: moderateScale(0),
    backgroundColor: colors.colorPrimary,
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
