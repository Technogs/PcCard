import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {fonts} from '../../Utils/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CreditCardInput} from 'react-native-credit-card-input';
import {charges, getCreditCardToken} from '../../Utils/CardVerify';
import {Constant, WebServices} from '../../api/ApiRules';
import NetInfo from '@react-native-community/netinfo';
import {CommonActions} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from '../Common/Spinner';
import Languages from '../../lang/i18n';

let sucessImage = require('../../Images/PromotionSucess.png');
const CURRENCY = 'INR';
var CARD_TOKEN = null;

const AddPromotion = ({navigation}) => {
  let [uid, setUid] = useState('');
  let [currentTab, setCurrentTab] = useState(1);
  let [showModal, setShowModal] = useState(false);
  let [card, setCard] = useState('');
  let [postSelected, setPostSelected] = useState([]);
  let [promotionData, setPromotionData] = useState([]);
  let [selectedPlan, setSelectedPlan] = useState({});
  let [loading, setLoading] = useState(false);
  let [postData, setPostData] = useState([]);
  let [refresh, setRefresh] = useState(false);
  let [selectedLang, setSelectedLang] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userData').then(val => {
      let userdata = JSON.parse(val);
      console.log(userdata);
      setUid(userdata.id);
      AsyncStorage.getItem('selectedLang').then(lang => {
        setSelectedLang(lang);
        validationAndApiParameters('getPromotions', userdata.id, lang);
      });
    });
  },[navigation]);

  let validationAndApiParameters = (apikey, id, lang) => {
    if (apikey === 'getPromotions') {
      let url = Constant.URL_getPlans + '/' + lang;
      setLoading(true);
      postToApiCalling('Get', url, apikey);
    }
    if (apikey === 'getPostsData') {
      let url = Constant.URL_getPostsForPromotion + uid + '/' + selectedLang;
      setLoading(true);
      postToApiCalling('Get', url, apikey);
    }
    if (apikey === 'createPromotion') {
      let data = {
        userId: uid,
        planId: selectedPlan.id,
        postIdList: postSelected.toString(),
        transactionId: id,
        totalPost: postSelected.length,
      };
      let url = Constant.URL_createPromotion + '/' + selectedLang;
      setLoading(true);
      postToApiCalling('Post', url, apikey, data);
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
            console.log(error);
            setLoading(false);
          });
      }
    });
  };

  let apiSuccessfullResponse = (jsonRes, apikey) => {
    if (apikey === 'getPromotions') {
      setPromotionData(jsonRes.plans);
      setSelectedPlan(jsonRes.plans[0]);
    }
    if (apikey === 'getPostsData') {
      console.log(jsonRes);
      setPostData(jsonRes.plans.data);
    }
    if (apikey === 'createPromotion') {
      setCurrentTab(currentTab + 1);
    }
  };

  const nextPressed = () => {
    if (currentTab === 1) {
      setCurrentTab(currentTab + 1);
      validationAndApiParameters('getPostsData');
    }
    if (currentTab === 2) {
      if (postSelected.length > 0) {
        setShowModal(true);
      } else {
        Alert.alert('PC Cards', 'No post selected');
      }
    }
  };

  let paymentFuction = async () => {
    if (card === '') {
      Alert.alert('PC Card', 'Please enter card details.');
    } else {
      let creditCardToken;
      try {
        creditCardToken = await getCreditCardToken(card);
        CARD_TOKEN = creditCardToken.id;
        if (creditCardToken.error) {
          Alert.alert('creditCardToken error');
          return;
        }
      } catch (e) {
        console.log('e', e);
        return;
      }

      let payment_data = await charges(CURRENCY, CARD_TOKEN, 50);
      console.log('pament_data', payment_data);
      if (payment_data.status === 'succeeded') {
        setShowModal(false);
        validationAndApiParameters('createPromotion', payment_data.id);
      } else {
        Alert.alert('Payment failed');
      }
    }
  };

  let homePressed = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Home'}],
      }),
    );
  };

  let renderItem = ({item}) => {
    let setSelection = () => {
      if (postSelected.includes(item.id)) {
        let ind = postSelected.indexOf(item.id);
        postSelected.splice(ind, 1);
      } else {
        if (postSelected.length <= selectedPlan.postLimit) {
          postSelected.push(item.id);
        }
      }
      setRefresh(!refresh);
    };

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setSelection(item)}
        style={styles.card}>
        <Image
          source={{uri: item.get_media[0].mediaUrl}}
          resizeMode="contain"
          style={{width: '100%', height: '100%'}}
        />
        {postSelected.includes(item.id) ? (
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

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.pop()}>
          <Icon
            name="closecircleo"
            color={colors.colorWhite}
            size={moderateScale(20)}
          />
        </TouchableOpacity>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.addPromotion.heading}
        </Text>
        {currentTab < 3 ? (
          <TouchableOpacity activeOpacity={0.8} onPress={() => nextPressed()}>
            <Text allowFontScaling={false} style={styles.nextText}>
              {Languages.addPromotion.next}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{width: moderateScale(20)}} />
        )}
      </View>
      <View style={styles.progressBarBox}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={
            currentTab === 1 ? ['#9A0606', '#EB5757'] : ['#D1D1D1', '#4E4E4E']
          }
          style={styles.progressBar}
        />
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={
            currentTab === 2 ? ['#9A0606', '#EB5757'] : ['#D1D1D1', '#4E4E4E']
          }
          style={styles.progressBar}
        />
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={
            currentTab === 3 ? ['#9A0606', '#EB5757'] : ['#D1D1D1', '#4E4E4E']
          }
          style={styles.progressBar}
        />
      </View>
      {currentTab === 1 ? (
        <View
          style={{flex: 1, alignItems: 'center', padding: moderateScale(20)}}>
          <Text
            style={{
              color: colors.colorWhite,
              fontSize: fonts.extraLargeText,
              fontWeight: '600',
            }}>
            {Languages.addPromotion.subheading1}
          </Text>
          {promotionData.map(item => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelectedPlan(item)}
                activeOpacity={0.8}
                style={
                  selectedPlan.id === item.id
                    ? styles.activeBox
                    : styles.inactiveBox
                }>
                {selectedPlan.id === item.id ? (
                  <>
                    <Text allowFontScaling={false} style={styles.activeText}>
                      ${item.planPrice}
                    </Text>
                    <Text style={styles.activePackageType}>
                      {item.planName}
                    </Text>
                    <Text style={styles.packageDesc}>
                      {item.postLimit} {Languages.addPromotion.post}{' '}
                      {item.planValidity}
                    </Text>
                  </>
                ) : (
                  <>
                    <View style={{flex: 1}}>
                      <Text style={styles.packageType}>{item.planName}</Text>
                      <Text style={styles.packageDesc}>
                        {item.postLimit} {Languages.addPromotion.post}{' '}
                        {item.planValidity}
                      </Text>
                    </View>
                    <Text allowFontScaling={false} style={styles.inactiveText}>
                      ${item.planPrice}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ) : currentTab === 2 ? (
        <View style={{flex: 1, padding: moderateScale(20)}}>
          <Text
            allowFontScaling={false}
            style={{
              color: colors.colorWhite,
              fontSize: fonts.smallText,
              fontWeight: 'bold',
            }}>
            {Languages.addPromotion.subheading1}
          </Text>
          <Text
            allowFontScaling={false}
            style={{fontSize: fonts.smallText, color: '#FFFFFF50'}}>
            {postSelected.length} / {selectedPlan.postLimit}{' '}
            {Languages.addPromotion.postSelected} - {selectedPlan.planValidity}
          </Text>
          <FlatList
            data={postData}
            style={{width: '100%'}}
            numColumns={3}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {Languages.addPromotion.emptyText}
                </Text>
              </View>
            )}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            padding: moderateScale(20),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={sucessImage}
            resizeMode="contain"
            style={{width: moderateScale(220), height: moderateScale(220)}}
          />
          <Text
            allowFontScaling={false}
            style={{
              fontSize: fonts.title,
              color: colors.colorWhite,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {Languages.addPromotion.success}
          </Text>
          <TouchableOpacity
            onPress={() => homePressed()}
            activeOpacity={0.8}
            style={{marginTop: moderateScale(30)}}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: fonts.title,
                fontWeight: '500',
                color: colors.colorPrimary,
              }}>
              {Languages.addPromotion.home}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        isVisible={showModal}
        style={{margin: 0, justifyContent: 'flex-end'}}
        hasBackdrop={false}>
        <View style={styles.modal}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowModal(false)}>
            <Icon
              name="close"
              size={moderateScale(15)}
              color={colors.colorBlack}
            />
          </TouchableOpacity>
          <CreditCardInput
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            validColor={colors.colorBlack}
            placeholderColor="#ccc"
            onChange={text => setCard(text)}
          />
          <TouchableOpacity
            onPress={() => paymentFuction()}
            activeOpacity={0.8}
            style={styles.button}>
            <Text style={styles.buttonText}>
              {Languages.addPromotion.paymentText}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Spinner visible={loading} />
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
    paddingHorizontal: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: fonts.largeText,
    color: colors.colorWhite,
    fontWeight: 'bold',
  },
  nextText: {
    color: colors.colorPrimary,
    fontSize: fonts.smallText,
  },
  progressBarBox: {
    width: '100%',
    height: moderateScale(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: moderateScale(3),
    borderRadius: moderateScale(1),
    marginHorizontal: moderateScale(5),
  },
  activeBox: {
    width: '100%',
    height: moderateScale(160),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.colorPrimary,
    borderRadius: moderateScale(25),
    marginTop: moderateScale(20),
  },
  inactiveBox: {
    width: '100%',
    height: moderateScale(80),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#662222',
    borderRadius: moderateScale(25),
    marginTop: moderateScale(20),
    flexDirection: 'row',
    padding: moderateScale(20),
  },
  activeText: {
    fontSize: moderateScale(40),
    color: colors.colorWhite,
    fontWeight: '500',
  },
  inactiveText: {
    fontSize: moderateScale(30),
    color: colors.colorWhite,
    fontWeight: '500',
  },
  activePackageType: {
    fontSize: fonts.extraLargeText,
    color: colors.colorWhite,
    fontWeight: '500',
    marginVertical: moderateScale(5),
  },
  packageType: {
    fontSize: fonts.extraLargeText,
    color: colors.colorWhite,
    fontWeight: '500',
  },
  packageDesc: {
    fontSize: fonts.smallText,
    color: '#E5E5E5',
    fontWeight: '500',
  },
  modal: {
    width: '100%',
    backgroundColor: colors.colorWhite,
    padding: moderateScale(10),
  },
  button: {
    width: '100%',
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.colorPrimary,
  },
  buttonText: {
    fontSize: fonts.largeText,
    fontWeight: '700',
    color: colors.colorWhite,
  },
  inputContainerStyle: {
    backgroundColor: colors.colorWhite,
  },
  inputStyle: {
    paddingLeft: moderateScale(15),
    borderRadius: moderateScale(5),
    color: colors.colorBlack,
  },
  labelStyle: {
    marginBottom: moderateScale(0),
    fontSize: fonts.smallText,
  },
  card: {
    width: '32.5%',
    height: moderateScale(120),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: moderateScale(5),
    marginVertical: moderateScale(5),
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
});

export default AddPromotion;
