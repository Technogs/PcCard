/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {moderateScale} from 'react-native-size-matters';
import SplashScreen from './Components/Screen/SplashScreen';
import SplashScreen2 from './Components/Screen/SplashScreen2';
import Login from './Components/Screen/Login';
import GenerateOtp from './Components/Screen/GenerateOtp';
import OtpScreen from './Components/Screen/OtpScreen';
import ForgotPassword from './Components/Screen/ForgotPassword';
import Signup from './Components/Screen/Signup';
import {colors} from './Utils/Colors';
import HomeScreen from './Components/Screen/HomeScreen';
import Stories from './Components/Screen/Stories';
import AddStory from './Components/Screen/AddStory';
import PreviewStory from './Components/Screen/PreviewStory';
import SearchScreen from './Components/Screen/SearchScreen';
import AddPost from './Components/Screen/AddPost';
import Profile from './Components/Screen/Profile';
import CreateCollection from './Components/Screen/CreateCollection';
import FollowingNotification from './Components/Screen/FollowingNotification';
import MyNotification from './Components/Screen/MyNotification';
import MessageScreen from './Components/Screen/MessageScreen';
import ChatScreen from './Components/Screen/ChatScreen';
import EditProfile from './Components/Screen/EditProfile';
import SideMenu from './Components/Screen/SideMenu';
import Settings from './Components/Screen/Settings';
import Promotion from './Components/Screen/Promotion';
import ActivePromotions from './Components/Screen/ActivePromotions';
import AddPromotion from './Components/Screen/AddPromotion';
import ChangePassword from './Components/Screen/ChangePassword';
import NotificationSetting from './Components/Screen/NotificationSetting';
import Language from './Components/Screen/Language';
import PrivacyPolicy from './Components/Screen/PrivacyPolicy';
import SupportAndFaq from './Components/Screen/SupportAndFaq';
import CreatePost from './Components/Screen/CreatePost';
import Preview from './Components/Screen/Preview';
import LiveScreen from './Components/Screen/LiveScreen';
import CommentScreen from './Components/Screen/CommentScreen';
import SwitchScreen from './Components/Screen/SwitchScreen';
import Bookmarks from './Components/Screen/Bookmarks';
import FollowingList from './Components/Screen/FollowingList';
import FollowersList from './Components/Screen/FollowersList';
import MessagePeople from './Components/Screen/MessagePeople';
import EditPromotion from './Components/Screen/EditPromotion';
import OtherUserProfile from './Components/Screen/OtherUserProfile';
import SingleCard from './Components/Screen/SingleCard';
import CollectionScreen from './Components/Screen/CollectionScreen';
import Feed from './Components/Screen/Feed';
import Languages from './lang/i18n';
import { fonts } from './Utils/Fonts';

Languages.setLanguage('en');

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

function ProfileMenu() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        drawerType: 'slide',
        drawerStyle: {
          width: moderateScale(220),
          height: '100%',
          backgroundColor: '#000000',
        },
      }}
      drawerContent={props => <SideMenu {...props} />}
      initialRouteName="Profile">
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

function Home() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddStory"
        component={AddStory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Stories"
        component={Stories}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PreviewStory"
        component={PreviewStory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FollowingList"
        component={FollowingList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FollowersList"
        component={FollowersList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CommentScreen"
        component={CommentScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MessagePeople"
        component={MessagePeople}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtherUserProfile"
        component={OtherUserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SingleCard"
        component={SingleCard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CollectionScreen"
        component={CollectionScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function ProfileTab(val) {
  console.log(val);
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileMenu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FollowingList"
        component={FollowingList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FollowersList"
        component={FollowersList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SingleCard"
        component={SingleCard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CollectionScreen"
        component={CollectionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtherUserProfile"
        component={OtherUserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateCollection"
        component={CreateCollection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Promotion"
        component={Promotion}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Bookmarks"
        component={Bookmarks}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ActivePromotions"
        component={ActivePromotions}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditPromotion"
        component={EditPromotion}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddPromotion"
        component={AddPromotion}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Language"
        component={Language}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SupportAndFaq"
        component={SupportAndFaq}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CommentScreen"
        component={CommentScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function Notifications() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.colorPrimary,
        tabBarInactiveTintColor: colors.colorWhite,
        tabBarAllowFontScaling: false,
        tabBarLabelStyle: {fontWeight: 'bold'},
        tabBarStyle: {
          backgroundColor: colors.colorBlack,
          borderBottomWidth: moderateScale(1),
          borderColor: '#828796',
          height: fonts.headerHeight,
          justifyContent:'center',
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.colorPrimary,
          height: moderateScale(3),
          borderRadius: moderateScale(10),
        },
      }}>
      <TopTab.Screen name={Languages.app.following} component={FollowingNotification} />
      <TopTab.Screen name={Languages.app.you} component={MyNotification} />
    </TopTab.Navigator>
  );
}

function CreatePosts() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddPost"
        component={AddPost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Preview"
        component={Preview}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtherUserProfile"
        component={OtherUserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SingleCard"
        component={SingleCard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CollectionScreen"
        component={CollectionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FollowingList"
        component={FollowingList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FollowersList"
        component={FollowersList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CommentScreen"
        component={CommentScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.colorBlack,
          height: moderateScale(50),
        },
        tabBarShowLabel: false,
        unmountOnBlur: true,
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <SimpleLineIcons
                name="home"
                color={focused ? colors.colorPrimary : colors.colorWhite}
                size={moderateScale(25)}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Fontisto
                name="search"
                color={focused ? colors.colorPrimary : colors.colorWhite}
                size={moderateScale(25)}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CreatePosts"
        component={CreatePosts}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <SimpleLineIcons
                name="plus"
                color={focused ? colors.colorPrimary : colors.colorWhite}
                size={moderateScale(25)}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notifications}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <SimpleLineIcons
                name="heart"
                color={focused ? colors.colorPrimary : colors.colorWhite}
                size={moderateScale(25)}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <SimpleLineIcons
                name="user"
                size={moderateScale(25)}
                color={focused ? colors.colorPrimary : colors.colorWhite}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SplashScreen2"
          component={SplashScreen2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GenerateOtp"
          component={GenerateOtp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SwitchScreen"
          component={SwitchScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LiveScreen"
          component={LiveScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
