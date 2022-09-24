/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  VirtualizedList,
  ActivityIndicator,
  Text,
} from 'react-native';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import Header from '../Common/BackHeader';
import HomeCard from '../Common/HomeCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {Constant, WebServices} from '../../api/ApiRules';
import Spinner from 'react-native-loading-spinner-overlay';
import Languages from '../../lang/i18n';

const Bookmarks = ({navigation}) => {
  let [postData, setPostData] = useState([]);
  let [page, setPage] = useState(1);
  let [uid, setUid] = useState('');
  let [renderFooter, setRenderFooter] = useState(false);
  let [loadFooter, setLoadFooter] = useState(false);
  let [loading, setLoading] = useState(false);
  let [selectedLang, setSelectedLang] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userData').then(val => {
      let user = JSON.parse(val);
      setUid(user.id);
      AsyncStorage.getItem('selectedLang').then(lang => {
        setSelectedLang(lang);
        validationAndApiParameters('getData', user.id, lang);
      });
    });
  },[navigation]);

  let validationAndApiParameters = (apikey, val, lang) => {
    if (apikey === 'getData') {
      let url = Constant.URL_getBookmark + '/' + lang + '?pcuserid=' + val;
      console.log(url);
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
      console.log(data);
      setPostData(data);
    }
  };

  let footer = () => {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.colorPrimary} />
      </View>
    );
  };

  let endReached = () => {
    if (renderFooter) {
      setRenderFooter(false);
      setLoadFooter(false);
      let url = Constant.URL_getBookmark + uid + '/' + selectedLang;
      console.log(url);
      // postToApiCalling('Get',url, 'page')
    }
  };

  let refresh = () => {
    validationAndApiParameters('getData', uid);
  };

  return (
    <View style={styles.container}>
      <Header
        label={Languages.bookmarks.heading}
        parentCallback={() => navigation.goBack()}
      />
      <View style={{flex: 1}}>
        {postData && (
          <VirtualizedList
            style={{width: '100%'}}
            data={postData}
            initialNumToRender={10}
            renderItem={({item}) => (
              <HomeCard
                navigation={navigation}
                item={item?.get_post}
                uid={uid}
                from="Bookmark"
                refreshList={() => refresh()}
                lang={selectedLang}
              />
            )}
            keyExtractor={item => item.id}
            getItemCount={data => data.length}
            getItem={(data, index) => data[index]}
            onEndReachedThreshold={0.1}
            onEndReached={endReached}
            ListFooterComponent={loadFooter ? footer : null}
            ListEmptyComponent={() => (
              <View style={styles.emptyTextBox}>
                <Text allowFontScaling={false} style={styles.emptyText}>
                  {Languages.bookmarks.empty}
                </Text>
              </View>
            )}
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
