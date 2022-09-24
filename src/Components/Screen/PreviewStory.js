import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {fonts} from '../../Utils/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from '../Common/Spinner';

const PreviewStory = ({navigation, route}) => {
  let [image, setImage] = useState(route.params.data.uri);
  let [uid, setUid] = useState('');
  let [mediaType, setMediaType] = useState('');
  let [extension, setExtension] = useState('');
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('userData').then(val => {
      let userData = JSON.parse(val);
      setUid(userData.id);
    });
    let arr = image.split('.');
    let ext = arr[arr.length - 1];
    setExtension(ext);
    if (['jpg', 'jpeg', 'png'].indexOf(ext) >= 0) {
      setMediaType('image');
    }
  }, [image]);

  function addPost() {
    console.log('hi');
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.pop()}>
          <Icon
            name="arrow-left-circle"
            color={colors.colorWhite}
            size={moderateScale(20)}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => addPost()}>
          <Text style={styles.text}>Add</Text>
        </TouchableOpacity>
      </View>
      <Image resizeMode="contain" source={{uri: image}} style={styles.image} />
      <Spinner visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBlack,
  },
  topContainer: {
    width: '100%',
    height: moderateScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: colors.colorPrimary,
    fontSize: fonts.smallText,
  },
});

export default PreviewStory;
