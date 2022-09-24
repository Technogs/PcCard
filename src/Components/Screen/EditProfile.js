/* eslint-disable prettier/prettier */
import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import {fonts} from '../../Utils/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionSheet from 'react-native-actionsheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import NetInfo from '@react-native-community/netinfo';
import Spinner from '../Common/Spinner';
import {Constant, WebServices} from '../../api/ApiRules';
import * as commonFunctions from '../../Utils/CommonFunctions';
import Languages from '../../lang/i18n';

const profile = require('../../Images/profileImage.png');

const EditProfile = ({navigation}) => {
  let [data, setData] = useState({
    uid: '',
    name: '',
    userName: '',
    email: '',
    website: '',
    bio: '',
    profileImage: profile,
    selectedImage: {},
    imageChanged: false,
    loading: false,
  });
  let [selectedLang, setSelectedLang] = useState('');

  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_actionSheet = useRef();

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    AsyncStorage.getItem('selectedLang').then(lang => {
      setSelectedLang(lang);
    });

    AsyncStorage.getItem('userData').then(val => {
      let userData = JSON.parse(val);
      console.log(userData);
      setData({
        uid: userData.id,
        name: userData.name,
        userName: userData.username,
        email: userData.email,
        website: userData.website,
        bio: userData.bio,
        profileImage: {uri: userData.profilePic},
      });
    });

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const actionsheet = index => {
    if (index === 0) {
      let options = {
        mediaType: 'photo',
        quality: 1,
      };
      launchCamera(options, resp => {
        if (resp.assets) {
          setData({
            ...data,
            profileImage: {uri: resp.assets[0].uri},
            selectedImage: resp.assets[0],
            imageChanged: true,
          });
        }
      });
    } else if (index === 1) {
      let options = {
        mediaType: 'photo',
        quality: 1,
      };
      launchImageLibrary(options, resp => {
        if (resp.assets) {
          setData({
            ...data,
            profileImage: {uri: resp.assets[0].uri},
            selectedImage: resp.assets[0],
            imageChanged: true,
          });
        }
      });
    }
  };

  const save = () => {
    let err = 0;
    console.log(data.website);
    if (data.website !== '' && !commonFunctions.validateUrl(data.website)) {
      err = 1;
      Alert.alert('PC Card', 'Please enter a valid website.');
    }
    if (err === 0) {
      let formData = new FormData();
      formData.append('id', data.uid);
      formData.append('name', data.name);
      formData.append('username', data.userName);
      formData.append('email', data.email);
      formData.append('website', data.website);
      formData.append('bio', data.bio);
      if (data.imageChanged) {
        formData.append('profilePic', {
          uri: data.profileImage.uri,
          name: data.selectedImage.fileName,
          type: data.selectedImage.type,
        });
      }
      console.log(formData);
      let url = Constant.URL_editProfile + '/' + selectedLang;
      setData({...data, loading: true});
      postToApiCalling(url, formData);
    }
  };

  const postToApiCalling = (apiUrl, uploadData) => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        new Promise(resolve => {
          resolve(WebServices.formService(apiUrl, uploadData));
        })
          .then(jsonRes => {
            console.log(jsonRes);
            if (jsonRes.success === 1) {
              apiSuccessfullResponse(jsonRes);
            } else if (jsonRes.success === 0) {
              setData({...data, loading: false});
              Alert.alert(
                'Incorrect data',
                "Entered email and password didn't match.",
              );
            }
          })
          .catch(error => {
            console.log(error);
            setData({...data, loading: false});
          });
      }
    });
  };

  const apiSuccessfullResponse = jsonRes => {
    console.log(jsonRes);
    setData({...data, loading: false});
    AsyncStorage.setItem(
      'userData',
      JSON.stringify(jsonRes.editprofiledata),
    );
    Alert.alert('PC Card', 'Profile updated successfully.');
  };

  let handleNamepress = val => {
    console.log(val);
    if (val === 'Backspace') {
      let str = data.name.substring(0, data.name.length - 1);
      setData({...data, name: str});
    } else if (val === ' ') {
      setData({...data, name: data.name + val});
    } else if (/^(?:[A-Za-z]+)$/.test(val)) {
      setData({...data, name: data.name + val});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.pop()}>
          <SimpleLineIcons
            name="close"
            color={colors.colorWhite}
            size={moderateScale(20)}
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text allowFontScaling={false} style={styles.headerName}>
            lana_smith
          </Text>
          <Text allowFontScaling={false} style={styles.headerTitle}>
            {Languages.editProfile.heading}
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => save()}>
          <SimpleLineIcons
            name="check"
            color={colors.colorPrimary}
            size={moderateScale(20)}
          />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}>
          <View
            style={{marginVertical: moderateScale(30), alignItems: 'center'}}>
            <Image
              source={data.profileImage}
              style={{
                width: moderateScale(80),
                height: moderateScale(80),
                borderRadius: moderateScale(40),
              }}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.editImageBox}
              onPress={() => ref_actionSheet.current.show()}>
              <Feather
                name="edit-2"
                color={colors.colorWhite}
                size={moderateScale(12)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text allowFontScaling={false} style={styles.title}>
              {Languages.editProfile.name}
            </Text>
            <TextInput
              placeholder="Name"
              allowFontScaling={false}
              keyboardType="default"
              autoCapitalize="words"
              value={data.name}
              placeholderTextColor={colors.colorWhite}
              style={styles.textInput}
              blurOnSubmit={false}
              onKeyPress={e => handleNamepress(e.nativeEvent.key)}
              onSubmitEditing={() => ref_input2.current.focus()}
            />
          </View>
          <View style={styles.row}>
            <Text allowFontScaling={false} style={styles.title}>
              {Languages.editProfile.username}
            </Text>
            <TextInput
              ref={ref_input1}
              placeholder="Username"
              allowFontScaling={false}
              editable={false}
              keyboardType="default"
              autoCapitalize="none"
              value={data.userName}
              placeholderTextColor={colors.colorWhite}
              style={styles.textInput}
              blurOnSubmit={false}
              onSubmitEditing={() => ref_input2.current.focus()}
            />
          </View>
          <View style={styles.row}>
            <Text allowFontScaling={false} style={styles.title}>
              {Languages.editProfile.website}
            </Text>
            <TextInput
              ref={ref_input2}
              placeholder="Website"
              allowFontScaling={false}
              keyboardType="url"
              autoCapitalize="none"
              value={data.website}
              placeholderTextColor={colors.colorWhite}
              style={styles.textInput}
              blurOnSubmit={false}
              onSubmitEditing={() => ref_input3.current.focus()}
              onChangeText={text => setData({...data, website: text})}
            />
          </View>
          <View style={styles.row}>
            <Text allowFontScaling={false} style={styles.title}>
              {Languages.editProfile.bio}
            </Text>
            <TextInput
              ref={ref_input3}
              placeholder="Bio"
              allowFontScaling={false}
              keyboardType="default"
              autoCapitalize="sentences"
              value={data.bio}
              placeholderTextColor={colors.colorWhite}
              style={styles.textInput}
              onChangeText={text => setData({...data, bio: text})}
            />
          </View>
          <View style={styles.row}>
            <Text allowFontScaling={false} style={styles.title}>
              {Languages.editProfile.email}
            </Text>
            <TextInput
              ref={ref_input4}
              editable={false}
              placeholder="Enter your email"
              allowFontScaling={false}
              keyboardType="email-address"
              value={data.email}
              autoCapitalize="none"
              placeholderTextColor={colors.colorWhite}
              style={styles.textInput}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <ActionSheet
        ref={ref_actionSheet}
        title={'Select One'}
        options={['Camera', 'Library', 'Cancel']}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={index => actionsheet(index)}
      />
      <Spinner visible={data.loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBlack,
  },
  header: {
    width: '100%',
    height: fonts.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
    borderBottomWidth: moderateScale(1),
    borderColor: '#2E313C',
  },
  headerName: {
    fontSize: fonts.extraSmallText,
    color: colors.colorWhite,
  },
  headerTitle: {
    fontSize: fonts.title,
    color: colors.colorWhite,
    fontWeight: 'bold',
  },
  editImageBox: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(15),
    backgroundColor: colors.colorPrimary,
    position: 'absolute',
    right: moderateScale(2),
    top: moderateScale(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    width: '100%',
    height: moderateScale(50),
    alignItems: 'center',
    flexDirection: 'row',
    paddingStart: moderateScale(15),
  },
  title: {
    width: '30%',
    color: colors.colorWhite,
    fontSize: fonts.smallText,
    color: '#828796',
  },
  textInput: {
    width: '70%',
    height: '100%',
    color: colors.colorWhite,
    borderBottomWidth: moderateScale(1),
    borderColor: '#2E313C',
  },
});

export default EditProfile;
