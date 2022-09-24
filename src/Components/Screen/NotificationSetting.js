/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Switch, BackHandler, Alert } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors } from '../../Utils/Colors';
import { fonts } from '../../Utils/Fonts';
import Header from '../Common/BackHeader';
import NetInfo from '@react-native-community/netinfo';
import Spinner from '../Common/Spinner';
import { Constant, WebServices } from '../../api/ApiRules';
import Button from '../Common/Button';
import Languages from '../../lang/i18n';

const NotificationSetting = ({ navigation }) => {

    let [ uid, setUid] = useState('');
    let [ all, setAll] = useState(false);
    let [ newPost, setNew] = useState(false);
    let [ live, setLive] = useState(false);
    let [ request, setRequest] = useState(false);
    let [ loading, setLoading] = useState(false);
    let [ selectedLang, setSelectedLang] = useState('');

    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            return true;
        };

        AsyncStorage.getItem('userData').then(val => {
            let uData = JSON.parse(val);
            setUid(uData.id);
            AsyncStorage.getItem('selectedLang').then(lang => {
                setSelectedLang(lang);
                validationAndApiParameters('getData',uData.id, lang);
            });
        });

        const backHandler = BackHandler.addEventListener( 'hardwareBackPress', backAction );

        return () => backHandler.remove();
    },[navigation]);

    const validationAndApiParameters = (apikey,param, lang) => {
        if (apikey === 'getData'){
            let url = Constant.URL_getNotificationStatus + '/' + lang + '?id=' + param;
            console.log(url);
            setLoading(true);
            postToApiCalling('Get', url, apikey);
        }
    };

    const postToApiCalling = ( method, apiUrl, apikey, uploadData ) =>{
        NetInfo.fetch().then(state => {
            if (state.isConnected){
                new Promise((resolve) => {
                    if (method === 'Get'){
                        resolve(WebServices.get(apiUrl));
                    }
                    else {
                        resolve(WebServices.applicationService(apiUrl, uploadData));
                    }
                }).then((jsonRes) => {
                    setLoading(false);
                    if ( jsonRes.success === 1){
                        apiSuccessfullResponse(jsonRes,apikey);
                    }
                    else if ( jsonRes.success === 0 ){
                        console.log(jsonRes.message);
                    }
                }).catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
            }
        });
    };

    let apiSuccessfullResponse = (jsonRes, apikey) => {
        if (apikey === 'getData'){
            let resp = jsonRes.getnotification[0];
            console.log(resp);
            setAll(resp.pushNotification === 1);
            setNew(resp.newPostNotification === 1);
            setLive(resp.connectionLiveNotification === 1);
            setRequest(resp.friendRequestNotification === 1);
        }
        if (apikey === 'save'){
            Alert.alert(
                'Pc Card',
                'Changes saved.',
                [
                    { text: 'OK', onPress: () => navigation.pop() },
                ]
            );
        }
    };

    let saveChanges = () => {
        let uploadData = {
            id:uid,
            pushNotification:all ? 1 : 0,
            newPostNotification:newPost ? 1 : 0,
            connectionLiveNotification:live ? 1 : 0,
            friendRequestNotification:request ? 1 : 0,
        };
        console.log(uploadData);
        let url = Constant.URL_saveNotificationStatus + '/' + selectedLang;
        setLoading(true);
        postToApiCalling('Post', url,'save',uploadData);
    };

    function allowAll(val) {
        if (!all){
            setNew(true);
            setLive(true);
            setRequest(true);
        }
        setAll(val);
    }

    function allowNew(val) {
        setNew(val);
        if (!val){
            setAll(false);
        }
        if (!newPost && live && request){
            setAll(true);
        }
    }

    function allowLive(val) {
        setLive(val);
        if (all){
            setAll(false);
        }
        if (newPost && !live && request){
            setAll(true);
        }
    }

    function allowRequest(val) {
        setRequest(val);
        if (all){
            setAll(false);
        }
        if (newPost && live && !request){
            setAll(true);
        }
    }

    return (
        <View style={styles.container}>
            <Header label={Languages.notificationSetting.heading} parentCallback={()=>navigation.pop()} />
            <View style={styles.subContainer} >
                <View style={styles.box}>
                    <View style={styles.row}>
                        <Text allowFontScaling={false} style={styles.text}>{Languages.notificationSetting.switch1}</Text>
                        <Switch
                            trackColor={{ false: '#000000', true: '#38CF3E' }}
                            thumbColor={all ? '#FFF' : '#FFF'}
                            onValueChange={(val)=>allowAll(val)}
                            value={all}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text allowFontScaling={false} style={styles.text}>{Languages.notificationSetting.switch2}</Text>
                        <Switch
                            trackColor={{ false: '#000000', true: '#38CF3E' }}
                            thumbColor={newPost ? '#FFF' : '#FFF'}
                            onValueChange={(val)=>allowNew(val)}
                            value={newPost}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text allowFontScaling={false} style={styles.text}>{Languages.notificationSetting.switch3}</Text>
                        <Switch
                            trackColor={{ false: '#000000', true: '#38CF3E' }}
                            thumbColor={live ? '#FFF' : '#FFF'}
                            onValueChange={(val)=>allowLive(val)}
                            value={live}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text allowFontScaling={false} style={styles.text}>{Languages.notificationSetting.switch4}</Text>
                        <Switch
                            trackColor={{ false: '#000000', true: '#38CF3E' }}
                            thumbColor={request ? '#FFF' : '#FFF'}
                            onValueChange={(val)=>allowRequest(val)}
                            value={request}
                        />
                    </View>
                </View>
                <Button
                    parentCallback={saveChanges}
                    label={Languages.notificationSetting.buttonText}
                />
            </View>
            <Spinner visible={loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.colorBlack,
    },
    subContainer:{
        flex:1,
        padding:moderateScale(15),
        alignItems:'center',
        justifyContent:'space-between',
    },
    box:{
        width:'100%',
        height:moderateScale(200),
        borderRadius:moderateScale(10),
        backgroundColor:colors.colorWhite,
        paddingHorizontal:moderateScale(15),
    },
    row:{
        flex:1,
        borderBottomWidth:moderateScale(1),
        borderColor:'#DEE8EE',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    text:{
        fontSize:fonts.smallText,
        color:colors.colorBlack,
    },
});

export default NotificationSetting;
