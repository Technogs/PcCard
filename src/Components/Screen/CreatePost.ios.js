/* eslint-disable radix */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  TextInput,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {colors} from '../../Utils/Colors';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Constant, WebServices} from '../../api/ApiRules';
import NetInfo from '@react-native-community/netinfo';
import Spinner from '../Common/Spinner';
import Geolocation from '@react-native-community/geolocation';
import MentionsTextInput from 'react-native-mentions';
import Languages from '../../lang/i18n';
import Picker from 'react-native-picker';
import Geocoder from 'react-native-geocoding';

let address = '';
export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: '',
      images: props.route.params.images,
      uid: '',
      loading: false,
      selectedCardGameId: 0,
      selectedCardGame: {
        gameName: Languages.createPost.placeholder2,
        gameNameFr: Languages.createPost.placeholder2,
        id: 0,
      },

      selectedTeamId: 0,
      selectedTeam: {},
      selectedCondition: {
        conditionName: Languages.createPost.placeholder2,
        conditionNameFr: Languages.createPost.placeholder2,
        id: 0,
      },
      selectedCardTypeId: 0,
      selectedCardType: {},
      selectedRarityId: 0,
      selectedRarity: {},
      selectedTypeId: 0,
      selectedType: {},
      selectedTrainerId: 0,
      selectedTrainer: {},
      selectedEnergyId: 0,
      selectedEnergy: {},
      conditionData: [
        {
          conditionName: Languages.createPost.placeholder2,
          conditionNameFr: Languages.createPost.placeholder2,
          id: 0,
        },
      ],
      cardGameData: [
        {
          gameName: Languages.createPost.placeholder2,
          gameNameFr: Languages.createPost.placeholder2,
          id: 0,
        },
      ],
      baseballCardType: [
        {
          cardType: Languages.createPost.placeholder2,
          cardTypeFr: Languages.createPost.placeholder2,
          id: 0,
        },
      ],
      baseballTeamName: [
        {
          nameTeam: Languages.createPost.placeholder2,
          nameTeamFr: Languages.createPost.placeholder2,
          id: 0,
        },
      ],
      basketballCardType: [
        {
          cardType: Languages.createPost.placeholder2,
          cardTypeFr: Languages.createPost.placeholder2,
          id: 0,
        },
      ],
      basketballTeamName: [
        {
          nameTeam: Languages.createPost.placeholder2,
          nameTeamFr: Languages.createPost.placeholder2,
          id: 0,
        },
      ],
      magicCardType: [
        {
          cardType: Languages.createPost.placeholder2,
          cardTypeFr: Languages.createPost.placeholder2,
          id: 0,
        },
      ],
      magicTeamName: [
        {
          nameTeam: Languages.createPost.placeholder2,
          nameTeamFr: Languages.createPost.placeholder2,
          id: 0,
        },
      ],
      soccerCardType: [
        {
          cardType: Languages.createPost.placeholder2,
          cardTypeFr: Languages.createPost.placeholder2,
          id: 0,
        },
      ],
      soccerTeamName: [
        {
          nameTeam: Languages.createPost.placeholder2,
          nameTeamFr: Languages.createPost.placeholder2,
          id: 0,
        },
      ],
      hockeyTeamName: [
        {
          nameTeam: Languages.createPost.placeholder2,
          nameTeamFr: Languages.createPost.placeholder2,
          id: 0,
        },
      ],
      hockeyCardType: [
        {
          cardType: Languages.createPost.placeholder2,
          cardTypeFr: Languages.createPost.placeholder2,
          id: 0,
        },
      ],
      rarityData: [
        {
          rareteName: Languages.createPost.placeholder3,
          rareteNameFr: Languages.createPost.placeholder3,
          rareteId: 0,
        },
      ],
      typesData: [
        {
          typeName: Languages.createPost.placeholder4,
          typeNameFr: Languages.createPost.placeholder4,
          typesId: 0,
        },
      ],
      trainerData: [
        {
          trainerName: Languages.createPost.placeholder5,
          trainerNameFr: Languages.createPost.placeholder5,
          trainerId: 0,
        },
      ],
      energyData: [
        {
          EnergyTypeName: Languages.createPost.placeholder6,
          EnergyTypeNameFr: Languages.createPost.placeholder6,
          energyTypeId: 0,
        },
      ],
      users: [],
      description: '',
      hashtag: '#',
      people: '',
      selectedPeople: [],
      price: '',
      selectedLang: '',
      showOther: false,
      otherText: '',
    };
  }

  async componentDidMount() {
    Geocoder.init("AIzaSyA_x1TrpSvsdEhci8Ba10FCarXSnh4YLaQ");
    Geolocation.getCurrentPosition(info => {
      Geocoder.from(info.coords.latitude,info.coords.longitude)
      .then(json => {
        address = json.results[0].formatted_address;
      })
    });
    await AsyncStorage.getItem('userData').then(res => {
      let val = JSON.parse(res);
      this.setState({uid: val.id});
      AsyncStorage.getItem('selectedLang').then(lang => {
        this.setState({selectedLang: lang});
        this.validationAndApiParameters('getData', val.id, lang);
      });
    });
  }

  validationAndApiParameters(apikey, id, lang) {
    if (apikey === 'getData') {
      let url = Constant.URL_getPostData + id + '/' + lang;
      this.setState({loading: true});
      this.postToApiCalling('Get', url, apikey);
    }
    if (apikey === 'cardData') {
      let upload = {
        gameCardId: id,
      };
      let url = Constant.URL_getCardData + this.state.selectedLang;
      this.setState({loading: true});
      this.postToApiCalling('Post', url, apikey, upload);
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
            if (jsonRes.success === 1) {
              this.apiSuccessfullResponse(jsonRes, apikey);
            } else if (jsonRes.success === 0) {
              this.setState({loading: false});
            }
          })
          .catch(error => {
            console.log(error);
            this.setState({loading: false});
          });
      }
    });
  }

  apiSuccessfullResponse(jsonRes, apikey) {
    if (apikey === 'getData') {
      console.log(jsonRes);
      this.setState({
        loading: false,
        cardGameData: [...this.state.cardGameData, ...jsonRes.gameType],
        conditionData: [...this.state.conditionData, ...jsonRes.ConditionData],
        users: jsonRes.userData,
      });
    }
    if (apikey === 'cardData') {
      console.log(jsonRes);
      this.setState({loading: false});
      switch (this.state.selectedCardGameId) {
        case 1:
          this.setState({
            selectedTeam: this.state.baseballTeamName[0],
            selectedCardType: this.state.baseballCardType[0],
            baseballTeamName: [
              ...this.state.baseballTeamName,
              ...jsonRes.baseballTeam,
            ],
            baseballCardType: [
              ...this.state.baseballCardType,
              ...jsonRes.baseballCardType,
            ],
          });
          break;
        case 2:
          this.setState({
            selectedTeam: this.state.basketballTeamName[0],
            selectedCardType: this.state.basketballCardType[0],
            basketballCardType: [
              ...this.state.basketballCardType,
              ...jsonRes.basketballCardType,
            ],
            basketballTeamName: [
              ...this.state.basketballTeamName,
              ...jsonRes.basketballTeam,
            ],
          });
          break;
        case 3:
          this.setState({
            selectedTeam: this.state.hockeyTeamName[0],
            selectedCardType: this.state.hockeyCardType[0],
            hockeyTeamName: [
              ...this.state.hockeyTeamName,
              ...jsonRes.hockeyTeam,
            ],
            hockeyCardType: [
              ...this.state.hockeyCardType,
              ...jsonRes.HockeyCardType,
            ],
          });
          break;
        case 4:
          this.setState({
            selectedTeam: this.state.magicTeamName[0],
            selectedCardType: this.state.magicCardType[0],
            magicCardType: [
              ...this.state.magicCardType,
              ...jsonRes.magicCardType,
            ],
            magicTeamName: [...this.state.magicTeamName, ...jsonRes.magicTeam],
          });
          break;
        case 5:
          this.setState({
            selectedTeam: this.state.soccerTeamName[0],
            selectedCardType: this.state.soccerCardType[0],
            soccerCardType: [
              ...this.state.soccerCardType,
              ...jsonRes.soccerCardType,
            ],
            soccerTeamName: [
              ...this.state.soccerTeamName,
              ...jsonRes.soccerTeam,
            ],
          });
          break;
        case 6:
          this.setState({
            selectedRarity: this.state.rarityData[0],
            selectedType: this.state.typesData[0],
            selectedTrainer: this.state.trainerData[0],
            selectedEnergy: this.state.energyData[0],
            rarityData: [...this.state.rarityData, ...jsonRes.rarete],
            typesData: [...this.state.typesData, ...jsonRes.types],
            trainerData: [...this.state.trainerData, ...jsonRes.trainer],
            energyData: [...this.state.energyData, ...jsonRes.energyType],
          });
          break;
      }
    }
  }

  handleChangeHashtag(val) {
    if (val === 'Backspace') {
      if (this.state.hashtag.endsWith(' #')) {
        let str = this.state.hashtag.substring(
          0,
          this.state.hashtag.length - 2,
        );
        this.setState({hashtag: str});
      } else if (this.state.hashtag.endsWith('#')) {
        this.setState({hashtag: '#'});
      } else {
        let str = this.state.hashtag.substring(
          0,
          this.state.hashtag.length - 1,
        );
        this.setState({hashtag: str});
      }
    } else if (val === ' ') {
      if (this.state.hashtag.endsWith('#')) {
        this.setState({hashtag: this.state.hashtag});
      } else {
        this.setState({hashtag: this.state.hashtag + ' #'});
      }
    } else if (val === '#') {
      this.setState({hashtag: this.state.hashtag + ' #'});
    } else if (val === ',') {
      this.setState({hashtag: this.state.hashtag + ' #'});
    } else {
      this.setState({hashtag: this.state.hashtag + val});
    }
  }

  preview() {
    let err = 0;
    if (this.state.selectedCardGameId === 0) {
      err = 1;
    }
    if (this.state.tab === '') {
      err = 1;
    } else if (this.state.tab === '1' && this.state.price === '') {
      err = 1;
    }

    if (err === 0) {
      let cardType = {};
      let nameTeam = {};
      nameTeam = this.state.selectedTeamId === 0 ? '' : this.state.selectedTeam;
      cardType =
        this.state.selectedCardTypeId === 0 ? '' : this.state.selectedCardType;

      let postData = {
        images: this.state.images,
        description: this.state.description,
        cardGame:
          this.state.selectedCardGameId === 0
            ? ''
            : this.state.selectedCardGame,
        nameTeam,
        other: this.state.otherText,
        cardType,
        conditionData: this.state.selectedCondition,
        rarity:
          this.state.selectedRarityId === 0 ? '' : this.state.selectedRarity,
        types: this.state.selectedTypeId === 0 ? '' : this.state.selectedType,
        trainer:
          this.state.selectedTrainerId === 0 ? '' : this.state.selectedTrainer,
        energy:
          this.state.selectedEnergyId === 0 ? '' : this.state.selectedEnergy,
        hashtag: this.state.hashtag === '#' ? '' : this.state.hashtag,
        people: this.state.selectedPeople,
        postTag: this.state.tab,
        price: this.state.price,
        address: address,
      };
      console.log('postData', postData);
      this.props.navigation.navigate('Preview', {data: postData});
    }
  }

  renderSuggestion = ({item}, hidePanel) => {
    return (
      <TouchableOpacity onPress={() => this.onSuggestionTap(item, hidePanel)}>
        <View style={styles.suggestionsRowContainer}>
          <Image source={{uri: item.profilePic}} style={styles.profilePic} />
          <View style={{flex: 1}}>
            <Text style={styles.displayNameText}>{item.name}</Text>
            <Text style={styles.usernameText}>@{item.username}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  cardGamePressHandler() {
    let temp = this.state.cardGameData;
    let pickerData = [];
    for (let i = 0; i < temp.length; i++) {
      if (this.state.selectedLang === 'en') {
        pickerData.push(temp[i].gameName);
      } else {
        pickerData.push(temp[i].gameNameFr);
      }
    }
    Picker.init({
      pickerData: pickerData,
      onPickerConfirm: data => {
        console.log(data);
        let selected = data.toString();
        for (let i = 0; i < temp.length; i++) {
          if (
            temp[i].gameName === selected ||
            temp[i].gameNameFr === selected
          ) {
            this.setState(
              {
                selectedCardGame: temp[i],
                selectedCardGameId: temp[i].id,
              },
              () => {
                this.validationAndApiParameters('cardData', temp[i].id);
              },
            );
          }
        }
      },
      onPickerCancel: data => {
        console.log(data);
      },
      onPickerSelect: data => {
        console.log(data);
      },
    });
    Picker.show();
  }

  teamPressHandler() {
    let temp;
    let pickerData = [];
    switch (this.state.selectedCardGameId) {
      case 1:
        temp = this.state.baseballTeamName;
        for (let i = 0; i < temp.length; i++) {
          if (this.state.selectedLang === 'en') {
            pickerData.push(temp[i].nameTeam);
          } else {
            pickerData.push(temp[i].nameTeamFr);
          }
        }
        break;
      case 2:
        temp = this.state.basketballTeamName;
        for (let i = 0; i < temp.length; i++) {
          if (this.state.selectedLang === 'en') {
            pickerData.push(temp[i].nameTeam);
          } else {
            pickerData.push(temp[i].nameTeamFr);
          }
        }
        break;
      case 3:
        temp = this.state.hockeyTeamName;
        for (let i = 0; i < temp.length; i++) {
          if (this.state.selectedLang === 'en') {
            pickerData.push(temp[i].nameTeam);
          } else {
            pickerData.push(temp[i].nameTeamFr);
          }
        }
        break;
      case 4:
        temp = this.state.magicTeamName;
        for (let i = 0; i < temp.length; i++) {
          if (this.state.selectedLang === 'en') {
            pickerData.push(temp[i].nameTeam);
          } else {
            pickerData.push(temp[i].nameTeamFr);
          }
        }
        break;
      case 5:
        temp = this.state.soccerTeamName;
        for (let i = 0; i < temp.length; i++) {
          if (this.state.selectedLang === 'en') {
            pickerData.push(temp[i].nameTeam);
          } else {
            pickerData.push(temp[i].nameTeamFr);
          }
        }
        break;
      case 6:
        console.log('hi');
        break;
      default:
        break;
    }
    Picker.init({
      pickerData: pickerData,
      onPickerConfirm: data => {
        console.log(data);
        let selected = data.toString();
        for (let i = 0; i < temp.length; i++) {
          if (
            temp[i].nameTeam === selected ||
            temp[i].nameTeamFr === selected
          ) {
            this.setState({
              selectedTeam: temp[i],
              selectedTeamId: temp[i].id,
            });
          }
        }
      },
      onPickerCancel: data => {
        console.log(data);
      },
      onPickerSelect: data => {
        console.log(data);
      },
    });
    Picker.show();
  }

  cardTypePressHandler() {
    console.log(this.state.selectedCardGameId);
    let temp;
    let pickerData = [];
    switch (this.state.selectedCardGameId) {
      case 1:
        temp = this.state.baseballCardType;
        for (let i = 0; i < temp.length; i++) {
          if (this.state.selectedLang === 'en') {
            pickerData.push(temp[i].cardType);
          } else {
            pickerData.push(temp[i].cardTypeFr);
          }
        }
        break;
      case 2:
        temp = this.state.basketballCardType;
        for (let i = 0; i < temp.length; i++) {
          if (this.state.selectedLang === 'en') {
            pickerData.push(temp[i].cardType);
          } else {
            pickerData.push(temp[i].cardTypeFr);
          }
        }
        break;
      case 3:
        temp = this.state.hockeyCardType;
        for (let i = 0; i < temp.length; i++) {
          if (this.state.selectedLang === 'en') {
            pickerData.push(temp[i].cardType);
          } else {
            pickerData.push(temp[i].cardTypeFr);
          }
        }
        break;
      case 4:
        temp = this.state.magicCardType;
        for (let i = 0; i < temp.length; i++) {
          if (this.state.selectedLang === 'en') {
            pickerData.push(temp[i].cardType);
          } else {
            pickerData.push(temp[i].cardTypeFr);
          }
        }
        break;
      case 5:
        temp = this.state.soccerCardType;
        for (let i = 0; i < temp.length; i++) {
          if (this.state.selectedLang === 'en') {
            pickerData.push(temp[i].cardType);
          } else {
            pickerData.push(temp[i].cardTypeFr);
          }
        }
        break;
    }
    Picker.init({
      pickerData: pickerData,
      onPickerConfirm: data => {
        console.log(data);
        let selected = data.toString();
        console.log(selected);
        if (selected === 'other' || selected === 'Others') {
          this.setState({showOther: true});
        } else {
          this.setState({showOther: false});
        }
        for (let i = 0; i < temp.length; i++) {
          if (
            temp[i].cardType === selected ||
            temp[i].cardTypeFr === selected
          ) {
            this.setState({
              selectedCardType: temp[i],
              selectedCardTypeId: temp[i].id,
            });
          }
        }
      },
      onPickerCancel: data => {
        console.log(data);
      },
      onPickerSelect: data => {
        console.log(data);
      },
    });
    Picker.show();
  }

  rarityPressHandler() {
    let temp;
    let pickerData = [];
    temp = this.state.rarityData;
    for (let i = 0; i < temp.length; i++) {
      if (this.state.selectedLang === 'en') {
        pickerData.push(temp[i].rareteName);
      } else {
        pickerData.push(temp[i].rareteNameFr);
      }
    }
    Picker.init({
      pickerData: pickerData,
      onPickerConfirm: data => {
        console.log(data);
        let selected = data.toString();
        for (let i = 0; i < temp.length; i++) {
          if (
            temp[i].rareteName === selected ||
            temp[i].rareteNameFr === selected
          ) {
            this.setState({
              selectedRarity: temp[i],
              selectedRarityId: temp[i].id,
            });
          }
        }
      },
      onPickerCancel: data => {
        console.log(data);
      },
      onPickerSelect: data => {
        console.log(data);
      },
    });
    Picker.show();
  }

  typePressHandler() {
    let temp;
    let pickerData = [];
    temp = this.state.typesData;
    for (let i = 0; i < temp.length; i++) {
      if (this.state.selectedLang === 'en') {
        pickerData.push(temp[i].typeName);
      } else {
        pickerData.push(temp[i].typeNameFr);
      }
    }
    Picker.init({
      pickerData: pickerData,
      onPickerConfirm: data => {
        let selected = data.toString();
        for (let i = 0; i < temp.length; i++) {
          if (
            temp[i].typeName === selected ||
            temp[i].typeNameFr === selected
          ) {
            this.setState({
              selectedType: temp[i],
              selectedTypeId: temp[i].id,
            });
          }
        }
      },
      onPickerCancel: data => {
        console.log(data);
      },
      onPickerSelect: data => {
        console.log(data);
      },
    });
    Picker.show();
  }

  trainerPressHandler() {
    let temp;
    let pickerData = [];
    temp = this.state.trainerData;
    for (let i = 0; i < temp.length; i++) {
      if (this.state.selectedLang === 'en') {
        pickerData.push(temp[i].trainerName);
      } else {
        pickerData.push(temp[i].trainerNameFr);
      }
    }
    Picker.init({
      pickerData: pickerData,
      onPickerConfirm: data => {
        let selected = data.toString();
        for (let i = 0; i < temp.length; i++) {
          if (
            temp[i].trainerName === selected ||
            temp[i].trainerNameFr === selected
          ) {
            this.setState({
              selectedTrainer: temp[i],
              selectedTrainerId: temp[i].id,
            });
          }
        }
      },
      onPickerCancel: data => {
        console.log(data);
      },
      onPickerSelect: data => {
        console.log(data);
      },
    });
    Picker.show();
  }

  energyPressHandler() {
    let temp;
    let pickerData = [];
    temp = this.state.energyData;
    for (let i = 0; i < temp.length; i++) {
      if (this.state.selectedLang === 'en') {
        pickerData.push(temp[i].EnergyTypeName);
      } else {
        pickerData.push(temp[i].EnergyTypeNameFr);
      }
    }
    Picker.init({
      pickerData: pickerData,
      onPickerConfirm: data => {
        let selected = data.toString();
        for (let i = 0; i < temp.length; i++) {
          if (
            temp[i].EnergyTypeName === selected ||
            temp[i].EnergyTypeNameFr === selected
          ) {
            this.setState({
              selectedEnergy: temp[i],
              selectedEnergyId: temp[i].id,
            });
          }
        }
      },
      onPickerCancel: data => {
        console.log(data);
      },
      onPickerSelect: data => {
        console.log(data);
      },
    });
    Picker.show();
  }

  onSuggestionTap = (item, hidePanel) => {
    hidePanel();
    this.setState({people: '@' + item.username + ' ', selectedPeople: item});
  };

  callback = val => {
    console.log('val', val);
  };

  conditionPressHandler() {
    let temp;
    let pickerData = [];
    temp = this.state.conditionData;
    for (let i = 0; i < temp.length; i++) {
      if (this.state.selectedLang === 'en') {
        pickerData.push(temp[i].conditionName);
      } else {
        pickerData.push(temp[i].conditionNameFr);
      }
    }
    Picker.init({
      pickerData: pickerData,
      onPickerConfirm: data => {
        let selected = data.toString();
        for (let i = 0; i < temp.length; i++) {
          if (
            temp[i].conditionName === selected ||
            temp[i].conditionNameFr === selected
          ) {
            this.setState({
              selectedCondition: temp[i],
            });
          }
        }
      },
      onPickerCancel: data => {
        console.log(data);
      },
      onPickerSelect: data => {
        console.log(data);
      },
    });
    Picker.show();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerBox}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.navigation.pop()}>
            <Icon
              name="close"
              color={colors.colorWhite}
              size={moderateScale(20)}
            />
          </TouchableOpacity>
          <Text allowFontScaling={false} style={styles.heading}>
            {Languages.createPost.heading}
          </Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.preview()}>
            <Text
              allowFontScaling={false}
              style={{
                textAlign: 'center',
                fontSize: fonts.extraSmallText,
                color: colors.colorPrimary,
              }}>
              {Languages.createPost.preview}
            </Text>
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          behavior="position"
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? moderateScale(40) : 0
          }>
          <ScrollView nestedScrollEnabled={true}>
            <View style={styles.cardBox}>
              {this.state.images.map((item, index) => {
                return (
                  <Image
                    source={{uri: item.uri}}
                    resizeMode="contain"
                    key={index}
                    style={styles.postImage}
                  />
                );
              })}
              <Text
                allowFontScaling={false}
                style={{
                  position: 'absolute',
                  bottom: moderateScale(0),
                  right: moderateScale(20),
                  fontSize: fonts.largeText,
                  color: '#E5E5E5',
                }}>
                {this.state.images.length}/{this.state.images.length}
              </Text>
            </View>
            <View style={{width: fonts.deviceWidth, height: moderateScale(60)}}>
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: 'center',
                  fontSize: fonts.largeText,
                  color: colors.colorWhite,
                  fontWeight: '700',
                  marginVertical: moderateScale(10),
                }}>
                {Languages.createPost.play}
              </Text>
            </View>
            <View style={styles.row}>
              <Text allowFontScaling={false} style={styles.text}>
                {Languages.createPost.description}
              </Text>
              <TextInput
                placeholder="Enter Card Description"
                placeholderTextColor={colors.colorWhite}
                style={styles.input}
                allowFontScaling={false}
                autoCapitalize="sentences"
                autoCorrect={false}
                keyboardType="default"
                onChangeText={text => this.setState({description: text})}
              />
            </View>
            <View style={styles.row}>
              <Text allowFontScaling={false} style={styles.text}>
                {Languages.createPost.cardGame}
              </Text>
              <TouchableOpacity
                onPress={() => this.cardGamePressHandler()}
                style={styles.pickerStyle}
                activeOpacity={0.8}>
                <Text style={styles.input}>
                  {this.state.selectedLang === 'en'
                    ? this.state.selectedCardGame?.gameName
                    : this.state.selectedCardGame?.gameNameFr}
                </Text>
                <AntDesignIcon
                  name="caretdown"
                  size={moderateScale(10)}
                  color={colors.colorPrimary}
                />
              </TouchableOpacity>
            </View>
            {[1, 2, 3, 4, 5].includes(this.state.selectedCardGameId) ? (
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.text}>
                  Team
                </Text>
                <TouchableOpacity
                  onPress={() => this.teamPressHandler()}
                  style={styles.pickerStyle}
                  activeOpacity={0.8}>
                  <Text style={styles.input}>
                    {this.state.selectedLang === 'en'
                      ? this.state.selectedTeam?.nameTeam
                      : this.state.selectedTeam?.nameTeamFr}
                  </Text>
                  <AntDesignIcon
                    name="caretdown"
                    size={moderateScale(10)}
                    color={colors.colorPrimary}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
            {[1, 2, 3, 4, 5].includes(this.state.selectedCardGameId) ? (
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.text}>
                  Card Type
                </Text>
                <TouchableOpacity
                  onPress={() => this.cardTypePressHandler()}
                  style={styles.pickerStyle}
                  activeOpacity={0.8}>
                  <Text style={styles.input}>
                    {this.state.selectedLang === 'en'
                      ? this.state.selectedCardType?.cardType
                      : this.state.selectedCardType?.cardTypeFr}
                  </Text>
                  <AntDesignIcon
                    name="caretdown"
                    size={moderateScale(10)}
                    color={colors.colorPrimary}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
            {this.state.showOther ? (
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.text}>
                  Other
                </Text>
                <TextInput
                  placeholder="Please enter"
                  placeholderTextColor={colors.colorWhite}
                  style={styles.input}
                  allowFontScaling={false}
                  autoCapitalize="sentences"
                  autoCorrect={false}
                  keyboardType="default"
                  onChangeText={text => this.setState({otherText: text})}
                />
              </View>
            ) : null}
            {this.state.selectedCardGameId === 6 ? (
              <>
                <View style={styles.row}>
                  <Text allowFontScaling={false} style={styles.text}>
                    {Languages.createPost.rarity}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.rarityPressHandler()}
                    style={styles.pickerStyle}
                    activeOpacity={0.8}>
                    <Text style={styles.input}>
                      {this.state.selectedLang === 'en'
                        ? this.state.selectedRarity?.rareteName
                        : this.state.selectedRarity?.rareteNameFr}
                    </Text>
                    <AntDesignIcon
                      name="caretdown"
                      size={moderateScale(10)}
                      color={colors.colorPrimary}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <Text allowFontScaling={false} style={styles.text}>
                    {Languages.createPost.types}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.typePressHandler()}
                    style={styles.pickerStyle}
                    activeOpacity={0.8}>
                    <Text style={styles.input}>
                      {this.state.selectedLang === 'en'
                        ? this.state.selectedType?.typeName
                        : this.state.selectedType?.typeNameFr}
                    </Text>
                    <AntDesignIcon
                      name="caretdown"
                      size={moderateScale(10)}
                      color={colors.colorPrimary}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <Text allowFontScaling={false} style={styles.text}>
                    {Languages.createPost.trainer}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.trainerPressHandler()}
                    style={styles.pickerStyle}
                    activeOpacity={0.8}>
                    <Text style={styles.input}>
                      {this.state.selectedLang === 'en'
                        ? this.state.selectedTrainer?.trainerName
                        : this.state.selectedTrainer?.trainerNameFr}
                    </Text>
                    <AntDesignIcon
                      name="caretdown"
                      size={moderateScale(10)}
                      color={colors.colorPrimary}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <Text allowFontScaling={false} style={styles.text}>
                    {Languages.createPost.energy}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.energyPressHandler()}
                    style={styles.pickerStyle}
                    activeOpacity={0.8}>
                    <Text style={styles.input}>
                      {this.state.selectedLang === 'en'
                        ? this.state.selectedEnergy?.EnergyTypeName
                        : this.state.selectedEnergy?.EnergyTypeNameFr}
                    </Text>
                    <AntDesignIcon
                      name="caretdown"
                      size={moderateScale(10)}
                      color={colors.colorPrimary}
                    />
                  </TouchableOpacity>
                </View>
              </>
            ) : null}
            {this.state.selectedCardGameId === 0 ? null : (
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.text}>
                  Condition
                </Text>
                <TouchableOpacity
                  onPress={() => this.conditionPressHandler()}
                  style={styles.pickerStyle}
                  activeOpacity={0.8}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.input}>
                    {this.state.selectedLang === 'en'
                      ? this.state.selectedCondition?.conditionName
                      : this.state.selectedCondition?.conditionNameFr}
                  </Text>
                  <AntDesignIcon
                    name="caretdown"
                    size={moderateScale(10)}
                    color={colors.colorPrimary}
                  />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.row}>
              <Text allowFontScaling={false} style={styles.text}>
                #{Languages.createPost.hashtag}
              </Text>
              <TextInput
                placeholder="Enter hashtag"
                placeholderTextColor={colors.colorWhite}
                style={styles.hashtagInput}
                allowFontScaling={false}
                autoCapitalize="none"
                keyboardType="default"
                value={this.state.hashtag}
                autoFocus={false}
                onKeyPress={e => this.handleChangeHashtag(e.nativeEvent.key)}
              />
            </View>
            <View style={styles.row}>
              <Text allowFontScaling={false} style={styles.text}>
                @{Languages.createPost.people}
              </Text>
              <MentionsTextInput
                textInputStyle={styles.textInputStyle}
                suggestionsPanelStyle={styles.suggestionsPanelStyle}
                loadingComponent={() => (
                  <View style={styles.loaderBox}>
                    <ActivityIndicator />
                  </View>
                )}
                textInputMinHeight={moderateScale(50)}
                textInputMaxHeight={moderateScale(80)}
                trigger={'@'}
                placeholder="Tag a friend"
                triggerLocation={'new-word-only'}
                value={this.state.people}
                onChangeText={val => {
                  this.setState({people: val});
                }}
                triggerCallback={val => this.callback(val)}
                renderSuggestionsRow={this.renderSuggestion}
                suggestionsData={this.state.users}
                keyExtractor={item => item.id}
                suggestionRowHeight={moderateScale(40)}
                horizontal={false}
                MaxVisibleRowCount={3}
              />
            </View>
            <View style={styles.row}>
              <Text allowFontScaling={false} style={styles.text}>
                {Languages.createPost.postTag}
              </Text>
              <ScrollView
                horizontal
                style={styles.buttonBox}
                contentContainerStyle={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({tab: '1'})}
                  activeOpacity={0.8}
                  style={
                    this.state.tab === '1'
                      ? styles.activeTab
                      : styles.inactiveTab
                  }>
                  <Text allowFontScaling={false} style={styles.activeTabText}>
                    {Languages.createPost.tab1}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({tab: '2', price: ''})}
                  activeOpacity={0.8}
                  style={
                    this.state.tab === '2'
                      ? [styles.activeTab, {marginHorizontal: moderateScale(5)}]
                      : [
                          styles.inactiveTab,
                          {marginHorizontal: moderateScale(5)},
                        ]
                  }>
                  <Text allowFontScaling={false} style={styles.inactiveTabText}>
                    {Languages.createPost.tab2}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({tab: '3', price: ''})}
                  activeOpacity={0.8}
                  style={
                    this.state.tab === '3'
                      ? styles.activeTab
                      : styles.inactiveTab
                  }>
                  <Text allowFontScaling={false} style={styles.inactiveTabText}>
                    {Languages.createPost.tab3}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
            {this.state.tab === '1' ? (
              <View style={styles.bottomBox}>
                <Text allowFontScaling={false} style={styles.price}>
                  {Languages.createPost.price} $
                </Text>
                <TextInput
                  placeholder={Languages.createPost.pricePlaceholder}
                  placeholderTextColor={colors.colorWhite}
                  style={styles.priceInput}
                  autoFocus
                  keyboardType="number-pad"
                  onChangeText={text => this.setState({price: text})}
                />
              </View>
            ) : null}
          </ScrollView>
        </KeyboardAvoidingView>
        <Spinner visible={this.state.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBlack,
  },
  headerBox: {
    width: '100%',
    height: fonts.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    backgroundColor: colors.colorBlack,
  },
  name: {
    fontSize: fonts.extraSmallText,
    color: '#828796',
  },
  heading: {
    color: colors.colorWhite,
    fontSize: fonts.title,
    fontWeight: 'bold',
  },
  cardBox: {
    width: '100%',
    height: moderateScale(125),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: moderateScale(1),
    borderBottomWidth: moderateScale(1),
    borderColor: '#2E313C',
  },
  postImage: {
    width: moderateScale(80),
    height: moderateScale(110),
    marginHorizontal: moderateScale(15),
  },
  row: {
    width: '100%',
    height: moderateScale(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    width: '25%',
    fontSize: fonts.smallText,
    color: '#828796',
  },
  input: {
    color: colors.colorWhite,
    width: '75%',
    fontSize: fonts.smallText,
  },
  hashtagInput: {
    color: colors.colorPrimary,
    width: '75%',
    fontSize: fonts.smallText,
  },
  activeTab: {
    padding: moderateScale(8),
    backgroundColor: colors.colorPrimary,
    borderRadius: moderateScale(50),
  },
  inactiveTab: {
    padding: moderateScale(8),
    backgroundColor: '#424242',
    borderRadius: moderateScale(50),
  },
  activeTabText: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
    fontWeight: '500',
  },
  inactiveTabText: {
    color: colors.colorWhite,
    fontSize: fonts.smallText,
    fontWeight: '500',
  },
  bottomBox: {
    width: '100%',
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  price: {
    color: colors.colorWhite,
    fontSize: fonts.largeText,
  },
  priceInput: {
    color: colors.colorWhite,
    fontSize: fonts.text,
  },
  suggestionRow: {
    flexDirection: 'row',
    height: moderateScale(50),
    padding: moderateScale(5),
    alignItems: 'center',
  },
  pickerStyle: {
    flexDirection: 'row',
    backgroundColor: colors.colorBlack,
    color: colors.colorWhite,
    width: '75%',
    alignItems: 'center',
  },
  buttonBox: {
    width: '75%',
    flexDirection: 'row',
  },
  loaderBox: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    width: '100%',
    height: moderateScale(50),
    fontSize: fonts.smallText,
    color: colors.colorWhite,
  },
  suggestionsPanelStyle: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: moderateScale(50),
    width: moderateScale(150),
  },
  profilePic: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(30),
    marginHorizontal: moderateScale(10),
  },
  suggestionsRowContainer: {
    width: '100%',
    height: moderateScale(40),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: moderateScale(1),
    borderColor: '#999',
  },
  displayNameText: {
    color: '#000',
    fontSize: fonts.smallText,
    fontWeight: '600',
  },
  usernameText: {
    color: '#000',
    fontSize: fonts.extraSmallText,
  },
});
