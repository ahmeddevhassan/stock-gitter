import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler } from 'react-native';
import { connect } from "react-redux";
import Loading from '../../components/Loadng';
import styles from './style'
import ButtonComponent from '../../components/Button';
import Header from '../../components/header';
import TextInputComponent from '../../components/TextInput';
import { Container, Content, Tab, Tabs } from 'native-base';
import LoadingComponent from '../../components/Loadng/LoadingComponent';
import PickerComponent from '../../components/Picker';
import { ToggleModal, AddDefaultSimulation, } from '../../redux/actions/UserActions';

class DefaultSimulation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      role: null,
      DefaultsimulationAmount: "",
      investedAmount: "",
      defaultQuantity: "",
      defaultMarket: "",
      defaultBroker: "",
    }
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.setState({ showScanner: false })

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
  GetScannedData = (data) => {

  }

  handlDefaultsimulationAmount = (text) => {
    this.setState({ DefaultsimulationAmount: text })
  }
  handleinvestedAmount = (text) => {
    this.setState({ investedAmount: text })
  }
  handledefaultQuantity = (text) => {
    this.setState({ defaultQuantity: text })
  }
  handledefaultMarket = (text) => {
    this.setState({ defaultMarket: text })
  }
  handledefaultBroker = (text) => {
    this.setState({ defaultBroker: text })
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
  async submitSimulation() {
    if (!this.state.DefaultsimulationAmount || this.state.DefaultsimulationAmount.length == 0 || this.state.DefaultsimulationAmount.split(' ').join('').length == 0) {
      { this.AlertFunction("Default Simulation Amount") }
    }
    else if (!this.state.investedAmount || this.state.investedAmount.length == 0 || this.state.investedAmount.split(' ').join('').length == 0) {
      { this.AlertFunction("Total Invested Amount") }
    }
    else if (!this.state.defaultQuantity || this.state.defaultQuantity.length == 0 || this.state.defaultQuantity.split(' ').join('').length == 0) {
      { this.AlertFunction("Default Quantity") }
    }
    else if (!this.state.defaultMarket || this.state.defaultMarket.length == 0) {
      { this.AlertFunction("Default Market") }
    }
    else if (!this.state.defaultBroker || this.state.defaultBroker.length == 0) {
      { this.AlertFunction("Default Broke") }
    }
    else {
      Alert.alert(
        'Success',
        "Simulation added successfully.", [{
          text: 'Ok',
          style: 'cancel'
        },], {
      }
      )
      // let response = await this.props.userProfilePasswordUpdate(credentials, navigation);

      // if (response.success) {
      //   const { navigation } = this.props;

      //   setTimeout(() => {
      //     Alert.alert(
      //       'Success',
      //       "Password update successfully.", [{
      //         text: 'Ok',
      //         style: 'cancel'
      //       },], {
      //     }
      //     )
      //   }, 500);

      //   // 
      // }
      // else {
      //   // const { navigation } = this.props;
      //   // navigation.navigate('IntroSlider');
      //   { this.AlertFunction(response.error, 1) }
      // }
    }
  }
  render() {
    return (
      <Container style={styles.ViewBackground}>
        <Header label={"Subscription"} navi={this.props.navigation} back={"Profile"} />
        <Content>
          <LoadingComponent show={this.props.loader} />
          <TextInputComponent keyboardType={true} label={"Default Simulation Amount*"} handleInput={this.handlDefaultsimulationAmount} value={this.state.DefaultsimulationAmount} />
          <TextInputComponent keyboardType={true} label={"Total Invested Amount*"} handleInput={this.handleinvestedAmount} value={this.state.investedAmount} />
          <TextInputComponent keyboardType={true} label={"Default Quantity"} handleInput={this.handledefaultQuantity} value={this.state.defaultQuantity} />
          <PickerComponent tag={"defaultmarket"} handleInput={this.handledefaultMarket} value={this.state.defaultMarket} />
          <PickerComponent tag={"defaultbroke"} handleInput={this.handledefaultBroker} value={this.state.defaultBroker} />
        </Content>

        <View style={styles.BottomButton}>
          <TouchableOpacity onPress={() => this.submitSimulation()}>
            <ButtonComponent label={"Submit"} />
          </TouchableOpacity>
        </View>
      </Container>

    );
  }
}

let mapStateToProps = state => ({
  loader: state.auth.loader
});

let mapDispatchToProps = dispatch => ({
  AddDefaultSimulation: (data) => dispatch(AddDefaultSimulation(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultSimulation);