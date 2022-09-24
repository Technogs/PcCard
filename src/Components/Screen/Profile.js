/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  BackHandler,
  ScrollView,
} from 'react-native';
import {colors} from '../../Utils/Colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/Fonts';
import FolderSection from '../Common/FolderSection';
import ListSection from '../Common/ListSection';
import NetInfo from '@react-native-community/netinfo';
import {Constant, WebServices} from '../../api/ApiRules';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Languages from '../../lang/i18n';

const Profile = ({navigation,route}) => {
    let [selectedTab, setSelectedTab] = useState(0);
    let [userData, setUserData] = useState({});
    let [uid, setUid] = useState('');
    let [following, setFollowing] = useState(0);
    let [follower, setFollower] = useState(0);
    let [userPosts, setUserPosts] = useState([]);
    let [collections, setCollections] = useState([]);
    let [followerList, setFollowerList] = useState([]);
    let [followingList, setFollowingList] = useState([]);

    useEffect(() => {
        console.log(navigation);
        const backAction = () => {
            navigation.goBack();
            return true;
        };
        if (route?.params?.tab === undefined) {
            setSelectedTab(1);
        } else {
            setSelectedTab(route?.params?.tab);
        }
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem('userData').then(val => {
                let user = JSON.parse(val);
                setUid(user.id);
                AsyncStorage.getItem('selectedLang').then(lang => {
                    validationAndApiParameters('getData', user.id, lang);
                });
            });
            setSelectedTab(1);
        });

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => {
            unsubscribe;
            backHandler.remove();
        };
    }, [1]);

    let validationAndApiParameters = (apikey, param, lang) => {
        if (apikey === 'getData') {
            let url = Constant.URL_userDetails + '/' + lang + '?id=' + param + '&selfId=' + param;
            console.log(url);
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

    const apiSuccessfullResponse = (jsonRes, apikey) => {
        if (apikey === 'getData') {
            console.log(jsonRes);
            setUserData(jsonRes.user);
            setFollower(jsonRes.Followers);
            setFollowerList(jsonRes.FollowersList);
            setFollowingList(jsonRes.FollowingsList);
            setFollowing(jsonRes.Followings);
            setUserPosts(jsonRes.userposts);
            setCollections(jsonRes.collectionsData);
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{alignItems: 'center'}}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            style={styles.container}>
            <View style={styles.headerBox}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.openDrawer()}
                >
                    <SimpleLineIcons
                        name="menu"
                        color={colors.colorWhite}
                        size={moderateScale(25)}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.imageBox}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>navigation.navigate('FollowersList',{data:followerList})}
                    style={{alignItems: 'center'}}>
                    <Text
                        allowFontScaling={false}
                        style={styles.followerCount}
                    >
                        {follower}
                    </Text>
                    <Text
                        allowFontScaling={false}
                        style={styles.followerText}
                    >
                        {Languages.profile.followers}
                    </Text>
                </TouchableOpacity>
                <Image
                    resizeMode={'contain'}
                    source={{uri: userData?.profilePic}}
                    style={styles.profileImage}
                />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=> navigation.navigate('FollowingList',{data: followingList})}
                    style={{alignItems: 'center'}}
                >
                    <Text
                        allowFontScaling={false}
                        style={styles.followerCount}
                    >
                        {following}
                    </Text>
                    <Text
                        allowFontScaling={false}
                        style={styles.followerText}
                    >
                        {Languages.profile.following}
                    </Text>
                </TouchableOpacity>
            </View>
            <Text allowFontScaling={false} style={styles.name}>
                {userData?.name}
            </Text>
            <Text allowFontScaling={false} style={styles.description}>
                {userData?.bio}
            </Text>
            <View style={{flexDirection: 'row', marginVertical: moderateScale(10)}}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditProfile')}
                >
                    <Text allowFontScaling={false} style={styles.editText}>
                        {Languages.profile.edit}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.promoteButton}
                    onPress={() => navigation.navigate('Promotion')}
                >
                    <Text allowFontScaling={false} style={styles.promoteText}>
                        {Languages.profile.promote}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    onPress={() => setSelectedTab(1)}
                    activeOpacity={0.8}
                    style={styles.tab1}
                >
                    <MaterialIcons
                        name="grid-on"
                        size={moderateScale(20)}
                        color={selectedTab === 1 ? colors.colorPrimary : colors.colorWhite}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setSelectedTab(2)}
                    activeOpacity={0.8}
                    style={styles.tab2}
                >
                    <SimpleLineIcons
                        name="folder"
                        size={moderateScale(20)}
                        color={selectedTab === 2 ? colors.colorPrimary : colors.colorWhite}
                    />
                </TouchableOpacity>
            </View>
            {selectedTab === 1 ?
                userPosts.length > 0 &&
                <View style={{flex:1, width: '100%'}}>
                    <ListSection data={userPosts} uid={uid} followingData={followingList} navigation={navigation} />
                </View>
            :
                <View style={{flex:1, width: '100%'}}>
                    <FolderSection otherUserId={uid} data={collections} following={followingList} uid={uid} navigation={navigation} />
                </View>
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.colorBlack,
    },
    headerBox: {
        width: '100%',
        alignItems: 'flex-end',
        padding: moderateScale(20),
    },
    imageBox: {
        width: '100%',
        height: moderateScale(100),
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginBottom: moderateScale(10),
    },
    profileImage: {
        width: moderateScale(80),
        height: moderateScale(80),
        borderRadius: moderateScale(40),
    },
    name: {
        fontSize: fonts.largeText,
        color: colors.colorWhite,
        fontWeight: 'bold',
    },
    description: {
        fontSize: fonts.smallText,
        color: '#FFFFFF80',
        fontWeight: 'normal',
        marginVertical: moderateScale(5),
        textAlign: 'center',
    },
    editButton: {
        width: moderateScale(110),
        height: moderateScale(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(50),
        marginHorizontal: moderateScale(5),
        backgroundColor: colors.colorPrimary,
    },
    editText: {
        color: colors.colorBlack,
        fontSize: fonts.smallText,
        fontWeight: '500',
    },
    promoteButton: {
        width: moderateScale(110),
        height: moderateScale(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(50),
        marginHorizontal: moderateScale(5),
        borderColor: '#444A5E',
        borderWidth: moderateScale(1),
    },
    promoteText: {
        color: colors.colorWhite,
        fontSize: fonts.smallText,
        fontWeight: '500',
    },
    tabContainer: {
        width: '100%',
        height: moderateScale(40),
        borderTopWidth: moderateScale(1),
        borderBottomWidth: moderateScale(1),
        borderColor: '#444A5E',
        flexDirection: 'row',
        marginTop: moderateScale(30),
    },
    tab1: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#444A5E',
        borderRightWidth: moderateScale(0.5),
    },
    tab2: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#444A5E',
        borderLeftWidth: moderateScale(0.5),
    },
    followerCount: {
        fontSize: fonts.title,
        color: colors.colorWhite,
        fontWeight: 'bold',
    },
    followerText: {
        fontSize: fonts.extraSmallText,
        color: colors.colorWhite,
    },
});

export default Profile;
