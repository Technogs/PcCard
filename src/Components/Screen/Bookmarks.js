/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import Header from '../Common/BackHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {Constant, WebServices} from '../../api/ApiRules';
import Spinner from '../Common/Spinner';
import Languages from '../../lang/i18n';
import {moderateScale} from 'react-native-size-matters';

const Bookmarks = ({navigation}) => {
  let [postData, setPostData] = useState([]);
  let [loading, setLoading] = useState(false);
  let [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      AsyncStorage.getItem('userData').then(val => {
        let user = JSON.parse(val);
        AsyncStorage.getItem('selectedLang').then(lang => {
          validationAndApiParameters('getData', user.id, lang);
        });
      });
    });
  }, [navigation]);

  let validationAndApiParameters = (apikey, val, lang) => {
    if (apikey === 'getData') {
      let url = Constant.URL_getBookmark + '/' + lang + '?pcuserid=' + val;
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
            setLoading(false);
            if (jsonRes.success === 1) {
              apiSuccessfullResponse(jsonRes, apikey);
            } else if (jsonRes.success === 0) {
              console.log(jsonRes.message);
              setPostData([]);
            }
          })
          .catch(error => {
            console.log(error);
            setLoading(false);
          });
      }
    });
  };

  let apiSuccessfullResponse = (jsonRes, apikey) => {
    if (apikey === 'getData') {
      let data = jsonRes.getbookmarks.data;
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push(data[i].get_post);
      }
      console.log(arr);
      setPostData(arr);
      setFollowingList(jsonRes.FollowingsList);
    }
  };

  let renderCard = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('Feed', {
            data: postData,
            scrollTo: index,
            following: followingList,
            from: 'Bookmark',
          })
        }
        style={{
          width: '31%',
          height: moderateScale(120),
          marginStart: '3%',
          marginBottom: moderateScale(15),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#505050',
        }}>
        <Image
          resizeMode="contain"
          source={{uri: item?.postMedia[0]?.mediaUrl}}
          style={{width: '100%', height: '100%'}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        label={Languages.bookmarks.heading}
        parentCallback={() => navigation.goBack()}
      />
      <View style={{flex: 1, padding: moderateScale(20)}}>
        {postData && (
          <FlatList
            keyExtractor={item => item.id}
            data={postData}
            numColumns={3}
            renderItem={renderCard}
          />
        )}
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
  emptyTextBox: {
    width: '100%',
    height: fonts.deviceHeight - fonts.headerHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: fonts.largeText,
    fontWeight: 'bold',
    color: colors.colorWhite,
  },
});

export default Bookmarks;
