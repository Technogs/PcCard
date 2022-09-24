import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  BackHandler,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from 'react-native';
import {colors} from '../../Utils/Colors';
import Header from '../Common/BackHeader';
import {Constant, WebServices} from '../../api/ApiRules';
import NetInfo from '@react-native-community/netinfo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale} from 'react-native-size-matters';
import {CommonActions} from '@react-navigation/native';

const EditPromotion = ({navigation, route}) => {
  let [uid, setUid] = useState('');
  let [posts, setPosts] = useState([]);
  let [postSelected, setPostSelected] = useState([]);
  let [refresh, setRefresh] = useState(false);
  let [previousData, setPreviousData] = useState(route.params.promotionDetails);
  let [selectedLang, setSelectedLang] = useState('');
  let [newSelection, setNewSelection] = useState([]);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    let arr = previousData.collectionList.split(',');
    var result = arr.map(function (x) {
      return parseInt(x);
    });
    setPostSelected(result);
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
  },[navigation]);

  let validationAndApiParameters = (apikey, id, lang) => {
    if (apikey === 'getData') {
      let url = Constant.URL_getPostsForPromotion + id + '/' + lang;
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
      console.log('response', jsonRes);
      setPosts(jsonRes.plans.data);
    }
    if (apikey === 'editPromotion') {
      Alert.alert('PC Card', 'Promotion changes saved.', [
        {
          text: 'OK',
          onPress: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'Home'}],
              }),
            );
          },
        },
      ]);
    }
  };

  let renderItems = ({item}) => {
    let setSelection = () => {
      if (!postSelected.includes(item.id)) {
        let total = newSelection.length + postSelected.length;
        if (newSelection.includes(item.id)) {
          // let ind = postSelected.indexOf(item.id);
          // postSelected.splice(ind, 1);
          let ind = newSelection.indexOf(item.id);
          newSelection.splice(ind, 1);
        } else {
          if (total <= previousData.get_plan.postLimit) {
            setNewSelection([...newSelection, item.id]);
          }
        }
        console.log('newSelection', newSelection);
        setRefresh(!refresh);
      }
    };
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setSelection()}
        style={styles.card}>
        <Image
          source={{uri: item?.get_media[0].mediaUrl}}
          resizeMode="contain"
          style={{width: '100%', height: '100%'}}
        />
        {postSelected.includes(item.id) || newSelection.includes(item.id) ? (
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
      </TouchableOpacity>
    );
  };

  let saveChanges = () => {
    let total = postSelected.length + newSelection.length;
    let data = {
      promotionId: previousData.id,
      postIdList: newSelection.toString(),
      totalPost: total,
    };
    console.log(data);
    let url = Constant.URL_updatePromotion + '/' + selectedLang;
    postToApiCalling('Post', url, 'editPromotion', data);
  };

  return (
    <View style={styles.container}>
      <Header label="Select Posts" parentCallback={() => navigation.pop()} />
      <FlatList
        data={posts}
        style={{width: '100%', flex: 1}}
        numColumns={3}
        renderItem={renderItems}
        keyExtractor={item => item.id}
      />
      <View style={{width: '100%', padding: moderateScale(10)}}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => saveChanges()}>
          <Text>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBlack,
  },
  card: {
    width: '32.5%',
    height: moderateScale(120),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: moderateScale(5),
    marginVertical: moderateScale(5),
  },
  button: {
    height: moderateScale(40),
    width: '100%',
    backgroundColor: colors.colorPrimary,
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditPromotion;
