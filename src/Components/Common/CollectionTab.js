import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  VirtualizedList,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import Icon from 'react-native-vector-icons/Feather';
import Languages from '../../lang/i18n';

const CollectionTab = ({data, isEmpty, navigation, uid, following}) => {
  function CollectionCard({collectionData}) {
    let [collections] = useState(collectionData);

    let namePressHandler = val => {
      if (collections[0]?.user_info.id === uid) {
        navigation.navigate('ProfileTab');
      } else {
        navigation.navigate('OtherUserProfile', {
          item: collections[0]?.user_info.id,
          tab: val,
        });
      }
    };

    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Image
            source={{uri: collections[0]?.user_info?.profilePic}}
            style={styles.image}
          />
          <View style={styles.textBox}>
            <View>
              <Text
                onPress={() => namePressHandler(1)}
                allowFontScaling={false}
                style={styles.name}>
                {collections[0]?.user_info?.username}
              </Text>
              {collections[0]?.user_info?.bio === '' ? null : (
                <Text allowFontScaling={false} style={styles.text}>
                  {collections[0]?.user_info?.bio === ''
                    ? ''
                    : collections[0].user_info?.bio}
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => namePressHandler(2)}
              activeOpacity={0.8}>
              <Icon
                name="arrow-right"
                size={moderateScale(20)}
                color={colors.colorWhite}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={collections}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CollectionScreen', {
                    data: item.id,
                    followingList: following,
                  })
                }
                activeOpacity={0.8}>
                <ImageBackground
                  resizeMode="contain"
                  source={{
                    uri: item?.get_collection_media[0]?.get_media.mediaUrl,
                  }}
                  imageStyle={styles.imageStyle}
                  style={styles.cardImage}>
                  <View style={styles.bottomBox}>
                    <Text
                      style={styles.collectionName}
                      allowFontScaling={false}>
                      {item?.collectionName}
                    </Text>
                    <Text
                      style={styles.colletionCount}
                      allowFontScaling={false}>
                      {item?.get_collection_media?.length}{' '}
                      {Languages.collection.post}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  return (
    <VirtualizedList
      style={{width: '100%'}}
      data={data}
      initialNumToRender={10}
      renderItem={({item}) => <CollectionCard collectionData={item} />}
      keyExtractor={index => index}
      getItemCount={data => data.length}
      getItem={(data, index) => data[index]}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          {isEmpty ? (
            <Text allowFontScaling={false} style={styles.emptyText}>
              {Languages.collection.empty}
            </Text>
          ) : null}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: moderateScale(250),
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '100%',
    height: moderateScale(70),
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: moderateScale(1),
    borderColor: '#C4C4C4',
    marginBottom: moderateScale(10),
  },
  image: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(50),
  },
  textBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingStart: moderateScale(20),
  },
  name: {
    fontSize: fonts.smallText,
    fontWeight: 'bold',
    color: colors.colorWhite,
  },
  text: {
    fontSize: fonts.extraSmallText,
    color: '#828796',
  },
  bottomBox: {
    backgroundColor: '#00000070',
    width: '100%',
    height: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  cardImage: {
    height: moderateScale(140),
    width: moderateScale(100),
    marginEnd: moderateScale(10),
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: moderateScale(10),
    width: '100%',
    height: '100%',
  },
  emptyCard: {
    borderRadius: moderateScale(10),
    height: moderateScale(140),
    width: moderateScale(100),
    borderWidth: moderateScale(1),
    borderColor: colors.colorWhite,
  },
  collectionName: {
    fontSize: fonts.extraMiniText,
    fontWeight: 'bold',
    color: colors.colorWhite,
  },
  colletionCount: {
    fontSize: fonts.extraMiniText,
    color: '#E5E5E5',
  },
  emptyContainer: {
    flex: 1,
    paddingTop: moderateScale(150),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: fonts.largeText,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default CollectionTab;
