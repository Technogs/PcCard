/* eslint-disable prettier/prettier */
import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  BackHandler,
  FlatList,
  Image,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CameraRoll from '@react-native-community/cameraroll';
import Languages from '../../lang/i18n';

const height = Dimensions.get('window').height;

const AddPost = ({navigation}) => {
  const cameraRef = useRef();

  let [flash, setFlash] = useState(false);
  let [camera, setCamera] = useState(true);
  let [tab, setTab] = useState(1);
  let [imageData, setImageData] = useState([]);
  let [selectedImage, setSelectedImage] = useState([]);
  let [capturedImage, setCapturedImage] = useState([]);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const fetchParams = {
      first: 10000,
      groupTypes: 'All',
      assetType: 'All',
    };

    CameraRoll.getPhotos(fetchParams).then(mediaData => {
      console.log(mediaData);
      if (mediaData.edges.length > 0) {
        setImageData(mediaData.edges);
      }
    });

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const takePicture = async () => {
    if (cameraRef.current) {
      if (capturedImage.length < 2){
        const options = {quality: 0.5, base64: true};
        const image = await cameraRef?.current?.takePictureAsync(options);
        console.log(image);
        setCapturedImage([...capturedImage, image]);
      }
    }
  };

  const renderItem = (item, index) => {
    const setIndex = ind => {
      if (selectedImage.includes(ind)) {
        let imageIndex = selectedImage.indexOf(ind);
        selectedImage.splice(imageIndex, 1);
      } else {
        if (selectedImage.length < 2) {
          setSelectedImage([...selectedImage, ind]);
        }
      }
    };

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.imageBox}
        onPress={() => setIndex(index)}>
        {selectedImage.length > 0 && selectedImage.includes(index) ? (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: '#00000050',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 99,
            }}>
            <MaterialCommunityIcons
              name="check-circle"
              color={colors.colorPrimary}
              size={moderateScale(50)}
            />
          </View>
        ) : null}
        <Image
          resizeMode="contain"
          source={{uri: item.node.image.uri}}
          style={styles.image}
        />
      </TouchableOpacity>
    );
  };

  const handleCreatePost = () => {
    if (tab === 1) {
      let image = [];
      selectedImage.map(val => {
        image.push({
          uri: imageData[val].node.image.uri,
          type: imageData[val].node.type,
        });
      });
      console.log(image);
      navigation.navigate('CreatePost', {images: image});
    }
    else {
      let arr = capturedImage[0].uri.split('.');
      let imageArray = [{
        uri: capturedImage[0].uri,
        type: 'image/' + arr[arr.length - 1],
      }];
      console.log(imageArray);
      navigation.navigate('CreatePost', {images: imageArray});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <Icon
            name="close"
            color={colors.colorWhite}
            size={moderateScale(25)}
          />
        </TouchableOpacity>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.addPost.heading}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleCreatePost()}>
          <Icon
            name="check"
            color={colors.colorPrimary}
            size={moderateScale(25)}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, backgroundColor: colors.colorBlack}}>
        {tab === 1 ? (
          imageData.length > 0 ? (
            <>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {selectedImage.length > 0 ? (
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      flexDirection: 'row',
                    }}>
                    {selectedImage.map(val => {
                      console.log(val);
                      return (
                        <Image
                          key={val}
                          source={{uri: imageData[val].node.image.uri}}
                          resizeMode="contain"
                          style={{width: '45%', height: '100%'}}
                        />
                      );
                    })}
                  </View>
                ) : null}
              </View>
              <FlatList
                style={{
                  flex: 1,
                  marginBottom: moderateScale(80),
                  width: '100%',
                  backgroundColor: colors.colorBlack,
                  padding: moderateScale(5),
                }}
                data={imageData}
                renderItem={({item, index}) => renderItem(item, index)}
                keyExtractor={item => item.node.timestamp.toString()}
                numColumns={3}
              />
            </>
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{color: colors.colorWhite, fontSize: fonts.largeText}}>
                {Languages.addPost.empty}
              </Text>
            </View>
          )
        ) : (
          capturedImage.length > 0 ?
            <>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {capturedImage.map(item => {
                  return(
                    <View
                      key={item}
                      style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                      }}>
                      <Image
                        source={{uri: item.uri}}
                        resizeMode="contain"
                        style={{width: '45%', height: '100%'}}
                      />
                    </View>
                  );}
                )}
              </View>
            </>
          :
            <RNCamera
              ref={cameraRef}
              style={styles.preview}
              type={
                camera
                  ? RNCamera.Constants.Type.back
                  : RNCamera.Constants.Type.front
              }
              flashMode={
                flash
                  ? RNCamera.Constants.FlashMode.on
                  : RNCamera.Constants.FlashMode.off
              }
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              captureAudio={false}>
              <View style={styles.clickBox}>
                <TouchableOpacity
                  onPress={() => takePicture()}
                  activeOpacity={0.8}
                  style={styles.bigCircle}>
                  <MaterialCommunityIcons
                    name="circle"
                    size={moderateScale(40)}
                    color={colors.colorWhite}
                  />
                </TouchableOpacity>
              </View>
            </RNCamera>
        )}
        <View style={styles.bottomBox}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.labelContainer}
            onPress={() => {setTab(1); setCapturedImage([]); }}>
            <Text
              allowFontScaling={false}
              style={tab === 1 ? styles.activeText : styles.inactiveText}>
              {Languages.addPost.lib}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.labelContainer}
            onPress={() => {setTab(2); setSelectedImage([]);}}>
            <Text
              allowFontScaling={false}
              style={tab === 2 ? styles.activeText : styles.inactiveText}>
              {Languages.addPost.image}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBox: {
    width: '100%',
    height: fonts.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    backgroundColor: colors.colorBlack,
  },
  heading: {
    color: colors.colorWhite,
    fontSize: fonts.title,
    fontWeight: 'bold',
  },
  imageBox: {
    width: '32.5%',
    height: moderateScale(120),
    backgroundColor: colors.colorBlack,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.colorBlack,
  },
  bottomBox: {
    position: 'absolute',
    bottom: moderateScale(0),
    width: '100%',
    height: moderateScale(80),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: moderateScale(20),
    backgroundColor: colors.colorBlack,
  },
  preview: {
    width: '100%',
    height: height - moderateScale(160),
  },
  labelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeText: {
    color: colors.colorPrimary,
    fontSize: fonts.text,
    fontWeight: 'bold',
  },
  inactiveText: {
    color: colors.colorWhite,
    fontSize: fonts.text,
    fontWeight: 'bold',
  },
  clickBox: {
    position: 'absolute',
    bottom: moderateScale(50),
    width: '100%',
    height: moderateScale(60),
    backgroundColor: '#00000050',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigCircle: {
    width: moderateScale(50),
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(100),
    borderColor: colors.colorWhite,
  },
});

export default AddPost;
