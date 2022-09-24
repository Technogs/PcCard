import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  BackHandler,
  View,
  TouchableOpacity,
  Text,
  Image,
  VirtualizedList,
  TextInput,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {fonts} from '../../Utils/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Constant, WebServices} from '../../api/ApiRules';
import NetInfo from '@react-native-community/netinfo';
import Spinner from '../Common/Spinner';
import moment from 'moment';
import Languages from '../../lang/i18n';
import CommentCard from '../Common/CommentCard';

const CommentScreen = ({navigation, route}) => {
  let [postData] = useState(route.params?.data);
  let [uid, setUid] = useState('');
  let [commentData, setCommentData] = useState([]);
  let [loading, setLoading] = useState(false);
  let [page] = useState(1);
  let [comment, setComment] = useState('');
  let [selectedLang, setSelectedLang] = useState('');
  let [parentId, setParentId] = useState('');
  let textinput = useRef(null);
  let childRef = useRef(null);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    async function fetchData() {
      await AsyncStorage.getItem('userData').then(val => {
        let userData = JSON.parse(val);
        setUid(userData.id);
        AsyncStorage.getItem('selectedLang').then(lang => {
          setSelectedLang(lang);
          validationAndApiParameters('getMessages', userData.id, lang);
        });
      });
    }

    fetchData();

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const validationAndApiParameters = (apikey, params, lang) => {
    if (apikey === 'getMessages') {
      let uploadData = {
        pcuserid: params,
        postid: postData.id,
        page: page,
        parentCommentId: '',
      };
      let url = Constant.URL_getComments + '/' + lang;
      setLoading(true);
      postToApiCalling('Post', url, apikey, uploadData);
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
              setLoading(false);
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
    setLoading(false);
    if (apikey === 'getMessages') {
      console.log(jsonRes);
      setCommentData(jsonRes.getcomments?.data);
    }
    if (apikey === 'save') {
      console.log('res', jsonRes);
      setComment('');
      setCommentData(jsonRes.postComment?.data);
    }
    if (apikey === 'saveChild') {
      console.log(jsonRes);
      setComment('');
      validationAndApiParameters('getMessages', uid, selectedLang);
      childRef.current.fetchData();
    }
  };

  let sendComment = () => {
    if (parentId === '') {
      let uploadData = {
        pcuserid: uid,
        postid: postData.id,
        comment: comment,
        parentCommentId: '',
      };
      console.log(uploadData);
      let url = Constant.URL_addComments + '/' + selectedLang;
      setLoading(true);
      postToApiCalling('Post', url, 'save', uploadData);
    } else {
      let uploadData = {
        pcuserid: uid,
        postid: postData.id,
        comment: comment,
        parentCommentId: parentId,
      };
      console.log(uploadData);
      let url = Constant.URL_addComments + '/' + selectedLang;
      setLoading(true);
      postToApiCalling('Post', url, 'saveChild', uploadData);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.pop()}>
          <EvilIcons
            name="arrow-left"
            color={colors.colorWhite}
            size={moderateScale(30)}
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text allowFontScaling={false} style={styles.name}>
            {postData?.user?.username}
          </Text>
          <Text allowFontScaling={false} style={styles.heading}>
            {Languages.commentScreen.heading}
          </Text>
        </View>
        <View style={{width: moderateScale(20)}} />
      </View>
      <View style={styles.descriptionBox}>
        <Image
          source={{uri: postData?.user?.profilePic}}
          style={{
            width: moderateScale(30),
            height: moderateScale(30),
            borderRadius: moderateScale(50),
          }}
        />
        <View
          style={{
            flex: 1,
            paddingStart: moderateScale(15),
            justifyContent: 'space-between',
          }}>
          <Text
            allowFontScaling={false}
            style={{
              color: colors.colorWhite,
              fontWeight: 'bold',
              fontSize: fonts.smallText,
              lineHeight: moderateScale(25),
            }}>
            {postData?.user?.username}{' '}
            <Text allowFontScaling={false} style={{fontWeight: 'normal'}}>
              {postData?.description}
            </Text>
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: fonts.extraSmallText,
              lineHeight: moderateScale(25),
              color: '#828796',
            }}>
            <FeatherIcon
              name="clock"
              color="#828796"
              size={moderateScale(12)}
            />{' '}
            {moment(postData?.created_at).fromNow(true)}
          </Text>
        </View>
      </View>
      <VirtualizedList
        style={{width: '100%'}}
        data={commentData}
        initialNumToRender={10}
        renderItem={({item}) => (
          <CommentCard
            ref={childRef}
            item={item}
            onReplyButtonPress={() => textinput.current.focus()}
            parentCommentId={id => setParentId(id)}
            uid={uid}
            lang={selectedLang}
            navigation={navigation}
          />
        )}
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
            <Text
              allowFontScaling={false}
              style={{
                fontSize: fonts.largeText,
                fontWeight: 'bold',
                color: '#ffffff',
              }}>
              {Languages.commentScreen.noComment}
            </Text>
          </View>
        )}
      />
      <View style={styles.bottomBox}>
        <Image
          source={{uri: postData?.user?.profilePic}}
          style={{
            width: moderateScale(30),
            height: moderateScale(30),
            borderRadius: moderateScale(50),
          }}
        />
        <TextInput
          ref={textinput}
          placeholder={Languages.commentScreen.textinput}
          placeholderTextColor="#828796"
          style={styles.textinput}
          allowFontScaling={false}
          autoCapitalize="sentences"
          value={comment}
          onChangeText={text => setComment(text)}
        />
        <TouchableOpacity activeOpacity={0.8} onPress={() => sendComment()}>
          <FeatherIcon
            name="send"
            color={colors.colorWhite}
            size={moderateScale(20)}
          />
        </TouchableOpacity>
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
  headerBox: {
    width: '100%',
    height: fonts.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
  },
  name: {
    color: colors.colorWhite,
    fontSize: fonts.extraSmallText,
  },
  heading: {
    color: colors.colorWhite,
    fontSize: fonts.title,
    fontWeight: 'bold',
  },
  descriptionBox: {
    width: '100%',
    height: moderateScale(100),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#2E313C',
    borderBottomWidth: moderateScale(1),
  },
  bottomBox: {
    width: '100%',
    backgroundColor: '#2E313C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: moderateScale(15),
  },
  textinput: {
    width: '80%',
    height: '100%',
    backgroundColor: colors.colorBlack,
    color: colors.colorWhite,
    borderRadius: moderateScale(50),
    paddingHorizontal: moderateScale(15),
  },
});

export default CommentScreen;
