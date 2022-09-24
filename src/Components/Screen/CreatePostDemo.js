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
  NativeModules,
  Keyboard,
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
import Spinner from 'react-native-loading-spinner-overlay';
import {Picker} from '@react-native-picker/picker';
import Geolocation from '@react-native-community/geolocation';
import MentionsTextInput from 'react-native-mentions';
import Languages from '../../lang/i18n';

var GetAddress = NativeModules.GetAddress;

let address;
export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: '',
      images: props.route.params.images,
      uid: '',
      loading: false,
      selectedCardGameId: 0,
      selectedCardGame: 0,
      selectedBaseballTeamId: '',
      selectedBaseballTeam: 0,
      selectedBaseballTypeId: '',
      selectedBaseballType: 0,
      selectedBasketballTeamId: '',
      selectedBasketballTeam: 0,
      selectedBasketballTypeId: '',
      selectedBasketballType: 0,
      selectedHockeyTeamId: '',
      selectedHockeyTeam: 0,
      selectedMagicTeamId: '',
      selectedMagicTeam: 0,
      selectedMagicTypeId: '',
      selectedMagicType: 0,
      selectedSoccerTeamId: '',
      selectedSoccerTeam: 0,
      selectedSoccerTypeId: '',
      selectedSoccerType: 0,
      selectedRarityId: '',
      selectedRarity: 0,
      selectedTypeId: '',
      selectedType: 0,
      selectedTrainerId: '',
      selectedTrainer: 0,
      selectedEnergyId: '',
      selectedEnergy: 0,
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
    };
  }

  async componentDidMount() {
    Geolocation.getCurrentPosition(info => {
      if (Platform.OS === 'android') {
        GetAddress.generateAddress(
          info.coords.latitude,
          info.coords.longitude,
          resp => {
            console.log(resp);
            address = resp;
          },
        );
      } else if (Platform.OS === 'ios') {
        console.log(info);
      }
    });
    await AsyncStorage.getItem('userData').then(res => {
      let val = JSON.parse(res);
      console.log(val);
      this.setState({uid: val.id});
      AsyncStorage.getItem('selectedLang').then(lang => {
        console.log(lang);
        this.setState({selectedLang: lang});
        this.validationAndApiParameters('getData', val.id, lang);
      });
    });
  }

  validationAndApiParameters(apikey, id, lang) {
    if (apikey === 'getData') {
      let url = Constant.URL_getPostData + id + '/' + lang;
      console.log(url);
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
        users: jsonRes.userData,
      });
    }
    if (apikey === 'cardData') {
      console.log(jsonRes);
      this.setState({loading: false});
      switch (this.state.selectedCardGameId) {
        case 1:
          this.setState({
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
            hockeyTeamName: [
              ...this.state.hockeyTeamName,
              ...jsonRes.hockeyTeam,
            ],
          });
          break;
        case 4:
          this.setState({
            magicCardType: [
              ...this.state.magicCardType,
              ...jsonRes.magicCardType,
            ],
            magicTeamName: [...this.state.magicTeamName, ...jsonRes.magicTeam],
          });
          break;
        case 5:
          this.setState({
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
      let cardType = '';
      let nameTeam = '';
      switch (this.state.selectedCardGameId) {
        case 1:
          nameTeam =
            this.state.selectedBaseballTeam === 0
              ? ''
              : this.state.baseballTeamName[
                  parseInt(this.state.selectedBaseballTeam)
                ];
          cardType =
            this.state.selectedBaseballType === 0
              ? ''
              : this.state.baseballCardType[
                  parseInt(this.state.selectedBaseballType)
                ];
          break;
        case 2:
          nameTeam =
            this.state.selectedBasketballTeam === 0
              ? ''
              : this.state.basketballTeamName[
                  parseInt(this.state.selectedBasketballTeam)
                ];
          cardType =
            this.state.selectedBasketballType === 0
              ? ''
              : this.state.basketballCardType[
                  parseInt(this.state.selectedBasketballType)
                ];
          break;
        case 3:
          nameTeam =
            this.state.selectedHockeyTeam === 0
              ? ''
              : this.state.hockeyTeamName[
                  parseInt(this.state.selectedHockeyTeam)
                ];
          break;
        case 4:
          nameTeam =
            this.state.selectedMagicTeam === 0
              ? ''
              : this.state.magicTeamName[
                  parseInt(this.state.selectedMagicTeam)
                ];
          cardType =
            this.state.selectedMagicType === 0
              ? ''
              : this.state.magicCardType[
                  parseInt(this.state.selectedMagicType)
                ];
          break;
        case 5:
          nameTeam =
            this.state.selectedSoccerTeam === 0
              ? ''
              : this.state.soccerTeamName[
                  parseInt(this.state.selectedSoccerTeam)
                ];
          cardType =
            this.state.selectedSoccerType === 0
              ? ''
              : this.state.soccerCardType[
                  parseInt(this.state.selectedSoccerType)
                ];
          break;
      }

      let postData = {
        images: this.state.images,
        description: this.state.description,
        cardGame:
          this.state.selectedCardGameId === 0
            ? ''
            : this.state.cardGameData[parseInt(this.state.selectedCardGameId)],
        nameTeam,
        otherTeam: '',
        cardType,
        otherCardType: '',
        rarity:
          this.state.selectedRarity === 0
            ? ''
            : this.state.rarityData[parseInt(this.state.selectedRarity)],
        types:
          this.state.selectedType === 0
            ? ''
            : this.state.typesData[parseInt(this.state.selectedType)],
        trainer:
          this.state.selectedTrainer === 0
            ? ''
            : this.state.trainerData[parseInt(this.state.selectedTrainer)],
        energy:
          this.state.selectedEnergy === 0
            ? ''
            : this.state.energyData[parseInt(this.state.selectedEnergy)],
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

  onSuggestionTap = (item, hidePanel) => {
    hidePanel();
    this.setState({people: '@' + item.username + ' ', selectedPeople: item});
  };

  callback = val => {
    console.log('val', val);
  };

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
              <Picker
                style={styles.pickerStyle}
                selectedValue={this.state.selectedCardGameId}
                mode="dropdown"
                onFocus={() => Keyboard.dismiss()}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({selectedCardGameId: itemIndex}, () => {
                    this.validationAndApiParameters('cardData', itemValue);
                  });
                }}>
                {this.state.cardGameData.map(item => (
                  <Picker.Item
                    key={item.id}
                    label={
                      this.state.selectedLang === 'en'
                        ? item.gameName
                        : item.gameNameFr
                    }
                    value={item.id}
                  />
                ))}
              </Picker>
            </View>
            {this.state.selectedCardGameId === 1 ? (
              <>
                <View style={styles.row}>
                  <Text allowFontScaling={false} style={styles.text}>
                    Team
                  </Text>
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.selectedBaseballTeam}
                    mode="dropdown"
                    onFocus={() => Keyboard.dismiss()}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        selectedBaseballTeamId: itemValue,
                        selectedBaseballTeam: itemIndex,
                      })
                    }>
                    {this.state.baseballTeamName.map(item => (
                      <Picker.Item
                        key={item.id}
                        label={
                          this.state.selectedLang === 'en'
                            ? item.nameTeam
                            : item.nameTeamFr
                        }
                        value={item.id}
                      />
                    ))}
                  </Picker>
                </View>
                <View style={styles.row}>
                  <Text allowFontScaling={false} style={styles.text}>
                    Card Type
                  </Text>
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.selectedBaseballType}
                    mode="dropdown"
                    onFocus={() => Keyboard.dismiss()}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({
                        selectedBaseballTypeId: itemValue,
                        selectedBaseballType: itemIndex,
                      });
                    }}>
                    {this.state.baseballCardType.map(item => (
                      <Picker.Item
                        key={item.id}
                        label={
                          this.state.selectedLang === 'en'
                            ? item.cardType
                            : item.cardTypeFr
                        }
                        value={item.id}
                      />
                    ))}
                  </Picker>
                </View>
              </>
            ) : this.state.selectedCardGameId === 2 ? (
              <>
                <View style={styles.row}>
                  <Text allowFontScaling={false} style={styles.text}>
                    Team
                  </Text>
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.selectedBasketballTeam}
                    mode="dropdown"
                    onFocus={() => Keyboard.dismiss()}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        selectedBasketballTeamId: itemValue,
                        selectedBasketballTeam: itemIndex,
                      })
                    }>
                    {this.state.basketballTeamName.map(item => (
                      <Picker.Item
                        key={item.id}
                        label={
                          this.state.selectedLang === 'en'
                            ? item.nameTeam
                            : item.nameTeamFr
                        }
                        value={item.id}
                      />
                    ))}
                  </Picker>
                </View>
                <View style={styles.row}>
                  <Text allowFontScaling={false} style={styles.text}>
                    Card Type
                  </Text>
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.selectedBasketballType}
                    mode="dropdown"
                    onFocus={() => Keyboard.dismiss()}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({
                        selectedBasketballTypeId: itemValue,
                        selectedBasketballType: itemIndex,
                      });
                    }}>
                    {this.state.basketballCardType.map(item => (
                      <Picker.Item
                        key={item.id}
                        label={
                          this.state.selectedLang === 'en'
                            ? item.cardType
                            : item.cardTypeFr
                        }
                        value={item.id}
                      />
                    ))}
                  </Picker>
                </View>
              </>
            ) : this.state.selectedCardGameId === 3 ? (
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.text}>
                  Team
                </Text>
                <Picker
                  style={styles.pickerStyle}
                  selectedValue={this.state.selectedHockeyTeam}
                  mode="dropdown"
                  onFocus={() => Keyboard.dismiss()}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({
                      selectedHockeyTeamId: itemValue,
                      selectedHockeyTeam: itemIndex,
                    })
                  }>
                  {this.state.hockeyTeamName.map(item => (
                    <Picker.Item
                      key={item.id}
                      label={
                        this.state.selectedLang === 'en'
                          ? item.nameTeam
                          : item.nameTeamFr
                      }
                      value={item.id}
                    />
                  ))}
                </Picker>
              </View>
            ) : this.state.selectedCardGameId === 4 ? (
              <>
                <View style={styles.row}>
                  <Text allowFontScaling={false} style={styles.text}>
                    Type
                  </Text>
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.selectedMagicTeam}
                    mode="dropdown"
                    onFocus={() => Keyboard.dismiss()}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        selectedMagicTeamId: itemValue,
                        selectedMagicTeam: itemIndex,
                      })
                    }>
                    {this.state.magicTeamName.map(item => (
                      <Picker.Item
                        key={item.id}
                        label={
                          this.state.selectedLang === 'en'
                            ? item.nameTeam
                            : item.nameTeamFr
                        }
                        value={item.id}
                      />
                    ))}
                  </Picker>
                </View>
                <View style={styles.row}>
                  <Text allowFontScaling={false} style={styles.text}>
                    Rarity
                  </Text>
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.selectedMagicType}
                    mode="dropdown"
                    onFocus={() => Keyboard.dismiss()}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({
                        selectedMagicTypeId: itemValue,
                        selectedMagicType: itemIndex,
                      });
                    }}>
                    {this.state.magicCardType.map(item => (
                      <Picker.Item
                        key={item.id}
                        label={
                          this.state.selectedLang === 'en'
                            ? item.cardType
                            : item.cardTypeFr
                        }
                        value={item.id}
                      />
                    ))}
                  </Picker>
                </View>
              </>
            ) : this.state.selectedCardGameId === 5 ? (
              <>
                <View style={styles.row}>
                  <Text allowFontScaling={false} style={styles.text}>
                    Team
                  </Text>
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.selectedSoccerTeam}
                    mode="dropdown"
                    onFocus={() => Keyboard.dismiss()}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        selectedSoccerTeamId: itemValue,
                        selectedSoccerTeam: itemIndex,
                      })
                    }>
                    {this.state.soccerTeamName.map(item => (
                      <Picker.Item
                        key={item.id}
                        label={
                          this.state.selectedLang === 'en'
                            ? item.nameTeam
                            : item.nameTeamFr
                        }
                        value={item.id}
                      />
                    ))}
                  </Picker>
                </View>
                <View style={styles.row}>
                  <Text allowFontScaling={false} style={styles.text}>
                    Card Type
                  </Text>
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.selectedSoccerType}
                    mode="dropdown"
                    onFocus={() => Keyboard.dismiss()}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({
                        selectedSoccerTypeId: itemValue,
                        selectedSoccerType: itemIndex,
                      });
                    }}>
                    {this.state.soccerCardType.map(item => (
                      <Picker.Item
                        key={item.id}
                        label={
                          this.state.selectedLang === 'en'
                            ? item.cardType
                            : item.cardTypeFr
                        }
                        value={item.id}
                      />
                    ))}
                  </Picker>
                </View>
              </>
            ) : this.state.selectedCardGameId === 6 ? (
              <>
                <View style={styles.row}>
                  <Text allowFontScaling={false} style={styles.text}>
                    {Languages.createPost.rarity}
                  </Text>
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.selectedRarityId}
                    mode="dropdown"
                    onFocus={() => Keyboard.dismiss()}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        selectedRarityId: itemValue,
                        selectedRarity: itemIndex,
                      })
                    }>
                    {this.state.rarityData.map(item => (
                      <Picker.Item
                        key={item.id}
                        label={
                          this.state.selectedLang === 'en'
                            ? item.rareteName
                            : item.rareteNameFr
                        }
                        value={item.id}
                      />
                    ))}
                  </Picker>
                </View>
                <View style={styles.row}>
                  <Text allowFontScaling={false} style={styles.text}>
                    {Languages.createPost.types}
                  </Text>
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.selectedTypeId}
                    mode="dropdown"
                    onFocus={() => Keyboard.dismiss()}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({
                        selectedTypeId: itemValue,
                        selectedType: itemIndex,
                      });
                    }}>
                    {this.state.typesData.map(item => (
                      <Picker.Item
                        key={item.id}
                        label={
                          this.state.selectedLang === 'en'
                            ? item.typeName
                            : item.typeNameFr
                        }
                        value={item.id}
                      />
                    ))}
                  </Picker>
                </View>
                <View style={styles.row}>
                  <Text allowFontScaling={false} style={styles.text}>
                    {Languages.createPost.trainer}
                  </Text>
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.selectedTrainerId}
                    mode="dropdown"
                    onFocus={() => Keyboard.dismiss()}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        selectedTrainerId: itemValue,
                        selectedTrainer: itemIndex,
                      })
                    }>
                    {this.state.trainerData.map(item => (
                      <Picker.Item
                        key={item.id}
                        label={
                          this.state.selectedLang === 'en'
                            ? item.trainerName
                            : item.trainerNameFr
                        }
                        value={item.id}
                      />
                    ))}
                  </Picker>
                </View>
                <View style={styles.row}>
                  <Text allowFontScaling={false} style={styles.text}>
                    {Languages.createPost.energy}
                  </Text>
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.selectedEnergyId}
                    mode="dropdown"
                    onFocus={() => Keyboard.dismiss()}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        selectedEnergyId: itemValue,
                        selectedEnergy: itemIndex,
                      })
                    }>
                    {this.state.energyData.map(item => (
                      <Picker.Item
                        key={item.id}
                        label={
                          this.state.selectedLang === 'en'
                            ? item.EnergyTypeName
                            : item.EnergyTypeNameFr
                        }
                        value={item.id}
                      />
                    ))}
                  </Picker>
                </View>
              </>
            ) : null}
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
