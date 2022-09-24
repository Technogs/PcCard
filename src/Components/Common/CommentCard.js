import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import moment from 'moment';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Constant, WebServices} from '../../api/ApiRules';
import NetInfo from '@react-native-community/netinfo';

const CommentCard = (props, ref) => {
  let [showReply, setShowReply] = useState(false);
  let [replyList, setReplyList] = useState([]);

  useImperativeHandle(ref, () => ({
    fetchData: () => {
      fetchData();
    },
  }));

  const fetchData = () => {
    validationAndApiParameters('getMessages');
  };

  const validationAndApiParameters = apikey => {
    if (apikey === 'getMessages') {
      let uploadData = {
        pcuserid: props.uid,
        postid: props.item.postid,
        page: 1,
        parentCommentId: props.item.id,
      };
      let url = Constant.URL_getComments + '/' + props.lang;
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
            console.log(jsonRes);
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

  let apiSuccessfullResponse = (jsonRes, apikey) => {
    if (apikey === 'getMessages') {
      console.log(jsonRes);
      setReplyList(jsonRes.getcomments?.data);
    }
  };

  function namePressHandle(id) {
    if (props.uid === id) {
      props.navigation.navigate('ProfileTab');
    } else {
      props.navigation.navigate('OtherUserProfile', {item: id, tab: 1});
    }
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => namePressHandle(props.item?.comment_user?.id)}>
          <Image
            source={{uri: props.item?.comment_user?.profilePic}}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.messageContainer}>
          <Text
            numberOfLines={2}
            style={styles.messageText}
            onPress={() => namePressHandle(props.item?.comment_user?.id)}
            allowFontScaling={false}>
            {props.item?.comment_user?.username}{' '}
            <Text
              onPress={() => console.log('hello')}
              numberOfLines={2}
              style={styles.comment}>
              {props.item?.comment}
            </Text>
          </Text>
        </View>
        <Text allowFontScaling={false} style={styles.time}>
          {moment(props.item?.created_at).fromNow(true)}
        </Text>
      </View>
      <View style={styles.bottomBox}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.empty} />
          <TouchableOpacity activeOpacity={0.8} style={styles.commentBox}>
            <FeatherIcon
              name="message-circle"
              color={'#828796'}
              size={moderateScale(20)}
            />
            {/* {props.item?.commentCount > 0 && ( */}
            <Text style={styles.commentCount}>{props.item?.commentCount}</Text>
            {/* )} */}
          </TouchableOpacity>
          {props.item?.commentCount > 0 ? (
            <TouchableOpacity
              onPress={() => {
                validationAndApiParameters('getMessages');
                setShowReply(!showReply);
              }}>
              <Text style={styles.replyText}>
                {showReply ? 'Hide Replies' : 'View Replies'}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            props.parentCommentId(props.item.id);
            props.onReplyButtonPress();
          }}>
          <Text style={{color: colors.colorWhite}}>Reply</Text>
        </TouchableOpacity>
      </View>
      {showReply ? (
        <FlatList
          style={{alignItems: 'flex-end'}}
          renderItem={({item}) => (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',
                  paddingVertical: moderateScale(10),
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => namePressHandle(item?.comment_user?.id)}>
                  <Image
                    resizeMode="contain"
                    source={{uri: item?.comment_user?.profilePic}}
                    style={styles.profileImage}
                  />
                </TouchableOpacity>
                <View style={styles.messageContainer}>
                  <Text
                    numberOfLines={2}
                    style={styles.messageText}
                    onPress={() => namePressHandle(item?.comment_user?.id)}
                    allowFontScaling={false}>
                    {item?.comment_user?.username}{' '}
                    <Text
                      numberOfLines={2}
                      onPress={() => console.log('hi')}
                      style={styles.comment}>
                      {item?.comment}
                    </Text>
                  </Text>
                </View>
                <Text allowFontScaling={false} style={styles.time}>
                  {moment(item?.created_at).fromNow(true)}
                </Text>
              </View>
              {/* <View style={styles.bottomBox2}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={styles.empty} />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.commentBox}>
                    <FeatherIcon
                      name="message-circle"
                      color={'#828796'}
                      size={moderateScale(20)}
                    />
                    {item?.commentCount > 0 && (
                      <Text style={styles.commentCount}>
                        {item?.commentCount}
                      </Text>
                    )}
                  </TouchableOpacity>
                  {item?.commentCount > 0 ? (
                    <TouchableOpacity
                      onPress={() => {
                        validationAndApiParameters('getMessages');
                        setShowReply(!showReply);
                      }}>
                      <Text style={styles.replyText}>
                        {showReply ? 'Hide Replies' : 'View Replies'}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    props.parentCommentId(item.id);
                    props.onReplyButtonPress();
                  }}>
                  <Text style={{color: colors.colorWhite}}>Reply</Text>
                </TouchableOpacity>
              </View> */}
            </>
          )}
          data={replyList}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: moderateScale(10),
  },
  profileImage: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(50),
  },
  messageContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
  },
  messageText: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
    fontWeight: 'bold',
  },
  comment: {
    fontWeight: 'normal',
  },
  time: {
    color: '#828796',
    fontSize: fonts.miniText,
    fontWeight: '500',
  },
  bottomBox: {
    width: '100%',
    flexDirection: 'row',
  },
  bottomBox2: {
    width: '80%',
    flexDirection: 'row',
  },
  empty: {
    width: moderateScale(40),
  },
  commentBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentCount: {
    paddingHorizontal: moderateScale(10),
    fontSize: fonts.smallText,
    color: '#828796',
  },
  replyText: {
    color: colors.colorWhite,
    fontSize: fonts.extraSmallText,
  },
});

export default forwardRef(CommentCard);
