import React, {useState} from 'react';
import {StyleSheet, Text, View, VirtualizedList, Image} from 'react-native';
import Header from '../Common/BackHeader';
import {colors} from '../../Utils/Colors';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/Fonts';
import {TouchableOpacity} from 'react-native-gesture-handler';

const FollowersList = ({navigation, route}) => {
  let [followerslist] = useState(route.params.data);
  let [showEmpty] = useState(route.params.data.length > 0);

  let _renderItem = ({item}) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('OtherUserProfile', {
            item: item?.pcuserid,
            tab: 1,
          })
        }>
        <Image
          source={{uri: item?.user?.profilePic}}
          style={styles.profileImage}
        />
        <View
          style={{
            flex: 1,
            paddingHorizontal: moderateScale(10),
            justifyContent: 'center',
          }}>
          {item.name !== '' && (
            <Text allowFontScaling={false} style={styles.name}>
              {item?.user?.name}
            </Text>
          )}
          <Text allowFontScaling={false} style={styles.username}>
            {item?.user?.username}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header label="Followers" parentCallback={() => navigation.goBack()} />
      <View style={{flex: 1}}>
        <VirtualizedList
          style={{width: '100%'}}
          data={followerslist}
          initialNumToRender={10}
          renderItem={_renderItem}
          keyExtractor={item => item.id}
          getItemCount={data => data.length}
          getItem={(data, index) => data[index]}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{padding: moderateScale(20)}}
          ListEmptyComponent={() => (
            <View
              style={{
                width: '100%',
                height: fonts.deviceHeight - fonts.headerHeight,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {showEmpty ? (
                <Text allowFontScaling={false} style={styles.emptyText}>
                  Please follow someone
                </Text>
              ) : null}
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBlack,
  },
  row: {
    width: '100%',
    height: moderateScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  profileImage: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(40),
  },
  name: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
  },
  username: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
  },
  button: {
    padding: moderateScale(10),
    backgroundColor: colors.colorGrey,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(5),
  },
  buttonText: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
  },
  emptyBox: {},
  emptyText: {
    textAlign: 'center',
    fontSize: fonts.largeText,
    fontWeight: 'bold',
    color: colors.colorWhite,
  },
});

export default FollowersList;
