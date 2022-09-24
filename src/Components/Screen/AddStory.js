/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View,Dimensions, Text, BackHandler, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { colors } from '../../Utils/Colors';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constant, WebServices} from '../../api/ApiRules';
import Spinner from '../Common/Spinner';
import { fonts } from '../../Utils/Fonts';

const screenHeight = Dimensions.get('window').height;

const AddStory = ({ navigation }) => {
    const cameraRef = useRef();
    const [ data, setData ] = useState({
        flash:false,
        camera:false,
        userData:{},
        channelName:'',
        token:'',
    });
    let [loading, setLoading ] = useState(false);

    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            return true;
        };

        AsyncStorage.getItem('userData').then((val) => {
            let userData = JSON.parse(val);
            setData({...data,userData:userData});
        });

        const backHandler = BackHandler.addEventListener( 'hardwareBackPress', backAction );

        return () => backHandler.remove();
    },[navigation]);

    const postToApiCalling = (apiUrl, apikey) => {
        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            new Promise(resolve => {
              resolve(WebServices.get(apiUrl));
            })
              .then(jsonRes => {
                console.log(jsonRes);
                setLoading(false);
                if (jsonRes.success === 1) {
                  apiSuccessfullResponse(jsonRes, apikey);
                } else if (jsonRes.success === 0) {
                  console.log(jsonRes);
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
        if (apikey === 'getToken'){
            console.log(jsonRes);
            let ldata = {
                token: jsonRes.token,
                channelName: jsonRes.channelName,
                user_data:{
                    id: data.userData.id,
                    name: data.userData.name,
                    username: data.userData.username,
                    profilePic:data.userData.profilePic,
                },
            };
            console.log(ldata);
            navigation.navigate('LiveScreen',{data:ldata,from:'new'});
        }
    };

    const onClick = () =>{
        NetInfo.fetch().then(state => {
            if (Platform.OS === 'android'){
            }
        });
        let url = Constant.URL_getToken + data.userData.username;
        console.log(url);
        setLoading(true);
        postToApiCalling(url, 'getToken');
    };

    return (
        <View style={styles.container}>
            <RNCamera
                ref={cameraRef}
                style={styles.preview}
                type={ data.camera ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
                flashMode={ data.flash ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                captureAudio={false}
            />
            <View style={styles.topBox}>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.pop()}>
                    <Icon name="arrow-left-circle" color={colors.colorWhite} size={moderateScale(20)} />
                </TouchableOpacity>
                <View style={{width:moderateScale(20)}}/>
            </View>
            <View style={styles.bottomBox}>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>onClick()} style={styles.button}>
                    <Text style={styles.buttonText}>Start Live</Text>
                </TouchableOpacity>
            </View>
            <Spinner visible={loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    preview:{
        width:'100%',
        height:screenHeight,
    },
    topBox:{
        position:'absolute',
        top:0,
        backgroundColor:'#00000020',
        flexDirection:'row',
        width:'100%',
        padding:moderateScale(20),
        justifyContent:'space-between',
    },
    bottomBox:{
        position:'absolute',
        bottom:moderateScale(0),
        width:'100%',
        padding:moderateScale(10),
        alignItems:'center',
        justifyContent:'space-between',
    },
    button:{
        width:moderateScale(100),
        borderRadius:moderateScale(40),
        backgroundColor:colors.colorPrimary,
        padding: moderateScale(10),
        alignItems:'center',
        justifyContent:'center',
    },
    buttonText:{
        color: colors.colorWhite,
        fontSize: fonts.smallText,
    },
});

export default AddStory;
