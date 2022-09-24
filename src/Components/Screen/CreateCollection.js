import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
  Alert,
} from 'react-native';
import {colors} from '../../Utils/Colors';
import Header from '../Common/BackHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Constant, WebServices} from '../../api/ApiRules';
import Spinner from '../Common/Spinner';
import NetInfo from '@react-native-community/netinfo';
import {fonts} from '../../Utils/Fonts';

const CreateCollection = ({navigation, route}) => {
  let [posts, setPosts] = useState([]);
  let [uid, setUid] = useState('');
  let [loading, setLoading] = useState(false);
  let [selectedPosts, setSelectedPosts] = useState([]);
  let [refresh, setReferesh] = useState(false);
  let [selectedLang, setSelectedLang] = useState('');

  useEffect(() => {
    console.log(route);
    AsyncStorage.getItem('userData').then(val => {
      let userData = JSON.parse(val);
      setUid(userData.id);
      AsyncStorage.getItem('selectedLang').then(lang => {
        setSelectedLang(lang);
        validationAndApiParameters('getPosts', userData.id);
      });
    });
  },[navigation]);

  let validationAndApiParameters = (apikey, id, lang) => {
    if (apikey === 'getPosts') {
      let url = Constant.URL_getPostImages + '/' + lang + '?pcuserid=' + id;
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
            console.log(jsonRes);
            setLoading(false);
            if (jsonRes.success === 1) {
              apiSuccessfullResponse(jsonRes, apikey);
            } else if (jsonRes.success === 0) {
              console.log(jsonRes.message);
            }
          })
          .catch(error => {
            console.log(error);
            setLoading(false);
          });
      }
    });
  };

  const apiSuccessfullResponse = (jsonRes, apikey) => {
    if (apikey === 'getPosts') {
      setPosts(jsonRes.allpostsmedia);
    }
    if (apikey === 'create') {
      Alert.alert('PC Card', 'Collection created successfully.', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    }
  };

  let _renderItem = ({item, index}) => {
    let selection = item => {
      if (selectedPosts.includes(item.id)) {
        let ind = selectedPosts.indexOf(item.id);
        selectedPosts.splice(ind, 1);
      } else {
        selectedPosts.push(item.id);
      }
      setReferesh(!refresh);
    };

    return (
      <TouchableOpacity
        onPress={() => selection(item)}
        activeOpacity={0.8}
        style={styles.imageBox}>
        {selectedPosts.includes(item.id) ? (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: '#00000050',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 99,
            }}>
            <MaterialCommunityIcons
              name="check-circle"
              color={colors.colorPrimary}
              size={moderateScale(50)}
            />
          </View>
        ) : null}
        <Image source={{uri: item.mediaUrl}} style={styles.image} />
      </TouchableOpacity>
    );
  };

  let createCollection = () => {
    if (selectedPosts.length < 2) {
      Alert.alert('PC Cards', 'Please select atleast 2 images');
    } else {
      let arr = selectedPosts.sort(function (a, b) {
        return a - b;
      });
      let data = {
        collectionName: route.params.data,
        pcuserid: uid,
        mediaid: arr.toString(),
      };
      let url = Constant.URL_createCollection + '/' + selectedLang;
      console.log(data);
      postToApiCalling('POST', url, 'create', data);
    }
  };

  return (
    <View style={styles.container}>
      <Header label="Collection" parentCallback={() => navigation.goBack()} />
      <FlatList
        style={{width: '100%'}}
        data={posts}
        renderItem={_renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => createCollection()}
          style={styles.buttonBox}>
          <Text allowFontScaling={false} style={styles.buttonText}>
            Create Collection
            {selectedPosts.length > 0
              ? ' ( ' + selectedPosts.length + ' post selected )'
              : null}
          </Text>
        </TouchableOpacity>
      </View>
      <Spinner visible={loading} />
    </View>
  );
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBlack,
  },
  imageBox: {
    width: '32.5%',
    height: moderateScale(120),
    backgroundColor: colors.colorBlack,
    marginHorizontal: moderateScale(2),
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.colorBlack,
  },
  buttonContainer: {
    width: '100%',
    padding: moderateScale(10),
  },
  buttonBox: {
    width: '100%',
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.colorPrimary,
    borderRadius: moderateScale(100),
  },
  buttonText: {
    fontSize: fonts.smallText,
    fontWeight: '300',
    color: colors.colorWhite,
  },
});

export default CreateCollection;
