/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import SearchBox from '../Common/SearchBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../Utils/Colors';
import Modal from 'react-native-modal';
import {fonts} from '../../Utils/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FolderSection = ({data, uid, navigation, following, otherUserId}) => {
  let [showModal, setShowModal] = useState(false);
  let [newCollectionName, setCollectionName] = useState('');
  let [searchText, setSearchText] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(data);
  const [masterDataSource, setMasterDataSource] = useState(data);

  function create() {
    if (newCollectionName === '') {
      Alert.alert('Pc Cards', 'Collection name cannot be empty.');
    } else {
      setShowModal(false);
      navigation.navigate('CreateCollection', {data: newCollectionName});
    }
  }

  let _renderItem = ({item}) => {
    let arr = item.mediaid.split(',');
    return (
      <TouchableOpacity onPress={()=> navigation.navigate('CollectionScreen',{data:item?.id, followingList : following})} activeOpacity={0.8} style={styles.card}>
        <Image
          resizeMode="contain"
          source={{uri: item?.CollectionBanner[0]?.mediaUrl}}
          style={styles.image}
        />
        <View style={styles.bottomBox}>
          <Text allowFontScaling={false} style={styles.collectionText}>
            {item?.collectionName}
          </Text>
          <Text allowFontScaling={false} style={{color: colors.colorWhite}}>
            {arr.length} Posts
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  let onChangeText = (text) => {
    if (text) {
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.collectionName
              ? item.collectionName.toUpperCase()
              : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      );
      setFilteredDataSource(newData);
      setSearchText(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearchText(text);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBox searchText={searchText} changedText={(text) => onChangeText(text)} />
      {data.length > 0 ?
        <FlatList
          style={{width: '100%'}}
          contentContainerStyle={{padding: moderateScale(10)}}
          data={filteredDataSource}
          renderItem={_renderItem}
          numColumns={2}
          keyExtractor={item => item.id}
        />
      :
        null
      }
      {otherUserId === uid ?
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          activeOpacity={0.8}
          style={styles.floatingBox}>
          <Ionicons
            name="add"
            color={colors.colorPrimary}
            size={moderateScale(15)}
          />
        </TouchableOpacity>
      :
        null
      }
      <Modal
        onBackButtonPress={() => setShowModal(false)}
        onBackdropPress={() => setShowModal(false)}
        isVisible={showModal}
        style={styles.modal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeaderBox}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowModal(false)}>
              <AntDesign
                name="arrowleft"
                color={colors.colorWhite}
                size={moderateScale(20)}
              />
            </TouchableOpacity>
            <Text allowFontScaling={false} style={styles.modalHeader}>
              My Card Collection
            </Text>
            <View style={{width: moderateScale(20)}} />
          </View>
          <View style={styles.modalBottomBox}>
            <TextInput
              placeholder="Name Your Collection"
              placeholderTextColor={colors.colorWhite}
              autoCapitalize="words"
              style={styles.textInput}
              value={newCollectionName}
              onChangeText={text => setCollectionName(text)}
            />
            <TouchableOpacity
              onPress={() => create()}
              activeOpacity={0.8}
              style={styles.button}>
              <Text allowFontScaling={false} style={styles.buttonText}>
                Create My Collection
              </Text>
              <AntDesign
                name="arrowright"
                color={colors.colorWhite}
                size={moderateScale(20)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: moderateScale(250),
    width:'100%',
  },
  floatingBox: {
    position: 'absolute',
    bottom: moderateScale(15),
    right: moderateScale(15),
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.colorWhite,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '100%',
    height: moderateScale(220),
    borderTopRightRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
    backgroundColor: '#666666',
  },
  modalHeaderBox: {
    width: '100%',
    height: moderateScale(70),
    padding: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: moderateScale(0.5),
    borderColor: colors.colorWhite,
  },
  modalHeader: {
    fontSize: fonts.largeText,
    color: colors.colorWhite,
    fontWeight: 'bold',
  },
  modalBottomBox: {
    flex: 1,
    padding: moderateScale(10),
  },
  textInput: {
    width: '100%',
    height: moderateScale(40),
    borderRadius: moderateScale(50),
    backgroundColor: '#FFFFFF20',
    paddingHorizontal: moderateScale(10),
    color: colors.colorWhite,
  },
  button: {
    width: '100%',
    height: moderateScale(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    backgroundColor: colors.colorPrimary,
    borderRadius: moderateScale(50),
    marginTop: moderateScale(20),
  },
  buttonText: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
    fontWeight: '500',
  },
  card: {
    width: '45%',
    height: moderateScale(210),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '2.5%',
    marginVertical: moderateScale(10),
    backgroundColor: '#505050',
    borderRadius: moderateScale(10),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(10),
  },
  bottomBox: {
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
    backgroundColor: '#00000050',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: moderateScale(40),
  },
  collectionText: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
    fontWeight: 'bold',
  },
});

export default FolderSection;
