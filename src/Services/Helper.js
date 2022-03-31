export default class Helper {
  static setTabBarName(routeName) {
    //const {routeName} = navigation.state;
    if (routeName === 'Home') {
      return 'Home';
    } else if (routeName === 'Dishes') {
      return 'Dishes';
    } else if (routeName === 'Orders') {
      return 'Orders';
    } else if (routeName === 'Payments') {
      return 'Payments';
    } else if (routeName === 'Profile') {
      return 'Profile';
    }
  }

  static setTabBarSource(routeName) {
    //const {routeName} = navigation.state;
    if (routeName === 'Home') {
      return require('../assets/chef-app-images/user-home.png');
    } else if (routeName === 'Dishes') {
      return require('../assets/chef-app-images/Dishes.png');
    } else if (routeName === 'Orders') {
      return require('../assets/chef-app-images/my-order.png');
    } else if (routeName === 'Payments') {
      return require('../assets/chef-app-images/atm.png');
    } else if (routeName === 'Profile') {
      return require('../assets/chef-app-images/Profile.png');
    }
  }
}
