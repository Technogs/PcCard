import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/Colors';
import moment from 'moment';

let timer;

export default class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story: props.route.params.data,
      width: 5,
    };
  }

  componentDidMount() {
    console.log(this.state.story);
    setTimeout(() => {
      this.props.navigation.pop();
    }, 8200);
    timer = setInterval(() => {
      this.setState({width: this.state.width + 5});
    }, 200);
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: this.state.width.toString() + '%',
            height: moderateScale(1),
            backgroundColor: colors.colorSecondary,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            padding: moderateScale(10),
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            source={{uri: this.state.story.profilePic}}
            style={styles.profileImage}
          />
          <View style={{paddingHorizontal: moderateScale(10)}}>
            <Text style={{color: colors.colorWhite}}>
              {this.state.story.username}
            </Text>
            <Text style={{color: colors.colorWhite}}>
              {moment(this.state.story.created_at).fromNow(true)}
            </Text>
          </View>
        </View>
        <Image
          resizeMode="contain"
          source={{uri: this.state.story.mediaFirst}}
          style={styles.image}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBlack,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  profileImage: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(100),
  },
});
