/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors } from '../../Utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { fonts } from '../../Utils/Fonts';

const logo = require('../../Images/logo.png');

const Header = ({onMessagePress, onCameraPress}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=> onCameraPress()}>
                <Ionicons name="camera-outline" color={colors.colorWhite} size={moderateScale(25)} />
            </TouchableOpacity>
            <Image resizeMode="contain" source={logo} style={styles.logo} />
            <TouchableOpacity onPress={()=>onMessagePress()} activeOpacity={0.8}>
                <Fontisto name="email" color={colors.colorWhite} size={moderateScale(25)} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:fonts.headerHeight,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:moderateScale(10),
        backgroundColor:colors.colorBlack,
    },
    logo:{
        width:moderateScale(40),
        height:moderateScale(40),
    },
    headingText:{
        fontSize:fonts.smallText,
        textAlign:'center',
        color:colors.colorWhite,
        fontWeight:'bold',
    },
});

export default Header;
