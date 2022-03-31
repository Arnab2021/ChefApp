import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../../assets/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ViewDishesItem from '../../components/ViewDishesItem';

const {width, height} = Dimensions.get('window');

export default class RateScreen extends Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Rating and Reviews',
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
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.content}>
          <View style={styles.startView}>
            <Text style={styles.startItemText}>Quality</Text>
            <View style={styles.imageView}>
              <Image
                source={require('../../assets/chef-app-images/5-star-rating-icon.png')}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
          </View>
          <View style={styles.startView}>
            <Text style={styles.startItemText}>Value for money</Text>
            <View style={styles.imageView}>
              <Image
                source={require('../../assets/chef-app-images/5-star-rating-icon.png')}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
          </View>
          <View style={styles.startView}>
            <Text style={styles.startItemText}>Time Accuracy</Text>
            <View style={styles.imageView}>
              <Image
                source={require('../../assets/chef-app-images/5-star-rating-icon.png')}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
          </View>
          <View style={styles.commentView}>
            <Text style={styles.commentsText}>Comments:</Text>
            <View style={styles.comments}>
              <TextInput
                style={styles.input}
                placeholder="Lorem Ipsum"
                multiline
              />
            </View>
          </View>
          <TouchableOpacity style={styles.ratingButton}>
            <Text style={styles.ratingText}>Home Chef Rating</Text>
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
    margin: 10,
  },
  imageView: {
    width: wp('40%'),
    height: wp('11%'),
  },
  startView: {
    alignItems: 'center',
    marginTop: 10,
  },
  startItemText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2.5%'),
  },
  commentView: {
    marginTop: 10,
  },
  commentsText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2.5%'),
  },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 5,
    textAlignVertical: 'top',
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: hp('2.5%'),
  },
  comments: {
    marginTop: 10,
    height: hp('18%'),
  },
  ratingButton: {
    backgroundColor: colors.black,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  ratingText: {
    color: colors.white,
    fontFamily: 'futurastd-medium',
    fontSize: hp('3%'),
    ...(Platform.OS === 'ios' ? {lineHeight: hp('3.5%')} : null),
  },
});
