import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, VirtualizedList, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Constant, WebServices} from '../../api/ApiRules';
import NetInfo from '@react-native-community/netinfo';
import Header from '../Common/BackHeader';
import {colors} from '../../Utils/Colors';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/Fonts';
import {TouchableOpacity} from 'react-native-gesture-handler';

const MessagePeople = ({navigation}) => {
  let [uid, setUid] = useState('');
  let [followinglist, setFollowingList] = useState([]);
  let [showEmpty, setShowEmpty] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('userData').then(val => {
      let user = JSON.parse(val);
      setUid(user.id);
      AsyncStorage.getItem('selectedLang').then(lang => {
        validationAndApiParameters('GetList', user.id, lang);
      });
    });
  },[navigation]);

  let validationAndApiParameters = (apikey, val, lang) => {
    if (apikey === 'GetList') {
      let url = Constant.URL_getFollowingList + lang + '?pcuserid=' + val;
      console.log(url);
      postToApiCalling('Get', url, apikey);
    }
  };

  let postToApiCalling = (method, apiUrl, apikey, uploadData) => {
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
            if (jsonRes.success === 1) {
              apiSuccessfullResponse(jsonRes, apikey);
            } else if (jsonRes.success === 0) {
              console.log(jsonRes.message);
              setShowEmpty(true);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  let apiSuccessfullResponse = (jsonRes, apikey) => {
    if (apikey === 'GetList') {
      setFollowingList(jsonRes.followinglist.data);
    }
  };

  let pressHandler = item => {
    console.log(item);
    let data = {
      uid: item.following_pcuserid,
      avatar: item.profilePic,
      name: item.name,
      username: item.username,
    };
    navigation.navigate('ChatScreen', {data: data});
  };

  let _renderItem = ({item}) => {
    return (
      <View style={styles.row}>
        <Image source={{uri: item.profilePic}} style={styles.profileImage} />
        <View
          style={{
            flex: 1,
            paddingHorizontal: moderateScale(10),
            justifyContent: 'center',
          }}>
          {item.name !== '' && (
            <Text allowFontScaling={false} style={styles.name}>
              {item.name}
            </Text>
          )}
          <Text allowFontScaling={false} style={styles.username}>
            {item.username}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => pressHandler(item)}>
          <Text allowFontScaling={false} style={styles.buttonText}>
            Message
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header label="" parentCallback={() => navigation.goBack()} />
      <View style={{flex: 1}}>
        <VirtualizedList
          style={{width: '100%'}}
          data={followinglist}
          initialNumToRender={10}
          renderItem={_renderItem}
          keyExtractor={item => item.id}
          getItemCount={data => data.length}
          getItem={(data, index) => data[index]}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{padding: moderateScale(20)}}
          ListEmptyComponent={() => (
            <View
              style={{
                width: '100%',
                height: fonts.deviceHeight - fonts.headerHeight,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {showEmpty ? (
                <Text allowFontScaling={false} style={styles.emptyText}>
                  Please follow someone
                </Text>
              ) : null}
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBlack,
  },
  row: {
    width: '100%',
    height: moderateScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(5),
  },
  profileImage: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(40),
  },
  name: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
  },
  username: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
  },
  button: {
    padding: moderateScale(10),
    backgroundColor: colors.colorGrey,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(5),
  },
  buttonText: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
  },
  emptyBox: {},
  emptyText: {
    textAlign: 'center',
    fontSize: fonts.largeText,
    fontWeight: 'bold',
    color: colors.colorWhite,
  },
});

export default MessagePeople;
