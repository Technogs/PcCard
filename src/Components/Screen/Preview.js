import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import {colors} from '../../Utils/Colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Constant, WebServices} from '../../api/ApiRules';
import NetInfo from '@react-native-community/netinfo';
import Spinner from '../Common/Spinner';
import Languages from '../../lang/i18n';
import {CommonActions} from '@react-navigation/native';

const Preview = ({navigation, route}) => {
  const [pdata, setData] = useState({
    postData: route.params.data,
    userData: {},
    uploaded: '0%',
    loading: false,
  });
  let [selectedLang, setSelectedLang] = useState('');

  useEffect(() => {
    console.log(route.params.data);
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    AsyncStorage.getItem('selectedLang').then(lang => {
      setSelectedLang(lang);
    });
    async function fetchData() {
      await AsyncStorage.getItem('userData').then(val => {
        let userData = JSON.parse(val);
        setData({...pdata, userData: userData});
      });
    }
    fetchData();
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [1]);

  const createPost = () => {
    let date = new Date().getTime();
    let extension1 = pdata?.postData?.images[0]?.type.split('/');
    let people = [];
    let selectedCard = pdata?.postData?.cardGame?.id;
    people.push(pdata?.postData?.people?.id);
    let formData = new FormData();
    formData.append('createdBy', pdata.userData.id);
    formData.append('userName', pdata.userData.username);
    formData.append('description', pdata.postData.description.trim());
    formData.append('cardGame', pdata?.postData?.cardGame?.id);
    if (
      selectedCard === 1 ||
      selectedCard === 2 ||
      selectedCard === 4 ||
      selectedCard === 5
    ) {
      formData.append('nameTeam', pdata?.postData?.nameTeam?.id);
      formData.append('cardType', pdata?.postData?.cardType?.id);
    } else if (selectedCard === 3) {
      formData.append('nameTeam', pdata?.postData?.nameTeam?.id);
    } else if (selectedCard === 6) {
      formData.append('rarity', pdata?.postData?.rarity?.id);
      formData.append('types', pdata?.postData?.types?.id);
      formData.append('trainerType', pdata?.postData?.trainer?.id);
      formData.append('energyType', pdata?.postData?.energy?.id);
    }
    formData.append(
      'hashTag',
      pdata?.postData?.hashtag?.replace(/[ ,]+/g, ','),
    );
    formData.append('conditionId', pdata?.postData?.conditionData?.id);
    formData.append(
      'other',
      pdata?.postData?.other === '' ? '' : pdata?.postData?.other,
    );
    formData.append('peopleTag', people.toString());
    formData.append('postTag', pdata?.postData?.postTag);
    formData.append('postPrice', pdata?.postData?.price);
    formData.append(
      'address',
      pdata?.postData?.address ? pdata.postData.address : '',
    );
    formData.append('mediaFirstType', extension1[0]);
    formData.append('mediaFirst', {
      uri: pdata.postData.images[0].uri,
      name: 'post_image/' + date + '.' + extension1[1],
      type: 'image/png',
    });
    if (pdata.postData.images.length === 2) {
      let extension2 = pdata.postData.images[1].type.split('/');
      formData.append('mediaSecondType', extension2[0]);
      formData.append('mediaSecond', {
        uri: pdata.postData.images[1].uri,
        name: 'post_image/' + date + '.' + extension2[1],
        type: 'image/png',
      });
    }

    console.log(formData);
    let url = Constant.URL_createPost + '/' + selectedLang;
    console.log(url);
    setData({...pdata, loading: true});
    postToApiCalling('Post', url, formData);
  };

  const postToApiCalling = (method, apiUrl, uploadData) => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        new Promise(resolve => {
          if (method === 'Get') {
            resolve(WebServices.get(apiUrl));
          } else {
            resolve(WebServices.formService(apiUrl, uploadData));
          }
        })
          .then(jsonRes => {
            console.log(jsonRes);
            setData({...pdata, loading: false});
            if (jsonRes?.success === 1) {
              apiSuccessfullResponse();
            } else if (jsonRes?.success === 0) {
              Alert.alert('Error', jsonRes.message);
            }
          })
          .catch(error => {
            console.log(error);
            setData({...pdata, loading: false});
          });
      }
    });
  };

  const apiSuccessfullResponse = () => {
    Alert.alert('PC Card', Languages.preview.sucess, [
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.pop()}>
          <SimpleLineIcons
            name="close"
            color={colors.colorWhite}
            size={moderateScale(20)}
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text allowFontScaling={false} style={styles.heading}>
            {Languages.preview.heading}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{alignItems: 'center'}}
          onPress={() => createPost()}>
          <SimpleLineIcons
            name="check"
            color={colors.colorPrimary}
            size={moderateScale(20)}
          />
          <Text
            allowFontScaling={false}
            style={{
              width: moderateScale(43),
              textAlign: 'center',
              fontSize: fonts.extraSmallText,
              color: colors.colorPrimary,
            }}>
            {Languages.preview.post}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.subContainer}>
        <View style={styles.topBox}>
          <Icon
            name="user-circle"
            color={colors.colorWhite}
            size={moderateScale(35)}
          />
          <View style={{paddingHorizontal: moderateScale(10)}}>
            <Text
              allowFontScaling={false}
              style={{
                color: colors.colorWhite,
                fontSize: fonts.smallText,
                fontWeight: 'bold',
              }}>
              {pdata?.userData?.username}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: fonts.extraSmallText,
                color: colors.colorWhite,
              }}>
              {pdata.postData.address ? pdata.postData.address : ''}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <View style={styles.followBox}>
              <Text
                allowFontScaling={false}
                style={{color: colors.colorPrimary, fontSize: fonts.smallText}}>
                {Languages.preview.follow}
              </Text>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <FeatherIcon
              name="more-vertical"
              color={colors.colorWhite}
              size={moderateScale(30)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.cardBox}>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {pdata.postData.images.map((item, index) => (
              <Image
                key={item.uri}
                source={{uri: item.uri}}
                resizeMode="contain"
                style={styles.card}
              />
            ))}
            <Text style={styles.count} allowFontScaling={false}>
              {pdata.postData.images.length}/{pdata.postData.images.length}
            </Text>
          </View>
          {pdata.postData.postTag === '1' ? (
            <View style={styles.saleBox}>
              <Text allowFontScaling={false} style={styles.saleText}>
                {Languages.preview.sale} ${pdata.postData.price}
              </Text>
            </View>
          ) : pdata.postData.postTag === '2' ? (
            <View style={styles.saleBox}>
              <Text allowFontScaling={false} style={styles.saleText}>
                {Languages.preview.trade}
              </Text>
            </View>
          ) : null}
        </View>
        <View
          style={{
            flex: 1,
            padding: moderateScale(10),
            justifyContent: 'space-between',
          }}>
          <View style={styles.textBox}>
            <Text
              numberOfLines={2}
              allowFontScaling={false}
              style={{
                color: colors.colorWhite,
                fontSize: fonts.smallText,
                fontWeight: 'bold',
              }}>
              {pdata.userData.username}{' '}
              <Text
                allowFontScaling={false}
                numberOfLines={2}
                style={{
                  color: colors.colorWhite,
                  fontSize: fonts.smallText,
                  fontWeight: 'normal',
                }}>
                {pdata?.postData?.description}
              </Text>
            </Text>
            {pdata.postData.hashtag === '' ? null : (
              <Text style={styles.hashtagText} allowFontScaling={false}>
                {pdata?.postData?.hashtag}
              </Text>
            )}
            {pdata.postData.people === [] ? null : (
              <Text style={styles.hashtagText} allowFontScaling={false}>
                {pdata?.postData?.people?.username}
              </Text>
            )}
            <Text style={styles.text} allowFontScaling={false}>
              {selectedLang === 'en'
                ? pdata.postData?.cardGame.gameName
                : pdata.postData?.cardGame.gameNameFr}
            </Text>
            {pdata?.postData?.nameTeam === '' ? null : (
              <Text style={styles.text} allowFontScaling={false}>
                Selected Team:{' '}
                {selectedLang === 'en'
                  ? pdata.postData.nameTeam.nameTeam
                  : pdata.postData.nameTeam.nameTeamFr}
              </Text>
            )}
            {pdata?.postData?.cardType === '' ? null : (
              <Text style={styles.text} allowFontScaling={false}>
                Selected Card Type:{' '}
                {selectedLang === 'en'
                  ? pdata?.postData?.cardType?.cardType
                  : pdata?.postData?.cardType?.cardTypeFr}
              </Text>
            )}
            {pdata?.postData?.other === '' ? null : (
              <Text style={styles.text} allowFontScaling={false}>
                Other: {pdata?.postData?.other}
              </Text>
            )}
            {pdata.postData.rarity === '' ? null : (
              <Text style={styles.text} allowFontScaling={false}>
                {Languages.preview.rarity}:{' '}
                {selectedLang === 'en'
                  ? pdata.postData.rarity.rareteName
                  : pdata.postData.rarity.rareteNameFr}
              </Text>
            )}
            {pdata.postData.types === '' ? null : (
              <Text style={styles.text} allowFontScaling={false}>
                {Languages.preview.types}:{' '}
                {selectedLang === 'en'
                  ? pdata.postData.types.typeName
                  : pdata.postData.types.typeNameFr}
              </Text>
            )}
            {pdata.postData.trainer === '' ? null : (
              <Text style={styles.text} allowFontScaling={false}>
                {Languages.preview.trainer}:{' '}
                {selectedLang === 'en'
                  ? pdata.postData.trainer.trainerName
                  : pdata.postData.trainer.trainerNameFr}
              </Text>
            )}
            {pdata.postData.energy === '' ? null : (
              <Text style={styles.text} allowFontScaling={false}>
                {Languages.preview.energy}:{' '}
                {selectedLang === 'en'
                  ? pdata.postData.energy.EnergyTypeName
                  : pdata.postData.energy.EnergyTypeNameFr}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      <Spinner visible={pdata.loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBlack,
  },
  headerBox: {
    width: '100%',
    height: fonts.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    backgroundColor: colors.colorBlack,
  },
  name: {
    fontSize: fonts.extraSmallText,
    color: '#828796',
  },
  heading: {
    color: colors.colorWhite,
    fontSize: fonts.title,
    fontWeight: 'bold',
  },
  subContainer: {
    width: '100%',
    height: moderateScale(500),
    backgroundColor: colors.colorBlack,
  },
  topBox: {
    width: '100%',
    height: moderateScale(70),
    padding: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  followBox: {
    width: moderateScale(100),
    height: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(50),
    backgroundColor: '#FFFFFF30',
    marginHorizontal: moderateScale(5),
  },
  cardBox: {
    width: '100%',
    height: moderateScale(300),
    backgroundColor: colors.colorBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '45%',
    height: moderateScale(280),
  },
  count: {
    position: 'absolute',
    bottom: 0,
    right: moderateScale(20),
    color: '#E5E5E5',
    fontSize: fonts.largeText,
  },
  saleBox: {
    backgroundColor: colors.colorPrimary,
    width: moderateScale(120),
    height: moderateScale(30),
    borderRadius: moderateScale(50),
    position: 'absolute',
    bottom: moderateScale(0),
    alignItems: 'center',
    justifyContent: 'center',
  },
  saleText: {
    color: colors.colorWhite,
    fontSize: fonts.text,
  },
  textBox: {
    width: '100%',
    backgroundColor: '#1F2128',
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    marginTop: moderateScale(10),
  },
  hashtagText: {
    fontSize: fonts.smallText,
    color: colors.colorPrimary,
    marginVertical: moderateScale(2),
  },
  text: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
    marginVertical: moderateScale(2),
  },
});

export default Preview;
