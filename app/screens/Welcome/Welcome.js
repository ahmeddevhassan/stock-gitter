import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { connect } from "react-redux";
import { images } from '../../../assets';
import styles from './style'
import ButtonComponent from '../../components/Button';
import TextInputComponent from '../../components/TextInput';
import { Container, Content, } from 'native-base';
import { emailCheck } from '../../utils/helper';
import LoadingComponent from '../../components/Loadng/LoadingComponent';
import { login } from '../../redux/actions/UserActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      role: null,
      toggleLogin: false,
      email: "",
      password: "",
    }
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
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

  proceedToSignUp = () => {
    const { navigation } = this.props;
    navigation.navigate('Signup');
  }
  proceedToLogin() {
    this.setState({ toggleLogin: true })
  }
  handleEmailInput = (text) => {
    { this.setState({ email: text }) }
  }
  handlePasswordInput = (text) => {
    { this.setState({ password: text }) }

  }
  AlertFunction(data, type) {
    if (type) {
      setTimeout(() => {
        Alert.alert(
          'Error',
          data, [{
            text: 'Try Again',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },], {
        }
        )
      }, 500);
    }
    else {

      Alert.alert(
        'Error',
        data + ' cannot be left empty', [{
          text: 'Try Again',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },], {
      }
      )
    }

  }
  async authenticateLogin() {
    console.log("this.state.email.split(' ').join()", this.state.email.split(' ').join('').length);

    if (!this.state.email || this.state.email.length == 0 || this.state.email.split(' ').join('').length == 0) {
      // check email format 
      { this.AlertFunction("Email") }
    }
    else if (!this.state.password || this.state.password.length == 0 || this.state.password.split(' ').join('').length == 0) {
      // check email format 
      { this.AlertFunction("Password") }
    }
    else {

      let cred = {
        email: this.state.email,
        password: this.state.password,
      }
      let response = await this.props.loginAction(cred);
      if (response.success) {
        { this.proceedToHome() }
      }
      else {
        // const { navigation } = this.props;
        // navigation.navigate('IntroSlider');
        { this.AlertFunction(response.error, 1) }
      }
    }
    //  { this.proceedToHome() }
  }
  renderLoginForm() {
    if (this.state.toggleLogin) {
      return (
        <>
          <TextInputComponent label={"Email or Username"} handleInput={this.handleEmailInput} />
          <TextInputComponent secure={true} label={"Password"} handleInput={this.handlePasswordInput} />
          <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => this.props.navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.authenticateLogin()}>
            <ButtonComponent label="Login" />
          </TouchableOpacity>
        </>
      )
    } else {

      return (
        <TouchableOpacity onPress={() => this.proceedToLogin()}>
          <ButtonComponent label="EMAIL OR USERNAME" />
        </TouchableOpacity>
      )
    }
  }
  Signout() {
    const { navigation } = this.props;
    navigation.navigate('Logout');
  }
  proceedToHome() {


    AsyncStorage.getItem("Intro").then((val) => {
      if (val == null) {
        const { navigation } = this.props;
        navigation.navigate('IntroSlider');
      }
      else {
        const { navigation } = this.props;
        navigation.navigate('Home');
      }

    })


  }
  render() {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        keyboardOpeningTime={0}
        contentContainerStyle={{ flex: 1 }}
      >
        <Container style={styles.ViewBackground}>
          <Content contentContainerStyle={{ flex: 1 }}>
            <LoadingComponent show={this.props.loader} />

            <View style={styles.UpperView}>
              <Image style={styles.imageStyle} source={images.splashLogo} />
            </View>

            <View style={styles.lowerView}>
              <Text style={styles.heading}>
                Login With
          </Text>

              {this.renderLoginForm()}

              <TouchableOpacity >
                <ButtonComponent label="GMAIL" red={true} />
              </TouchableOpacity>

              <View style={styles.rowText}>
                <Text style={styles.subHeading}>
                  Are you new?
            </Text>
                <TouchableOpacity onPress={() => this.proceedToSignUp()}>
                  <Text style={styles.greenHeading}>
                    Register Here
              </Text>
                </TouchableOpacity>
              </View>
            </View>

          </Content>
        </Container>
      </KeyboardAwareScrollView>


    );
  }
}

let mapStateToProps = state => ({
  loader: state.auth.loader
});

let mapDispatchToProps = dispatch => ({
  loginAction: (cred) => dispatch(login(cred)),

});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);