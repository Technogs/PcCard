/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';

const Button = ({label, parentCallback, style}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => parentCallback()}
      style={[style, styles.container]}>
      <Text allowFontScaling={false} style={styles.text}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth:moderateScale(140),
    minHeight: moderateScale(50),
    padding:moderateScale(10),
    borderRadius: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.colorPrimary,
    marginVertical: moderateScale(20),
  },
  text: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
  },
});

export default Button;
