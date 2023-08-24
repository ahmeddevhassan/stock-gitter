import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler, DatePickerIOSComponent } from 'react-native';
import { connect } from "react-redux";
import Loading from '../../components/Loadng';
import styles from './style'
import HeaderWhite from '../../components/headerWhite';
import { Container, Content, Tab, Tabs } from 'native-base';
import { BUTTON_LOGIN_COLOUR } from '../../utils/Consts';
import { LinearGradient } from 'expo-linear-gradient';

import Home from '../home';
import { getUserSimulationJMD, getUserSimulationUSD, getBrokerUSDAction, getBrokerJMDAction, setOrderLanguage } from '../../redux/actions/SimulationAction';
import ButtonComponent from '../../components/Button';
class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      role: null,
    }
    getUserSimulationJMD
  }
  componentDidMount() {
    this.props.getUserSimulationUSD();
    this.props.getUserSimulationJMD();
    this.props.getBrokerUSDAction();
    this.props.getBrokerJMDAction();
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

  Signout() {
    const { navigation } = this.props;
    navigation.navigate('Logout');
  }
  renderNewUpdateUSD() {
    return (
      <Content contentContainerStyle={{ marginTop: 15, }}>
        <View style={styles.UpdateContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingUpdate}>
              Current Simulated Balance
        </Text>
          </View>

          {this.renderLinearStatsUSD()}

        </View>
      </Content>)

  }
  renderNewUpdateJMD() {
    return (
      <Content contentContainerStyle={{ marginTop: 15, }}>
        <View style={styles.UpdateContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingUpdate}>
              Current Simulated Balance
        </Text>
          </View>

          {this.renderLinearStatsJMD()}

        </View>
      </Content>)

  }
  renderLinearStatsJMD() {
    return (
      <LinearGradient
        colors={['#2189BC', '#0A496A',]}
        style={{ padding: 10, alignItems: 'center', borderRadius: 15, width: "90%", alignSelf: 'center', marginLeft: 25, marginRight: 25, marginTop: 10, marginBottom: 10, }}>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Account Value
          </Text>
          <Text
            style={styles.valueTitleText}>
            ${this.props.simulationSettingUSD && this.props.simulationSettingUSD.account_value}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Available for investing

          </Text>
          <Text
            style={styles.valueTitleText}>
            $ {this.props.simulationSettingUSD && this.props.simulationSettingUSD.available_for_investing}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Investment amount

          </Text>
          <Text
            style={styles.valueTitleText}>
            $ {this.props.simulationSettingUSD && this.props.simulationSettingUSD.totalInvAmount}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Gain/Loss
          </Text>
          <Text
            style={styles.valueTitleText}>
            $ {this.props.simulationSettingUSD && this.props.simulationSettingUSD.gainLoss}
          </Text>
        </View>
      </LinearGradient>
    );

  }
  renderLinearStatsUSD() {
    return (
      <LinearGradient
        colors={['#2189BC', '#0A496A',]}
        style={{ padding: 10, alignItems: 'center', borderRadius: 15, width: "90%", alignSelf: 'center', marginLeft: 25, marginRight: 25, marginTop: 10, marginBottom: 10, }}>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Account Value
          </Text>
          <Text
            style={styles.valueTitleText}>
            $ {this.props.simulationSettingUSD && this.props.simulationSettingUSD.account_value}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Available for investing

          </Text>
          <Text
            style={styles.valueTitleText}>
            $ {this.props.simulationSettingUSD && this.props.simulationSettingUSD.available_for_investing}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Investment amount

          </Text>
          <Text
            style={styles.valueTitleText}>
            $ {this.props.simulationSettingUSD && this.props.simulationSettingUSD.totalInvAmount}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Gain/Loss
          </Text>
          <Text
            style={styles.valueTitleText}>
            $ {this.props.simulationSettingUSD && this.props.simulationSettingUSD.gainLoss}
          </Text>
        </View>
      </LinearGradient>
    );

  }
  render() {
    return (
      <Container>
        <HeaderWhite label={"Simulation"} back={false} />
        <Content>
          <Tabs tabContainerStyle={{ backgroundColor: '#666666' }} tabBarUnderlineStyle={{ backgroundColor: BUTTON_LOGIN_COLOUR }}>
            <Tab heading="USD" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
              {this.renderNewUpdateUSD()}
              <View style={styles.centerButton}>
                <TouchableOpacity onPress={() => {
                  this.props.setOrderLanguage("USD")
                  this.props.navigation.navigate('OrderForm')
                }}>
                  <ButtonComponent label={"Create Order"} />
                </TouchableOpacity>
              </View>
            </Tab>
            <Tab heading="Jamaica" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
              {this.renderNewUpdateJMD()}
              <View style={styles.centerButton}>
                <TouchableOpacity onPress={() => {
                  this.props.setOrderLanguage("JMD")
                  this.props.navigation.navigate('OrderForm')
                }}>
                  <ButtonComponent label={"Create Order"} />
                </TouchableOpacity>
              </View>
            </Tab>
          </Tabs>
        </Content>
      </Container>
    );
  }
}

let mapStateToProps = state => ({
  simulationSettingUSD: state.simulation.simulationSettingUSD,
  simulationSettingJMD: state.simulation.simulationSettingJMD,
  brokerUSD: state.simulation.brokerUSD,
  borkerJMD: state.simulation.borkerJMD,
});

let mapDispatchToProps = dispatch => ({
  getUserSimulationUSD: (data) => dispatch(getUserSimulationUSD(data)),
  getUserSimulationJMD: (data) => dispatch(getUserSimulationJMD(data)),
  getBrokerUSDAction: (data) => dispatch(getBrokerUSDAction(data)),
  getBrokerJMDAction: (data) => dispatch(getBrokerJMDAction(data)),
  setOrderLanguage: (data) => dispatch(setOrderLanguage(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stats);