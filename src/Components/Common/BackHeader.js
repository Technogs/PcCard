/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';

const BackHeader = ({label, parentCallback}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => parentCallback()}>
        <AntDesign
          name="arrowleft"
          color={colors.colorWhite}
          size={moderateScale(20)}
        />
      </TouchableOpacity>
      <Text allowFontScaling={false} style={styles.title}>
        {label}
      </Text>
      <View style={{width: moderateScale(20)}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: fonts.headerHeight,
    borderColor: '#2E313C',
    borderBottomWidth: moderateScale(1),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    justifyContent: 'space-between',
    backgroundColor: colors.colorBlack,
  },
  title: {
    fontSize: fonts.title,
    color: colors.colorWhite,
    fontWeight: 'bold',
  },
});

export default BackHeader;
