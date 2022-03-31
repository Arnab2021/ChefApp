import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../../assets/Colors';
import { callApi } from '../ApiHelper/callApi';
import { showErrorAlert } from '../../Services/Alert';
import { getData } from '../../Services/LocalStorage';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default class AddFeesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickUpChecked: false,
      price: '',
      distance: '',
      add_or_edit: 0  // 0 - add 1- edit
    };
  }
  async componentDidMount() {
    this.header()
    await this._getUserid()

    //const { item } = this.props.route.params

    if (this.props.route.params != undefined) {
      const { item } = this.props.route.params
      if (Object.keys(item).length > 0) {
        this.setState({
          price: item.deliver_fees,
          distance: item.distance,
          add_or_edit: 1
        })
      }
    }
  }

  async _getUserid() {
    const chef_id = await getData('chef_id')
    this.setState({
      chef_id: chef_id
    })
  }

  header() {
    this.props.navigation.setOptions({
      title: 'Add Delivery Fees',
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
      headerRight: () => <View style={{ marginRight: 10 }} />,
    });
  }


  async addFess() {
    const { chef_id, price, distance } = this.state
    const param = {
      userid: chef_id,     
      delivery_fees: price,
      distance: distance
    }
    console.log(param);
    this.setState({ loader: true })
    const response = await callApi('addDelivery', 'POST', param)
    this.setState({ loader: false })

    if (response.status !== false) {
      if (response.status == 'success') {
        showErrorAlert(response.message)
      } else {
        showErrorAlert(response.message)
      }
    } else {
      showErrorAlert(response.message)
    }
  }

  async editFees() {
    const { chef_id, price, distance } = this.state
    const { item } = this.props.route.params
    const param = {
      userid: chef_id,
      delivery_id: item.delivery_id,
      delivery_fees: price,
      distance: distance
    }
    console.log(param);
    this.setState({ loader: true })
    const response = await callApi('updateDeliveryFees', 'POST', param)
    this.setState({ loader: false })

    if (response.status !== false) {
      if (response.status == 'success') {
        showErrorAlert(response.message)
      } else {
        showErrorAlert(response.message)
      }
    } else {
      showErrorAlert(response.message)
    }

  }


  render() {
    const { pickUpChecked, add_or_edit } = this.state;

    return (
      <View style={styles.main}>
        <CheckBox
          containerStyle={styles.checkBox}
          textStyle={styles.text}
          title={'Pick up only available'}
          checkedColor={colors.green}
          checked={pickUpChecked}
          onPress={() =>
            this.setState({
              pickUpChecked: !this.state.pickUpChecked,
            })
          }
        />
        <View>
          <View style={styles.content}>
            <View
              style={[
                styles.item,
                {
                  borderBottomWidth: 1,
                  borderColor: colors.borderGrey,
                },
              ]}>
              <Text style={styles.inputText}>Price:</Text>
              <TextInput style={styles.input} value={this.state.value} onChangeText={e => this.setState({ price: e })} value={this.state.price} />
            </View>
            <View style={styles.item}>
              <Text style={styles.inputText}>Distance:</Text>
              <TextInput style={styles.input} placeholder={'km'} value={this.state.distance} onChangeText={e => this.setState({ distance: e })} />
            </View>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={() => {
            (add_or_edit == 0) ?
              this.addFess()
              :
              this.editFees()
          }}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 15,
  },
  checkBox: {
    backgroundColor: 'transparent',
    padding: 0,
    borderWidth: 0,
    marginLeft: 0,
  },
  text: {
    fontFamily: 'futurastd-medium',
    fontSize: width / 25,
    fontWeight: 'normal',
  },
  content: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 5,
    padding: 10,
  },
  item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 10,
    paddingTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borderGrey,
    width: '60%',
    padding: 5,
    borderRadius: 5,
  },
  inputText: {
    fontFamily: 'futurastd-medium',
    fontSize: width / 24,
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: colors.black,
    margin: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('2.5%'),
    borderRadius: 5,
    marginTop: 25,
  },
  saveText: {
    color: colors.white,
    fontFamily: 'futurastd-medium',
    fontSize: wp('5%'),
  },
});
