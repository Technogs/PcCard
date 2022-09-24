/* eslint-disable prettier/prettier */
import React, {PureComponent, useEffect, useState} from 'react';
import {StyleSheet, View, Text, VirtualizedList, SectionList} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import {fonts} from '../../Utils/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Spinner from '../Common/Spinner';
import {Constant, WebServices} from '../../api/ApiRules';
import NotificationCard from '../Common/NotificationCard';

const millisecondsNew = 1800000;
const millisecondsDay = 86400000;
const millisecondsWeek = 604800000;

export default class MyNotification extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            uid:'',
            olderNotificationData:[],
            newNotificationData:[],
            todayNotificationData:[],
            weekNotificationData:[],
            sectionData:[],
            loading: false,
        };
    }

    componentDidMount(){
        AsyncStorage.getItem('userData').then(val => {
            let userData = JSON.parse(val);
            console.log(userData);
            this.setState({uid:userData.id},()=>{
                AsyncStorage.getItem('selectedLang').then(lang => {
                    this.validationAndApiParameters('getNotification', this.state.uid, lang);
                });
            });
        });
    }

    validationAndApiParameters(apikey, param, lang) {
        if (apikey === 'getNotification') {
            let url = Constant.URL_getNotification + '/' + lang + '?pcuserid=' + param;
            console.log(url);
            this.postToApiCalling('Get', url, apikey);
        }
    }

    postToApiCalling(method, apiUrl, apikey, uploadData) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                new Promise(resolve => {
                    if (method === 'Get') {
                        resolve(WebServices.get(apiUrl));
                    } else {
                        resolve(WebServices.applicationService(apiUrl, uploadData));
                    }
                })
                .then(jsonRes => {
                    console.log(jsonRes);
                    if (jsonRes.success === 1) {
                        this.apiSuccessfullResponse(jsonRes, apikey);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            }
        });
    }

    apiSuccessfullResponse(jsonRes, apikey) {
        if (apikey === 'getNotification') {
            let data = jsonRes.notifications.data;
            for (let i = 0; i < data.length; i++) {
                const date1 = new Date(data[i].created_at);
                const date2 = new Date();
                const diffTime = Math.abs(date2 - date1);
                const diffDays = Math.ceil(diffTime / ( 1000 * 60 * 60 * 24));
                console.log(diffTime + ' milliseconds');
                console.log(diffDays + ' days');
                if (diffTime <= millisecondsNew){
                    this.setState({newNotificationData:[...this.state.newNotificationData, data[i]]});
                }
                else if ( diffTime > millisecondsNew && diffTime <= millisecondsDay){
                    this.setState({todayNotificationData:[...this.state.todayNotificationData,data[i]]});
                }
                else if (diffTime > millisecondsDay && diffTime <= millisecondsWeek) {
                    this.setState({weekNotificationData:[...this.state.weekNotificationData, data[i]]});
                }
                else {
                    this.setState({olderNotificationData:[ ...this.state.olderNotificationData,data[i]]});
                }
            }

            let sectionsData = [];
            if (this.state.newNotificationData.length > 0){
                sectionsData.push({
                    title: 'New',
                    data: this.state.newNotificationData,
                });
            }
            if (this.state.todayNotificationData.length > 0){
                sectionsData.push({
                    title: 'Today',
                    data: this.state.todayNotificationData,
                });
            }
            if (this.state.weekNotificationData.length > 0 ){
                sectionsData.push({
                    title: 'This Week',
                    data: this.state.weekNotificationData,
                });
            }
            if (this.state.olderNotificationData.length > 0 ){
                sectionsData.push({
                    title: 'Earlier',
                    data: this.state.olderNotificationData,
                });
            }
            this.setState({sectionData:sectionsData});
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <SectionList
                    showsVerticalScrollIndicator={false}
                    sections={this.state.sectionData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <NotificationCard navigation={this.props.navigation} item={item} uid={this.state.uid} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.heading}>{title}</Text>
                    )}
                />
                <Spinner visible={this.state.loading} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBlack,
    padding: moderateScale(20),
  },
  heading: {
    color: colors.colorWhite,
    fontSize: fonts.largeText,
    marginBottom: moderateScale(20),
    fontWeight:'bold',
  },
  emptyContainer: {
    flex: 1,
    paddingTop: moderateScale(150),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: fonts.largeText,
    fontWeight: 'bold',
  },
});

// export default MyNotification;
