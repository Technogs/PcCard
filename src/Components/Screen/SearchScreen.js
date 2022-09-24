/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  BackHandler,
  TextInput,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import HashtagTab from '../Common/HashtagTab';
import PeopleTab from '../Common/PeopleTab';
import CollectionTab from '../Common/CollectionTab';
import Icon from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Constant, WebServices} from '../../api/ApiRules';
import NetInfo from '@react-native-community/netinfo';
import Languages from '../../lang/i18n';
import GameTab from '../Common/GameTab';

const SearchScreen = ({navigation}) => {
  let [activeTab, setActiveTab] = useState(0);
  let [uid, setUid] = useState('');
  let [searchText, setSearchText] = useState('');
  let [peopleData, setPeopleData] = useState([]);
  let [hashtagData, setHashtagData] = useState([]);
  let [collectionData, setCollectionData] = useState([]);
  let [gameTypeData, setGameTypeData] = useState([]);
  let [selectedLang, setselectedLang] = useState('');
  let [peopleEmpty, setPeopleEmpty] = useState(false);
  let [collectionEmpty, setCollectionEmpty] = useState(false);
  let [hashtagEmpty, setHashtagEmpty] = useState(false);
  let [gametypeEmpty, setGametypeEmpty] = useState(false);
  let [followingData, setFollowingData] = useState([]);
  const tabs = [Languages.searchScreen.people, Languages.searchScreen.collection, Languages.searchScreen.hashtag, Languages.searchScreen.gameType];

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    AsyncStorage.getItem('userData').then(val => {
      let userData = JSON.parse(val);
      setUid(userData.id);
      AsyncStorage.getItem('selectedLang').then(lang => {
        setselectedLang(lang);
        validationAndApiParameters('Search', '', lang, userData.id);
      });
    });

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  let validationAndApiParameters = (apikey, key, lang, id) => {
    if (apikey === 'Search') {
      let uploadData = {
        keyword: key,
        uid: id,
      };
      let url = Constant.URL_search + '/' + lang;
      console.log('upload', uploadData);
      console.log(url);
      postToApiCalling(url, uploadData, apikey);
    }
  };

  const postToApiCalling = (apiUrl, uploadData, apikey) => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        new Promise(resolve => {
          resolve(WebServices.applicationService(apiUrl, uploadData));
        })
          .then(jsonRes => {
            console.log(jsonRes);
            if (jsonRes.success === 1) {
              apiSuccessfullResponse(jsonRes, apikey);
            } else if (jsonRes.success === 0) {
              console.log(jsonRes);
              setPeopleEmpty(true);
              setCollectionEmpty(true);
              setHashtagEmpty(true);
              setGametypeEmpty(true);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  let apiSuccessfullResponse = (jsonRes, apikey) => {
    if (apikey === 'Search') {
      if (jsonRes.peopleArr.length > 0){
        setPeopleEmpty(false);
      }
      if (jsonRes.collectionArr.length > 0){
        setCollectionEmpty(false);
      }
      if (jsonRes.hashTagArr.lenght > 0){
        setHashtagEmpty(false);
      }
      if (jsonRes.gameTypeArr.lenght > 0){
        setGametypeEmpty(false);
      }
      setPeopleData(jsonRes.peopleArr);
      setCollectionData(jsonRes.collectionArr);
      setHashtagData(jsonRes.hashTagArr);
      setGameTypeData(jsonRes.gameTypeArr);
      setFollowingData(jsonRes.followingData);
    }
  };

  let setText = text => {
    setSearchText(text);
    if (activeTab !== 3){
      validationAndApiParameters('Search', text, selectedLang, uid);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchConatiner}>
        <View style={styles.subContainer}>
          <Icon
            name="search"
            color={colors.colorWhite}
            size={moderateScale(20)}
          />
          <TextInput
            placeholder={Languages.searchScreen.placeholder}
            placeholderTextColor={colors.colorWhite}
            style={styles.textInput}
            value={searchText}
            onChangeText={text => setText(text)}
          />
        </View>
      </View>
      <View style={{flexDirection:'row'}}>
        {tabs.map((item, index) => {
          return(
            <TouchableOpacity
              key={index}
              onPress={() => {
                setActiveTab(index);
              }}
              activeOpacity={0.8}
              style={[
                styles.tabBox,
                {
                  borderColor:
                    activeTab === index ? colors.colorPrimary : colors.colorGrey,
                },
              ]}>
              <Text
                allowFontScaling={false}
                style={activeTab === index ? styles.activeText : styles.inactiveText}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{width: '100%', height: '80%'}}
        showsVerticalScrollIndicator={false}>
        {activeTab === 2 ?
          <HashtagTab data={hashtagData} lang={selectedLang} navigation={navigation} uid={uid} isEmpty={hashtagEmpty} />
        : activeTab === 0 ?
            <PeopleTab data={peopleData} navigation={navigation} uid={uid} isEmpty={peopleEmpty} />
          : activeTab === 1 ?
              <CollectionTab data={collectionData} navigation={navigation} uid={uid} isEmpty={collectionEmpty} following={followingData} />
            :
              <GameTab data={gameTypeData} search={searchText} navigation={navigation} uid={uid} isEmpty={gametypeEmpty} />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBlack,
  },
  tabBox: {
    flex: 1,
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: moderateScale(1),
  },
  activeText: {
    fontSize: fonts.extraSmallText,
    color: colors.colorPrimary,
  },
  inactiveText: {
    fontSize: fonts.extraSmallText,
    color: colors.colorWhite,
  },
  searchConatiner: {
    width: '100%',
    height: moderateScale(70),
    padding: moderateScale(15),
    marginTop: moderateScale(20),
  },
  subContainer: {
    flex: 1,
    borderColor: colors.colorWhite,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(50),
    paddingHorizontal: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    color: colors.colorWhite,
    paddingHorizontal: moderateScale(5),
    flex: 1,
  },
});

export default SearchScreen;
