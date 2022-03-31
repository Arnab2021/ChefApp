import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import {ifIphoneX, getStatusBarHeight} from 'react-native-iphone-x-helper';
import { removeData } from '../Services/LocalStorage';
import {CommonActions} from '@react-navigation/native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getData } from '../Services/LocalStorage';

import colors from '../assets/Colors';

export default class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      chef_id:''
    };
  }

  async componentDidMount(){
    const chef_id = await getData("chef_id")
    this.setState({
      chef_id
    })
  }

  subMenuAdd = () => {
    const {navigate} = this.props.props.navigation;
    return (
      <TouchableOpacity
        style={styles.contentItem}
        onPress={() => navigate('Orders', {screen: 'AddFee'})}>
        <Image style={styles.inputImage} resizeMode="contain" />
        <Text style={[styles.menuItemText, {marginLeft: wp('8%')}]}>Add</Text>
      </TouchableOpacity>
    );
  };
  subMenuEdit = () => {
    const {navigate} = this.props.props.navigation;
    return (
      <TouchableOpacity
        style={styles.contentItem}
        onPress={() => navigate('ViewFees')}>
        <Image style={styles.inputImage} resizeMode="contain" />
        <Text style={[styles.menuItemText, {marginLeft: wp('8%')}]}>
          View/Edit
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {navigate} = this.props.props.navigation;
    const {navigation} = this.props.props
    const {opened} = this.state;
    return (
      <View style={styles.main}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => navigate('Home', {screen: 'Home'})}>
            <Image
              source={require('../assets/chef-app-images/25694.png')}
              style={styles.inputImage}
              resizeMode="contain"
            />
            <Text style={styles.menuItemText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => navigate('Home', {screen: 'Dishes'})}>
            <Image
              source={require('../assets/chef-app-images/Dishes2.png')}
              style={styles.inputImage}
              resizeMode="contain"
            />
            <Text style={styles.menuItemText}>Dishes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentItem} onPress={() => navigate('Home', {screen: 'Payments'})}>
            <Image
              source={require('../assets/chef-app-images/dfe751219c2.png')}
              style={styles.inputImage}
              resizeMode="contain"
            />
            <Text style={styles.menuItemText}>Sales</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => navigate('Orders')}>
            <Image
              source={require('../assets/chef-app-images/orders2.png')}
              style={styles.inputImage}
              resizeMode="contain"
            />
            <Text style={styles.menuItemText}>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => navigate('Payments')}>
            <Image
              source={require('../assets/chef-app-images/atm-green.png')}
              style={styles.inputImage}
              resizeMode="contain"
            />
            <Text style={styles.menuItemText}>Payments</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => navigation.navigate('Orders', {screen: 'Message',params: { chef_id: this.state.chef_id }}) }>
            <Image
              source={require('../assets/chef-app-images/email.png')}
              style={styles.inputImage}
              resizeMode="contain"
            />
            <Text style={styles.menuItemText}>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => navigate('Orders', {screen: 'Rate'})}>
            <Image
              source={require('../assets/chef-app-images/5-star-rating-icon-png-8.png')}
              style={styles.inputImage}
              resizeMode="contain"
            />
            <Text style={styles.menuItemText}>Ratings & Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => navigate('Home', {screen: 'Profile'})}>
            <Image
              source={require('../assets/chef-app-images/5065892-my-profile-icon-png-327283-free-icons-library-profile-icon-png-500_500_preview.png')}
              style={styles.inputImage}
              resizeMode="contain"
            />
            <Text style={styles.menuItemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.contentItem, {justifyContent: 'space-between'}]}
            onPress={() =>
              this.setState({
                opened: !this.state.opened,
              })
            }>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../assets/chef-app-images/100245-200.png')}
                style={styles.inputImage}
                resizeMode="contain"
              />
              <Text style={styles.menuItemText}>Delivery Fees</Text>
            </View>
            <Icon
              name={opened ? 'keyboard-arrow-down' : 'keyboard-arrow-right'}
              style={styles.icon}
            />
          </TouchableOpacity>
          {//opened ? this.subMenuAdd() : null
		  }
          {opened ? this.subMenuEdit() : null}
          <TouchableOpacity
            style={[styles.contentItem, {borderBottomWidth: 0}]}
            onPress={async() => {
              await removeData('chef_id')
              await removeData('rememberme')
              
              const resetAction = CommonActions.reset({
                index: 0,
                routes: [{ name: 'SignInStack' }],
              });
             
              this.props.props.navigation.dispatch(resetAction)
            }}
            >
            <Image
              source={require('../assets/chef-app-images/img_351044.png')}
              style={styles.inputImage}
              resizeMode="contain"
            />
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.black,
  },
  contentItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    alignItems: 'center',
    flex: 1,
  },
  inputImage: {
    width: hp('4%'),
    height: hp('4%'),
  },
  menuItemText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2.5%'),
    color: colors.white,
    marginLeft: wp('4%'),
    ...(Platform.OS === 'ios' ? {lineHeight: hp('3.5%')} : null),
  },
  icon: {
    color: colors.white,
    fontSize: wp('8%'),
  },
});
