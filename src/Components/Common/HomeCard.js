/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Alert,
  VirtualizedList,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fonts} from '../../Utils/Fonts';
import Modal from 'react-native-modal';
import {Constant, WebServices} from '../../api/ApiRules';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import PagerView from 'react-native-pager-view';
import Languages from '../../lang/i18n';
import Spinner from '../Common/Spinner';
// import Share from 'react-native-share';
import PostFollowMessage from './PostFollowMessage';
import {CometChat} from '@cometchat-pro/react-native-chat';
import hashtagConverter from '../../Utils/hashtagConverter';
import FastImage from 'react-native-fast-image';

const HomeCard = ({navigation, item, uid, lang, followingData, height, refreshList}) => {
  let [showOptionModal, setOptionModal] = useState(false);
  let [showReportModal, setReportModal] = useState(false);
  let [postLikes, setPostLikes] = useState(item.post_likes);
  let [isLiked, setIsLiked] = useState(item?.post_liked_by_user === 1);
  let [isBookmarked, setIsBookmarked] = useState(item?.isBookmarked === 1);
  let [currentImage, setCurrentImage] = useState(1);
  let [following, setFollowing] = useState(item.follow_user === 1);
  let [loading, setLoading] = useState(false);
  let [likerImage, setLikerImage] = useState([]);
  let [showFollowListModal ,setShowFollowListModal] = useState(false);
  let [messageSentTo, setMesssageSentTo] = useState([]);
  let [hashtag, setHashtag] = useState('');

  useEffect(()=>{
    let arr = [];
    if (item?.likersImage.length > 0) {
      item?.likersImage.map(val => {
        arr.push(val?.user_images?.profilePic);
      });
    }
    setLikerImage(arr);
    let hash = hashtagConverter(item.hashTag);
    console.log(hash);
    setHashtag(hash);
  },[navigation]);

  let likePost = () => {
    let uploadData = {
      pcuserid: uid,
      postid: item.id,
    };
    let url = Constant.URL_likePost + '/' + lang;
    console.log(uploadData);
    setLoading(true);
    postToApiCalling('Post', url, 'likePost', uploadData);
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
            setLoading(false);
            console.log(error);
          });
      }
    });
  };

  let apiSuccessfullResponse = (jsonRes, apikey) => {
    if (apikey === 'likePost') {
      console.log(jsonRes);
      if ( jsonRes.message === 'Post unliked') {
        setPostLikes(postLikes - 1);
        setIsLiked(!isLiked);
        let arr = [];
        jsonRes?.likersImage.map(val => {
          arr.push(val?.user_images?.profilePic);
        });
        setLikerImage(arr);
      } else {
        setPostLikes(postLikes + 1);
        setIsLiked(!isLiked);
        let arr = [];
        jsonRes?.likersImage.map(val => {
          arr.push(val?.user_images?.profilePic);
        });
        setLikerImage(arr);
      }
    }
    if (apikey === 'reportPost') {
      Alert.alert('PC Card', 'Post reported.');
    }
    if (apikey === 'followUser') {
      setFollowing(true);
    }
    if (apikey === 'unfollowUser') {
      setFollowing(false);
    }
    if (apikey === 'bookmark') {
      setIsBookmarked(true);
      Toast.showWithGravity('Post bookmarked.', Toast.SHORT, Toast.BOTTOM);
    }
    if (apikey === 'removeBookmark'){
      setIsBookmarked(false);
      Toast.showWithGravity('Bookmark removed.', Toast.SHORT, Toast.BOTTOM);
    }
    if (apikey === 'deletePost'){
      console.log(jsonRes);
      refreshList(item.id);
    }
  };

  let reportPressed = reason => {
    setReportModal(false);
    let report = {
      pcuserid: uid,
      postid: item.id,
      reason: reason,
    };
    console.log(report);
    let url = Constant.URL_reportPost + '/' + lang;
    postToApiCalling('Post', url, 'reportPost', report);
  };

  let followUser = () => {
    if (following) {
      let userData = {
        pcuserid: uid,
        following_pcuserid: item?.createdBy,
      };
      console.log(userData);
      let url = Constant.URL_unfollowUsers + '/' + lang;
      console.log(url);
      postToApiCalling('Post', url,'unfollowUser',userData);
    }
    else {
      let userData = {
        pcuserid: uid,
        following_pcuserid: item?.createdBy,
      };
      console.log(userData);
      let url = Constant.URL_followUsers + '/' + lang;
      console.log(url);
      postToApiCalling('Post', url,'followUser',userData);
    }
  };

  let addBookmark = () => {
    if (isBookmarked) {
      let bookmarkData = {
        pcuserid: uid,
        postid: item.id,
      };
      console.log(bookmarkData);
      let url = Constant.URL_deleteBookmark + lang;
      console.log(url);
      postToApiCalling('Post', url,'removeBookmark',bookmarkData);
    }
    else {
      let bookmarkData = {
        pcuserid: uid,
        postid: item.id,
      };
      console.log(bookmarkData);
      let url = Constant.URL_addBookmark + lang;
      console.log(url);
      postToApiCalling('Post', url,'bookmark',bookmarkData);
    }
  };

  let namePressHandler = () => {
    if (item.createdBy === uid){
      navigation.navigate('ProfileTab',{ tab:1});
    }
    else {
      navigation.navigate('OtherUserProfile', {item: item.createdBy, tab:1});
    }
  };

  let onSharePress = () => {
    setOptionModal(false);
    let options = {
      message:'PC Cards',
      title:'PC Cards',
    };
    // Share.open(options).then((res) => {
    //   console.log(res);
    // })
    // .catch((err) => {
    //   err && console.log(err);
    // });
  };

  let sendMessage = (id) => {
    let receiverID = id.toString();
    let receiverType = CometChat.RECEIVER_TYPE.USER;
    let customMessage = new CometChat.CustomMessage(receiverID, receiverType, 'Post', item);
    CometChat.sendCustomMessage(customMessage).then(
      message => {
        console.log(id);
        setMesssageSentTo([...messageSentTo, id]);
        console.log("custom message sent successfully", message);
      }, error => {
        console.log("custom message sending failed with error", error);
      }
    );
  };

  function deletePost(){
    let deleteData = {
      postid:item.id,
    };
    let url = Constant.URL_deletePost + lang;
    console.log(deleteData);
    console.log(url);
    setLoading(true);
    postToApiCalling('Post',url,'deletePost', deleteData);
  }

  return (
    <View
      onLayout={(event) => height(event.nativeEvent.layout.height)}
      style={styles.container}>
      <View style={styles.topBox}>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>namePressHandler()}>
          <FastImage
            source={{uri: item?.user?.profilePic, priority: FastImage.priority.normal}}
            style={styles.profilePic}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
        <View style={styles.centerBox}>
          <TouchableOpacity activeOpacity={0.8} onPress={()=>namePressHandler()}>
            <Text allowFontScaling={false} style={styles.username}>
              {item?.user?.username}
            </Text>
          </TouchableOpacity>
          <Text
              allowFontScaling={false}
              style={{fontSize: fonts.extraSmallText, color: colors.colorWhite}}>
              {item?.address}
          </Text>
        </View>
        {item?.createdBy === uid ? null : (
          <TouchableOpacity
            style={styles.followBox}
            activeOpacity={0.8}
            onPress={() => followUser()}
          >
            <Text
              allowFontScaling={false}
              style={{color: colors.colorPrimary, fontSize: fonts.smallText}}>
              {following ? Languages.homeCard.following : Languages.homeCard.follow}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => setOptionModal(true)}
          activeOpacity={0.8}
        >
          <FeatherIcon
            name="more-vertical"
            color={colors.colorWhite}
            size={moderateScale(30)}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardBox}>
        <PagerView
          style={styles.cardBox}
          initialPage={0}
          onPageScroll={e => setCurrentImage(e.nativeEvent.position + 1)}>
          {item?.postMedia.map(media => {
            return (
              <FastImage
                key={media.id}
                source={{uri: media.mediaUrl, priority: FastImage.priority.normal}}
                style={styles.card}
                resizeMode={FastImage.resizeMode.contain}
              />
            );
          })}
        </PagerView>
        <View style={styles.countBox}>
          <Text>{currentImage}/{item?.postMedia.length}</Text>
        </View>
      </View>
      <View style={styles.likeBox}>
        <View style={styles.box}>
          <View style={styles.subBox1}>
            <View style={styles.likeImageBox}>
              {likerImage.length > 0 && likerImage.map((items,index) => {
                return (
                  <FastImage
                    key={index}
                    source={{uri: items, priority: FastImage.priority.normal}}
                    style={index === 0 ? styles.likeImage1 : index === 1 ? styles.likeImage2 : index === 2 ? styles.likeImage3 : styles.likeImage4 }
                    resizeMode={FastImage.resizeMode.contain}
                  />
                );
              })}
            </View>
            <TouchableOpacity
              onPress={() => likePost()}
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons
                name={isLiked ? 'ios-heart' : 'ios-heart-outline'}
                color={colors.colorBlack}
                size={moderateScale(25)}
              />
              <Text
                style={{
                  color: colors.colorBlack,
                  fontSize: fonts.smallText,
                  fontWeight: 'bold',
                  marginStart: moderateScale(5),
                }}
                allowFontScaling={false}>
                {postLikes}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('CommentScreen', {data: item})}
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FeatherIcon
                name="message-circle"
                color={colors.colorBlack}
                size={moderateScale(25)}
              />
              <Text
                style={{
                  color: colors.colorBlack,
                  fontSize: fonts.smallText,
                  fontWeight: 'bold',
                  marginStart: moderateScale(5),
                }}
                allowFontScaling={false}>
                {item?.post_comments}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowFollowListModal(true)}
              style={{width: moderateScale(40), justifyContent: 'center'}}>
              <FeatherIcon
                name="send"
                color={colors.colorBlack}
                size={moderateScale(25)}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => addBookmark()}
            activeOpacity={0.8}
            style={styles.subBox2}>
            <FontAwesome
              name={isBookmarked ? 'bookmark' : 'bookmark-o'}
              color={colors.colorWhite}
              size={moderateScale(30)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textBox}>
          <Text
            numberOfLines={2}
            allowFontScaling={false}
            style={{
              color: colors.colorWhite,
              fontSize: fonts.smallText,
              fontWeight: 'bold',
            }}>
            {item?.user?.username}{' '}
            <Text
              allowFontScaling={false}
              numberOfLines={2}
              style={{
                color: colors.colorWhite,
                fontSize: fonts.smallText,
                fontWeight: 'normal',
              }}>
              {item?.description}
            </Text>
          </Text>
          {item?.hashTag ? (
            <Text style={styles.hashtagText} allowFontScaling={false}>
              {hashtag}
            </Text>
          ) : null}
          {item?.peopleTag ? (
            <Text style={styles.hashtagText} allowFontScaling={false}>
              {item.peopleTag}
            </Text>
          ) : null}
          {item?.nameTeam && Object.keys(item.nameTeam).length !== 0  && Object.getPrototypeOf(item.nameTeam) === Object.prototype ? (
            <Text style={styles.text} allowFontScaling={false}>
              Selected Team: {lang === 'en' ? item?.nameTeam?.nameTeam : item?.nameTeam?.nameTeamFr}
            </Text>
          ) : null}
          {item.cardType && Object.keys(item.cardType).length !== 0  && Object.getPrototypeOf(item.cardType) === Object.prototype ? (
            <Text style={styles.text} allowFontScaling={false}>
              Selected Card Type: {lang === 'en' ? item?.cardType?.cardType : item?.cardType?.cardTypeFr}
            </Text>
          ) : null}
          {item?.rarity && Object.keys(item.rarity).length !== 0  && Object.getPrototypeOf(item.rarity) === Object.prototype ? (
            <Text style={styles.text} allowFontScaling={false}>
              {Languages.homeCard.rarity}: {lang === 'en' ? item?.rarity?.rareteName : item?.rarity?.rareteNameFr}
            </Text>
          ) : null}
          {item.types && Object.keys(item.types).length !== 0  && Object.getPrototypeOf(item.types) === Object.prototype ? (
            <Text style={styles.text} allowFontScaling={false}>
              {Languages.homeCard.types}: {lang === 'en' ? item?.types?.typeName : item?.types?.typeNameFr}
            </Text>
          ) : null}
          {item?.trainerType && Object.keys(item.trainerType).length !== 0  && Object.getPrototypeOf(item.trainerType) === Object.prototype ? (
            <Text style={styles.text} allowFontScaling={false}>
              {Languages.homeCard.trainer}: {lang === 'en' ? item?.trainerType?.trainerName : item?.trainerType?.trainerNameFr}
            </Text>
          ) : null}
          {item?.energyType && Object.keys(item.energyType).length !== 0  && Object.getPrototypeOf(item.energyType) === Object.prototype ? (
            <Text style={styles.text} allowFontScaling={false}>
              {Languages.homeCard.energy}: {lang === 'en' ? item?.energyType?.EnergyTypeName : item?.energyType?.EnergyTypeNameFr}
            </Text>
          ) : null}
        </View>
      </View>
      <Modal
        isVisible={showOptionModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        swipeDirection={'down'}
        animationOutTiming={800}
        backdropOpacity={0}
        hasBackdrop
        onSwipeComplete={() => setOptionModal(false)}
        onBackdropPress={() => setOptionModal(false)}
        onBackButtonPress={() => setOptionModal(false)}
        style={{margin: 0, justifyContent: 'flex-end'}}>
        <View style={styles.modalBox}>
          <View style={styles.topLine} />
          <TouchableOpacity
            style={{width: '100%'}}
            activeOpacity={0.8}
            onPress={() => {
              setOptionModal(false); setReportModal(true);
            }}>
            <Text allowFontScaling={false} style={styles.modalText}>
              {Languages.homeCard.report}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: '100%'}}
            activeOpacity={0.8}
            onPress={() => onSharePress()}>
            <Text allowFontScaling={false} style={styles.modalText}>
              {Languages.homeCard.share}
            </Text>
          </TouchableOpacity>
          {item?.createdBy === uid ?
            null
          :
            <TouchableOpacity
              style={{width: '100%'}}
              activeOpacity={0.8}
              onPress={() => {setOptionModal(false); followUser();}}>
              <Text allowFontScaling={false} style={styles.modalText}>
              {following ? Languages.homeCard.following : Languages.homeCard.follow}
              </Text>
            </TouchableOpacity>
          }
          {item?.createdBy === uid ?
            <TouchableOpacity
              style={{width: '100%'}}
              activeOpacity={0.8}
              onPress={() => {setOptionModal(false); deletePost();}}>
              <Text allowFontScaling={false} style={[styles.modalText, {color:colors.colorPrimary}]}>
                Delete Post
              </Text>
            </TouchableOpacity>
          :
            null
          }
        </View>
      </Modal>
      <Modal
        isVisible={showReportModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={1000}
        animationOutTiming={500}
        backdropOpacity={0}
        swipeDirection={'down'}
        onSwipeComplete={() => setReportModal(false)}
        onBackdropPress={() => setReportModal(false)}
        onBackButtonPress={() => setReportModal(false)}
        style={{margin: 0, justifyContent: 'flex-end'}}>
        <View style={styles.reportBox}>
          <View
            style={{
              width: '100%',
              height: moderateScale(60),
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: moderateScale(10),
              borderBottomWidth: moderateScale(1),
              borderColor: '#666666',
            }}>
            <View style={styles.topLine} />
            <Text
              allowFontScaling={false}
              style={{
                color: colors.colorWhite,
                fontSize: fonts.extraLargeText,
                fontWeight: 'bold',
              }}>
              {Languages.homeCard.report}
            </Text>
          </View>
          <View style={{padding: moderateScale(15)}}>
            <View style={{width: '100%'}}>
              <Text allowFontScaling={false} style={styles.modalHeading}>
                {Languages.homeCard.whyReport}
              </Text>
            </View>
            <TouchableOpacity
              style={{width: '100%'}}
              activeOpacity={0.8}
              onPress={() => reportPressed("It's spam")}>
              <Text allowFontScaling={false} style={styles.reportText}>
                {Languages.reportData.spam}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '100%'}}
              activeOpacity={0.8}
              onPress={() => reportPressed('Nudity or sexual activity')}>
              <Text allowFontScaling={false} style={styles.reportText}>
                {Languages.reportData.activity}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '100%'}}
              activeOpacity={0.8}
              onPress={() => reportPressed('Hate speech or symbol')}>
              <Text allowFontScaling={false} style={styles.reportText}>
                {Languages.reportData.hate}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '100%'}}
              activeOpacity={0.8}
              onPress={() => reportPressed('Fake information')}>
              <Text allowFontScaling={false} style={styles.reportText}>
                {Languages.reportData.fake}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '100%'}}
              activeOpacity={0.8}
              onPress={() => reportPressed("I just don't like it")}>
              <Text allowFontScaling={false} style={styles.reportText}>
                {Languages.reportData.like}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '100%'}}
              activeOpacity={0.8}
              onPress={() => reportPressed('Intellectual property violation')}>
              <Text allowFontScaling={false} style={styles.reportText}>
                {Languages.reportData.property}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={showFollowListModal}
        style={{margin:0, justifyContent: 'flex-end'}}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        swipeDirection="down"
        onSwipeComplete={()=> setShowFollowListModal(false)}
        onBackdropPress={()=> setShowFollowListModal(false)}
      >
        <View style={{width:'100%',height:'80%', backgroundColor:colors.colorBlack, alignItems:'center',padding: moderateScale(10),borderBottomWidth: moderateScale(1),borderColor: '#666666',}}>
          <View style={styles.topLine} />
          <VirtualizedList
            data={followingData}
            keyExtractor={item => item.id}
            style={{width:'100%'}}
            getItemCount={data => data.length}
            getItem={(data, index) => data[index]}
            renderItem={({ item }) => <PostFollowMessage data={item} sentMessageTo={messageSentTo} onsend={(id)=> sendMessage(id)} />}
          />
        </View>
      </Modal>
      <Spinner visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.colorBlack,
  },
  topBox: {
    width: '100%',
    height: moderateScale(70),
    padding: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerBox:{
    flex: 1,
    paddingHorizontal: moderateScale(10),
  },
  username: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
    fontWeight: 'bold',
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
    backgroundColor: '#505050',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: fonts.deviceWidth,
    height: moderateScale(250),
  },
  countBox:{
    position: 'absolute',
    bottom: moderateScale(10),
    right: moderateScale(20),
  },
  likeBox: {
    flex: 1,
    padding: moderateScale(10),
    justifyContent: 'space-between',
  },
  box: {
    width: '100%',
    height: moderateScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  likeImageBox:{
    width: moderateScale(70),
    justifyContent: 'center',
  },
  likeImage1:{
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(100),
  },
  likeImage2:{
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(100),
    position: 'absolute',
    right: moderateScale(30),
    zIndex: 99,
  },
  likeImage3:{
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(100),
    position: 'absolute',
    right: moderateScale(15),
    zIndex: 99,
  },
  likeImage4:{
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(100),
    position: 'absolute',
    right: moderateScale(0),
    zIndex: 99,
  },
  subBox1: {
    width: '80%',
    height: '100%',
    padding: moderateScale(5),
    backgroundColor: '#FFFFFF60',
    borderRadius: moderateScale(50),
    flexDirection: 'row',
  },
  subBox2: {
    width: moderateScale(50),
    height: moderateScale(40),
    borderRadius: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF20',
  },
  modalBox: {
    width: '100%',
    backgroundColor: colors.colorBlack,
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    padding: moderateScale(10),
    alignItems: 'center',
  },
  topLine: {
    width: moderateScale(40),
    height: moderateScale(4),
    borderRadius: moderateScale(5),
    backgroundColor: '#FFFFFF40',
  },
  modalText: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
    fontWeight: '500',
    padding: moderateScale(20),
  },
  reportBox: {
    width: '100%',
    height: moderateScale(500),
    backgroundColor: colors.colorBlack,
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
  },
  modalHeading: {
    fontSize: fonts.text,
    color: colors.colorWhite,
    fontWeight: 'bold',
    paddingBottom: moderateScale(15),
  },
  reportText: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
    fontWeight: '500',
    paddingVertical: moderateScale(15),
  },
  profilePic: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(50),
  },
  textBox: {
    width: '100%',
    backgroundColor: '#1F2128',
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    marginVertical: moderateScale(10),
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

export default HomeCard;
