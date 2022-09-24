/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/Fonts';
import {colors} from '../../Utils/Colors';
import Languages from '../../lang/i18n';

const PeopleTab = ({navigation, data, uid, isEmpty}) => {
  const PeopleCard = ({item}) => {
    let pressHandler = () => {
      console.log(item);
      if (item.id === uid) {
        navigation.navigate('ProfileTab');
      } else {
        navigation.navigate('OtherUserProfile', {item: item.id, tab: 1});
      }
    };

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => pressHandler()}
        style={styles.container}>
        <Image source={{uri: item.profilePic}} style={styles.image} />
        <View style={styles.textBox}>
          <Text allowFontScaling={false} style={styles.name}>
            {item.username}
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <VirtualizedList
      style={{width: '100%'}}
      data={data}
      initialNumToRender={10}
      renderItem={({item}) => <PeopleCard item={item} />}
      keyExtractor={item => item.id}
      getItemCount={data => data.length}
      getItem={(data, index) => data[index]}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={() => (
        <View
          style={{
            flex: 1,
            paddingTop: moderateScale(150),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {isEmpty ?
            <Text
              allowFontScaling={false}
              style={{
                fontSize: fonts.largeText,
                fontWeight: 'bold',
                color: '#ffffff',
              }}>
              {Languages.people.empty}
            </Text>
          :
           null
          }
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: moderateScale(70),
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(50),
  },
  textBox: {
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
});

export default PeopleTab;
