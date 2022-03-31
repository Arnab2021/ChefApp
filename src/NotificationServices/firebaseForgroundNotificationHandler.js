
import { Platform, Alert } from 'react-native';
import messaging, { firebase } from '@react-native-firebase/messaging';
import * as customNavigation from '../Services/CustomNavigation.js'
import { getData } from '../Services/LocalStorage.js';

const notification_to_show = async (notification) => {

  const chef_id = await getData("chef_id")

  Alert.alert("New message arrived", "Hey, \nThere is new message arrived.",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "OK", onPress: () => {
          
          //customNavigation.navigate('Orders',{screen: 'Message', params: {}})
          if (chef_id != undefined || chef_id != null)
            customNavigation.navigate("Orders", { screen: 'Message', params: { chef_id: chef_id } })
        }
      }
    ]
  )
}


onMessage = () => {
  messaging().onMessage(async remoteMessage => {
    console.log('A Firebase foreground message arrived!', remoteMessage);
    notification_to_show(remoteMessage.notification)
    //SendLocalNotification('SparkForegroundNotification', remoteMessage.notification.title, remoteMessage.notification.body, remoteMessage.data );
  });
}


const firebaseForgroundNotificationHandler = () => {

  onMessage()
}

export default firebaseForgroundNotificationHandler;