/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
//navigation
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getData, setData } from './src/Services/LocalStorage';
import CustomNavigation from './src/Services/CustomNavigation.js';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ifIphoneX, getBottomSpace } from 'react-native-iphone-x-helper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//Screens
import {
  SignInScreen,
  ForgotPasswordScreen,
  RegistrationScreen,
  AddFeesScreen,
  DashboardScreen,
  DishesScreen,
  OrderDetailScreen,
  ProfileScreen,
  AddADishScreen,
  ViewFeesScreen,
  PaymentsScreen,
  EditDishScreen,
  ViewOrdersScreen,
  ChatScreen,
  RateScreen,
  MessagesScreen
} from './src/screens';
//assets
import colors from './src/assets/Colors';
import Helper from './src/Services/Helper';
import SplashScreen from './src/components/SplasScreen';
import DrawerContent from './src/components/DrawerContent';
import messaging, { firebase } from '@react-native-firebase/messaging';

import * as customNavigation from './src/Services/CustomNavigation.js'

const { width, height } = Dimensions.get('window');

const SignInStack = createStackNavigator();
function SignInStackScreen() {
  return (
    <SignInStack.Navigator headerMode="none">
      <SignInStack.Screen name="SignIn" component={SignInScreen} />
      <SignInStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <SignInStack.Screen name="Registration" component={RegistrationScreen} />
    </SignInStack.Navigator>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Dashboard" component={DashboardScreen} />
    </HomeStack.Navigator>
  );
}

const DishesStack = createStackNavigator();

function DishesStackScreen() {
  return (
    <DishesStack.Navigator>
      <DishesStack.Screen name="Dishes" component={DishesScreen} />
      <DishesStack.Screen name="AddADish" component={AddADishScreen} />
      <DishesStack.Screen name="EditDish" component={EditDishScreen} />
    </DishesStack.Navigator>
  );
}

const OrdersStack = createStackNavigator();

function OrdersStackScreen() {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen name="ViewOrders" component={ViewOrdersScreen} />
      <OrdersStack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <OrdersStack.Screen name="Chat" component={ChatScreen} />
      <OrdersStack.Screen name="Rate" component={RateScreen} />
      <OrdersStack.Screen name="ViewFees" component={ViewFeesScreen} />
      <OrdersStack.Screen name="AddFee" component={AddFeesScreen} />
      <OrdersStack.Screen name="Message" component={MessagesScreen} />
    </OrdersStack.Navigator>
  );
}

const PaymentsStack = createStackNavigator();

function PaymentsStackScreen() {
  return (
    <PaymentsStack.Navigator>
      <PaymentsStack.Screen name="Payments" component={PaymentsScreen} />
    </PaymentsStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const Root = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (focused) {
            return (
              <View
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.black,
                }}>
                <Image
                  source={Helper.setTabBarSource(route.name)}
                  style={{ height: wp('7%'), width: wp('7%') }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: colors.white,
                    fontFamily: 'futurastd-medium',
                    fontSize: width / 35,
                    marginTop: 4,
                  }}>
                  {Helper.setTabBarName(route.name)}
                </Text>
              </View>
            );
          }
          return (
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={Helper.setTabBarSource(route.name)}
                style={{ height: wp('7%'), width: wp('7%') }}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: colors.white,
                  fontFamily: 'futurastd-medium',
                  fontSize: width / 35,
                  marginTop: 4,
                }}>
                {Helper.setTabBarName(route.name)}
              </Text>
            </View>
          );
        },
      })}
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        style: {
          backgroundColor: colors.green,
          height: hp('10%'),
        },
        tabStyle: {},
        keyboardHidesTabBar: true
      }}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Dishes" component={DishesStackScreen} />
      <Tab.Screen
        name="Orders"
        component={OrdersStackScreen}
        options={({ route }) => ({
          tabBarVisible:
            getFocusedRouteNameFromRoute(route) === 'Chat' ? false : true,
        })}
      />
      <Tab.Screen name="Payments" component={PaymentsStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
};

function CustomDrawerContent(props) {
  return <DrawerContent props={props} />;
}

const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Home" component={Root} />
    </Drawer.Navigator>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDone: false,
      isLoggedin: false,
      chef_id: ''
    };
  }

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  async componentDidMount() {

    const chef_id = await getData("chef_id")
    this.setState({
      chef_id: chef_id
    })
    setTimeout(() => {
      this.setState({
        isDone: true,
      });
    }, 3000);

    await this.requestUserPermission()

    const rememberme = await getData('rememberme')
    console.log('rememberme', rememberme);
    if (rememberme == 1) {
      console.log('processing');   
      this.setState({
        isLoggedin: true
      })
    }

  }

  render() {
    if (!this.state.isDone) {
      return <SplashScreen />;
    }
    const RootStack = createStackNavigator();
    return (
      <SafeAreaProvider>
        <NavigationContainer ref={customNavigation.navigationRef}>
          <RootStack.Navigator headerMode="none" initialRouteName={(this.state.isLoggedin) ? 'Root' : 'SignInStack'}>

            <RootStack.Screen
              name="SignInStack"
              component={SignInStackScreen}
            />

            <RootStack.Screen name="Root" component={DrawerRoutes} />

          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

//<RootStack.Screen name="SignInStack" component={SignInStackScreen} />
