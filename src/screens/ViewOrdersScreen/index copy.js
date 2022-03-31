import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import colors from '../../assets/Colors';

const {width, height} = Dimensions.get('window');

export default class ViewOrdersScreen extends Component {
  constructor(props){
    super(props)
  }

  setHeader(){
    this.props.navigation.setOptions({
      title: 'View Orders',
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
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Image
            source={require('../../assets/chef-app-images/arrow.png')}
            resizeMode="contain"
            style={{marginRight: 10}}
          />
        </TouchableOpacity>
      ),
    });
  }
  componentDidMount() {
    this.setHeader()
  }

  
  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid={true}>
        <View style={styles.main}>
          <View style={styles.orderCard}>
            <View style={styles.activeOrderTextView}>
              <Text style={styles.activeOrderText}>Active Orders</Text>
            </View>
            <View style={styles.orderContent}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('OrderDetail')}>
                <View
                  style={[
                    styles.orderItem,
                    {
                      borderBottomWidth: 1,
                      borderColor: colors.borderGrey,
                      paddingBottom: 20,
                    },
                  ]}>
                  <View style={styles.orderInformation}>
                    <Text style={styles.dateText}>06-Jun-2020</Text>
                    <Text style={styles.orderidText}>Order id #SC123456</Text>
                  </View>
                  <View style={styles.orderRightInformation}>
                    <View style={styles.statusView}>
                      <Text style={styles.statusText}>On way</Text>
                      <Icon name="arrow-right" style={styles.icon} />
                    </View>
                    <View style={styles.buttonView}>
                      <TouchableOpacity
                        style={styles.activeButton}
                        onPress={() => this.props.navigation.navigate('Chat')}>
                        <Text style={styles.activeButtonText}>Chat</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.inactiveButton}
                        onPress={() => this.props.navigation.navigate('Rate')}>
                        <Text style={styles.inactiveButtonText}>Rate</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('OrderDetail')}>
                <View style={[styles.orderItem, {paddingTop: 20}]}>
                  <View style={styles.orderInformation}>
                    <Text style={styles.dateText}>06-Jun-2020</Text>
                    <Text style={styles.orderidText}>Order id #SC123456</Text>
                  </View>
                  <View style={styles.orderRightInformation}>
                    <View style={styles.statusView}>
                      <Text style={styles.statusText}>Dispatched</Text>
                      <Icon name="arrow-right" style={styles.icon} />
                    </View>
                    <View style={styles.buttonView}>
                      <TouchableOpacity style={styles.activeButton}>
                        <Text
                          style={styles.activeButtonText}
                          onPress={() =>
                            this.props.navigation.navigate('Chat')
                          }>
                          Chat
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.inactiveButton}
                        onPress={() => this.props.navigation.navigate('Rate')}>
                        <Text style={styles.inactiveButtonText}>Rate</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
		  
          <View style={styles.orderCard}>
            <View style={styles.activeOrderTextView}>
              <Text style={styles.activeOrderText}>Past Orders</Text>
            </View>
            <View style={styles.orderContent}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('OrderDetail')}>
                <View
                  style={[
                    styles.orderItem,
                    {
                      borderBottomWidth: 1,
                      borderColor: colors.borderGrey,
                      paddingBottom: 20,
                    },
                  ]}>
                  <View style={styles.orderInformation}>
                    <Text style={styles.dateText}>06-Jun-2020</Text>
                    <Text style={styles.orderidText}>Order id #SC123456</Text>
                  </View>
                  <View style={styles.orderRightInformation}>
                    <View style={styles.statusView}>
                      <Text style={styles.statusText}>Delivered</Text>
                      <Icon name="arrow-right" style={styles.icon} />
                    </View>
                    <View style={styles.buttonView}>
                      <TouchableOpacity
                        style={styles.activeButton}
                        onPress={() => this.props.navigation.navigate('Chat')}>
                        <Text style={styles.activeButtonText}>Chat</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.inactiveButton}
                        onPress={() => this.props.navigation.navigate('Rate')}>
                        <Text style={styles.inactiveButtonText}>Rate</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('OrderDetail')}>
                <View style={[styles.orderItem, {paddingTop: 20}]}>
                  <View style={styles.orderInformation}>
                    <Text style={styles.dateText}>06-Jun-2020</Text>
                    <Text style={styles.orderidText}>Order id #SC123456</Text>
                  </View>
                  <View style={styles.orderRightInformation}>
                    <View style={styles.statusView}>
                      <Text style={styles.statusText}>Delivered</Text>
                      <Icon name="arrow-right" style={styles.icon} />
                    </View>
                    <View style={styles.buttonView}>
                      <TouchableOpacity
                        style={styles.activeButton}
                        onPress={() => this.props.navigation.navigate('Chat')}>
                        <Text style={styles.activeButtonText}>Chat</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.inactiveButton}
                        onPress={() => this.props.navigation.navigate('Rate')}>
                        <Text style={styles.inactiveButtonText}>Rate</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>			
          </View>
		  
		  <View style={styles.orderCard}>
            <View style={styles.activeOrderTextView}>
              <Text style={styles.activeOrderText}>Cancelled Orders</Text>
            </View>
            <View style={styles.orderContent}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('OrderDetail')}>
                <View
                  style={[
                    styles.orderItem,
                    {
                      borderBottomWidth: 1,
                      borderColor: colors.borderGrey,
                      paddingBottom: 20,
                    },
                  ]}>
                  <View style={styles.orderInformation}>
                    <Text style={styles.dateText}>06-Jun-2020</Text>
                    <Text style={styles.orderidText}>Order id #SC123456</Text>
                  </View>
                  <View style={styles.orderRightInformation}>
                    <View style={styles.statusView}>
                      <Text style={styles.statusText}>Cancelled</Text>
                      <Icon name="arrow-right" style={styles.icon} />
                    </View>
                    <View style={styles.buttonView}>
                      <TouchableOpacity
                        style={styles.activeButton}
                        onPress={() => this.props.navigation.navigate('Chat')}>
                        <Text style={styles.activeButtonText}>Chat</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.inactiveButton}
                        onPress={() => this.props.navigation.navigate('Rate')}>
                        <Text style={styles.inactiveButtonText}>Rate</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('OrderDetail')}>
                <View style={[styles.orderItem, {paddingTop: 20}]}>
                  <View style={styles.orderInformation}>
                    <Text style={styles.dateText}>06-Jun-2020</Text>
                    <Text style={styles.orderidText}>Order id #SC123456</Text>
                  </View>
                  <View style={styles.orderRightInformation}>
                    <View style={styles.statusView}>
                      <Text style={styles.statusText}>Cancelled</Text>
                      <Icon name="arrow-right" style={styles.icon} />
                    </View>
                    <View style={styles.buttonView}>
                      <TouchableOpacity
                        style={styles.activeButton}
                        onPress={() => this.props.navigation.navigate('Chat')}>
                        <Text style={styles.activeButtonText}>Chat</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.inactiveButton}
                        onPress={() => this.props.navigation.navigate('Rate')}>
                        <Text style={styles.inactiveButtonText}>Rate</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>			
          </View>
		  
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  orderCard: {
    backgroundColor: colors.white,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  activeOrderTextView: {
    backgroundColor: colors.black,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  activeOrderText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('3%'),
    color: colors.white,
    paddingLeft: 10,
  },
  orderContent: {
    padding: 20,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: wp('4%'),
  },
  orderidText: {
    fontSize: wp('4%'),
    color: colors.softText,
    marginTop: 5,
  },
  orderRightInformation: {},
  statusText: {
    fontSize: hp('2%'),
    color: colors.green,
  },
  statusView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    fontSize: hp('1.5%'),
    marginLeft: 5,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  activeButton: {
    backgroundColor: colors.green,
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  activeButtonText: {
    fontSize: hp('2%'),
    fontFamily: 'futurastd-medium',
    color: colors.white,
  },
  inactiveButton: {
    backgroundColor: colors.black,
    padding: 5,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inactiveButtonText: {
    fontSize: hp('2%'),
    fontFamily: 'futurastd-medium',
    color: colors.white,
  },
});
