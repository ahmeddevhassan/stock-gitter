import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler, Image } from 'react-native';
import { connect } from "react-redux";
import { images } from '../../../assets';
import styles from './style'
import ButtonComponent from '../../components/Button';
import Header from '../../components/header';
import TextInputComponent from '../../components/TextInput';
import { Container, Content, } from 'native-base';
import { ActivateAcount, SignUpAction, ForgotEmailCheckAction } from '../../redux/actions/UserActions';
import { emailCheck } from '../../utils/helper';
import LoadingComponent from '../../components/Loadng/LoadingComponent';


class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      role: null,
      Email: '',
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
    this.props.navigation.navigate('WelcomeScreen')
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
    this.setState({ Email: text })
  }
  async proceedToHome() {
    // const { navigation } = this.props;
    // navigation.navigate('IntroSlider');
    if (this.state.Email && this.state.Email.length == 0 || this.state.Email.split(' ').join('').length == 0) {
      setTimeout(() => {
        Alert.alert(
          'Error',
          "Email cannot be left empty", [{
            text: 'Try Again',
            style: 'cancel'
          },], {
        }
        )
      }, 500);
    }
    else if (!emailCheck(this.state.Email)) {
      setTimeout(() => {
        Alert.alert(
          'Error',
          "Please enter a valid email", [{
            text: 'Try Again',
            style: 'cancel'
          },], {
        }
        )
      }, 500);
    }
    else {
      let cred = {
        email: this.state.Email
      }
      let response = await this.props.ForgotEmailCheckAction(cred)

      if (response.success) {
        const { navigation } = this.props;
        setTimeout(() => {
          Alert.alert(
            'Success',
            response.message, [{
              text: 'Proceed',
              onPress: () => navigation.navigate('ForgotPasswordPin'),
              style: 'cancel'
            },], {
            cancelable: false,
          }
          )
        }, 500);
        //ForgotEmailCheckAction

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
        <Header label={"Forgot Password"} navi={this.props.navigation} back="WelcomeScreen" />
        <LoadingComponent show={this.props.loader} />
        <Content contentContainerStyle={styles.centerContent}>
          <Text style={styles.heading}>
            Please enter your email
        </Text>
          <TextInputComponent label={"Email*"} handleInput={this.handleNameInput} />
          <View style={styles.BottomButton}>
            <TouchableOpacity onPress={() => this.proceedToHome()}>
              <ButtonComponent label="Proceed" />
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
  ForgotEmailCheckAction: (data) => dispatch(ForgotEmailCheckAction(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);