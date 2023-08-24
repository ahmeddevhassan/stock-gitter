import React, { Component } from 'react';
import { AsyncStorage, View, Dimensions, Image, BackHandler, Alert, ImageBackground } from 'react-native';
import {
  Notifications,
} from 'expo';
import { Font } from 'expo-font'
import { images } from '../../../assets';
import { connect } from "react-redux";
import styles from './style'
import { SetLoginData, setDeviceId, refreshUserAuthData, getUserInfoAction } from '../../redux/actions/UserActions';
import registerForPushNotificationsAsync from '../../components/push-notification'
import _ from 'lodash';
import { FontAwesome } from '@expo/vector-icons';

import { fontAssets } from '../../../assets/fonts/index'
class Splash extends Component {


  componentDidMount() {
    this.props.refreshUserAuthData()
    this.props.getUserInfoAction()
    const { navigation } = this.props;

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    registerForPushNotificationsAsync().then(function (value) {
      // console.error("value", value);
      // AsyncStorage.setItem('deviceToken', JSON.stringify(value));

    });

    AsyncStorage.getItem("UserData1").then((val) => {
      setTimeout(() => {
        if (val == null) {
          navigation.navigate('WelcomeScreen');

        }
        else {

          val = JSON.parse(val);
          _.merge(val, this.props.updatedData)
          this.props.SetLoginData(val);

          navigation.navigate('Home');

        }
      }, 2200);
    })
    //

    // this._notificationSubscription = Notifications.addListener(this._handleNotification);

  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  _handleNotification = (notification) => {

    console.log(" yes -> ", notification);

  };

  handleBackButton = () => {

    return true;
  }
  render() {
    console.disableYellowBox = true;
    return (
      <ImageBackground style={styles.container} source={images.SplashBackgroupImage}>
        <View style={styles.overLay}>
          <Image style={styles.imageStyle} source={images.splashLogo} />
        </View>
      </ImageBackground>
    );
  }
}
let mapStateToProps = state => ({
  loginData: state.auth.loginData,
  updatedData: state.auth.updatedData
});

let mapDispatchToProps = dispatch => ({
  SetLoginData: (data) => dispatch(SetLoginData(data)),
  refreshUserAuthData: () => dispatch(refreshUserAuthData()),
  getUserInfoAction: () => dispatch(getUserInfoAction()),
  //getUserInfoAction

});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash);