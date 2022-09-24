/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  BackHandler,
  VirtualizedList,
  Text
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constant,WebServices } from '../../api/ApiRules';
import NetInfo from '@react-native-community/netinfo';
import Spinner from '../Common/Spinner';
import FollowingNotificationCard from '../Common/FollowingNotificationCard';
import Languages from '../../lang/i18n';

const FollowingNotification = ({navigation}) => {
    let [uid,setUid] = useState('');
    let [loading,setLoading] = useState(false);
    let [notificationData,setNotificationData] = useState([]);
    let [selectedLang, setSelectedLang] = useState('');

    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        AsyncStorage.getItem('userData').then(val => {
            let userData = JSON.parse(val);
            setUid(userData.id);
            AsyncStorage.getItem('selectedLang').then(lang => {
                setSelectedLang(lang);
                validationAndApiParameters('getNotification', userData.id, lang);
            });
        });

        return () => backHandler.remove();
    }, [1]);

    function validationAndApiParameters(apikey, param, lang) {
        if (apikey === 'getNotification') {
            let url = Constant.URL_getFollowingNotification + '/' + lang + '?pcuserid=' + param;
            console.log(url);
            postToApiCalling('Get', url, apikey);
        }
    }

    function postToApiCalling(method, apiUrl, apikey, uploadData) {
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
                        setLoading(false);
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
    }

    function apiSuccessfullResponse(jsonRes, apikey) {
        if (apikey === 'getNotification') {
            setNotificationData(jsonRes.notifications.data);
        }
    }

    return (
        <View activeOpacity={0.8} style={styles.container}>
            {/* <Text allowFontScaling={false} style={styles.heading}>New</Text> */}
            <VirtualizedList
                style={{width: '100%'}}
                data={notificationData}
                initialNumToRender={10}
                renderItem={({item}) => (
                    <FollowingNotificationCard navigation={navigation} item={item} />
                )}
                keyExtractor={item => item.id}
                getItemCount={data => data.length}
                getItem={(data, index) => data[index]}
                ListEmptyComponent={()=> (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            {Languages.followingNotification.empty}
                        </Text>
                    </View>
                )}
            />
            <Spinner visible={loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.colorBlack,
        padding: moderateScale(20),
    },
    heading: {
        color: colors.colorWhite,
        fontSize: fonts.largeText,
        marginBottom: moderateScale(20),
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

export default FollowingNotification;
