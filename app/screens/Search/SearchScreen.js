import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler, Dimensions, Image } from 'react-native';
import { connect } from "react-redux";
import Loading from '../../components/Loadng';
import styles from './style'
import HeaderWhite from '../../components/headerWhite';
import { getNewsUSDAction, getNewsJMDAction } from '../../redux/actions/NewsAction';
import { LinearGradient } from 'expo-linear-gradient';
import { images } from '../../../assets/';

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
import { getDefaultTrending, getSectorPerformanceAction, getSectorPerformanceActionJMD } from '../../redux/actions/UserActions';
import NotificationComponent from '../../components/NotificationComponent';


class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      role: null,
    }
  }
  componentDidMount() {
    this.props.getSectorInformationAction();
    this.props.getDefaultTrending();
    this.props.getNewsJMDAction();
    this.props.getSectorPerformanceActionJMD()
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
  renderFormulcaOpenClose(open, close) {
    if (open && close) {
      if ((100 - ((open / close) * 100)) > 0) {
        return (
          <>
            <Text
              style={styles.valueTitleTextGreen}>
              {(100 - ((open / close) * 100)).toString().slice(0, 3)}
            </Text>
            <Image source={images.greenarrow} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
          </>
        )
      } else {
        return (
          <>
            <Text
              style={styles.valueTitleTextRed}>
              {(100 - ((open / close) * 100)).toString().slice(0, 3)}
            </Text>
            <Image source={images.greenarrow} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
          </>
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
  renderCardComponentUSDLinearGradiant() {


    return (

      <LinearGradient
        colors={['#009344', '#009000',]}
        style={{ padding: 10, alignItems: 'center', borderRadius: 15, width: "90%", alignSelf: 'center', marginLeft: 25, marginRight: 25, marginTop: 10, marginBottom: 10, }}>
        {this.props.sectorInformation && this.props.sectorInformation.length > 0 && this.props.sectorInformation.map((key, index) => {
          return (
            <View key={"a" + index} style={styles.FollowContainer}>
              <Text
                key={"b" + index}
                style={styles.valueHeaderText}>
                {key.name}
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={key.percent > 0 ? styles.valueTitleTextGreen : styles.valueTitleTextRed}>
                  {key.percent}%
                </Text>
                {key.percent > 0 ?
                  <Image source={images.greenarrow} style={{ marginLeft: 4, resizeMode: 'contain' }} />

                  :
                  <Image source={images.redarrow} style={{ marginLeft: 4, sresizeMode: 'contain' }} />

                }
              </View>
            </View>
          )
        })
        }

      </LinearGradient>
    );

  }


  renderCardComponentUSD() {
    return (
      <Content contentContainerStyle={{ marginTop: 15, }}>
        <View style={styles.UpdateContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingUpdate}>
              Sector Performance
        </Text>
          </View>

          {this.renderCardComponentUSDLinearGradiant()}

        </View>
      </Content>
    )
  }
  //jmd


  renderCardComponentUSDLinearGradiantJMD() {


    return (

      <LinearGradient
        colors={['#009344', '#009000',]}
        style={{ padding: 10, alignItems: 'center', borderRadius: 15, width: "90%", alignSelf: 'center', marginLeft: 25, marginRight: 25, marginTop: 10, marginBottom: 10, }}>
        {this.props.sectorInformationJMD && this.props.sectorInformationJMD.length > 0 && this.props.sectorInformationJMD.map((key, index) => {
          return (
            <View key={"a" + index} style={styles.FollowContainer}>
              <Text
                key={"b" + index}
                style={styles.valueHeaderText}>
                {key.name}
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={key.percent > 0 ? styles.valueTitleTextGreen : styles.valueTitleTextRed}>
                  {key.percent}%
                </Text>
                {key.percent > 0.0 ?
                  <Image source={images.greenarrow} style={{ marginLeft: 4, resizeMode: 'contain' }} />

                  :
                  <Image source={images.redarrow} style={{ marginLeft: 4, sresizeMode: 'contain' }} />

                }
              </View>
            </View>
          )
        })
        }

      </LinearGradient>
    );

  }


  renderCardComponentUSDJMD() {
    return (
      <Content contentContainerStyle={{ marginTop: 15, }}>
        <View style={styles.UpdateContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingUpdate}>
              Sector Performance
        </Text>
          </View>

          {this.renderCardComponentUSDLinearGradiantJMD()}

        </View>
      </Content>
    )
  }
  // jmd

  renderCardComponentJMD() {
    return (
      this.props.trendingJMD && this.props.trendingJMD.length > 0 && this.props.trendingJMD.map((key, index) => {
        return (
          <View style={styles.cardContainer} key={"view1" + index}>
            <Text style={styles.cardHeading} key={"textjmd" + index}>
              JMD
            </Text>
            <Text style={styles.cardHeading} key={"text1" + index} numberOfLines={1}>
              {key.company.name}
            </Text>
            <Text style={styles.cardSubHeading} key={"text2" + index}>
              {key.symbol}
            </Text>
            <Text style={styles.cardHeading} key={"text3" + index}>
              Open: {key.open ? key.open : 0}
            </Text>
            <Text style={styles.cardHeading} key={"text4" + index}>
              Close: {key.close ? key.close : 0}
            </Text>
            <Text style={styles.cardGreenText} key={"text5" + index}>
              Volume  {key.volume ? key.volume : 0}
            </Text>
          </View>
        )
      })
    )
  }
  renderLinearUSDNEWS() {
    return (
      <LinearGradient
        colors={['#2189BC', '#0A496A',]}
        style={{ padding: 10, alignItems: 'center', borderRadius: 15, width: "90%", alignSelf: 'center', marginLeft: 25, marginRight: 25, marginTop: 10, marginBottom: 10, }}>
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

  renderLinearJMDNEWS() {
    return (
      <LinearGradient
        colors={['#2189BC', '#0A496A',]}
        style={{ padding: 10, alignItems: 'center', borderRadius: 15, width: "90%", alignSelf: 'center', marginLeft: 25, marginRight: 25, marginTop: 10, marginBottom: 10, }}>
        {this.props.newsJMD && this.props.newsJMD.length > 0 ?
          this.props.newsJMD && this.props.newsJMD.map((arr, index) => {
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
  renderNewsJMD() {

    return (
      <Content contentContainerStyle={{ marginTop: 15, }}>
        <View style={styles.UpdateContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingUpdate}>
              News
       </Text>
          </View>

          {this.renderLinearJMDNEWS()}

        </View>
      </Content>
    );






  }
  renderUSMarketTable() {


    return (
      <View>
        <View style={{ borderTopRightRadius: 10, borderTopLeftRadius: 10, border: 0.5, backgroundColor: 'green', height: 50, width: "100%", justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{ width: "15%", color: '#fff' }} numberOfLines={1}>
            Symbol
        </Text>
          <Text style={{ width: "35%", color: '#fff' }} numberOfLines={1}>
            Company Name
        </Text>
          <Text style={{ width: "15%", color: '#fff' }} numberOfLines={1}>
            Volume
        </Text>
          <Text style={{ width: "20%", color: '#fff' }} numberOfLines={1}>
            Change
        </Text>

        </View>
        {this.props.trending && this.props.trending.length > 0 && this.props.trending.map((key, index) => {

          return (
            <TouchableOpacity key={index + "1"} onPress={() => this.props.showSearch(key)}>

              <View key={"index" + index} style={{ height: 45, borderColor: '#b5b5b5', borderWidth: 0.5, width: "100%", justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Text key={"mindex" + index} style={{ width: "15%", color: '#666666' }} numberOfLines={1}>
                  {key.symbol}
                </Text>
                <Text key={"m2index" + index} style={{ width: "30%", color: '#666666' }} numberOfLines={1}>
                  {key.company.name}
                </Text>
                <Text key={"indexm3" + index} style={{ width: "15%", color: '#666666' }} numberOfLines={1}>
                  {key.volume ? key.volume : 0}
                </Text>
                <Text key={"indexm4" + index} style={{ width: "20%", color: '#666666' }} numberOfLines={1}>
                  {key.open ? key.open : 0} ({key.close ? key.close : 0})
               </Text>

              </View>
            </TouchableOpacity>
          )
        })}


      </View>

    )

  }
  renderJMDMarketTable() {


    return (
      <View>
        <View style={{ borderTopRightRadius: 10, borderTopLeftRadius: 10, border: 0.5, backgroundColor: 'green', height: 50, width: "100%", justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{ width: "15%", color: '#fff' }} numberOfLines={1}>
            Symbol
        </Text>
          <Text style={{ width: "35%", color: '#fff' }} numberOfLines={1}>
            Company Name
        </Text>
          <Text style={{ width: "15%", color: '#fff' }} numberOfLines={1}>
            Volume
        </Text>
          <Text style={{ width: "20%", color: '#fff' }} numberOfLines={1}>
            Change
        </Text>

        </View>
        {this.props.trendingJMD && this.props.trendingJMD.length > 0 && this.props.trendingJMD.map((key, index) => {

          return (
            <TouchableOpacity key={index + "1"} onPress={() => this.props.showSearch(key)}>
              <View key={"indexj" + index} style={{ height: 45, borderColor: '#b5b5b5', borderWidth: 0.5, width: "100%", justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Text key={"indexj1" + index} style={{ width: "15%", color: '#666666' }} numberOfLines={1}>
                  {key.symbol}
                </Text>
                <Text key={"indexj2" + index} style={{ width: "30%", color: '#666666' }} numberOfLines={1}>
                  {key.company.name}
                </Text>
                <Text key={"indexj3" + index} style={{ width: "15%", color: '#666666' }} numberOfLines={1}>
                  {key.volume ? key.volume : 0}
                </Text>
                <Text key={"indexj4" + index} style={{ width: "20%", color: '#666666' }} numberOfLines={1}>
                  {key.open ? key.open : 0} ({key.close ? key.close : 0})
               </Text>

              </View>
            </TouchableOpacity>
          )
        })}

      </View>

    )

  }
  render() {
    return (
      <>
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
        <Tabs tabContainerStyle={{ backgroundColor: '#666666' }} tabBarUnderlineStyle={{ backgroundColor: BUTTON_LOGIN_COLOUR }}>
          <Tab heading="USD" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
            <Container>
              <Content>
                {this.renderCardComponentUSD()}
                {this.renderNewsUSD()}
                {this.renderUSMarketTable()}
              </Content></Container>
          </Tab>
          <Tab heading="JMD" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
            <Container>
              <Content>
                {this.renderCardComponentUSDJMD()}
                {this.renderNewsJMD()}

                {this.renderJMDMarketTable()}
              </Content>
            </Container>
          </Tab>
        </Tabs>


      </>
    );
  }
}

let mapStateToProps = state => ({
  trending: state.search.trending,
  trendingJMD: state.search.trendingJMD,
  newsUSD: state.news.newsUSD,
  newsJMD: state.news.newsJMD,
  pageno: state.news.pageno,
  sectorInformation: state.search.sectorInformation,
  sectorInformationJMD: state.search.sectorInformationJMD,
});

let mapDispatchToProps = dispatch => ({
  getDefaultTrending: (data) => dispatch(getDefaultTrending(data)),
  getNewsJMDAction: (data) => dispatch(getNewsJMDAction(data)),
  getNewsUSDAction: (data) => dispatch(getNewsUSDAction(data)),
  getSectorInformationAction: (data) => dispatch(getSectorPerformanceAction(data)),
  getSectorPerformanceActionJMD: (data) => dispatch(getSectorPerformanceActionJMD(data)),

});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);