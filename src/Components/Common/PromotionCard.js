import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';

const PromotionCard = ({data}) => {
  // let arr = data.expiryDate.split(' ');
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text allowFontScaling={false} style={styles.text1}>
          {data.get_plan.planName} Promotion - #{data.id}
        </Text>
        {/* <Text allowFontScaling={false} style={styles.text2}>
          Promotion ends on {arr[0]}
        </Text> */}
      </View>
      <Text style={styles.text3}>
        {data.totalPost} / {data.get_plan.postLimit} Post
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: moderateScale(70),
    alignItems: 'center',
    flexDirection: 'row',
  },
  subContainer: {
    flex: 1,
  },
  text1: {
    fontSize: fonts.smallText,
    color: colors.colorWhite,
  },
  text2: {
    fontSize: fonts.smallText,
    color: '#FFFFFF50',
  },
  text3: {
    fontSize: fonts.text,
    color: '#0070FF',
  },
});

export default PromotionCard;
