import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/Fonts';

let SearchTextInput = ({peoplesArray}) => {
  let [textValue, setTextValue] = useState('');
  let [searchText, setSearchText] = useState([]);
  let [showSuggestion, setShowSuggestion] = useState(false);
  let [data, setData] = useState(peoplesArray);

  let renderItem = ({item}) => {
    let handlePress = selected => {
      console.log('hi');
      console.log(selected);
      // setSearchText([...searchText, selected]);
      // setShowSuggestion(false);
    };

    return (
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.8}
        onPress={() => handlePress(item)}>
        <Image source={{uri: item.profilePic}} style={styles.profilePic} />
        <View style={{flex: 1}}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.username}>{item.username}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  let changeText = text => {
    let filteredData = peoplesArray.filter(function (item) {
      const itemData = item.username.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setData(filteredData);
    if (filteredData.length === 0) {
      setShowSuggestion(false);
    } else {
      setShowSuggestion(true);
    }
    setTextValue(text);
  };

  return (
    <View style={styles.container}>
      {showSuggestion ? (
        <View style={styles.searchList}>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>
      ) : null}
      <ScrollView horizontal>
        {searchText.map(text => (
          <View style={styles.chipBox}>
            <Text>{text.username}</Text>
          </View>
        ))}
        <TextInput
          placeholder="Tag a friend"
          placeholderTextColor={'#fff'}
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          style={styles.textInput}
          keyboardType="default"
          onFocus={() => setShowSuggestion(true)}
          onEndEditing={() => setShowSuggestion(false)}
          onChangeText={text => changeText(text)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    height: moderateScale(50),
    color: '#fff',
    fontSize: fonts.smallText,
  },
  searchList: {
    width: '100%',
    height: moderateScale(80),
    position: 'absolute',
    bottom: moderateScale(50),
    backgroundColor: '#fff',
  },
  row: {
    width: '100%',
    height: moderateScale(40),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: moderateScale(1),
    borderColor: '#999',
  },
  profilePic: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(30),
    marginHorizontal: moderateScale(10),
  },
  chipBox: {
    height: moderateScale(40),
    borderRadius: moderateScale(10),
    marginEnd: moderateScale(5),
    backgroundColor: '#999',
  },
  name: {
    color: '#000',
    fontSize: fonts.smallText,
    fontWeight: '600',
  },
  username: {
    color: '#000',
    fontSize: fonts.extraSmallText,
  },
});

export default SearchTextInput;
