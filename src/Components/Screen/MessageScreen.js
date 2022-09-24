/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  VirtualizedList,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {fonts} from '../../Utils/Fonts';
import MessageCard from '../Common/MessageCard';
import SearchBox from '../Common/SearchBox';
import {CometChat} from '@cometchat-pro/react-native-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Languages from '../../lang/i18n';

const MessageScreen = ({navigation}) => {
  let [messageData, setMessageData] = useState([]);
  let [userData, setUserData] = useState({});
  let [showEmpty, setShowEmpty] = useState(false);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    AsyncStorage.getItem('userData').then(val => {
      let data = JSON.parse(val);
      console.log(data);
      setUserData(data);
    });

    let conversationRequest = new CometChat.ConversationsRequestBuilder()
      .setLimit(50)
      .setConversationType('user')
      .build();
    conversationRequest.fetchNext().then(
      conversationList => {
        if (conversationList.length === 0){
          setShowEmpty(true);
        }
        else {
          console.log('conversationList', conversationList);
          setMessageData(conversationList);
        }
      },
      error => {
        setShowEmpty(true);
        console.log('Conversations list fetching failed with error:', error);
      },
    );

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

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
            {userData?.username}
          </Text>
          <Text allowFontScaling={false} style={styles.heading}>
            {Languages.message.heading}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('MessagePeople')}
          activeOpacity={0.8}>
          <FeatherIcon
            name="edit"
            color={colors.colorWhite}
            size={moderateScale(20)}
          />
        </TouchableOpacity>
      </View>
      <SearchBox />
      <View>
        <VirtualizedList
          data={messageData}
          initialNumToRender={15}
          renderItem={({item}) => (
            <MessageCard data={item} navigation={navigation} />
          )}
          keyExtractor={item => item.lastMessage.id}
          getItemCount={data => data.length}
          getItem={(data, index) => data[index]}
          ListEmptyComponent={()=>(
              <View style={styles.emptyBox}>
                {showEmpty ?
                  <Text allowFontScaling={false} style={styles.emptyText}>
                    {Languages.message.empty}
                  </Text>
                :
                  null
                }
              </View>
          )}
        />
      </View>
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
    paddingHorizontal: moderateScale(15),
    borderColor: '#2E313C',
    borderBottomWidth: moderateScale(1),
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
  emptyBox: {
    flex: 1,
    paddingTop: moderateScale(150),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: fonts.largeText,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default MessageScreen;
