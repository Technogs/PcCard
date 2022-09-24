/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, Text, VirtualizedList, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import Languages from '../../lang/i18n';
import {Constant, WebServices} from '../../api/ApiRules';
import NetInfo from '@react-native-community/netinfo';

const HashtagTab = ({data, isEmpty, uid, navigation, lang}) => {

  function  validationAndApiParameters(params) {
    let udata = {
      hashtagtext:params,
      uid: uid,
    };
    let url = Constant.URL_getHashtagData + lang;
    postToApiCalling(url, udata);
  }

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
              console.log(jsonRes);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  function apiSuccessfullResponse(jsonRes){
    console.log(jsonRes);
  }

  const HashtagCard = ({item}) => {
    return (
      <>
        {item?.useCount > 0 ?
          <TouchableOpacity activeOpacity={0.8} onPress={()=>validationAndApiParameters(item?.hashTagName)} style={styles.container}>
          <View style={styles.hashtagBox}>
            <Text style={styles.hash}>#</Text>
          </View>
          <View style={styles.box}>
            <Text allowFontScaling={false} style={styles.title}>
              {item?.hashTagName}
            </Text>
            <Text allowFontScaling={false} style={styles.text}>
              {item?.useCount} Post
            </Text>
          </View>
        </TouchableOpacity>
        :
          null
        }
        </>
    );
  };

  return (
    <VirtualizedList
      style={{width: '100%'}}
      data={data}
      initialNumToRender={10}
      renderItem={({item}) => <HashtagCard item={item} />}
      keyExtractor={item => item.id}
      getItemCount={data => data.length}
      getItem={(data, index) => data[index]}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={() => (
        <View
          style={{
            flex: 1,
            paddingTop: moderateScale(150),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {isEmpty ?
            <Text
              allowFontScaling={false}
              style={{
                fontSize: fonts.largeText,
                fontWeight: 'bold',
                color: '#ffffff',
              }}>
              {Languages.hashtag.empty}
            </Text>
          :
              null
          }
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.colorBlack,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(5),
  },
  hashtagBox: {
    width: moderateScale(50),
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(50),
    backgroundColor: '#C4C4C440',
  },
  hash: {
    color: colors.colorWhite,
    fontSize: fonts.largeText,
    fontWeight: 'bold',
  },
  box: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
    justifyContent: 'space-between',
  },
  title: {
    fontSize: fonts.largeText,
    fontWeight: 'bold',
    color: colors.colorWhite,
  },
  text: {
    fontSize: fonts.smallText,
    color: '#E5E5E5',
  },
});

export default HashtagTab;
