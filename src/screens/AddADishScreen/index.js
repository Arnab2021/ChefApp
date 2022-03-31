import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Platform,
  ActivityIndicator
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Dropdown from '../../components/Dropdown';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import colors from '../../assets/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { callApi } from '../ApiHelper/callApi';
import { getData } from '../../Services/LocalStorage';
import { showErrorAlert } from '../../Services/Alert';

const { width, height } = Dimensions.get('window');
export default class AddADishScreen extends Component {
  constructor(props) {

    super(props);

    this.state = {
      loader: false,
      chef_id: '',
      dishname: '',
      description: '',
      price: '',
      deliveryfees: '',
      selectedDeliveryType: 0,
      DeliveryTypeItem: ['Select', 'Pick up only available'],
      selectedCuisine: 0,
      cuisineItem: ['Australian', 'Chinese', 'European', 'Greek', 'Indian', 'Italian', 'Japanese', 'Korean', 'Mexican', 'Middle Eastern', 'Modern', 'Other (please specify)', 'Spanish', 'Thai', 'Vietnamese'],
      selectedDishType: 0,
      dishType: ['Baked goods', 'Meal', 'Dessert', 'Snacks'],
      ingredients: '',
      selectedDietary: 0,
      dietaryItem: ['Free Range', 'Gluten Free', 'Halal', 'Healthy', 'Kosher', 'Lactose Free', 'Organic', 'Peanut Free', 'Vegan', 'Vegetarian'],
      quantity: '',
      selectedOrderType: 0,
      orderTypes: ['All Orders', 'Made on order', 'Pre-order', 'Pre-made'],
      picture_url: ''
    };
  }

  async componentDidMount() {
    await this._getUserid()
    this.addDishHeader();

    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      async () => {

      });
  }

  async _getUserid() {
    const chef_id = await getData('chef_id')
    this.setState({
      chef_id: chef_id
    })
  }

  addDishHeader = async () => {
    this.props.navigation.setOptions({
      title: 'Add A Dish',
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

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  async _addDish() {
    const {
      cuisineItem,
      selectedCuisine,
      selectedDeliveryType,
      DeliveryTypeItem,
      dishType,
      selectedDishType,
      selectedDietary,
      dietaryItem,
      selectedOrderType,
      orderTypes,
    } = this.state;
    if (this.state.picture_url == '') {
      showErrorAlert('Pease upload an image')
      return
    }

    const param = {
      chef_id: this.state.chef_id,
      dishname: this.state.dishname,
      description: this.state.description,
      price: this.state.price,
      delivery_fees: this.state.deliveryfees,

      delivery_type: DeliveryTypeItem[selectedDeliveryType],
      cuisine: cuisineItem[selectedCuisine],
      dish_type: dishType[selectedDishType],
      ingredients: this.state.ingredients,
      dietary_pref: dietaryItem[selectedDietary],
      quantity: this.state.quantity,
      order_type: orderTypes[selectedOrderType],
      pic_url: this.state.picture_url,
    }

    
    this.setState({loader: true})
    const response = await callApi('addDish', "POST", param)
    this.setState({loader: false})
    console.log(response);

    if (response.status != false) {
      if (response.status == 'success') {

        showErrorAlert(response.message)

      } else {
        showErrorAlert(response.message)
      }
    } else {
      showErrorAlert('Error: ', response.message)
    }

  }

  async uploadImage(imageObj) {
    const formData = new FormData()
    const imagePath = imageObj.path
    const fileType = imageObj.mime

    formData.append('image',{
      uri: imagePath,
      name: `${this.state.chef_id}`+`${fileType}`,
      type: fileType
    })

    formData.append('userid', this.state.chef_id)
    formData.append('image_type', 'dish_image')
   
    this.setState({loader:true})
    const response = await callApi('uploadImage', 'FILE_UPLOAD', formData)
    this.setState({loader:false})
  
    if (response.status != false) {
      if (response.status == 'success') {

        showErrorAlert(response.message)
        this.setState({
          picture_url: response.data[0].image
        })

      } else {
        showErrorAlert(response.message)
      }
    } else {
      showErrorAlert('Error: ', response.message)
    }
  }

  render() {
    const {
      cuisineItem,
      selectedCuisine,
      selectedDeliveryType,
      DeliveryTypeItem,
      dishType,
      selectedDishType,
      selectedDietary,
      dietaryItem,
      selectedOrderType,
      orderTypes,
    } = this.state;
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} >
        <View style={styles.main}>
          <View style={styles.content}>

            <View style={styles.row}>
              <View style={styles.labelView}>
                <Text style={styles.text}>Dish Name:</Text>
              </View>
              <View style={styles.inputView}>
                <TextInput style={styles.input} value={this.state.dishname} onChangeText={v => this.setState({ dishname: v })} placeholder="Dish Name" />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.labelView}>
                <Text style={styles.text}>Description:</Text>
              </View>
              <View style={styles.inputView}>
                <TextInput style={[styles.input, { height: 60, textAlignVertical: 'top' }]} multiline={true} numberOfLines={4} value={this.state.description} onChangeText={e => this.setState({ description: e })} placeholder="Description" />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.labelView}>
                <Text style={styles.text}>Price:</Text>
              </View>
              <View style={[styles.inputView, { flexDirection: 'row', alignItems: 'center' }]}>
                <Text>$</Text>
                <TextInput style={styles.input} value={this.state.price} onChangeText={e => this.setState({ price: e })} placeholder="Price Ex. 100" />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.labelView}>
                <Text style={styles.text}>Delivery fees:</Text>
              </View>
              <View style={[styles.inputView, { flexDirection: 'row', alignItems: 'center' }]}>
                <Text>$</Text>
                <TextInput style={styles.input} value={this.state.deliveryfees} onChangeText={e => this.setState({ deliveryfees: e })} placeholder="Delivery fees Ex. 10" />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.labelView}>
                <Text style={styles.text}>Delivery Type:</Text>
              </View>
              <View style={styles.inputView}>
                <Dropdown items={DeliveryTypeItem} selectedItemText={DeliveryTypeItem[selectedDeliveryType]} onSelect={(index) => {
                  this.setState({
                    selectedDeliveryType: index
                  })
                }} />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.labelView}>
                <Text style={styles.text}>Cuisine:</Text>
              </View>
              <View style={styles.inputView}>
                <Dropdown items={cuisineItem} selectedItemText={cuisineItem[selectedCuisine]} onSelect={(index) => {
                  this.setState({
                    selectedCuisine: index
                  })
                }} />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.labelView}>
                <Text style={styles.text}>Dish Type:</Text>
              </View>
              <View style={styles.inputView}>
                <Dropdown items={dishType} selectedItemText={dishType[selectedDishType]} onSelect={(index) => {
                  this.setState({
                    selectedDishType: index
                  })
                }} />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.labelView}>
                <Text style={styles.text}>Ingredients:</Text>
              </View>
              <View style={styles.inputView}>
                <TextInput style={styles.input} value={this.state.ingredients} onChangeText={e => this.setState({ ingredients: e })} placeholder="Ingradients Ex. Salt, etc." />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.labelView}>
                <Text style={styles.text}>Dietary Preferences:</Text>
              </View>
              <View style={styles.inputView}>
                <Dropdown items={dietaryItem} selectedItemText={dietaryItem[selectedDietary]} onSelect={(index) => {
                  this.setState({
                    selectedDietary: index
                  })
                }} />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.labelView}>
                <Text style={styles.text}>Quantity Available:</Text>
              </View>
              <View style={styles.inputView}>
                <TextInput style={styles.input} value={this.state.quantity} onChangeText={e => this.setState({ quantity: e })} placeholder="Quantity" />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.labelView}>
                <Text style={styles.text}>Order Type:</Text>
              </View>
              <View style={styles.inputView}>
                <Dropdown items={orderTypes} selectedItemText={orderTypes[selectedOrderType]} onSelect={(index) => {
                  this.setState({
                    selectedOrderType: index
                  })
                }} />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.labelView}>
                <Text style={styles.text}>Photo Upload:</Text>
              </View>
              <View style={styles.inputView}>
                <TouchableOpacity
                  onPress={() => {
                    this.showActionSheet();
                  }} style={{ padding: 10 }} >
                  <Image
                    source={require('../../assets/chef-app-images/camera.png')}
                    resizeMode="contain"
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>
            </View>

          </View>
          <TouchableOpacity style={styles.submitButton} onPress={() => this._addDish()} disabled={(this.state.loader)?true: false}>
          {
              (this.state.loader) ?
                <ActivityIndicator animating={true} color={colors.green} />
                :
                <Text style={styles.submit}>Add Dish</Text>
            }
          </TouchableOpacity>

          <ActionSheet
            ref={(o) => (this.ActionSheet = o)}
            //title={'Which one do you like ?'}
            options={['Select from gallery', 'Take a photo', 'Cancel']}
            cancelButtonIndex={2}
            destructiveButtonIndex={2}
            onPress={(index) => {
              if (index === 0) {
                ImagePicker.openPicker({
                  width: 300,
                  height: 400,
                  cropping: true,
                }).then((image) => {
                  console.log(image);
                  this.uploadImage(image)
                }).catch(err => {
                  console.log('Camera canceled!')
                })
              } else if (index === 1) {
                ImagePicker.openCamera({
                  width: 300,
                  height: 400,
                  cropping: true,
                }).then((image) => {
                  console.log(image);
                  this.uploadImage(image)
                }).catch(err => {
                  console.log('Camera canceled!')
                })
              }
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    //flex: 1,
    // backgroundColor:'pink'
  },
  content: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 2
  },
  submitButton: {
    backgroundColor: colors.black,
    margin: 10,
    marginLeft: 25,
    marginRight: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('2.5%'),
    borderRadius: 5,
  },
  submit: {
    color: colors.white,
    fontFamily: 'futurastd-medium',
    fontSize: wp('5%'),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 2
  },
  labelView: {
    flex: 0.5
  },
  inputView: {
    flex: 0.5
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    height: 40,
    padding: 5,
    borderRadius: 5,
    fontSize: wp('3.8%'),
  },
});
