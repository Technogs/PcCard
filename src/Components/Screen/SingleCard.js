import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {colors} from '../../Utils/Colors';
import Header from '../Common/BackHeader';
import HomeCard from '../Common/HomeCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Languages from '../../lang/i18n';

const SingleCard = ({navigation, route}) => {
  let [data] = useState(route.params.data);
  let [uid, setUid] = useState('');
  let [selectedLang, setSelectedLang] = useState('');
  let [followingList] = useState(route.params.following);

  useEffect(() => {
    AsyncStorage.getItem('userData').then(val => {
      let user = JSON.parse(val);
      console.log(user);
      setUid(user.id);
    });
    AsyncStorage.getItem('selectedLang').then(lang => {
      setSelectedLang(lang);
      Languages.setLanguage(lang);
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header label={''} parentCallback={() => navigation.pop()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.subContainer}>
        <HomeCard
          navigation={navigation}
          item={data}
          uid={uid}
          height={height => console.log(height)}
          from="Home"
          lang={selectedLang}
          followingData={followingList}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBlack,
  },
  subContainer: {
    flex: 1,
  },
});

export default SingleCard;
