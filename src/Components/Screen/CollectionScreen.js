import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../Utils/Colors';
import {Constant, WebServices} from '../../api/ApiRules';
import NetInfo from '@react-native-community/netinfo';
import Header from '../Common/BackHeader';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/Fonts';

let CollectionScreen = ({navigation, route}) => {
  let [collectionId] = useState(route.params.data);
  let [collectionData, setCollectionData] = useState({});
  let [uid, setUid] = useState('');
  let [selectedLang, setLang] = useState('');
  let [followingList] = useState(route.params.followingList);

  useEffect(() => {
    navigation.addListener('focus', () => {
      AsyncStorage.getItem('userData').then(user => {
        let data = JSON.parse(user);
        setUid(data.id);
        AsyncStorage.getItem('selectedLang').then(lang => {
          setLang(lang);
          validationAndApiParameters('getData', data.id, lang);
        });
      });
    });
  }, [navigation]);

  const validationAndApiParameters = (apikey, id, lang) => {
    if (apikey === 'getData') {
      let url = Constant.URL_collectionDetail + lang;
      let data = {
        uid: id,
        collectionId: collectionId,
      };
      postToApiCalling('Post', url, apikey, data);
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
            if (jsonRes.success === 1) {
              apiSuccessfullResponse(jsonRes, apikey);
            } else if (jsonRes.success === 0) {
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  const apiSuccessfullResponse = (jsonRes, apikey) => {
    if (apikey === 'getData') {
      console.log(jsonRes);
      setCollectionData(jsonRes.collectionDetail);
    }
    if (apikey === 'getPost') {
      navigation.navigate('Feed', {
        data: jsonRes.data.posts,
        following: followingList,
        scrollTo: 0,
        from: 'Collection',
      });
    }
  };

  let onPostPress = id => {
    let data = {
      uid: uid,
      collectionId: id,
    };
    let url = Constant.URL_getCollectionById + selectedLang;
    postToApiCalling('POST', url, 'getPost', data);
  };

  let renderPost = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onPostPress(item.collectionId)}
        activeOpacity={0.8}
        style={styles.imageBox}>
        <Image
          source={{uri: item?.get_media?.mediaUrl}}
          resizeMode="contain"
          style={styles.image}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header parentCallback={() => navigation.goBack()} />
      <View style={styles.subContainer}>
        <Text style={styles.heading}>
          Collection - {collectionData?.collectionName}
        </Text>
        <FlatList
          data={collectionData?.get_collection_media}
          keyExtractor={item => item.id}
          renderItem={renderPost}
          numColumns={3}
        />
      </View>
    </View>
  );
};

let styles = StyleSheet.create({
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
    color: colors.colorWhite,
    fontWeight: 'bold',
    marginBottom: moderateScale(20),
  },
  imageBox: {
    width: '32%',
    height: moderateScale(120),
    marginLeft: moderateScale(5),
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CollectionScreen;
