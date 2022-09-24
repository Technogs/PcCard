/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Alert, FlatList, TextInput} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import { colors } from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import Button from './Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Constant, WebServices} from '../../api/ApiRules';
import NetInfo from '@react-native-community/netinfo';
import Spinner from '../Common/Spinner';

let soccer = require('../../Images/soccer.png');
let basketball = require('../../Images/basketball.png');
let baseball = require('../../Images/baseball.png');
let hockey = require('../../Images/carom.png');
let pokemon = require('../../Images/pokemon.png');
let magic = require('../../Images/magic.png');
let dropdown = require('../../Images/Vector.png');

const GameTab = ({data, isEmpty, search}) => {
  let [selectedCard, setSelectedCard] = useState(0);
  let [uid, setUid] = useState('');
  let [selectedLang, setSelectedLang] = useState('');
  let [searched, setSearched] = useState(false);
  let [cardDetail, setCardDetail] = useState({});
  let [postData, setPostData] = useState([]);
  let [loading, setLoading] = useState(false);
  let [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('userData').then(val => {
      let userData = JSON.parse(val);
      setUid(userData.id);
    });
    AsyncStorage.getItem('selectedLang').then(lang => {
      setSelectedLang(lang);
    });

    if (search) {
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item?.description
              ? item?.description.toUpperCase()
              : ''.toUpperCase();
          const textData = search.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      );
      setPostData(newData);
    }
    else {
      setPostData(masterDataSource);
    }
  }, [search, masterDataSource]);

  let validationAndApiParameters = (apikey) => {
    if (apikey === 'Search') {
      if (selectedCard === 0){
        Alert.alert('PC Card','Please select one Game Type.');
      }
      else {
        let uploadData = {
          uid: uid,
          gameTypeId: selectedCard,
        };
        let url = Constant.URL_searchGameType + selectedLang;
        console.log('upload', uploadData);
        setLoading(true);
        postToApiCalling(url, uploadData, apikey);
      }
    }
  };

  const postToApiCalling = (apiUrl, uploadData, apikey) => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        new Promise(resolve => {
          resolve(WebServices.applicationService(apiUrl, uploadData));
        })
          .then(jsonRes => {
            console.log(jsonRes);
            if (jsonRes.success === 1) {
              apiSuccessfullResponse(jsonRes, apikey);
            } else if (jsonRes.success === 0) {
              console.log(jsonRes);
              setLoading(false);
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
    if (apikey === 'Search') {
      console.log(jsonRes);
      setLoading(false);
      setSearched(true);
      setPostData(jsonRes.Data);
      setMasterDataSource(jsonRes.Data);
      switch (selectedCard) {
        case 1:
          setCardDetail({
            image:baseball,
            text:'Baseball',
          });
          break;
        case 2:
          setCardDetail({
            image:basketball,
            text:'Basketball',
          });
          break;
        case 3:
          setCardDetail({
            image:hockey,
            text:'Hockey',
          });
          break;
        case 4:
          setCardDetail({
            image:magic,
            text:'Magic',
          });
          break;
        case 5:
          setCardDetail({
            image:soccer,
            text:'Soccer',
          });
          break;
        case 6:
          setCardDetail({
            image:pokemon,
            text:'Pokemon',
          });
          break;
      }
    }
  };

  let renderPost = ({item}) => {
    return (
      <Image source={{uri: item?.postMedia[0]?.mediaUrl}} resizeMode="contain" style={styles.postImage} />
    );
  };

  return (
    <View style={styles.container}>
      {searched ?
        <View style={{width:'100%', height: '100%'}}>
          <View style={{width: '100%',alignItems:'center'}}>
            <Text allowFontScaling={false} style={styles.title}>
              Choose a game type to find post related to it
            </Text>
            <View style={styles.dropdownContainer}>
              <View style={styles.textInputContainer}>
                <Image source={cardDetail?.image} style={styles.selectedImage} resizeMode="contain" />
                <Text style={styles.dropdownText}>{cardDetail?.text}</Text>
              </View>
              <TouchableOpacity onPress={()=>setSearched(false)} activeOpacity={0.8} style={styles.dropdownButton}>
                <Image resizeMode="contain" source={dropdown} style={styles.dropdownImage} />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            style={{width: '100%', flex:1}}
            data={postData}
            keyExtractor={item => item.id}
            numColumns={3}
            renderItem={renderPost}
          />
        </View>
      :
       <>
          <Text allowFontScaling={false} style={styles.title}>
            Choose a game type to find post related to it
          </Text>
          <View style={styles.row}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=> setSelectedCard(1)} style={styles.card}>
              <View style={styles.imageHolder}>
                <Image resizeMode="contain" source={baseball} style={styles.image} />
              </View>
              <Text style={selectedCard === 1 ? styles.selectedCardHeading : styles.cardHeading}>Baseball Cards</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={()=> setSelectedCard(2)} style={styles.card}>
              <View style={styles.imageHolder}>
                <Image resizeMode="contain" source={basketball} style={styles.image} />
              </View>
              <Text style={selectedCard === 2 ? styles.selectedCardHeading : styles.cardHeading}>Basketball Cards</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={()=> setSelectedCard(3)} style={styles.card}>
              <View style={styles.imageHolder}>
                <Image resizeMode="contain" source={hockey} style={styles.image} />
              </View>
              <Text style={selectedCard === 3 ? styles.selectedCardHeading : styles.cardHeading}>Hockey Cards</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=> setSelectedCard(4)} style={styles.card}>
              <Image resizeMode="contain" source={magic} style={styles.image2} />
              <Text style={selectedCard === 4 ? styles.selectedCardHeading : styles.cardHeading}>Magic The {'\n'} Gathering</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={()=> setSelectedCard(5)} style={styles.card}>
              <View style={styles.imageHolder}>
                <Image resizeMode="contain" source={soccer} style={styles.image} />
              </View>
              <Text style={selectedCard === 5 ? styles.selectedCardHeading : styles.cardHeading}>Soccer Cards</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={()=> setSelectedCard(6)} style={styles.card}>
              <Image resizeMode="contain" source={pokemon} style={styles.image2} />
              <Text style={selectedCard === 6 ? styles.selectedCardHeading : styles.cardHeading}>Pokemon</Text>
            </TouchableOpacity>
          </View>
          <Button
            label={'Search'}
            parentCallback={()=> validationAndApiParameters('Search')}
          />
        </>
      }
      <Spinner visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    padding: moderateScale(20),
    alignItems: 'center',
  },
  title: {
    fontSize: fonts.extraSmallText,
    color: '#F2F2F2',
  },
  row: {
    width: '100%',
    height: moderateScale(150),
    marginVertical: moderateScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card:{
    width:'32%',
    alignItems:'center',
  },
  imageHolder:{
    backgroundColor: '#fff',
    width: '100%',
    height:'100%',
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: moderateScale(5),
  },
  image:{
    width: '50%',
    height: '50%',
  },
  image2:{
    width: '100%',
    height: '100%',
  },
  cardHeading: {
    fontSize: fonts.smallText,
    color:colors.colorWhite,
  },
  selectedCardHeading: {
    fontSize: fonts.smallText,
    color:colors.colorPrimary,
  },
  button: {
    width:'100%',
    height: moderateScale(50),
    backgroundColor:'#fff',
  },
  dropdownContainer: {
    width: '100%',
    height: moderateScale(80),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: moderateScale(15),
  },
  textInputContainer: {
    width:'80%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.colorWhite,
    borderRadius: moderateScale(5),
    flexDirection: 'row',
  },
  selectedImage:{
    width: moderateScale(20),
    height: moderateScale(20),
  },
  dropdownButton: {
    width: moderateScale(45),
    height: '100%',
    backgroundColor: colors.colorPrimary,
    borderRadius: moderateScale(5),
    alignItems:'center',
    justifyContent:'center',
  },
  dropdownImage:{
    width:'50%',
    height: '50%',
  },
  dropdownText: {
    color:colors.colorBlack,
    fontSize:fonts.text,
    marginHorizontal: moderateScale(5),
  },
  postImage:{
    width: '32%',
    height: moderateScale(120),
    marginLeft: '1.3%',
  },
});

export default GameTab;
