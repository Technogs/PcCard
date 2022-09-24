/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, BackHandler} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Languages from '../../lang/i18n';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import Header from '../Common/BackHeader';

const PrivacyPolicy = ({navigation}) => {
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [1]);

  return (
    <View style={styles.container}>
      <Header label="Privacy Policy" parentCallback={() => navigation.pop()} />
      <ScrollView
        style={styles.subContainer}
        contentContainerStyle={{padding: moderateScale(20)}}>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.heading1}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description1}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.subheading11}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description2}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.subheading12}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description3}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.subheading13}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description4}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.subheading14}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description5}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.subheading15}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description6}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.heading2}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description7}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.subheading21}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description8}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.subheading22}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description9}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.subheading23}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description10}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.subheading24}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description11}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.subheading25}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description12}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.subheading26}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description13}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.subheading27}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description14}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.subheading28}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description15}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.subheading29}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description16}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.subheading210}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description17}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.heading3}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description18}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.subheading31}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description19}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.subheading32}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description20}
        </Text>
        <Text allowFontScaling={false} style={styles.heading}>
          {Languages.privacyPolicy.subheading33}
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          {Languages.privacyPolicy.description21}
        </Text>
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
  heading: {
    color: colors.colorPrimary,
    fontSize: fonts.largeText,
    marginBottom: moderateScale(10),
  },
  text: {
    fontSize: fonts.largeText,
    color: colors.colorWhite,
    marginBottom: moderateScale(10),
  },
});

export default PrivacyPolicy;
