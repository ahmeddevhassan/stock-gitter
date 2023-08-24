import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, BackHandler, Alert, Platform, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import LoadingComponent from '../../components/Loadng'
import { Container, Content } from 'native-base'
import TextInputComponent from '../../components/TextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { connect } from "react-redux";
import { authName, authPassword, login, setDeviceId } from "../../redux/actions/UserActions";
import { emailCheck } from "../../utils/helper";
import ButtonComponent from '../../components/Button';
import { images } from '../../../assets';
import styles from './style'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      show: false,
    };
    this.showerror = this.showerror.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    AsyncStorage.getItem("deviceToken").then((val) => {
      console.log("findded caue ", val);
      let device_id = JSON.parse(val);
      this.props.setDeviceId(device_id);

    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?', [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: () => BackHandler.exitApp()
      },], {
      cancelable: false
    }
    )
    return true;
  }
  handleInput = (value, flag) => {

    if (flag === "email") {
      this.setState({ email: value });
      this.props.setUserEmail(value)
    }
    else {
      this.setState({ password: value });
      this.props.setPassword(value)
    }

  }
  showerror = () => {
    alert("wrong credentials");
  }

  checkCredentials() {
    const { navigation } = this.props;
    console.log("device_token", this.props.deviceToken);

    // this.props.login({
    //   email: this.props.email,
    //   password: this.props.password,
    //   device_token: this.props.deviceToken,
    // }, navigation, this.showerror);
  }
  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid >
        <Container style={styles.container}>
          <SafeAreaView />
          <LoadingComponent show={this.props.loader} />
          <Content contentContainerStyle={styles.content}>
            <View>
              <Image style={styles.imageStyle} source={images.Logo} />
            </View>
            <View >
              <TextInputComponent value={this.state.email} label={"Enter Email Address"} flag={"email"} handleInput={this.handleInput} />
            </View>
            <View>
              <TextInputComponent secure={true} value={this.state.password} label={"Enter Password"} flag={"password"} handleInput={this.handleInput} />
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={() => this.checkCredentials()}>
                <ButtonComponent label={"Login"} />
              </TouchableOpacity>
            </View>
            <Text style={{ margin: 15, fontSize: 19, color: 'red' }}>
              {this.props.error}
            </Text>

          </Content>
        </Container>
      </KeyboardAwareScrollView>
    );
  }
}

let mapStateToProps = state => ({
  email: state.auth.email,
  password: state.auth.password,
  loader: state.auth.loader,
  error: state.auth.error,
  role: state.auth.role,
  deviceToken: state.auth.deviceToken
});

let mapDispatchToProps = dispatch => ({
  setUserEmail: name => dispatch(authName(name)),
  setPassword: password => dispatch(authPassword(password)),
  login: (cred, navigation, errorFunction) => dispatch(login(cred, navigation, errorFunction)),
  setDeviceId: (data) => dispatch(setDeviceId(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);