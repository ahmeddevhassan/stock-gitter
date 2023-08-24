import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler, Image, CheckBox, ScrollView, KeyboardAvoidingView } from 'react-native';
import { connect } from "react-redux";
import { images } from '../../../assets';
import styles from './style'
import ButtonComponent from '../../components/Button';
import Header from '../../components/header';

import TextInputComponent from '../../components/TextInput';
import { Container, Content, Tab, Tabs } from 'native-base';
import PickerComponent from '../../components/Picker';
import DatePickerComponent from '../../components/DatePicker';
import { BUTTON_LOGIN_COLOUR } from '../../utils/Consts';
import LoadingComponent from '../../components/Loadng/LoadingComponent';
import { ToggleModal, UserProfileInfoUpdate, userProfilePasswordUpdate } from '../../redux/actions/UserActions';
import { emailCheck } from '../../utils/helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class ProfileUpdate extends Component {
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
      OldPassword: "",
      dateofBith: "",
      bio: "",
    }
    let name = this.props.loginData.name.split(' ')
    this.state.firstName = name[0]
    this.state.lastName = name[1] ? name[1] : ''
    this.state.email = this.props.loginData.email
    console.log("this.props.loginData", this.props.loginData);

    this.state.userName = this.props.loginData.username
    this.state.country = this.props.loginData.country
    this.state.bio = this.props.loginData.bio
    this.state.stateValue = this.props.loginData.state
    this.state.zip_code = this.props.loginData.zip_code
    this.state.address1 = this.props.loginData.address1
    this.state.address2 = this.props.loginData.address2

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
  handleOldPassword = (text) => {
    { this.setState({ OldPassword: text }) }
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
  //handleBio
  handleBio = (text) => {
    { this.setState({ bio: text }) }
  }
  handleAddress1 = (text) => {
    { this.setState({ address1: text }) }
  }
  handleAddress2 = (text) => {
    { this.setState({ address2: text }) }
  }
  handleState = (text) => {
    { this.setState({ stateValue: text }) }
  }
  handleZip = (text) => {
    { this.setState({ zip_code: text }) }
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
  async updatePassword() {
    if (!this.state.password || this.state.password.length == 0 || this.state.password.split(' ').join('').length == 0) {
      { this.AlertFunction("Password") }
    }

    else if (this.state.password.length < 6) {
      { this.AlertFunction("Password must be atleast 6 character", 1) }
    }
    else if (!this.state.OldPassword || this.state.OldPassword.length == 0 || this.state.OldPassword.split(' ').join('').length == 0) {
      { this.AlertFunction("Old Password") }
    } else {

      let cred = {
        old_password: this.state.OldPassword,
        password: this.state.password,
      }

      let response = await this.props.userProfilePasswordUpdate(cred);

      if (response.success) {
        const { navigation } = this.props;

        setTimeout(() => {
          Alert.alert(
            'Success',
            "Password update successfully.", [{
              text: 'Ok',
              style: 'cancel'
            },], {
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
    else {

      const { navigation } = this.props;
      let credentials = {
        username: this.state.userName,
        email: this.state.email,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        bio: this.state.bio,
        state: this.state.stateValue,
        address2: this.state.address2,
        address1: this.state.address1,
        zip_code: this.state.zip_code,
      };
      let response = await this.props.UserProfileInfoUpdate(credentials, navigation);

      if (response.success) {
        const { navigation } = this.props;

        setTimeout(() => {
          Alert.alert(
            'Success',
            "Account update successfully.", [{
              text: 'Ok',
              style: 'cancel'
            },], {
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
          <Header label={"Profile Update"} navi={this.props.navigation} back={"Profile"} />
          <Tabs tabBarUnderlineStyle={{ backgroundColor: BUTTON_LOGIN_COLOUR }}>
            <Tab heading="Info" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}  >
              <Content >
                <LoadingComponent show={this.props.loader} />
                <TextInputComponent label={"Enter First Name*"} handleInput={this.handleFirstNameInput} value={this.state.firstName} />
                <TextInputComponent label={"Enter last Name*"} handleInput={this.handleLastNameInput} value={this.state.lastName} />
                <TextInputComponent label={"Email Address*"} handleInput={this.handleEmail} value={this.state.email} />
                <PickerComponent tag={"country"} handleInput={this.handlePickerCountry} value={this.state.country} />
                <TextInputComponent label={"User Name*"} handleInput={this.handleUserName} value={this.state.userName} />
                <TextInputComponent label={"User Bio"} handleInput={this.handleBio} value={this.state.bio} />
                <TextInputComponent label={"Address 1"} handleInput={this.handleAddress1} value={this.state.address1} />
                <TextInputComponent label={"Address 2"} handleInput={this.handleAddress2} value={this.state.address2} />
                <TextInputComponent label={"User State"} handleInput={this.handleState} value={this.state.stateValue} />
                <TextInputComponent label={"User Zip Code"} handleInput={this.handleZip} value={this.state.zip_code} />
              </Content>
              <View style={styles.BottomButton}>
                <TouchableOpacity onPress={() => this.proceedToHome()}>
                  <ButtonComponent label="Update" />
                </TouchableOpacity>
              </View>
            </Tab>
            <Tab tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} heading="Password" activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
              <Content>
                <TextInputComponent secure={true} label={"Old Password*"} handleInput={this.handleOldPassword} />

                <TextInputComponent secure={true} label={"New Password*"} handleInput={this.handlePassword} />

                <View style={styles.BottomButton}>
                  <TouchableOpacity onPress={() => this.updatePassword()}>
                    <ButtonComponent label="Update Password" />
                  </TouchableOpacity>
                </View>
              </Content>
            </Tab>
          </Tabs>
        </Container >
      </KeyboardAwareScrollView>
    );
  }
}

let mapStateToProps = state => ({
  loader: state.auth.loader,
  loginData: state.auth.loginData

});

let mapDispatchToProps = dispatch => ({
  ToggleModal: () => dispatch(ToggleModal()),//userProfilePasswordUpdate
  UserProfileInfoUpdate: (credentials, navigation) => dispatch(UserProfileInfoUpdate(credentials, navigation)),
  userProfilePasswordUpdate: (credentials, navigation) => dispatch(userProfilePasswordUpdate(credentials, navigation)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileUpdate);