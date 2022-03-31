import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../../assets/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ViewDishesItem from '../../components/ViewDishesItem';
import { callApi } from '../ApiHelper/callApi';
import { getData } from '../../Services/LocalStorage';
import { showErrorAlert } from '../../Services/Alert';

const { width, height } = Dimensions.get('window');

export default class DishesScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      chef_id: '',
      allDishes: [],
      loader: false
    }
  }
  async componentDidMount() {
    this.setHeader()
    await this._getUserid()
    await this._getDishes()

    this.willFocusSubscription = this.props.navigation.addListener('focus', async () => {
      await this._getDishes()
    })
  }

  componentWillUnmount() {
    this.willFocusSubscription
  }

  async _getUserid() {
    const chef_id = await getData('chef_id')
    this.setState({
      chef_id: chef_id
    })
  }

  setHeader() {
    this.props.navigation.setOptions({
      title: 'View Dishes',
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
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => this.props.navigation.navigate('AddADish')}>
          <Text style={{ color: colors.white, fontSize: hp('2%') }}>
            Add a dish
          </Text>
        </TouchableOpacity>
      ),
    });
  }

  async _getDishes() {
    const { chef_id } = this.state
    const param = {
      userid: chef_id
    }

    this.setState({ loader: true })
    const response = await callApi('getDishList', 'POST', param)
   
    this.setState({ loader: false })
   
    if (response.status !== false) {
      if (response.status == 'success') {
        this.setState({
          allDishes: response.data
        })
      } else {
        this.setState({
          allDishes: []
        })
        showErrorAlert(response.message)
      }
    } else {
      showErrorAlert(response.message)
    }
  }

  async deleteDish(id) {
    const param = {
      userid: this.state.chef_id,
      dish_id: id
    }
    console.log(param);

    this.setState({ loader: true })
    const response = await callApi('deleteDish', 'POST', param)
    this.setState({ loader: false })
    
    if (response.status !== false) {
      if (response.status == 'success') {
        showErrorAlert(response.message)
        await this._getDishes()
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
        text={(index + 1) + '. ' + item.dish_name}
        editPress={() => this.props.navigation.navigate('EditDish', { dish_array: item })}
        deleteOnpress={() => this.deleteDish(item.dish_id)}
      />
    )
  }

  render() {
    return (
      <View style={styles.main}>
        {/*
          (this.state.loader)&&
          <ActivityIndicator animating={true} color={colors.green}  />
        */}

        <FlatList
          data={this.state.allDishes}
          renderItem={this.renderItem}
          keyExtractor={item => item.dish_id}
          refreshing={this.state.loader}
          onRefresh={async () => await this._getDishes()}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: height * 0.05,
  },
});
