import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { DrawerActions } from '@react-navigation/native';
import messaging, { firebase } from '@react-native-firebase/messaging';
import * as customNavigation from '../../Services/CustomNavigation.js'

import colors from '../../assets/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getData } from '../../Services/LocalStorage';

const { width, height } = Dimensions.get('window');

export default class DashboardScreen extends Component {

  header() {
    this.props.navigation.setOptions({
      title: 'Dashboard',
      headerTitleStyle: {
        fontFamily: 'futurastd-medium',
        color: colors.white,
        alignSelf: 'center',
      },
      headerStyle: {
        backgroundColor: colors.green,
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => this.props.navigation.openDrawer()}
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingRight: 10,
          }}>
          <Image
            source={require('../../assets/chef-app-images/menu.png')}
            resizeMode="contain"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Image
            source={require('../../assets/chef-app-images/arrow.png')}
            resizeMode="contain"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }

  async openNotificationFromBackgroundState() {
    try {
      const chef_id = await getData("chef_id")
      messaging().onNotificationOpenedApp(remoteMessage => {
        if (remoteMessage) {
          customNavigation.navigate("Orders", { screen: 'Message', params: { chef_id: chef_id } })
        }
      });

    } catch (error) {

    }
  }

  async openNotificationFromQuitState() {
    try {
      const chef_id = await getData("chef_id")
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            customNavigation.navigate("Orders", { screen: 'Message', params: { chef_id: chef_id } })
          }
        });
    } catch (error) {

    }
  }

  componentDidMount() {
    this.openNotificationFromQuitState()
    this.openNotificationFromBackgroundState()
    this.header()
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Orders', { screen: 'ViewOrders' })
            }>
            <View style={styles.item}>
              <View style={styles.imageView}>
                <Image
                  source={require('../../assets/chef-app-images/new-order-icon-0.png')}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.number}>32,254</Text>
              <Text style={styles.name}>Orders</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Orders', { screen: 'ViewOrders' })
            }>
            <View style={styles.item}>
              <View style={styles.imageView}>
                <Image
                  source={require('../../assets/chef-app-images/Message-Email-Mail-ICon-PNG-715x657.png')}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.number}>52,256</Text>
              <Text style={styles.name}>Messages</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.content, { marginTop: 10 }]}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Orders', { screen: 'ViewOrders' })
            }>
            <View style={styles.item}>
              <View style={styles.imageView}>
                <Image
                  source={require('../../assets/chef-app-images/img_524257.png')}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.number}>32,254</Text>
              <Text style={styles.name}>Cancellation</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Payments', { screen: 'Payments' })
            }>
            <View style={styles.item}>
              <View style={styles.imageView}>
                <Image
                  source={require('../../assets/chef-app-images/dfe751219c.png')}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.number}>$ 325</Text>
              <Text style={styles.name}>Payment received</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: width * 0.45,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 5,
  },
  imageView: {
    width: hp('12%'),
    height: hp('12%'),
    borderRadius: hp('12%') / 2,
    borderWidth: 5,
    borderColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.5,
  },
  number: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: hp('3%'),
    fontFamily: 'futurastd-medium',
  },
  name: {
    color: colors.green,
    fontFamily: 'futurastd-medium',
    fontSize: hp('2.1%'),
    ...(Platform.OS === 'ios' ? { lineHeight: hp('2.6%') } : null),
  },
});

/*
              <Image
                source={require('../../assets/chef-app-images/new-order-icon-0.png')}
                resizeMode="contain"
                style={styles.image}
              /> */
