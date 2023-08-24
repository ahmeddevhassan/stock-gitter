import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler, Image, Linking } from 'react-native';
import { connect } from "react-redux";
import { images } from '../../../assets';
import styles from './style'
import ButtonComponent from '../../components/Button';
import Header from '../../components/header';
import TextInputComponent from '../../components/TextInput';
import { Container, Content, } from 'native-base';
import PickerComponent from '../../components/Picker';
import DatePickerComponent from '../../components/DatePicker';
import { BUTTON_LOGIN_COLOUR } from '../../utils/Consts';
import LoadingComponent from '../../components/Loadng/LoadingComponent';
import { ToggleModal, SignUpAction } from '../../redux/actions/UserActions';
import { emailCheck } from '../../utils/helper';
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      role: null,
      checked: true,
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      country: "",
      investment: "",
      experience: "",
      password: "",
      confirmPassword: "",
      dateofBith: "",
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
    this.props.navigation.navigate("WelcomeScreen");
    return true;
  }

  proceedToGuestRegistration() {
    const { navigation } = this.props;
    navigation.navigate('GuestRegistration');
  }
  Signout() {
    const { navigation } = this.props;
    navigation.navigate('Logout');
  }
  handleFirstNameInput = (text) => {
    { this.setState({ firstName: text }) }
  }
  handleLastNameInput = (text) => {
    { this.setState({ lastName: text }) }
  }
  handleEmail = (text) => {
    { this.setState({ email: text }) }
  }
  handleUserName = (text) => {
    { this.setState({ userName: text }) }
  }
  handlePassword = (text) => {
    { this.setState({ password: text }) }
  }
  handleConfirmPassword = (text) => {
    { this.setState({ confirmPassword: text }) }
  }
  handlePickerCountry = (text) => {
    { this.setState({ country: text }) }
  }
  handlePickerInvestment = (text) => {
    { this.setState({ investment: text }) }
  }
  handlePickerExperience = (text) => {
    { this.setState({ experience: text }) }
  }
  handleDateofBirth = (text) => {
    { this.setState({ dateofBith: text }) }
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
  async proceedToHome() {

    // this.props.ToggleModal()
    if (!this.state.firstName || this.state.firstName.length == 0 || this.state.firstName.split(' ').join('').length == 0) {
      { this.AlertFunction("First Name") }
    }
    else if (!this.state.lastName || this.state.lastName.length == 0 || this.state.lastName.split(' ').join('').length == 0) {
      { this.AlertFunction("Last Name") }
    }
    else if (!this.state.email || this.state.email.length == 0 || this.state.email.split(' ').join('').length == 0) {
      // check email format 
      { this.AlertFunction("Email") }
    }
    else if (!emailCheck(this.state.email)) {
      // check email format 
      { this.AlertFunction("Please enter a valid email", 1) }
    }

    else if (!this.state.country || this.state.country.length == 0 || this.state.country.split(' ').join('').length == 0) {
      { this.AlertFunction("Please choose a country", 1) }
    }
    else if (!this.state.userName || this.state.userName.length == 0 || this.state.userName.split(' ').join('').length == 0) {
      // check email format 
      { this.AlertFunction("User Name") }
    }
    else if (!this.state.investment || this.state.investment.length == 0 || this.state.investment.split(' ').join('').length == 0) {
      { this.AlertFunction("Please choose an investment option", 1) }
    }


    else if (!this.state.experience || this.state.experience.length == 0 || this.state.experience.split(' ').join('').length == 0) {
      { this.AlertFunction("Please choose an experience option", 1) }
    }
    else if (!this.state.dateofBith || this.state.dateofBith.length == 0) {
      { this.AlertFunction("Date of birth") }

    }

    else if (!this.state.password || this.state.password.length == 0 || this.state.password.split(' ').join('').length == 0) {
      { this.AlertFunction("Password") }
    }
    else if (!this.state.confirmPassword || this.state.confirmPassword.length == 0 || this.state.confirmPassword.split(' ').join('').length == 0) {
      { this.AlertFunction("Confirm Password") }
    }
    else if (this.state.password.length < 6) {
      { this.AlertFunction("Password must be atleast 6 character", 1) }
    }
    else if (this.state.password != this.state.confirmPassword) {
      { this.AlertFunction("Password doesn't match with confirm password.", 1) }
    }
    else if (!this.state.checked) {
      { this.AlertFunction("Please accept terms and policy.", 1) }
    }
    //this.state.checked
    else {

      const { navigation } = this.props;
      let credentials = {
        username: this.state.userName,
        email: this.state.email,
        investment_style: this.state.investment,
        experience: this.state.experience,
        birth_date: this.state.dateofBith,
        password: this.state.password,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
      };
      let response = await this.props.SignUpAction(credentials, navigation);

      if (response.success) {
        const { navigation } = this.props;

        setTimeout(() => {
          Alert.alert(
            'Success',
            "Please check your email to activate your account.", [{
              text: 'Proceed',
              onPress: () => navigation.navigate('GuestRegistration'),
              style: 'cancel'
            },], {
            cancelable: false,
          }
          )
        }, 500);

        // 
      }
      else {
        // const { navigation } = this.props;
        // navigation.navigate('IntroSlider');
        { this.AlertFunction(response.error, 1) }
      }
    }

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
          <Header label={"Sign Up"} navi={this.props.navigation} back={"WelcomeScreen"} />
          <Content>
            <LoadingComponent show={this.props.loader} />
            <TextInputComponent label={"First Name*"} handleInput={this.handleFirstNameInput} />
            <TextInputComponent label={"Last Name*"} handleInput={this.handleLastNameInput} />
            <TextInputComponent label={"Email Address*"} handleInput={this.handleEmail} />
            <PickerComponent tag={"country"} handleInput={this.handlePickerCountry} />

            <TextInputComponent label={"User Name*"} handleInput={this.handleUserName} />
            <PickerComponent tag={"investment"} handleInput={this.handlePickerInvestment} />
            <PickerComponent tag={"experience"} handleInput={this.handlePickerExperience} />
            <DatePickerComponent handleDateofBirth={this.handleDateofBirth} />
            <TextInputComponent secure={true} label={"Password*"} handleInput={this.handlePassword} />
            <TextInputComponent secure={true} label={"Confirm Password*"} handleInput={this.handleConfirmPassword} />
          </Content>
          <View style={styles.BottomButton}>

            <View style={styles.rowText}>

              <CheckBox
                checked={this.state.checked}
                checkedColor='#009344'
                onPress={() => this.setState({ checked: !this.state.checked })}
              />
              <Text style={styles.termsHeading}>
                I agree to the
            </Text>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.stockgitter.com/USD/page/terms-of-service')}>
                <Text style={styles.greenHeading}>
                  terms and services
            </Text>
              </TouchableOpacity>



            </View>
            <TouchableOpacity onPress={() => this.proceedToHome()}>
              <ButtonComponent label="Sign Up" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => this.proceedToGuestRegistration()}>
            <Text style={styles.subHeading}>
              Activate Account?
          </Text>
          </TouchableOpacity>
        </Container >
      </KeyboardAwareScrollView>
    );
  }
}

let mapStateToProps = state => ({
  loader: state.auth.loader

});

let mapDispatchToProps = dispatch => ({
  ToggleModal: () => dispatch(ToggleModal()),
  SignUpAction: (credentials, navigation) => dispatch(SignUpAction(credentials, navigation)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);