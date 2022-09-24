/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView, BackHandler, Alert } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors } from '../../Utils/Colors';
import { fonts } from '../../Utils/Fonts';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Button from '../Common/Button';
import * as commonFunctions from '../../Utils/CommonFunctions';
import NetInfo from '@react-native-community/netinfo';
import Spinner from '../Common/Spinner';
import { Constant, WebServices } from '../../api/ApiRules';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {authKey} from '../../Utils/CometChatKeys';

const image = require('../../Images/login.png');

const Login = ({ navigation }) => {

    const passwordRef = useRef();

    const [ data, setData ] = useState({
        email:'',
        password:'',
        emailError:'',
        passwordError:'',
        loading:false,
        deviceToken:'12',
        selectedLang:'en',
    });

    useEffect(() => {
        const backAction = () => {
            BackHandler.exitApp();
            return true;
        };

        AsyncStorage.getItem('selectedLang').then(lang => {
            setData({...data,selectedLang:lang});
        });

        AsyncStorage.getItem('deviceToken').then(val => {
            setData({...data,deviceToken:val});
        });

        const backHandler = BackHandler.addEventListener( 'hardwareBackPress', backAction );

        return () => backHandler.remove();
    }, [1]);

    const pressHandler = () => {
        let err = 0;
        if (data.email === ''){
            console.log('1');
            err = 1;
            setData({...data,emailError:'true'});
        }
        // else if (!commonFunctions.validateEmail(data.email)){
        //     console.log('2');
        //     err = 1;
        //     setData({...data,emailError:'true'});
        // }

        if (data.password === ''){
            err = 1;
            setData({...data,passwordError:'true'});
        }

        if (err === 0){
            let uploadData = {
                email:data.email,
                password:data.password,
                device_type:fonts.deviceType,
                device_token:data.deviceToken,
            };
            console.log(uploadData);
            let url = Constant.URL_login + data.selectedLang;
            console.log(url);
            setData({...data,loading:true});
            postToApiCalling(url,uploadData);
        }
    };

    const postToApiCalling = (apiUrl, uploadData) =>{
        NetInfo.fetch().then(state => {
            if (state.isConnected){
                new Promise((resolve) => {
                    resolve(WebServices.applicationService(apiUrl, uploadData));
                }).then((jsonRes) => {
                    console.log(jsonRes);
                    if ( jsonRes.success === 1){
                        apiSuccessfullResponse(jsonRes);
                    }
                    else if ( jsonRes.success === 0 ){
                        setData({...data,loading:false});
                        Alert.alert('Incorrect data',"Entered email and password didn't match.");
                    }
                }).catch((error) => {
                    console.log(error);
                    setData({...data,loading:false});
                });
            }
        });
    };

    const apiSuccessfullResponse = async ( jsonRes ) => {
        let userData = jsonRes.Pccarduserlogin[0];
        let user = new CometChat.User(userData.id.toString());
        user.setName(userData.username);
        CometChat.createUser(user, authKey).then(
            user => {
            console.log('User created : ', user);
            },
            error => {
            console.log('Login failed with exception:', {error});
            },
        );
        setData({...data,loading:false});
        const firstPair = ['loggedIn', JSON.stringify(true) ];
        const secondPair = ['userData', JSON.stringify(jsonRes.Pccarduserlogin[0]) ];
        const thirdPair = ['selectedLang','en'];
        await AsyncStorage.multiSet([firstPair, secondPair, thirdPair]);
        navigation.navigate('MyTabs');
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{flex:1}}>
                <KeyboardAvoidingView style={{width:'100%',height:fonts.deviceHeight}}>
                    <Image resizeMode="contain" source={image} style={styles.image} />
                    <View style={styles.subContainer}>
                        <Text allowFontScaling={false} style={styles.title}>Sign In</Text>
                        <View style={styles.inputContainer}>
                            <Fontisto name="email" color={colors.colorWhite} size={moderateScale(20)} />
                            <TextInput
                                placeholder="Enter your email"
                                placeholderTextColor={colors.colorWhite}
                                style={styles.textInput}
                                keyboardType="email-address"
                                autoCorrect={false}
                                autoCapitalize="none"
                                allowFontScaling={false}
                                blurOnSubmit={false}
                                onFocus={()=> setData({...data, emailError:''}) }
                                onSubmitEditing={()=>passwordRef.current.focus()}
                                onChangeText={(text) => setData({...data,email:text})}
                            />
                            {data.emailError === 'true' ?
                                <SimpleLineIcons name="close" color={colors.colorRed} size={moderateScale(20)} />
                            :
                                data.emailError === 'false' ?
                                    <SimpleLineIcons name="check" color={colors.colorGreen} size={moderateScale(20)} />
                                :
                                    null
                            }
                        </View>
                        <View style={styles.inputContainer}>
                            <Fontisto name="locked" color={colors.colorWhite} size={moderateScale(20)} />
                            <TextInput
                                ref={passwordRef}
                                placeholder="******"
                                secureTextEntry
                                keyboardType="default"
                                autoCorrect={false}
                                autoCapitalize="none"
                                allowFontScaling={false}
                                placeholderTextColor={colors.colorWhite}
                                style={styles.textInput}
                                onFocus={()=>setData({...data,passwordError:''})}
                                onChangeText={(text) => setData({...data,password:text})}
                            />
                            {data.passwordError === 'true' ?
                                <SimpleLineIcons name="close" color={colors.colorRed} size={moderateScale(20)} />
                            :
                                data.passwordError === 'false' ?
                                    <SimpleLineIcons name="check" color={colors.colorGreen} size={moderateScale(20)} />
                                :
                                    null
                            }
                        </View>
                        <View style={{width:'100%',height:moderateScale(40),alignItems:'flex-end'}}>
                            <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('GenerateOtp')}>
                                <Text style={{color:colors.colorWhite}}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                        <Button
                            label="Sign In"
                            parentCallback={()=>pressHandler()}
                        />
                    </View>
                    <View style={{flexDirection:'row',width:'100%',height:moderateScale(80),alignItems:'center',justifyContent:'center'}}>
                        <Text allowFontScaling={false} style={{color:colors.colorWhite,fontSize:fonts.smallText}}>Don't have an account? </Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=> navigation.navigate('Signup')}>
                            <Text allowFontScaling={false} style={{color:colors.colorPrimary,fontSize:fonts.smallText}}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            <Spinner visible={data.loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:colors.colorBlack,
    },
    image:{
        width:'100%',
        height:moderateScale(250),
    },
    subContainer:{
        flex:1,
        alignItems:'center',
        padding:moderateScale(20),
    },
    title:{
        color:colors.colorWhite,
        fontSize:fonts.title,
        fontWeight:'bold',
        marginBottom:moderateScale(10),
    },
    inputContainer:{
        width:'100%',
        height:moderateScale(50),
        flexDirection:'row',
        alignItems:'center',
        borderColor:colors.colorWhite,
        borderBottomWidth:moderateScale(1),
        marginVertical:moderateScale(10),
    },
    textInput:{
        flex:1,
        color:colors.colorWhite,
        paddingHorizontal:moderateScale(10),
    },
});

export default Login;
