import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler, Image } from 'react-native';
import { connect } from "react-redux";
import { images } from '../../../assets';
import styles from './style'
import ButtonComponent from '../../components/Button';
import Header from '../../components/header';
import TextInputComponent from '../../components/TextInput';
import { Container, Content, } from 'native-base';
import { ActivateAcount, SignUpAction } from '../../redux/actions/UserActions';


class GuestRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      role: null,
      code: '',
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
    this.props.goBack();
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
    this.setState({ code: text })
  }
  async proceedToHome() {
    // const { navigation } = this.props;
    // navigation.navigate('IntroSlider');
    if (this.state.code && this.state.code.length == 0 || this.state.code.split(' ').join('').length == 0) {
      setTimeout(() => {
        Alert.alert(
          'Error',
          "Code cannot be left empty", [{
            text: 'Try Again',
            style: 'cancel'
          },], {
        }
        )
      }, 500);
    }
    else {
      let cred = {
        activation_code: this.state.code
      }
      let response = await this.props.ActivateAcount(cred)
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
        <Header label={"Activate your account"} navi={this.props.navigation} back="Signup" />
        <Content contentContainerStyle={styles.centerContent}>
          <Text style={styles.heading}>
            Please enter your activation code
        </Text>
          <TextInputComponent label={"Activation code*"} handleInput={this.handleNameInput} />
          <View style={styles.BottomButton}>
            <TouchableOpacity onPress={() => this.proceedToHome()}>
              <ButtonComponent label="SUBMIT" />
            </TouchableOpacity>
          </View>
        </Content>
      </Container>

    );
  }
}

let mapStateToProps = state => ({

});

let mapDispatchToProps = dispatch => ({
  ActivateAcount: (data) => dispatch(ActivateAcount(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuestRegistration);