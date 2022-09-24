/* eslint-disable prettier/prettier */
import {Platform, Dimensions} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

export const fonts = {
  extraMiniText: moderateScale(8),
  miniText: moderateScale(10),
  extraSmallText: moderateScale(12),
  smallText: moderateScale(14),
  text: moderateScale(16),
  largeText: moderateScale(18),
  extraLargeText: moderateScale(20),
  title: moderateScale(24),
  heading: moderateScale(44),
  deviceType: Platform.OS === 'ios' ? 1 : 0,
  headerHeight: Platform.OS === 'ios' ? moderateScale(80) : moderateScale(60),
  deviceWidth: width,
  deviceHeight: height,
};
