import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler, Image, ScrollView, TouchableHighlight, Dimensions } from 'react-native';
import { connect } from "react-redux";
import Loading from '../../components/Loadng';
import styles from './style'
import HeaderWhite from '../../components/headerWhite';
import { WebView } from 'react-native-webview'
import { Container, Content, List, ListItem, Left, Right, Tabs, Tab } from 'native-base';
import { BUTTON_LOGIN_COLOUR } from '../../utils/Consts';

import { getAllGamesAction, getGameDetailAction, getMyGameAction, enterInGameAction, LeaveInGameAction, investmentInGameAction, gameStatsAction, TopPerformaertInGameAction } from '../../redux/actions/UserActions';
import HTML from 'react-native-render-html';
import GameToperComponent from '../../components/GameToperComponent';
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      role: null,
      rules: null,
      gameId: null,
    }
  }
  componentDidMount() {
    // this.props.getMyGameAction();
    this.props.gameStatsAction();
    this.props.getAllGamesAction().then(res => {
      if (this.props.allGames && this.props.allGames.length > 0) {
        if (this.props.allGames[0].games && this.props.allGames[0].games.length > 0) {
          this.setState({ rules: this.props.allGames[0].games[0] })
          this.props.getGameDetailAction(this.props.allGames[0].games[0].id);
          this.props.TopPerformaertInGameAction(this.props.allGames[0].games[0].id);
        }

      }
    });


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
  matchValueWithMyGame(id) {
    if (this.props.myGame) {
      console.log( "in if  mygame"  );

      for (let i = 0; i < this.props.myGame.length; i++) {
        if (this.props.myGame[i] == id) {
      console.log( "return true"  );

          return true;
        }
      }
      console.log( "return false 1"  );

    return false;
    }
    else{
      console.log( "return false 2"  );
      
    return false;

    }
  }
  enterJoinAlert(id){
    setTimeout(() => {
        Alert.alert(
          'Official Notice',
          'All trading activity in the StockGitter Investment Challenge including such actions but not limited to transactions, positions and other information are virtual, fictitious and non-binding. All profits and losses are virtual. Therefore, participants will not be able to gain or lose actual money and indemnify StockGitter and the StockGitter Investment Challenge from any repercussions resulting from their participation.', [{
            text: 'Agreed',
            onPress: () =>{
 this.props.enterInGameAction(id)
 //start
    setTimeout(() => {
  Alert.alert(
          'Official Notice',
          'CONGRATULATIONS !! YOU HAVE SUCCESSFULLY JOINED USA COLLEGE FUND INVESTMENT.', [{
            text: 'Ok',
            onPress: () =>{
 
            },
          }
          ], {
        }
        )
      }, 500)


 //end
            },
          },{
            text: 'cancel',
          },
          ], {
        }
        )
      }, 500);


//

  }
    renderGameButtons(id) {
      if (this.matchValueWithMyGame(id)){
return(
      <View style={{alignItems:'center',flexDirection:'row',flexWrap:'wrap',margin:10}}>
            <TouchableOpacity onPress={()=>this.props.LeaveInGameAction(id)}>
          <View style={{margin:10,backgroundColor:BUTTON_LOGIN_COLOUR,padding:2}}>
            <Text style={{margin:10,justifyContent:'center',alignItems:'center',color:'#fff'}}>
          Leave
            </Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Static')}>
          <View style={{margin:10,backgroundColor:BUTTON_LOGIN_COLOUR,padding:2}}>
            <Text style={{margin:10,justifyContent:'center',alignItems:'center',color:'#fff'}}>
          Invest
            </Text>
          </View>
          </TouchableOpacity>
      </View>
)
      }
      else{
        return(

          <TouchableOpacity onPress={()=>this.enterJoinAlert(id)} style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
             <View style={{borderRadius:10,margin:10,backgroundColor:BUTTON_LOGIN_COLOUR,padding:2,width:100,justifyContent:'center',alignItems:'center'}}>
            <Text style={{margin:10,justifyContent:'center',alignItems:'center',color:'#fff'}}>
          Join
            </Text>
          </View>
          </TouchableOpacity>
        )
      }
  }
    render() {
      return (
        <Container>
          <HeaderWhite back={false} label={"Competitions"} />
          <Content>
            <View style={{ padding: 10, marginTop: 5, marginBottom: 5, justifyContent: 'center', width: "100%", backgroundColor: '#0b753c', alignContent: 'center' }}>
              <Text style={{ color: '#fff', alignSelf: 'center', margin: 10 }}>
                MY STATUS
            </Text>
            </View>
            <List>
              <ListItem>
                <Left>
                  <Text>
                    My Position
  
                </Text>
                </Left>
                <Right>
                  <Text>
                    {this.props.myGame?.rank}
                </Text>
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>
                  Account Balance
                </Text>
                </Left>
                <Right>
                  <Text>
                  ${this.props.myGame?.account_value}
                    
                </Text>
                </Right>
              </ListItem>

              <ListItem>
                <Left>
                  <Text>
                    
                  Total Profit
  
                </Text>
                </Left>
                <Right>
                  <Text>
                 
                ${this.props.myGame?.profit}

                </Text>
                </Right>
              </ListItem>

              <ListItem>
                <Left>
                  <Text>
                  Games Entered
                </Text>
                </Left>
                <Right>
                  <Text>
                  {this.props.myGame?.entered}
                    
                </Text>
                </Right>
              </ListItem>

              <ListItem>
                <Left>
                  <Text>
                  Earnings To Date
  
                </Text>
                </Left>
                <Right>
                  <Text>
                 $ {this.props.myGame?.earnings}
                    
                </Text>
                </Right>
              </ListItem>
            </List>
            <View style={{ padding: 10, marginTop: 5, marginBottom: 5, justifyContent: 'center', width: "100%", backgroundColor: '#0b753c', alignContent: 'center' }}>
              <Text style={{ color: '#fff', alignSelf: 'center', margin: 10 }}>
                All Competitions
            </Text>
            </View>

            <ScrollView horizontal={true}>
              {this.props.allGames && this.props.allGames.length > 0 && this.props.allGames.map((key, index) => {
                return (
                  <View key={"1" + index} style={{ borderWidth: 0.7, borderColor: '#0b753c', borderRadius: 10, margin: 7 }}>
                    <View key={"2" + index} style={{ borderWidth: 0.7, borderColor: '#0b753c', borderRadius: 10, padding: 5, marginTop: 5, marginBottom: 5, justifyContent: 'center', width: "100%", backgroundColor: '#0b753c', alignContent: 'center' }}>
                      <Text key={"3" + index} style={{ color: '#fff', alignSelf: 'center', margin: 10 }}>
                        {key.parent ? key.parent.name : ''}( {key.name})
                  </Text>
                    </View>
                    {/* //2nd */}
                    {key.games && key.games.length > 0 && key.games.map((obj, ind) => {
                      return (
                        <TouchableHighlight key={"4" + ind} onPress={() => {
                          this.setState({ rules: obj });
                          this.props.getGameDetailAction(obj.id)
                        }}>
                          <View key={"5" + ind} style={{ borderWidth: 0.7, borderColor: '#0b753c', borderRadius: 10, padding: 5, marginTop: 5, marginBottom: 5, justifyContent: 'center', width: "100%", alignContent: 'center' }}>
                            <Text key={"6" + ind} style={{ color: '#0b753c', alignSelf: 'center', margin: 10 }}>
                              {obj.name}
                            </Text>
                          </View>
                        </TouchableHighlight>
                      )
                    })}




                  </View>
                )
              })}
            </ScrollView>

            {this.state.rules && this.state.rules.rules ?
            <>
            <Text style={{margin:10,flexWrap:'wrap'}}>
              Selected: {this.state.rules.name}
            </Text>
                    {this.renderGameButtons(this.state.rules.id)}

              <Tabs tabContainerStyle={{ backgroundColor: '#666666' }} tabBarUnderlineStyle={{ backgroundColor: BUTTON_LOGIN_COLOUR }}>
                <Tab heading="Over View" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
        <Container>
                  <Content>
                    {/* //GameToperComponent */}
                    {this.props.gameDetail && this.props.gameDetail.length > 0 && this.props.gameDetail.map((res, index) => {
                      return (
                        <GameToperComponent key={index} data={res} />
                      )
                    })}
                  </Content>
        </Container>

                </Tab>

                <Tab heading="Rules" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
                  <ScrollView style={{ flex: 1 }}>
                    <HTML html={this.state.rules.rules} imagesMaxWidth={Dimensions.get('window').width - 50} containerStyle={{ margin: 10, }} />
                  </ScrollView>
                </Tab>
              </Tabs>
              </>
              : <></>}

          </Content>
        </Container>

      );
    }
  }

let mapStateToProps = state => ({
  allGames: state.game.allGames,
  myGame: state.game.myGame,
  gameDetail: state.game.gameDetail,
});

let mapDispatchToProps = dispatch => ({
  //getgetGameDetailAction 
  getAllGamesAction: () => dispatch(getAllGamesAction()),
  getMyGameAction: () => dispatch(getMyGameAction()),
  getGameDetailAction: (data) => dispatch(getGameDetailAction(data)),
  enterInGameAction: (data) => dispatch(enterInGameAction(data)),
  LeaveInGameAction: (data) => dispatch(LeaveInGameAction(data)),
  gameStatsAction: (data) => dispatch(gameStatsAction(data)),
  investmentInGameAction: (data) => dispatch(investmentInGameAction(data)),
  TopPerformaertInGameAction: (data) => dispatch(TopPerformaertInGameAction(data)),
  //
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);