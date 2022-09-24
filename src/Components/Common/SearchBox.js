/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';

const SearchBox = ({changedText, searchText}) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Icon
          name="search"
          color={colors.colorWhite}
          size={moderateScale(20)}
        />
        <TextInput
          placeholder="Enter to search"
          allowFontScaling={false}
          autoCapitalize="sentences"
          multiline={false}
          value={searchText}
          placeholderTextColor={colors.colorWhite}
          style={styles.textInput}
          onChangeText={(text)=> changedText(text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: moderateScale(70),
    paddingVertical: moderateScale(15),
  },
  subContainer: {
    flex: 1,
    borderColor: colors.colorWhite,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(50),
    paddingHorizontal: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    color: colors.colorWhite,
    paddingHorizontal: moderateScale(5),
    flex: 1,
  },
});

export default SearchBox;
