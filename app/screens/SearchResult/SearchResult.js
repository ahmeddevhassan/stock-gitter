import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler, Dimensions } from 'react-native';
import { connect } from "react-redux";
import Loading from '../../components/Loadng';
import styles from './style'
import HeaderWhite from '../../components/headerWhite';
import { getNewsUSDAction, getNewsJMDAction } from '../../redux/actions/NewsAction';
import moment from 'moment'
import { LinearGradient } from 'expo-linear-gradient';

import { WebView } from 'react-native-webview'
import { Container, Content, Tab, Tabs, Left, Right } from 'native-base';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { BUTTON_LOGIN_COLOUR } from '../../utils/Consts';
import { ScrollView } from 'react-native-gesture-handler';
import { getDefaultTrending, setSearchSymbolJMDAction, setSearchSymbolUSDAction, setSearchStockUSDAction, setSearchStockJMDAction, setSearchNewsJMDAction, setSearchNewsUSDAction, setSearchStockUSD, getAnalysisSearchAction, getSectoreCompareAnalysisAction } from '../../redux/actions/UserActions';
import NotificationComponent from '../../components/NotificationComponent';


class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      role: null,
    }
  }
  componentDidMount() {
    let symbol = this.props.symbol.symbol
    this.props.setSearchNewsUSDAction(symbol).then(res => {
      console.log("this.props.newsUSD", this.props.newsUSD);

    });
    this.props.setSearchNewsJMDAction(symbol).then(res => {
      console.log("this.props.jmd", this.props.newsJMD);

    });
    this.props.setSearchSymbolUSDAction(symbol);
    this.props.getAnalysisSearchAction(symbol)
    this.props.getSectoreCompareAnalysisAction(symbol)
    this.props.setSearchStockUSDAction(symbol).then(res => {
      console.log("->", this.props.stockUSDSearch);
      this.props.setSearchStockUSD(res);
      console.log("res", res);

    })
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
  textRowComponent(heading, value) {

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


  renderLinearUSDNEWS() {
    return (
      <LinearGradient
        colors={['#2189BC', '#0A496A',]}
        style={{ padding: 10, alignItems: 'center', borderRadius: 15, width: "90%", alignSelf: 'center', marginLeft: 25, marginRight: 25, marginTop: 10, marginBottom: 10, }}>
        {/* {this.props.newsJMD && this.props.newsJMD.length > 0 ?
          this.props.newsJMD && this.props.newsJMD.map((arr, index) => {
            return (<NotificationComponent obj={arr} key={"notification" + index} />)
          })
          :
          <Text style={{ color: '#fff' }}>
            No news found.
          </Text>
        } */}
        {this.props.newsUSD && this.props.newsUSD.length > 0 ?
          this.props.newsUSD && this.props.newsUSD.map((arr, index) => {
            return (<NotificationComponent obj={arr} key={"notification" + index} />)
          })
          :
          <Text style={{ color: '#fff' }}>
            No news found.
          </Text>
        }

      </LinearGradient>
    )
  }
  renderNewsUSD() {
    return (
      <Content contentContainerStyle={{ marginTop: 15, }}>
        <View style={styles.UpdateContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingUpdate}>
              News
           </Text>
          </View>

          {this.renderLinearUSDNEWS()}

        </View>
      </Content>
    )
  }
  renderNewsJMD() {

    return (this.props.newsJMD && this.props.newsJMD.map((arr, index) => {
      return (<NotificationComponent obj={arr} key={"notification" + index} />)
    }))

  }
  renderUSMarketTable() {


    return (
      <View>
        <View style={{ height: 50, width: "100%", justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{ width: "15%", color: '#000' }} numberOfLines={1}>
            Symbol
        </Text>
          <Text style={{ width: "35%", color: '#000' }} numberOfLines={1}>
            Company Name
        </Text>
          <Text style={{ width: "15%", color: '#000' }} numberOfLines={1}>
            Volume
        </Text>
          <Text style={{ width: "20%", color: '#000' }} numberOfLines={1}>
            Change
        </Text>

        </View>
        {this.props.trending && this.props.trending.length > 0 && this.props.trending.map((key, index) => {

          return (
            <View style={{ height: 45, borderColor: '#b5b5b5', borderWidth: 0.5, width: "100%", justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <Text style={{ width: "15%", color: '#666666' }} numberOfLines={1}>
                {key.symbol}
              </Text>
              <Text style={{ width: "30%", color: '#666666' }} numberOfLines={1}>
                {key.company.name}
              </Text>
              <Text style={{ width: "15%", color: '#666666' }} numberOfLines={1}>
                {key.volume ? key.volume : 0}
              </Text>
              <Text style={{ width: "20%", color: '#666666' }} numberOfLines={1}>
                {key.open ? key.open : 0} ({key.close ? key.close : 0})
               </Text>

            </View>
          )
        })}

      </View>

    )

  }
  renderJMDMarketTable() {


    return (
      <View>
        <View style={{ height: 50, width: "100%", justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{ width: "15%", color: '#000' }} numberOfLines={1}>
            Symbol
        </Text>
          <Text style={{ width: "35%", color: '#000' }} numberOfLines={1}>
            Company Name
        </Text>
          <Text style={{ width: "15%", color: '#000' }} numberOfLines={1}>
            Volume
        </Text>
          <Text style={{ width: "20%", color: '#000' }} numberOfLines={1}>
            Change
        </Text>

        </View>
        {this.props.trendingJMD && this.props.trendingJMD.length > 0 && this.props.trendingJMD.map((key, index) => {

          return (
            <View style={{ height: 45, borderColor: '#b5b5b5', borderWidth: 0.5, width: "100%", justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <Text style={{ width: "15%", color: '#666666' }} numberOfLines={1}>
                {key.symbol}
              </Text>
              <Text style={{ width: "30%", color: '#666666' }} numberOfLines={1}>
                {key.company.name}
              </Text>
              <Text style={{ width: "15%", color: '#666666' }} numberOfLines={1}>
                {key.volume ? key.volume : 0}
              </Text>
              <Text style={{ width: "20%", color: '#666666' }} numberOfLines={1}>
                {key.open ? key.open : 0} ({key.close ? key.close : 0})
               </Text>

            </View>
          )
        })}

      </View>

    )

  }

  renderLinearFinanciala() {
    return (
      <LinearGradient
        colors={['#2189BC', '#0A496A',]}
        style={{ padding: 10, alignItems: 'center', borderRadius: 15, width: "90%", alignSelf: 'center', marginLeft: 25, marginRight: 25, marginTop: 10, marginBottom: 10, }}>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Open Price
          </Text>
          <Text
            style={styles.valueTitleText}>
            {this.props.analysis?.open_price}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Close Price
          </Text>
          <Text
            style={styles.valueTitleText}>
            ${this.props.analysis?.close_price}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Volume Traded (Units)
          </Text>
          <Text
            style={styles.valueTitleText}>
            ${this.props.analysis?.volume_traded}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Last Traded Price
          </Text>
          <Text
            style={styles.valueTitleText}>
            ${this.props.analysis?.last_trade_price}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Today's Range
          </Text>
          <Text
            style={styles.valueTitleText}>
            ${this.props.analysis?.days_low_price} - ${this.props.analysis?.days_high_price}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            52 Week's Range
          </Text>
          <Text
            style={styles.valueTitleText}>
            ${this.props.analysis?.low_price_52_week} - ${this.props.analysis?.high_price_52_week}

          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            52 Week's Ind
          </Text>
          <Text
            style={styles.valueTitleText}>
            ${this.props.analysis?.low_price_52_ind} - ${this.props.analysis?.high_price_52_ind}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Bid Price
          </Text>
          <Text
            style={styles.valueTitleText}>
            ${this.props.analysis?.bid_price}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Ask Price
          </Text>
          <Text
            style={styles.valueTitleText}>
            $ {this.props.analysis?.ask_price}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Close Net Change
          </Text>
          <Text
            style={styles.valueTitleText}>
            ${this.props.analysis?.closeNetChange}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Market Change
          </Text>
          <Text
            style={styles.valueTitleText}>
            ${this.props.analysis?.marketChange}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Market Value
          </Text>
          <Text
            style={styles.valueTitleText}>
            ${this.props.analysis?.marketValue}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Shares Outstanding
          </Text>
          <Text
            style={styles.valueTitleText}>
            ${this.props.analysis?.sharesOutstanding}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Num of Trades
          </Text>
          <Text
            style={styles.valueTitleText}>
            {this.props.analysis?.numOfTrades}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Pre Divided Amount
          </Text>
          <Text
            style={styles.valueTitleText}>
            ${this.props.analysis?.preDividendAmount}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Dividend
          </Text>
          <Text
            style={styles.valueTitleText}>
            {this.props.analysis?.dividend}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            EPS
          </Text>
          <Text
            style={styles.valueTitleText}>
            {this.props.analysis?.eps}
          </Text>
        </View>
      </LinearGradient>
    )
  }
  renderFinancials() {
    return (
      <Content contentContainerStyle={{ marginTop: 15, }}>
        <View style={styles.UpdateContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingUpdate}>
              {this.props.symbol.symbol} : Stock Summary
           </Text>
          </View>

          {this.renderLinearFinanciala()}

        </View>
      </Content>
    )
  }
  renderFormulcaOpenClose(open, close) {
    if (open && close) {
      if ((100 - ((open / close) * 100)) > 0) {
        return (
          <Text
            style={styles.valueTitleTextGreen}>
            {(100 - ((open / close) * 100)).toString().slice(0, 3)}
          </Text>
        )
      } else {
        return (
          <Text
            style={styles.valueTitleTextRed}>
            {(100 - ((open / close) * 100)).toString().slice(0, 3)}
          </Text>
        )
      }
    }
    else {
      return (<Text
        style={styles.valueHeaderText}>
        0
      </Text>)
    }


  }
  loadAllNewSearch(key) {
    let symbol = key.symbol
    this.props.setSearchNewsUSDAction(symbol).then(res => {
      console.log("this.props.newsUSD", this.props.newsUSD);

    });
    this.props.setSearchNewsJMDAction(symbol).then(res => {
      console.log("this.props.jmd", this.props.newsJMD);

    });
    this.props.setSearchSymbolUSDAction(symbol);
    this.props.getAnalysisSearchAction(symbol)
    this.props.getSectoreCompareAnalysisAction(symbol)
    this.props.setSearchStockUSDAction(symbol).then(res => {
      console.log("->", this.props.stockUSDSearch);
      this.props.setSearchStockUSD(res);
      console.log("res", res);

    })
  }
  renderCardCompareUSDLinearGradiant() {


    return (

      <LinearGradient
        colors={['#009344', '#009000',]}
        style={{ padding: 10, alignItems: 'center', borderRadius: 15, width: "90%", alignSelf: 'center', marginLeft: 25, marginRight: 25, marginTop: 10, marginBottom: 10, }}>
        {this.props.analysisSector?.stocks && this.props.analysisSector?.stocks.length > 0 && this.props.analysisSector?.stocks.map((key, index) => {
          return (

            <View key={"a" + index} style={styles.FollowContainer}>
              <TouchableOpacity onPress={() => this.loadAllNewSearch(key)
              }>
                <>
                  <View>
                    <Text
                      key={"b" + index}
                      style={styles.valueHeaderText}>
                      {key.symbol}
                    </Text>
                    <Text style={styles.valueHeaderText}>
                      {key.company.name}
                    </Text>
                  </View>
                  {this.renderFormulcaOpenClose(key.open, key.close)}
                </>
              </TouchableOpacity>

            </View>
          )
        })
        }

      </LinearGradient>
    );

  }
  renderSectorPerformance() {
    return (
      <Content contentContainerStyle={{ marginTop: 15, }}>
        <View style={styles.UpdateContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingUpdate}>
              Sector Performance
        </Text>
            <Text style={styles.headingUpdateSubHEading}>
              {this.props.analysisSector?.sectorName} ( {this.props.analysisSector?.percent})
        </Text>
          </View>
          {this.renderCardCompareUSDLinearGradiant()}
        </View>
      </Content>
    )
  }

  render() {
    return (
      <Tabs tabContainerStyle={{ backgroundColor: '#666666' }} tabBarUnderlineStyle={{ backgroundColor: BUTTON_LOGIN_COLOUR }}>
        <Tab heading="Overview" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
          <Container>
            <Content>
              {/* <View style={{ alignSelf: 'center', width: "90%" }}>
                  <LineChart
                    data={{
                      labels: ["January", "February", "March", "April", "May", "June"],
                      datasets: [
                        {
                          data: [
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                          ]
                        }
                      ]
                    }}
                    width={Dimensions.get("window").width - 30} // from react-native
                    height={Dimensions.get("window").height / 2.2}
                    yAxisLabel={"$"}
                    yAxisSuffix={"k"}
                    chartConfig={{
                      backgroundColor: "#009344",
                      backgroundGradientFrom: "#009300",
                      backgroundGradientTo: "#009344",
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16
                      },
                      propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#009344"
                      }
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16
                    }}
                  />
                  <View style={styles.viewRowOuter}>
                    <Left>
                      {this.textRowComponent("Open", "258.25")}
                    </Left>
                    <Right>
                      {this.textRowComponent("MilkCap", "258.25")}
                    </Right>
                  </View>
                  <View style={styles.viewRowOuter}>
                    <Left>
                      {this.textRowComponent("Close", "258.25")}
                    </Left>
                    <Right>
                      {this.textRowComponent("P/E ratio", "258.25")}
                    </Right>
                  </View>
                  <View style={styles.viewRowOuter}>
                    <Left>
                      {this.textRowComponent("Low", "258.25")}
                    </Left>
                    <Right>
                      {this.textRowComponent("Div Yeild", "258.25")}
                    </Right>
                  </View>
                </View> */}
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ margin: 5, fontSize: 16 }}>
                  Open: $ {this.props.stockUSDSearch?.open}
                </Text>
                <Text style={{ margin: 5, fontSize: 16 }}>
                  Close: $ {this.props.stockUSDSearch?.close}
                </Text>
                <Text style={{ margin: 5, fontSize: 16 }}>
                  Volume: $ {this.props.stockUSDSearch?.volume}
                </Text>
                <Text style={{ margin: 10 }}>
                  {this.props.symbolUSDSearch?.company_overview ? this.props.symbolUSDSearch?.company_overview : 'No Description Found'}
                </Text>
              </View>
              <View style={{ flex: 1, height: 700, width: "100%" }}>
                {/* //*/}
                <WebView
                  ref="webview"
                  style={{ flex: 1, width: "100%", height: "100%", }}
                  source={{ uri: "https://s.tradingview.com/widgetembed/?frameElementId=tradingview_08d89&symbol=" + this.props.symbol.symbol + "&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=0&toolbarbg=f1f3f6&details=1&hotlist=1&studies=%5B%5D&hideideas=1&theme=Light&style=1&timezone=exchange&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=localhost&utm_medium=widget&utm_campaign=chart&utm_term=" + this.props.symbol.symbol }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  originWhitelist={["*"]}
                />

              </View>




            </Content>
          </Container>
        </Tab>
        <Tab heading="News" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
          <Container>
            <Content>

              {this.renderNewsUSD()}

            </Content>
          </Container>
        </Tab>
        <Tab heading="Compare" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
          <Container>
            <Content>
              {this.renderSectorPerformance()}

            </Content>
          </Container>
        </Tab>
        <Tab heading="Financials" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
          {this.renderFinancials()}
        </Tab>
      </Tabs>
    );
  }
}

let mapStateToProps = state => ({
  newsUSD: state.search.newsUSDSearch,
  newsJMD: state.search.newsJMDSearch,
  symbolJMDSearch: state.search.symbolJMDSearch,
  symbolUSDSearch: state.search.symbolUSDSearch,
  stockUSDSearch: state.search.stockUSDSearch,
  stockJMDSearch: state.search.stockJMDSearch,
  analysis: state.search.analysis,
  analysisSector: state.search.analysisSector
});

let mapDispatchToProps = dispatch => ({
  setSearchNewsUSDAction: (data) => dispatch(setSearchNewsUSDAction(data)),
  setSearchNewsJMDAction: (data) => dispatch(setSearchNewsJMDAction(data)),
  setSearchStockJMDAction: (data) => dispatch(setSearchStockJMDAction(data)),
  setSearchStockUSDAction: (data) => dispatch(setSearchStockUSDAction(data)),
  setSearchSymbolUSDAction: (data) => dispatch(setSearchSymbolUSDAction(data)),
  setSearchSymbolJMDAction: (data) => dispatch(setSearchSymbolJMDAction(data)),
  setSearchStockUSD: (data) => dispatch(setSearchStockUSD(data)),
  getAnalysisSearchAction: (data) => dispatch(getAnalysisSearchAction(data)),
  getSectoreCompareAnalysisAction: (data) => dispatch(getSectoreCompareAnalysisAction(data))

});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResult);