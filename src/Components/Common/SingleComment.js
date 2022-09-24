import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import moment from 'moment';
import FeatherIcon from 'react-native-vector-icons/Feather';

const SingleComment = ({item, onReplyButtonPress, uid, lang, showReply}) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          source={{uri: item.comment_user.profilePic}}
          style={styles.profileImage}
        />
        <View style={styles.messageContainer}>
          <Text
            numberOfLines={2}
            style={styles.messageText}
            allowFontScaling={false}>
            {item?.comment_user?.username}{' '}
            <Text numberOfLines={2} style={styles.comment}>
              {item?.comment}
            </Text>
          </Text>
        </View>
        <Text allowFontScaling={false} style={styles.time}>
          {moment(item?.created_at).fromNow(true)}
        </Text>
      </View>
      <View style={styles.bottomBox2}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.empty} />
          <TouchableOpacity activeOpacity={0.8} style={styles.commentBox}>
            <FeatherIcon
              name="message-circle"
              color={'#828796'}
              size={moderateScale(20)}
            />
            {item?.commentCount > 0 && (
              <Text style={styles.commentCount}>{item?.commentCount}</Text>
            )}
          </TouchableOpacity>
          {item?.commentCount > 0 ? (
            <TouchableOpacity
              onPress={() => {
                // validationAndApiParameters('getMessages');
                // showReply();
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
            // parentCommentId(item.id);
            // onReplyButtonPress();
          }}>
          <Text style={{color: colors.colorWhite}}>Reply</Text>
        </TouchableOpacity>
      </View>
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

export default SingleComment;
