import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  BackHandler,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import Header from '../Common/BackHeader';
import PromotionCard from '../Common/PromotionCard';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Constant, WebServices} from '../../api/ApiRules';
import NetInfo from '@react-native-community/netinfo';
import Spinner from '../Common/Spinner';
import Languages from '../../lang/i18n';

const addPromotion = require('../../Images/AddPromotion.png');

const Promotion = ({navigation}) => {
  let [uid, setUid] = useState('');
  let [loading, setLoading] = useState(false);
  let [promotions, setPromotions] = useState([]);
  let [selectedLang, setSelectedLang] = useState('');

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    AsyncStorage.getItem('userData').then(val => {
      let userdata = JSON.parse(val);
      setUid(userdata.id);
      AsyncStorage.getItem('selectedLang').then(lang => {
        setSelectedLang(lang);
        validationAndApiParameters('getData', userdata.id, lang);
      });
    });

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  let validationAndApiParameters = (apikey, id, lang) => {
    if (apikey === 'getData') {
      let url = Constant.URL_getPromotionList + id + '/' + lang;
      console.log(url);
      setLoading(true);
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
            setLoading(false);
            if (jsonRes.success === 1) {
              apiSuccessfullResponse(jsonRes, apikey);
            } else if (jsonRes.success === 0) {
              console.log(jsonRes.message);
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
      setPromotions(jsonRes.promotionData);
    }
  };

  let renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ActivePromotions', {item: item})}>
        <PromotionCard data={item} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        label={Languages.promotion.heading}
        parentCallback={() => navigation.pop()}
      />
      <View style={styles.subContainer}>
        <View style={{flex: 1}}>
          <Text allowFontScaling={false} style={styles.heading}>
            {Languages.promotion.subheading}
          </Text>
          <FlatList
            data={promotions}
            style={{width: '100%'}}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {Languages.promotion.emptyText}
                </Text>
              </View>
            )}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddPromotion')}
          activeOpacity={0.8}
          style={styles.button}>
          <Image
            source={addPromotion}
            resizeMode="contain"
            style={{width: moderateScale(15), height: moderateScale(15)}}
          />
          <Text style={styles.buttonText}>
            {Languages.promotion.buttonText}
          </Text>
          <Fontisto
            name="arrow-right-l"
            color={colors.colorWhite}
            size={moderateScale(15)}
          />
        </TouchableOpacity>
      </View>
      <Spinner color={'#fff'} visible={loading} />
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
    padding: moderateScale(20),
  },
  heading: {
    fontSize: fonts.largeText,
    fontWeight: 'bold',
    color: '#FFFFFF60',
  },
  emptyContainer: {
    flex: 1,
    paddingTop: moderateScale(150),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: fonts.largeText,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    height: moderateScale(40),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    backgroundColor: colors.colorPrimary,
    borderRadius: moderateScale(17),
  },
  buttonText: {
    fontSize: fonts.smallText,
    color: colors.colorWhite,
    fontWeight: '500',
    flex: 1,
    paddingHorizontal: moderateScale(5),
  },
});

export default Promotion;
