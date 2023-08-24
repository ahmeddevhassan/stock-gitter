import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler, Image, SafeAreaView, Modal, TouchableWithoutFeedback, TextInput } from 'react-native';
import { connect } from "react-redux";
import { images } from '../../../assets';
import styles from './style'
import ButtonComponent from '../../components/Button';
import Header from '../../components/header';
import TextInputComponent from '../../components/TextInput';
import { Container, Content, Tab, Tabs, Left, Right, Picker } from 'native-base';

import PickerComponent from '../../components/Picker';
import DatePickerComponent from '../../components/DatePicker';
import { BUTTON_LOGIN_COLOUR } from '../../utils/Consts';
import LoadingComponent from '../../components/Loadng/LoadingComponent';
import { ToggleModal, SignUpAction } from '../../redux/actions/UserActions';
import { emailCheck } from '../../utils/helper';
import { CheckBox } from 'react-native-elements';
import { getBrokerUSDAction, getBrokerJMDAction, CreateOrderAction, getCompanyAction, setOrderLanguage } from '../../redux/actions/SimulationAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      role: null,
      checked: true,
      name: "",// user name 
      investmentAmount: "100000",// start investment ammount in api
      investmentPreference: "",// dropdown
      market: "",//dropdown
      company: "Select Company",
      orderType: "Market",
      ActionType: "",
      QuantityToBuy: "100",
      BrokersArr: [],
      selectedBroker: "",
      brokerArr: [],
      limitPrice: "0",
      language: "USD",
      visible: false,
      picked: null,
      companyOptions: [],
      searchTerm: '',
      modal: false,
      textinput: "",
      preview: false,
      credentials: {}
    }
    this.state.name = this.props.loginData.name;
    ;
  }
  componentDidMount() {
    this.props.setOrderLanguage("USD")
    this.props.getBrokerJMDAction().then(ress => {
    })
    this.props.getBrokerUSDAction().then(ress => {
      this.setState({ load: true, brokerArr: this.props.brokerUSD, selectedBroker: this.props.brokerUSD[0].code })
    })
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

  }

  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.navigate("Stats");
    return true;
  }


  handleFirstNameInput = (text) => {
    { this.setState({ name: text }) }
  }
  handleinvestmentAmount = (text) => {
    { this.setState({ investmentAmount: text }) }
  }
  handleinvestmentPreference = (text) => {
    { this.setState({ investmentPreference: text }) }
  }
  handlemarket = (text) => {
    if (text == "USD") {
      //selectedBroker
      this.setState({ brokerArr: this.props.brokerUSD })
      this.setState({ selectedBroker: this.props.brokerUSD[0].code })
      this.props.getCompanyAction(text, "USD");
    }
    else {
      this.setState({ brokerArr: this.props.borkerJMD })
      this.setState({ selectedBroker: this.props.borkerJMD[0].code })
      this.props.getCompanyAction(text, "JMD");

    }
    { this.setState({ market: text, company: "Select Company", companyArr: [] }) }
  }
  handlecompany = (text) => {
    { this.setState({ company: text }) }
  }
  handleorderType = (text) => {
    { this.setState({ orderType: text }) }
  }
  handleActionType = (text) => {
    { this.setState({ ActionType: text }) }
  }
  handleQuantityToBuy = (text) => {
    { this.setState({ QuantityToBuy: text }) }
  }
  handleLimitPrice = (text) => {
    { this.setState({ limitPrice: text }) }
  }
  handleselectedBroker = (text) => {
    console.log(" broker selected text");

    { this.setState({ selectedBroker: text }) }
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
    if (!this.state.name || this.state.name.length == 0 || this.state.name.split(' ').join('').length == 0) {
      { this.AlertFunction("Client Name") }
    }
    else if (!this.state.investmentAmount || this.state.investmentAmount.length == 0 || this.state.investmentAmount.split(' ').join('').length == 0) {
      { this.AlertFunction("Investment Amount") }

    }
    else if (!this.state.investmentPreference || this.state.investmentPreference.length == 0 || this.state.investmentPreference.split(' ').join('').length == 0) {
      // check email format 
      { this.AlertFunction("Please choose a Investment Preference", 1) }

    }
    else if (!this.state.market || this.state.market.length == 0 || this.state.market.split(' ').join('').length == 0) {
      { this.AlertFunction("Please choose a Market", 1) }
    }
    else if (!this.state.orderType || this.state.orderType.length == 0 || this.state.orderType.split(' ').join('').length == 0) {
      // check email format 
      { this.AlertFunction("Please choose a Order Type", 1) }
    }
    else if (!this.state.ActionType || this.state.ActionType.length == 0 || this.state.ActionType.split(' ').join('').length == 0) {
      { this.AlertFunction("Please choose a Order Action", 1) }
    }
    else if (!this.state.QuantityToBuy || this.state.QuantityToBuy.length == 0 || this.state.QuantityToBuy.split(' ').join('').length == 0) {
      { this.AlertFunction("Quantity to Buy ") }
    }
    else if (this.state.orderType == "Limit" && !this.state.limitPrice || this.state.limitPrice.length == 0 || this.state.limitPrice.split(' ').join('').length == 0) {
      { this.AlertFunction("limit Price ") }
    }
    else if (!this.state.company.company_name) {
      { this.AlertFunction("Company ") }
    }
    //limitPrice
    //this.state.checked
    /*
    changePercentage: 0.0074567845441194
changePrice: 0.66000000000001
company_id: 3429
company_name: "AmerisourceBergen Corporation (Holding Co)"
index: "NYSE"
price: 88.51
sector: "Health Care"
symbol: "ABC"
vol: 612718
     */
    else {
      const { navigation } = this.props;
      let credentials = {
        "client_name": this.state.name,
        "investment_amount": this.state.investmentAmount,
        "quantity_to_buy": this.state.QuantityToBuy,
        "total": this.state.company.price * this.state.QuantityToBuy == 0 ? 1 : this.state.company.price * this.state.QuantityToBuy,
        "select_market": this.state.market == "USD" || this.state.market == 4 ? 1 : 2,
        "investment_preferences": this.state.investmentPreference,
        "company_price": this.state.company.changePrice && this.state.company.changePrice > 0 ? this.state.company.changePrice : 0.1,
        "action": this.state.ActionType == "Buy" ? 1 : 2,
        "is_update": false,
        "total_fee": "0",
        "company": this.state.company.company_id,
        "broker": this.state.selectedBroker,
        "limit_price": this.state.limitPrice,
        "order_type": this.state.orderType == "Limit" ? 2 : 1,
        "company_name": this.state.company.company_name,
        "ignore_market_schedule": true
      }
      console.log("this.state.market", this.state.market);

      console.log("credentials", credentials);

      this.setState({ credentials: credentials, preview: true })

    }

  }
  async callApiForOder() {

    let response = await this.props.OrderAction(this.state.credentials, this.props.language ? this.props.language : "USD");

    if (response.success) {
      const { navigation } = this.props;

      setTimeout(() => {
        Alert.alert(
          'Success',
          "Your order has been placed.", [{
            text: 'Done',
            onPress: () => navigation.navigate('Stats'),
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
  renderPickerValue() {
    if (this.state.brokerArr && this.state.brokerArr.length > 0) {
      return (
        this.state.brokerArr.map((key, index) => {
          return (
            <Picker.Item key={"key" + index} label={key.name} value={key.code} />
          )
        })
      );
    }
    else {
      return (

        <Picker.Item label={"No Selected"} value={"key1"} />

      );
    }
  }


  renderBrokerPicker() {
    return (
      <View style={styles.pickerContainer}>
        <Picker
          note
          mode="dropdown"
          selectedValue={this.state.selectedBroker}
          headerBackButtonText={""}
          onValueChange={this.handleselectedBroker.bind(this)}
          textStyle={{ marginLeft: 0, paddingLeft: 0, color: "#000" }}
          itemStyle={{
            marginLeft: 0,
            paddingLeft: 10
          }}
        >
          {this.renderPickerValue()}
        </Picker>
      </View>
    )
  }
  openModal = () => {
    this.setState({ modal: !this.state.modal })
  }
  openModalPreview = () => {
    this.setState({ preview: !this.state.preview })
  }
  callCountry = (text) => {
    this.setState({ textinput: text });
    let language = this.state.market == "4" || this.state.market == 4 || this.state.market == "USD" ? 'USD' : 'JMD'
    console.log("language", language);
    this.props.getCompanyAction(text, language);
  }
  selectCompany(key) {
    this.setState({ company: key })
    this.openModal()
  }
  renderOrderDetail(heading, value) {

    return (
      <View style={styles.viewRow}>
        <Left>
          <Text>
            {heading}
          </Text>
        </Left>
        <Right>
          <Text>
            {value}
          </Text>
        </Right>
      </View>
    )
  }
  render() {
    let { visible, picked } = this.state;
    let renderComapnyDetail = <Text> </Text>;
    if (this.props.companyArr) {
      renderComapnyDetail = this.props.companyArr.map((key, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => this.selectCompany(key)}>
            <View key={index} style={{ height: 40, borderBottomWidth: 0.5, borderColor: '#c5c5c5', paddingBottom: 3, paddingTop: 3 }}>
              <Text key={index}>
                {key.company_name}
              </Text>
            </View>
          </TouchableOpacity>

        );
      })
    }


    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        keyboardOpeningTime={0}
        contentContainerStyle={{ flex: 1 }}
      >
        <Container style={styles.ViewBackground}>
          <Header label={"Create Order"} navi={this.props.navigation} back={"Stats"} />
          <LoadingComponent show={this.props.loader} />


          {/* modal start */}
          <Modal
            animationType="slide"
            transparent={true}
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}
            visible={this.state.modal}
            onRequestClose={() => {

            }}>
            <View style={{ flex: 1, backgroundColor: 'white', width: "100%", }}>
              <View style={{ backgroundColor: BUTTON_LOGIN_COLOUR }}>
                <SafeAreaView style={{ justifyContent: 'center' }}>
                  <View style={{ paddingTop: 20, paddingBottom: 12, backgroundColor: BUTTON_LOGIN_COLOUR, justifyContent: 'space-between', alignContent: 'center', flexDirection: 'row' }}>

                    <View style={{ alignSelf: 'center' }}>
                      <Text style={{
                        fontSize: 17,
                        color: 'white',
                        alignSelf: 'center',
                      }} onPress={() => this.openModal(!this.state.modal)} > Cancel </Text>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                      <Text style={{
                        fontSize: 17,
                        color: 'white',
                        alignSelf: 'center',
                      }}  >Search Company </Text>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                      <Text style={{ color: BUTTON_LOGIN_COLOUR }}>
                        ......
                    </Text>
                    </View>
                  </View>
                </SafeAreaView>
              </View>
              <Container style={styles.ViewBackground}>
                <View style={{ paddingTop: 18, width: "90%", alignItems: 'center', alignSelf: 'center', justifyContent: 'flex-start', flexDirection: 'row' }} >
                  <TextInput
                    style={{ margin: 20, borderBottomWidth: 0.5, flex: 1, color: '#757575', alignSelf: 'center', height: 40, borderBottomColor: '#c4c4c4', paddingLeft: 4 }}
                    onChangeText={(text) => this.callCountry(text)}
                    disableFullscreenUI={true}
                    placeholder={"Enter Company Name..."}
                    placeholderTextColor={'#757575'}
                    value={this.state.textinput}
                    keyboardShouldPersistTaps={'handled'}
                  />

                </View>
                <Content style={{ width: "90%", alignSelf: "center" }}>
                  <View style={{ paddingTop: 10, width: "80%", alignSelf: "center" }} >
                    {renderComapnyDetail ? renderComapnyDetail : renderComapnyDetail}
                  </View>
                </Content>
              </Container>



            </View>



          </Modal>
          {/* //previewmodal */}

          <Modal
            animationType="slide"
            transparent={true}
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}
            visible={this.state.preview}
            onRequestClose={() => {

            }}>
            <View style={{ flex: 1, backgroundColor: 'white', width: "100%", }}>
              <View style={{ backgroundColor: BUTTON_LOGIN_COLOUR }}>
                <SafeAreaView style={{ justifyContent: 'center' }}>
                  <View style={{ paddingTop: 20, paddingBottom: 12, backgroundColor: BUTTON_LOGIN_COLOUR, justifyContent: 'space-between', alignContent: 'center', flexDirection: 'row' }}>

                    <View style={{ alignSelf: 'center' }}>
                      <Text style={{
                        fontSize: 17,
                        color: 'white',
                        alignSelf: 'center',
                      }} onPress={() => this.openModalPreview(!this.state.preview)} > Edit </Text>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                      <Text style={{
                        fontSize: 17,
                        color: 'white',
                        alignSelf: 'center',
                      }}  >Preview Company </Text>
                    </View>

                    <View style={{ alignSelf: 'center' }}>
                      <Text style={{
                        fontSize: 17,
                        color: 'white',
                        alignSelf: 'center',
                      }} onPress={() => { this.openModalPreview(!this.state.preview); this.callApiForOder() }}   > Proceed </Text>
                    </View>
                  </View>
                </SafeAreaView>
              </View>
              <Container style={styles.ViewBackground}>

                <Content style={{ width: "90%", alignSelf: "center" }}>

                  <View style={styles.borderCorner}>

                    {this.renderOrderDetail("Name", this.state.credentials.company_name)}
                    {this.renderOrderDetail("Company Price", "$" + this.state.credentials.company_price)}
                    {this.renderOrderDetail("User Name", this.state.credentials.client_name)}
                    {this.renderOrderDetail("Order Type", this.state.credentials.order_type == 2 ? "Limit" : "Market")}
                    {this.renderOrderDetail("Quantity", this.state.credentials.quantity_to_buy)}
                    {this.renderOrderDetail("Investment Preference", this.state.credentials.investment_preferences == 1 ? "Stock" : this.state.credentials.investment_preferences == 2 ? "Mutual Fund" : "Forex")}
                    {this.renderOrderDetail("Action", this.state.credentials.action == 1 ? "Buy" : "Sell")}
                    {this.renderOrderDetail("Market", this.state.credentials.select_market == 2 ? "JMD" : "USD")}
                    {this.renderOrderDetail("Company Price", this.state.company.price * this.state.QuantityToBuy)}

                    {this.renderOrderDetail("Total", this.state.credentials.total)}
                  </View>
                </Content>
              </Container>



            </View>



          </Modal>

          {/* pre view modal end  */}

          {/* //modale nd/ */}
          {this.state.load ?
            <>
              <Content>
                <TextInputComponent label={"Client Name*"} handleInput={this.handleFirstNameInput} value={this.state.name} />
                <TextInputComponent keyboardType={true} label={"Investment Amount*"} handleInput={this.handleinvestmentAmount} value={this.state.investmentAmount} />
                <Text style={styles.pickerHeading}>
                  Investment Preferences *
              </Text>
                <PickerComponent tag={"investmentPreference"} code={true} handleInput={this.handleinvestmentPreference} />
                <Text style={styles.pickerHeading}>
                  Select Market *
              </Text>
                <PickerComponent tag={"market"} handleInput={this.handlemarket} value={this.state.market} />
                {/* company start */}
                <TouchableOpacity onPress={() => this.openModal()}>
                  <View style={styles.companyView}>
                    <Text >{this.state.company?.company_name ? this.state.company?.company_name : this.state.company}</Text>
                  </View>
                </TouchableOpacity>

                {/* //compay end  */}
                <Text style={styles.pickerHeading}>
                  Order Type *
              </Text>
                <PickerComponent tag={"orderType"} handleInput={this.handleorderType} value={this.state.orderType} />
                {this.state.orderType == "Limit" ?
                  <TextInputComponent label={"Limit Price*"} handleInput={this.handleLimitPrice} value={this.state.limitPrice} />

                  : <></>}
                <Text style={styles.pickerHeading}>
                  Action *
              </Text>
                <PickerComponent tag={"OrderActionType"} handleInput={this.handleActionType} />
                <TextInputComponent label={"Quantity to Buy*"} handleInput={this.handleQuantityToBuy} value={this.state.QuantityToBuy} />
                <Text style={styles.pickerHeading}>
                  Brokers *
              </Text>
                {this.renderBrokerPicker()}
              </Content>
              <View style={styles.BottomButton}>
                <TouchableOpacity onPress={() => this.proceedToHome()}>
                  <ButtonComponent label="Preview" />
                </TouchableOpacity>
              </View>
            </>
            : <Text> </Text>
          }

        </Container >
      </KeyboardAwareScrollView >

    );
  }
}

let mapStateToProps = state => ({
  loader: state.auth.loader,
  loginData: state.auth.loginData,
  brokerUSD: state.simulation.brokerUSD,
  borkerJMD: state.simulation.borkerJMD,
  language: state.simulation.language,
  companyArr: state.simulation.companyArr,
});

let mapDispatchToProps = dispatch => ({
  ToggleModal: () => dispatch(ToggleModal()),
  OrderAction: (credentials, language) => dispatch(CreateOrderAction(credentials, language)),
  getBrokerUSDAction: (data) => dispatch(getBrokerUSDAction(data)),
  getBrokerJMDAction: (data) => dispatch(getBrokerJMDAction(data)),
  getCompanyAction: (data, language) => dispatch(getCompanyAction(data, language)),

  setOrderLanguage: (data) => dispatch(setOrderLanguage(data)),

});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);