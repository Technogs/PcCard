/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  BackHandler,
  TextInput,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {fonts} from '../../Utils/Fonts';
import Languages from '../../lang/i18n';

const SupportAndFaq = ({navigation}) => {
  let [searchText, setSearchText] = useState('');
  let [page, setPage] = useState(1);
  let [selectedQue, setSelectedQue] = useState(0);
  let [selectedAns, setSelectedAns] = useState(0);

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
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.pop()}>
          <AntDesignIcon
            name="left"
            color={colors.colorWhite}
            size={moderateScale(20)}
          />
        </TouchableOpacity>
        <Text allowFontScaling={false} style={styles.heading}>
          Support & FAQs
        </Text>
        <View style={{width: moderateScale(20)}} />
      </View>
      <View
        style={{
          width: '100%',
          height: moderateScale(150),
          position: 'absolute',
          top: fonts.headerHeight,
          backgroundColor: colors.colorPrimary,
        }}
      />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{padding: moderateScale(10)}}>
        <View style={styles.box1}>
          <Text allowFontScaling={false} style={styles.box1Heading}>
            Hello! How can we help you?
          </Text>
          <Text allowFontScaling={false} style={styles.box1Text}>
            Nemo enim ipsam voluptatem quia voluptas sit.
          </Text>
          <View style={styles.searchBox}>
            <AntDesignIcon
              name="search1"
              color="#C3C9C9"
              size={moderateScale(20)}
            />
            <TextInput
              placeholder='Enter to search'
              placeholderTextColor={colors.colorBlack}
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>
        </View>
        <View style={styles.box2}>
          {/* <Text allowFontScaling={false} style={styles.box2Heading}>
            Payments and Discount Fees
          </Text> */}
          {page === 1 ?
            <>
              <TouchableOpacity onPress={() => {setSelectedQue(Languages.supportAndFaq.que1), setSelectedAns(Languages.supportAndFaq.ans1), setPage(2)}} activeOpacity={0.8}>
                <Text allowFontScaling={false} style={styles.box2Heading}>
                  <AntDesignIcon
                    name="arrowright"
                    color="#404EFB"
                    size={moderateScale(20)}
                  />{' '}
                  {Languages.supportAndFaq.que1}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setSelectedQue(Languages.supportAndFaq.que2), setSelectedAns(Languages.supportAndFaq.ans2), setPage(2)}} activeOpacity={0.8}>
                <Text allowFontScaling={false} style={styles.box2Heading}>
                  <AntDesignIcon
                    name="arrowright"
                    color="#404EFB"
                    size={moderateScale(20)}
                  />{' '}
                  {Languages.supportAndFaq.que2}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setSelectedQue(Languages.supportAndFaq.que3), setSelectedAns(Languages.supportAndFaq.ans3), setPage(2)}} activeOpacity={0.8}>
                <Text allowFontScaling={false} style={styles.box2Heading}>
                  <AntDesignIcon
                    name="arrowright"
                    color="#404EFB"
                    size={moderateScale(20)}
                  />{' '}
                  {Languages.supportAndFaq.que3}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setSelectedQue(Languages.supportAndFaq.que4), setSelectedAns(Languages.supportAndFaq.ans4), setPage(2)}} activeOpacity={0.8}>
                <Text allowFontScaling={false} style={styles.box2Heading}>
                  <AntDesignIcon
                    name="arrowright"
                    color="#404EFB"
                    size={moderateScale(20)}
                  />{' '}
                  {Languages.supportAndFaq.que4}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setSelectedQue(Languages.supportAndFaq.que5), setSelectedAns(Languages.supportAndFaq.ans5), setPage(2)}} activeOpacity={0.8}>
                <Text allowFontScaling={false} style={styles.box2Heading}>
                  <AntDesignIcon
                    name="arrowright"
                    color="#404EFB"
                    size={moderateScale(20)}
                  />{' '}
                  {Languages.supportAndFaq.que5}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setSelectedQue(Languages.supportAndFaq.que6), setSelectedAns(Languages.supportAndFaq.ans6), setPage(2)}} activeOpacity={0.8}>
                <Text allowFontScaling={false} style={styles.box2Heading}>
                  <AntDesignIcon
                    name="arrowright"
                    color="#404EFB"
                    size={moderateScale(20)}
                  />{' '}
                  {Languages.supportAndFaq.que6}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setSelectedQue(Languages.supportAndFaq.que7), setSelectedAns(Languages.supportAndFaq.ans7), setPage(2)}} activeOpacity={0.8}>
                <Text allowFontScaling={false} style={styles.box2Heading}>
                  <AntDesignIcon
                    name="arrowright"
                    color="#404EFB"
                    size={moderateScale(20)}
                  />{' '}
                  {Languages.supportAndFaq.que7}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setSelectedQue(Languages.supportAndFaq.que8), setSelectedAns(Languages.supportAndFaq.ans8), setPage(2)}} activeOpacity={0.8}>
                <Text allowFontScaling={false} style={styles.box2Heading}>
                  <AntDesignIcon
                    name="arrowright"
                    color="#404EFB"
                    size={moderateScale(20)}
                  />{' '}
                  {Languages.supportAndFaq.que8}
                </Text>
              </TouchableOpacity>
            </>
          :
            <>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity onPress={()=>setPage(1)} activeOpacity={0.8}>
                  <AntDesignIcon
                      name="arrowleft"
                      color="#404EFB"
                      size={moderateScale(20)}
                    />
                </TouchableOpacity>
                <Text allowFontScaling={false} style={styles.box2Heading}>
                  {'  '}{selectedQue}
                </Text>
              </View>
              <Text allowFontScaling={false} style={styles.box2Text}>
                {selectedAns}
              </Text>
            </>
          }
        </View>
        {/* <View style={styles.box3}>
          <Text allowFontScaling={false} style={styles.box2Heading}>
            Information
          </Text>
          <Text allowFontScaling={false} style={styles.box2Text}>
            <AntDesignIcon
              name="arrowright"
              color="#404EFB"
              size={moderateScale(20)}
            />{' '}
            Totam rem aperiam
          </Text>
          <Text allowFontScaling={false} style={styles.box2Text}>
            <AntDesignIcon
              name="arrowright"
              color="#404EFB"
              size={moderateScale(20)}
            />{' '}
            Sed quia consequuntur magni
          </Text>
          <Text allowFontScaling={false} style={styles.box2Text}>
            <AntDesignIcon
              name="arrowright"
              color="#404EFB"
              size={moderateScale(20)}
            />{' '}
            Neque porro quisquam est
          </Text>
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  header: {
    width: '100%',
    height: fonts.headerHeight,
    backgroundColor: colors.colorPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
  },
  heading: {
    color: colors.colorWhite,
    fontSize: fonts.largeText,
    fontWeight: 'bold',
  },
  box1: {
    width: '100%',
    height: moderateScale(220),
    backgroundColor: colors.colorWhite,
    borderRadius: moderateScale(10),
    elevation: 5,
    marginBottom: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: moderateScale(10),
  },
  box1Heading: {
    color: colors.colorBlack,
    fontSize: fonts.largeText,
    fontWeight: 'bold',
    width: moderateScale(180),
    textAlign: 'center',
    marginBottom: moderateScale(10),
  },
  box1Text: {
    color: '#8F9596',
    fontSize: fonts.smallText,
    width: moderateScale(200),
    textAlign: 'center',
  },
  searchBox: {
    width: '100%',
    height: moderateScale(40),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    backgroundColor: '#EBF2F5',
    borderRadius: moderateScale(10),
    marginTop: moderateScale(25),
  },
  box2: {
    width: '100%',
    backgroundColor: colors.colorWhite,
    borderRadius: moderateScale(10),
    elevation: 5,
    marginBottom: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
  },
  box2Heading: {
    fontSize: fonts.text,
    color: colors.colorBlack,
    fontWeight: '500',
    marginVertical: moderateScale(5),
  },
  box2Text: {
    fontSize: fonts.text,
    color: '#8F9596',
    lineHeight: moderateScale(25),
    marginVertical: moderateScale(5),
  },
  box3: {
    width: '100%',
    height: moderateScale(200),
    backgroundColor: colors.colorWhite,
    borderRadius: moderateScale(10),
    elevation: 5,
    marginBottom: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(30),
    justifyContent: 'space-between',
  },
  box3Heading: {
    fontSize: fonts.text,
    color: colors.colorBlack,
    fontWeight: 'bold',
  },
  box3Text: {
    fontSize: fonts.smallText,
    color: '#8F9596',
  },
});

export default SupportAndFaq;
