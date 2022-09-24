import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const ListSection = ({navigation, data, uid, followingData}) => {
  let _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Feed', {
            data: data,
            scrollTo: index,
            following: followingData,
            from: 'Profile',
          })
        }
        activeOpacity={0.8}
        style={styles.imageBox}>
        <Image
          resizeMode="contain"
          source={{uri: item?.postMedia[0]?.mediaUrl}}
          style={styles.image}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={data}
        renderItem={_renderItem}
        numColumns={3}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  flatlist: {
    width: '100%',
  },
  imageBox: {
    width: '32.5%',
    marginVertical: moderateScale(10),
    height: moderateScale(100),
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ListSection;
