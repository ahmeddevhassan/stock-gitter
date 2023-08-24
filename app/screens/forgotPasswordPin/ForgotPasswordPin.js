import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler, Image } from 'react-native';
import { connect } from "react-redux";
import { images } from '../../../assets';
import styles from './style'
import ButtonComponent from '../../components/Button';
import Header from '../../components/header';
import TextInputComponent from '../../components/TextInput';
import { Container, Content, } from 'native-base';
import { ActivateAcount, SignUpAction, ForgotPinCheckAction } from '../../redux/actions/UserActions';
import LoadingComponent from '../../components/Loadng/LoadingComponent';


class ForgotPasswordPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      role: null,
      Pin: '',
      password: '',
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
    this.props.navigation.navigate('ForgotPassword')
    return true;
  }

  proceedToSignUp() {
    const { navigation } = this.props;
    navigation.navigate('Signup');
  }
  Signout() {
    const { navigation } = this.props;
    navigation.navigate('Logout');
  }
  handleNameInput = (text) => {
    this.setState({ Pin: text })
  }
  handleNewPassword = (text) => {
    this.setState({ password: text })
  }
  async proceedToHome() {
    // const { navigation } = this.props;
    // navigation.navigate('IntroSlider');
    if (this.state.Pin && this.state.Pin.length == 0 || this.state.Pin.split(' ').join('').length == 0) {
      setTimeout(() => {
        Alert.alert(
          'Error',
          "Pin be left empty.", [{
            text: 'Try Again',
            style: 'cancel'
          },], {
        }
        )
      }, 500);
    }
    else if (this.state.password && this.state.password.length == 0 || this.state.password.split(' ').join('').length == 0) {

      setTimeout(() => {
        Alert.alert(
          'Error',
          "Password cannot be left empty.", [{
            text: 'Try Again',
            style: 'cancel'
          },], {
        }
        )
      }, 500);
    }
    else if (this.state.password.length < 6) {
      setTimeout(() => {
        Alert.alert(
          'Error',
          "Password length must be atleast 6.", [{
            text: 'Try Again',
            style: 'cancel'
          },], {
        }
        )
      }, 500);
    }
    else {
      let cred = {
        activation_code: this.state.Pin,
        password: this.state.password
      }
      let response = await this.props.ForgotPinCheckAction(cred)
      if (response.success) {
        const { navigation } = this.props;
        setTimeout(() => {
          Alert.alert(
            'Success',
            response.message, [{
              text: 'Proceed',
              onPress: () => navigation.navigate('WelcomeScreen'),
              style: 'cancel'
            },], {
            cancelable: false,
          }
          )
        }, 500);
        //ForgotPinCheckAction

        // setTimeout(() => {
        //   navigation.navigate('IntroSlider');
        // }, 500);
        // 
      }
      else {
        setTimeout(() => {
          Alert.alert(
            'Error',
            response.error, [{
              text: 'Proceed',
              style: 'cancel'
            },], {
          }
          )
        }, 500);
      }
      //
    }
  }
  render() {
    return (
      <Container style={styles.ViewBackground}>
        <Header label={"Forgot Password"} navi={this.props.navigation} back="ForgotPassword" />
        <LoadingComponent show={this.props.loader} />
        <Content contentContainerStyle={styles.centerContent}>
          <Text style={styles.heading}>
            Please enter your pin and password
        </Text>
          <TextInputComponent label={"Pin*"} handleInput={this.handleNameInput} />
          <TextInputComponent secure={true} label={"New Password*"} handleInput={this.handleNewPassword} />
          <View style={styles.BottomButton}>
            <TouchableOpacity onPress={() => this.proceedToHome()}>
              <ButtonComponent label="Submit" />
            </TouchableOpacity>
          </View>
        </Content>
      </Container>

    );
  }
}

let mapStateToProps = state => ({
  loader: state.auth.loader
});

let mapDispatchToProps = dispatch => ({
  ForgotPinCheckAction: (data) => dispatch(ForgotPinCheckAction(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordPin);