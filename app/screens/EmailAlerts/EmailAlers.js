import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler, Image } from 'react-native';
import { connect } from "react-redux";
import { images } from '../../../assets';
import styles from './style'
import ButtonComponent from '../../components/Button';
import Header from '../../components/header';
import TextInputComponent from '../../components/TextInput';
import { Container, Content, Tab, Tabs } from 'native-base';
import { UpdateUserProfileAlerts, GetUserAlerts } from '../../redux/actions/NewsAction';
import { emailCheck } from '../../utils/helper';
import LoadingComponent from '../../components/Loadng/LoadingComponent';
import { CheckBox } from 'react-native-elements'
import { BUTTON_LOGIN_COLOUR } from '../../utils/Consts';
import PickerComponent from '../../components/Picker';
import moment from 'moment';


class EmailAlers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      role: null,
      Email: '',
      //  email
      WatchlistEmail: false,
      StockEmail: false,
      CalendarEmail: false,
      receiveNotificationEmail: false,
      //
      email_hour: "0",
      email_minute: "0",
      // sms
      sms_hour: "0",
      sms_minute: "0",
      // 
      //
      WatchlistSms: false,
      StockSms: false,
      CalendarSms: false,
      receiveNotificationSms: false,
      load: false,
    }



    //alerts
  }
  componentDidMount() {
    this.props.GetUserAlerts().then(err => {
      console.log("0", moment(this.props.alerts.time_alerts[0].time_of_day).hours());
      console.log("1", moment(this.props.alerts.time_alerts[1].time_of_day).hours());
      console.log("1m", moment(this.props.alerts.time_alerts[1].time_of_day).minutes());
      console.log("0m", moment(this.props.alerts.time_alerts[0].time_of_day).minutes());
      this.setState({ WatchlistEmail: this.props.alerts.email_watchlist == 1 || this.props.alerts.email_watchlist ? true : false })
      this.setState({ StockEmail: this.props.alerts.email_stock == 1 || this.props.alerts.email_stock ? true : false })
      this.setState({ CalendarEmail: this.props.alerts.email_event == 1 || this.props.alerts.email_event ? true : false })
      this.setState({ receiveNotificationEmail: this.props.alerts.time_alerts[0].when_happens == 1 || this.props.alerts.time_alerts[0].when_happens ? true : false })
      this.setState({ WatchlistSms: this.props.alerts.sms_watchlist == 1 || this.props.alerts.sms_watchlist ? true : false })
      this.setState({ StockSms: this.props.alerts.sms_stock == 1 || this.props.alerts.sms_stock ? true : false })
      this.setState({ CalendarSms: this.props.alerts.sms_event == 1 || this.props.alerts.sms_event ? true : false })
      this.setState({ receiveNotificationSms: this.props.alerts.time_alerts[1].when_happens == 1 || this.props.alerts.time_alerts[1].when_happens ? true : false })
      this.setState({ email_hour: moment(this.props.alerts.time_alerts[0].time_of_day).hours() })
      this.setState({ email_minute: moment(this.props.alerts.time_alerts[0].time_of_day).minutes() })
      this.setState({ sms_hour: moment(this.props.alerts.time_alerts[1].time_of_day).hours() })
      this.setState({ sms_minute: moment(this.props.alerts.time_alerts[1].time_of_day).minutes(), load: true })

    });
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
  handleHour = (text) => {
    this.setState({ email_hour: text })
  }
  handleEmailMinute = (text) => {
    this.setState({ email_minute: text })
  }
  handleHourSms = (text) => {
    this.setState({ sms_hour: text })
  }
  handleSmsMinute = (text) => {
    this.setState({ sms_minute: text })
  }
  async proceedToHome() {
    // const { navigation } = this.props;
    // navigation.navigate('IntroSlider');

    let cred = {
      sms_event: this.state.CalendarSms ? 1 : 0,
      "sms_hour": this.state.sms_hour,
      "sms_minute": this.state.sms_minute,
      sms_stock: this.state.StockSms ? 1 : 0,
      sms_watchlist: this.state.WatchlistSms ? 1 : 0,
      sms_when_happens: this.state.receiveNotificationSms ? 1 : 0,
      //email
      email_event: this.state.CalendarEmail ? 1 : 0,
      "email_hour": this.state.email_hour,
      "email_minute": this.state.email_minute,
      email_stock: this.state.StockEmail ? 1 : 0,
      email_watchlist: this.state.WatchlistEmail ? 1 : 0,
      email_when_happens: this.state.receiveNotificationEmail ? 1 : 0,
    }

    let response = await this.props.UpdateUserProfileAlerts(cred)

    setTimeout(() => {
      Alert.alert(
        'Success',
        "Alerts Update Successfully", [{
          text: 'Okay',
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

    //

  }
  render() {
    return (

      <Container style={styles.ViewBackground}>
        <Header label={"Alerts"} navi={this.props.navigation} back="Profile" />
        <LoadingComponent show={this.props.loader} />
        {this.state.load ?
          <>
            <Tabs tabContainerStyle={{ backgroundColor: '#666666' }} tabBarUnderlineStyle={{ backgroundColor: BUTTON_LOGIN_COLOUR }}>
              <Tab tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} heading="Email" activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
                <Container>
                  <Content contentContainerStyle={styles.centerContent}>
                    <View style={styles.rowText}>
                      <CheckBox
                        checked={this.state.WatchlistEmail}
                        checkedColor='#009344'
                        onPress={() => this.setState({ WatchlistEmail: !this.state.WatchlistEmail })}
                      />
                      <Text>
                        All Watchlist Items Notifications
            </Text>
                    </View>
                    <View style={styles.rowText}>
                      <CheckBox
                        checked={this.state.StockEmail}
                        checkedColor='#009344'
                        onPress={() => this.setState({ StockEmail: !this.state.StockEmail })}
                      />
                      <Text>
                        All Stock Notifications
            </Text>
                    </View>
                    <View style={styles.rowText}>
                      <CheckBox
                        checked={this.state.CalendarEmail}
                        checkedColor='#009344'
                        onPress={() => this.setState({ CalendarEmail: !this.state.CalendarEmail })}
                      />
                      <Text>
                        Weekly Calendar Events
            </Text>
                    </View>
                    <View style={styles.rowTextCenter}>
                      <View style={{ width: "40%" }}>
                        <PickerComponent code={true} tag={"hours"} handleInput={this.handleHour} value={this.state.email_hour} />
                      </View>
                      <View style={{ width: "40%" }}>
                        <PickerComponent tag={"minute"} handleInput={this.handleEmailMinute} value={this.state.email_minute} />
                      </View>
                    </View>
                    <View style={styles.rowText}>
                      <CheckBox
                        checked={this.state.receiveNotificationEmail}
                        checkedColor='#009344'
                        onPress={() => this.setState({ receiveNotificationEmail: !this.state.receiveNotificationEmail })}
                      />
                      <Text>
                        Receive Notification As It Happens
            </Text>
                    </View>

                  </Content>
                </Container>
              </Tab>
              <Tab heading="SMS" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
                <Container>
                  <Content contentContainerStyle={styles.centerContent}>
                    <View style={styles.rowText}>
                      <CheckBox
                        checked={this.state.WatchlistSms}
                        checkedColor='#009344'
                        onPress={() => this.setState({ WatchlistSms: !this.state.WatchlistSms })}
                      />
                      <Text>
                        All Watchlist Items Notifications
            </Text>
                    </View>
                    <View style={styles.rowText}>
                      <CheckBox
                        checked={this.state.StockSms}
                        checkedColor='#009344'
                        onPress={() => this.setState({ StockSms: !this.state.StockSms })}
                      />
                      <Text>
                        All Stock Notifications
            </Text>
                    </View>
                    <View style={styles.rowText}>
                      <CheckBox
                        checked={this.state.CalendarSms}
                        checkedColor='#009344'
                        onPress={() => this.setState({ CalendarSms: !this.state.CalendarSms })}
                      />
                      <Text>
                        Weekly Calendar Events

            </Text>
                    </View>
                    <View style={styles.rowTextCenter}>
                      <View style={{ width: "40%" }}>

                        <PickerComponent code={true} tag={"hours"} handleInput={this.handleHourSms} value={this.state.sms_hour} />
                      </View>
                      <View style={{ width: "40%" }}>

                        <PickerComponent tag={"minute"} handleInput={this.handleSmsMinute} value={this.state.sms_minute} />
                      </View>
                    </View>
                    <View style={styles.rowText}>
                      <CheckBox
                        checked={this.state.receiveNotificationSms}
                        checkedColor='#009344'
                        onPress={() => this.setState({ receiveNotificationSms: !this.state.receiveNotificationSms })}
                      />
                      <Text>
                        Receive Notification As It Happens
            </Text>
                    </View>


                  </Content>
                </Container>
              </Tab>
            </Tabs>
            <View style={styles.BottomButton}>
              <TouchableOpacity onPress={() => this.proceedToHome()}>
                <ButtonComponent label="Update" />
              </TouchableOpacity>
            </View>
          </>
          :
          <Text>

          </Text>
        }


      </Container>

    );
  }
}

let mapStateToProps = state => ({
  loader: state.auth.loader,
  alerts: state.news.alerts,
});

let mapDispatchToProps = dispatch => ({
  UpdateUserProfileAlerts: (data) => dispatch(UpdateUserProfileAlerts(data)),
  GetUserAlerts: (data) => dispatch(GetUserAlerts(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailAlers);