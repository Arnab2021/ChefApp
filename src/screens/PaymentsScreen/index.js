import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import colors from '../../assets/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getData } from '../../Services/LocalStorage';
import { callApi } from '../ApiHelper/callApi';

const { width, height } = Dimensions.get('window');

export default class PaymentsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total_earning: '0',
      loader: true
    }
  }

  header() {
    this.props.navigation.setOptions({
      title: 'Payment',
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
  async componentDidMount() {
    this.header()
    await this._getUserid()
    await this.getTotalEarning()
  }

  async _getUserid() {
    const chef_id = await getData('chef_id')
    this.setState({
      chef_id: chef_id
    })
  }

  async getTotalEarning() {
    const param = {
      userid: this.state.chef_id,
    }

    this.setState({ loader: true })
    const response = await callApi('getTotalEarning', "POST", param)
    this.setState({ loader: false })
    console.log(response);
    if (response.status != false) {
      if (response.status == 'success') {
        this.setState({
          total_earning: response.total_earning
        })
      } else {
        showErrorAlert(response.message)
      }
    } else {
      showErrorAlert('Error: ', response.message)
    }

  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.card}>
          <View style={styles.imageView}>
            <Image
              source={require('../../assets/chef-app-images/dfe751219c.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          {
            (this.state.loader) ?
              <ActivityIndicator size="small" color={colors.green} animating={true} />
              :
              <Text style={styles.price}>${this.state.total_earning}</Text>
          }

          <Text style={styles.text}>Your Total Earnings</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  card: {
    height: hp('35%'),
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 0.65,
  },
  price: {
    fontSize: wp('6%'),
    fontFamily: 'futurastd-medium',
    marginTop: 10,
  },
  text: {
    fontSize: wp('5%'),
    fontFamily: 'futurastd-medium',
    color: colors.green,
    marginTop: 10,
    ...(Platform.OS === 'ios' ? { lineHeight: hp('4%') } : null),
  },
});
