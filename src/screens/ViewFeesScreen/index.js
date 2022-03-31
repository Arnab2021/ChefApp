import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../../assets/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ViewDishesItem from '../../components/ViewDishesItem';
import { getData } from '../../Services/LocalStorage';
import { callApi } from '../ApiHelper/callApi';
import { showErrorAlert } from '../../Services/Alert';

const { width, height } = Dimensions.get('window');
export default class ViewFeesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loader: true,
      chef_id: '',
      datas: []
    }
  }
  async componentDidMount() {
    this.header()
    await this._getUserid()
    await this._getdeliveryFees()

    this.onfocusSub = this.props.navigation.addListener('focus',async() => {
      await this._getdeliveryFees()
    })
  }
  async _getUserid() {
    const chef_id = await getData('chef_id')
    this.setState({
      chef_id: chef_id
    })
  }
  header() {
    this.props.navigation.setOptions({
      title: 'View Delivery Fees',
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

  async _getdeliveryFees() {
    const { chef_id } = this.state
    const param = {
      userid: chef_id
    }

    this.setState({ loader: true })
    const response = await callApi('viewDileveryFeeList', 'POST', param)
    this.setState({ loader: false })

    if (response.status !== false) {
      if (response.status == 'success') {
        this.setState({
          datas: response.data
        })
      } else {
        this.setState({
          datas: []
        })
        showErrorAlert(response.message)
      }
    } else {
      showErrorAlert(response.message)
    }

  }

  async deleteFees(id) {
    const { chef_id } = this.state
    const param = {
      delivery_id: id
    }
    console.log(param);
    this.setState({ loader: true })
    const response = await callApi('deleteDeliveryFees', 'POST', param)
    this.setState({ loader: false })

    if (response.status !== false) {
      if (response.status == 'success') {
        showErrorAlert(response.message)
         this._getdeliveryFees()
      } else {
        showErrorAlert(response.message)
      }
    } else {
      showErrorAlert(response.message)
    }
  }

  renderItem = ({ item, index }) => {
   
    return (
      <ViewDishesItem
        text={'$' + item.deliver_fees + ' for ' + item.distance + 'km'}
        editPress={() =>
          this.props.navigation.navigate('AddFee', { item: item })
        }
        onDeleteKeyPress={() => this.deleteFees(item.delivery_id)}
        key={index}
      />
    )
  }

  render() {
    if (this.state.loader) {
      return (
        <View style={styles.main}>
          <ActivityIndicator size="large" color={colors.green} animating />
        </View>
      )
    }
    return (
      <View style={styles.main}>
        <View style={styles.content}>

          <FlatList
            data={this.state.datas}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => item.delivery_id.toString()}
            refreshing={this.state.loader}
            onRefresh={async () => await this._getdeliveryFees()}
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={() => this.props.navigation.navigate('AddFee')}>
          <Text style={styles.saveText}>Add new</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 5,
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  saveButton: {
    backgroundColor: colors.black,
    margin: 10,
    marginLeft: 25,
    marginRight: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('2.5'),
    borderRadius: 5,
  },
  saveText: {
    color: colors.white,
    fontFamily: 'futurastd-medium',
    fontSize: wp('5%'),
  },
});
