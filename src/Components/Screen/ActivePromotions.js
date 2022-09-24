import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import Header from '../Common/BackHeader';
import PromotionCard from '../Common/PromotionCard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fonts} from '../../Utils/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Constant, WebServices} from '../../api/ApiRules';
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';

const ActivePromotions = ({navigation, route}) => {
  let [uid, setUid] = useState('');
  let [promotionDetails, setPromotionDetails] = useState(route.params.item);
  let [promotionData, setPromotionData] = useState({});
  let [posts, setPosts] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('userData').then(val => {
      let userdata = JSON.parse(val);
      setUid(userdata.id);
      AsyncStorage.getItem('selectedLang').then(lang => {
        validationAndApiParameters('getData', lang);
      });
    });
  },[1]);

  let validationAndApiParameters = (apikey, lang) => {
    if (apikey === 'getData') {
      console.log('promotionDetails', promotionDetails);
      let url = Constant.URL_promotionDetail + route.params.item.id + '/' + lang;
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
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  let apiSuccessfullResponse = (jsonRes, apikey) => {
    if (apikey === 'getData') {
      console.log(jsonRes);
      let data = jsonRes.promotionData;
      for (let i = 0; i < data.get_plan.postLimit; i++) {
        console.log('totalPosts', data.totalPost);
        if (i < data.totalPost) {
          posts.push(data.collection_list[i]);
        } else {
          posts.push({key: i});
        }
      }
      setPromotionData(data);
    }
  };

  const renderItem = ({item}) => {
    let date1 = new Date();
    const date2 = new Date(item.expiryDate);
    let val = date1 < date2;
    return (
      <>
        {item.id ? (
          <View style={styles.box}>
            <Image
              source={{uri: item?.post_data?.get_media[0].mediaUrl}}
              resizeMode="contain"
              style={styles.image}
            />
            <View style={styles.bottomBox}>
              <Text allowFontScaling={false} style={styles.text1}>
                {val ? moment(item.expiryDate).fromNow(true) : 'Expired'}
              </Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditPromotion', {
                promotionDetails: promotionDetails,
              });
            }}
            activeOpacity={0.8}
            style={styles.box}>
            <AntDesign
              name="pluscircleo"
              color={colors.colorPrimary}
              size={moderateScale(20)}
            />
            <Text allowFontScaling={false} style={styles.addText}>
              Add Post
            </Text>
            <View style={styles.bottomBox}>
              <Text allowFontScaling={false} style={styles.text1}>
                {promotionDetails?.get_plan?.planValidity}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        label="Active Promotion"
        parentCallback={() => navigation.pop()}
      />
      <View style={styles.subContainer}>
        <View style={{paddingHorizontal: moderateScale(20)}}>
          <PromotionCard data={promotionDetails} />
        </View>
        <FlatList
          style={styles.flatList}
          data={posts}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={item => item}
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
  subContainer: {
    flex: 1,
  },
  box: {
    width: '46%',
    height: moderateScale(160),
    backgroundColor: '#202020',
    marginLeft: moderateScale(10),
    marginBottom: moderateScale(10),
    borderRadius: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: colors.colorWhite,
    fontSize: fonts.extraSmallText,
    fontWeight: '500',
    lineHeight: moderateScale(20),
  },
  bottomBox: {
    width: '100%',
    height: moderateScale(40),
    backgroundColor: '#20202099',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: moderateScale(15),
    borderBottomRightRadius: moderateScale(15),
  },
  text1: {
    color: colors.colorWhite,
    fontSize: fonts.extraSmallText,
    fontWeight: '500',
  },
  text2: {
    color: '#A29696',
    fontSize: fonts.extraSmallText,
    fontWeight: '500',
  },
  flatList: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ActivePromotions;
