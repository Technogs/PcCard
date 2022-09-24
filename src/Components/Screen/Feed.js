import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, VirtualizedList} from 'react-native';
import {colors} from '../../Utils/Colors';
import HomeCard from '../Common/HomeCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Languages from '../../lang/i18n';
import Header from '../Common/BackHeader';

const Feed = ({navigation, route}) => {
  let [itemHeight] = useState([]);
  let listRef = useRef(null);
  let [postData, setPostData] = useState(route.params.data);
  let [uid, setUid] = useState('');
  let [selectedLang, setSelectedLang] = useState('');
  let [from] = useState(route.params.from);
  let [followingList] = useState(route.params.following);

  useEffect(() => {
    async function fetchdata() {
      await AsyncStorage.getItem('userData').then(val => {
        let data = JSON.parse(val);
        setUid(data.id);
        AsyncStorage.getItem('selectedLang').then(lang => {
          setSelectedLang(lang);
          Languages.setLanguage(lang);
        });
      });
    }
    fetchdata();
    listRef.current.scrollToIndex({
      animated: true,
      index: route.params.scrollTo,
    });
  }, [navigation, route.params.scrollTo, uid, selectedLang]);

  function onReferesh(id) {
    console.log(id);
    let data = postData;
    for (let i = 0; i < postData.length; i++) {
      if (id === postData[i].id) {
        console.log(postData[i]);
        data.splice(i, 1);
      }
    }
    setPostData(data);
  }

  return (
    <View style={styles.container}>
      <Header
        label={from === 'Bookmark' ? 'Bookmarks' : 'Feed'}
        parentCallback={() => navigation.goBack()}
      />
      <VirtualizedList
        data={postData}
        ref={listRef}
        renderItem={({item, index}) => (
          <HomeCard
            navigation={navigation}
            height={length => (itemHeight[index] = length)}
            item={item}
            uid={uid}
            lang={selectedLang}
            followingData={followingList}
            refreshList={id => onReferesh(id)}
          />
        )}
        getItemLayout={(data, index) => ({
          length: itemHeight[index],
          offset: itemHeight.slice(0, index).reduce((a, c) => a + c, 0),
          index,
        })}
        onScrollToIndexFailed={info => console.log(info)}
        getItemCount={data => data.length}
        getItem={(data, index) => data[index]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBlack,
  },
});

export default Feed;
