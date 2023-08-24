import * as types from '../types';
import store from '../store';
import { AsyncStorage } from 'react-native';
import { action, GetCompanyId } from "../../utils/helper";
// import { loginUser } from "../../api/authApi";
import { EMPTY_USERNAME, EMPTY_PASSWORD, INVALID_CREDENTIALS } from "../../utils/Consts";
import { SignUp, loginUser, ActivateAuth, changeAvatar, UpdateProfileData, UpdatePassword, AddSimulationDefault, ForgotEmailCheck, refreshAuthToken, getUserInfo, PinAuthApi } from '../../api/authApi';
import { getAllGames, getGameDetailApi, getMyGame, enterInGame, LeaveInGame, InvestmentInGame, GameStats, TopPerformaertInGame } from '../../api/GameApi';
import { getSearchResult, getTrending, getTrendingUSD, getTrendingJMD, getUSDNewsForSearch, getJMDNewsForSearch, getJMDSTOCKSymbolForSearch, getUSDSTOCKSymbolForSearch, getUSDSymbolForSearch, getJMDSymbolForSearch, getAnalysisSearch, getSectorPerformance, getSectoreCompareAnalysis, getSectorPerformanceJMD } from '../../api/NewApi';


// MARK - Setter
export const authName = name => action(types.SET_AUTH_EMAIL, name);
export const authPassword = password =>
  action(types.SET_AUTH_PASSWORD, password);
export const ToggleModal = loader =>
  action(types.SET_AUTH_MODAL);
export const SetError = (value) =>
  action(types.SET_ERROR, value);
export let SetRole = (value) =>
  action(types.SET_ROLE, value);
//SetLoginData
export let SetLoginData = (data) =>
  action(types.SET_LOGIN_DATA, data);
//SetLoginData
export let setDeviceId = (data) =>
  action(types.SET_DEVICE_TOKEN, data);
//logout
export const Log_out = () =>
  action(types.LOGOUT);
export let setUserUpdatedInfo = (data) =>
  action(types.SET_UPDATED_DATA, data);

// game
export let setAllGameType = (data) =>
  action(types.SET_ALL_GAMES, data);
export let setAllUserGameType = (data) =>
  action(types.SET_MY_GAME, data);
//game Detail
export let setAllGameDetail = (data) =>
  action(types.SET_GAME_DETAIL, data);
// MARK - Getter
export let setSearchValue = (data) =>
  action(types.SET_SEARCH_VALUE, data);
export let setSearchResult = (data) =>
  action(types.SET_SEARCH_RESULT, data);
export let setDeaultTrending = (data) =>
  action(types.SET_TRENDING_DEFAULT, data);
export let setDeaultTrendingJMD = (data) =>
  action(types.SET_TRENDING_DEFAULT_JMD, data);



// searchNewsSet
export let setSearchNewsUSD = (data) =>
  action(types.SET_USD_NEWS_SEARCH, data);


export let setSearchNewsJMD = (data) =>
  action(types.SET_JMD_NEWS_SEARCH, data);

export let setSearchSymbolJMD = (data) =>
  action(types.SET_JMD_SYMBOL_SEARCH, data);

export let setSearchSymbolUSD = (data) =>
  action(types.SET_USD_SYMBOL_SEARCH, data);

export let setSearchStockUSD = (data) =>
  action(types.SET_USD_STOCK_SEARCH, data);

export let setSearchStockJMD = (data) =>
  action(types.SET_JMD_STOCK_SEARCH, data);

//SET_SEARCH_ANALYSIS
export let setSearchAnalysis = (data) =>
  action(types.SET_SEARCH_ANALYSIS, data);

export let setSectorInformation = (data) =>
  action(types.SET_SECTOR_INFORMATION, data);
export let setSectorInformationJMD = (data) =>
  action(types.SET_SECTOR_INFORMATION_JMD, data);


export let setSectorInformationCompare = (data) =>
  action(types.SET_SECTOR_INFORMATION_COMPARE, data);



export const getUserName = () => {
  const state = store.getState();
  return state.user.name;
};

// MARK - Actions

export let login = (credentials, navigation, error) => {
  return async (dispatch) => {
    dispatch(ToggleModal());
    console.log(" login ");


    let data = await loginUser(credentials);

    console.log(" data", data);

    let response = {
      success: 1,
      error: "",
    };
    if (data && data.status) {
      if (data.status == "OK") {
        dispatch(ToggleModal());
        let value = data.result.data;
        AsyncStorage.setItem('UserData1', JSON.stringify(value));
        dispatch(SetLoginData(value));
        response.success = 1;
      }
      else if (data.status == "NOK") {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
      else {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
    } else {
      dispatch(ToggleModal());
      response.error = "Please check your internet.";
      response.success = 0;
    }

    return response;
  }

};
// signup
export let SignUpAction = (credentials, navigation, error) => {
  return async (dispatch) => {
    dispatch(ToggleModal());

    let data = await SignUp(credentials);
    let response = {
      success: 1,
      error: "",
    };
    if (data && data.status) {
      if (data.status == "OK") {
        dispatch(ToggleModal());
        response.success = 1;
      }
      else if (data.status == "NOK") {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
      else {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
    } else {
      dispatch(ToggleModal());
      response.error = "Please check your internet.";
      response.success = 0;
    }


    return response;

  }

};

// activation code
export let ActivateAcount = (credentials, navigation, error) => {
  return async (dispatch) => {
    dispatch(ToggleModal());
    let data = await ActivateAuth(credentials);
    let response = {
      success: 1,
      error: "",
      message: "",
    };
    if (data && data.status) {
      if (data.status == "OK") {
        dispatch(ToggleModal());
        response.success = 1;
        response.message = data.result.message;
      }
      else if (data.status == "NOK") {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
      else {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
    } else {
      dispatch(ToggleModal());
      response.error = "Please check your internet.";
      response.success = 0;
    }

    return response;

  }
};
//logout

export const ChangeAvatar = (Cred) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    // let response = await signout("");
    dispatch(ToggleModal());

    let response = await changeAvatar(Cred);
    dispatch(ToggleModal());

    console.log("response", response);
  }
}
export const UserProfileInfoUpdate = (Cred) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    // let response = await signout("");
    dispatch(ToggleModal());

    let data = await UpdateProfileData(Cred);
    console.log("data", data);

    let response = {
      success: 1,
      error: "",
      message: "",
    };
    if (data && data.status) {
      if (data.status == "OK") {
        dispatch(ToggleModal());
        response.success = 1;
        response.message = data.result.message;
      }
      else if (data.status == "NOK") {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
      else {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
    } else {
      dispatch(ToggleModal());
      response.error = "Please check your internet.";
      response.success = 0;
    }

    return response;

  }
}

export const userProfilePasswordUpdate = (Cred) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    // let response = await signout("");
    dispatch(ToggleModal());

    let data = await UpdatePassword(Cred);
    console.log("->>", data);

    let response = {
      success: 1,
      error: "",
      message: "",
    };
    if (data && data.status) {
      if (data.status == "OK") {
        dispatch(ToggleModal());
        response.success = 1;
        response.message = data.result.message;
      }
      else if (data.status == "NOK") {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
      else {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
    } else {
      dispatch(ToggleModal());
      response.error = "Please check your internet.";
      response.success = 0;
    }

    return response;

  }
}

export const AddDefaultSimulation = (Cred) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    // let response = await signout("");
    dispatch(ToggleModal());

    let data = await AddSimulationDefault(Cred);
    let response = {
      success: 1,
      error: "",
      message: "",
    };
    if (data && data.status) {
      if (data.status == "OK") {
        dispatch(ToggleModal());
        response.success = 1;
        response.message = data.result.message;
      }
      else if (data.status == "NOK") {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
      else {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
    } else {
      dispatch(ToggleModal());
      response.error = "Please check your internet.";
      response.success = 0;
    }

    return response;

  }
}
//ForgotEmailCheck
export const ForgotEmailCheckAction = (Cred) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    // let response = await signout("");
    dispatch(ToggleModal());

    let data = await ForgotEmailCheck(Cred);
    console.log("data", data);

    let response = {
      success: 1,
      error: "",
      message: "",
    };
    if (data && data.status) {
      if (data.status == "OK") {
        dispatch(ToggleModal());
        response.success = 1;
        response.message = data.result.message;
      }
      else if (data.status == "NOK") {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
      else {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
    } else {
      dispatch(ToggleModal());
      response.error = "Please check your internet.";
      response.success = 0;
    }

    return response;

  }
}
export const refreshUserAuthData = (navigation) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    let response = await refreshAuthToken("");
    console.log("response", response);
  }
}
//getUserInfo
export const getUserInfoAction = (navigation) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    let response = await getUserInfo("");

    dispatch(setUserUpdatedInfo(response.result.data))
  }
}

export const ForgotPinCheckAction = (credentials) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    dispatch(ToggleModal());

    let data = await PinAuthApi(credentials);
    console.log("response from server ", data);
    let response = {
      success: 1,
      error: "",
      message: "",
    };
    if (data && data.status) {
      if (data.status == "OK") {
        dispatch(ToggleModal());
        response.success = 1;
        response.message = data.result.message;
      }
      else if (data.status == "NOK") {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
      else {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
    } else {
      dispatch(ToggleModal());
      response.error = "Please check your internet.";
      response.success = 0;
    }

    return response;
    // dispatch(setUserUpdatedInfo(response.result.data))
  }
}
export const signOut = (navigation) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    // let response = await signout("");
    await AsyncStorage.removeItem('UserData1').then((val) => {
      navigation.navigate('WelcomeScreen');
    });


  }
}


// game action 
export const getAllGamesAction = (navigation) => {
  return async (dispatch) => {
    // dispatch(Log_out());

    dispatch(ToggleModal());

    let data = await getAllGames();
    //console.log("data-> all games ", data);

    let response = {
      success: 1,
      error: "",
      message: "",
    };
    if (data && data.status) {
      if (data.status == "OK" || data.status == 200) {
        dispatch(ToggleModal());
        response.success = 1;
        //setAllGameType
        dispatch(setAllGameType(data.result.data))
      }
      else if (data.status == "NOK") {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
      else {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
    } else {
      dispatch(ToggleModal());
      response.error = "Please check your internet.";
      response.success = 0;
    }

    return response;
  }
}
//
export const getGameDetailAction = (gameId) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    dispatch(ToggleModal());
    let data = await getGameDetailApi(gameId);
    let response = {
      success: 1,
      error: "",
      message: "",
    };
    //console.log("game detail data ", data);
    if (data && data.status) {
      if (data.status == "OK" || data.status == 200) {
        dispatch(ToggleModal());
        response.success = 1;
        //setAllGameType
        dispatch(setAllGameDetail(data.result.data))
      }
      else if (data.status == "NOK") {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
      else {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
    } else {
      dispatch(ToggleModal());
      response.error = "Please check your internet.";
      response.success = 0;
    }

    return response;
  }
}
//getMyGame
export const getMyGameAction = (gameId) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    dispatch(ToggleModal());
    let data = await getMyGame(gameId);
    console.log("my game ", data);

    let response = {

      success: 1,
      error: "",
      message: "",
    };

    if (data && data.status) {
      if (data.status == "OK" || data.status == 200) {
        dispatch(ToggleModal());
        response.success = 1;
        //setAllGameType
        dispatch(setAllUserGameType(data.result))

      }
      else if (data.status == "NOK") {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
      else {
        dispatch(ToggleModal());
        response.error = data.result.error;
        response.success = 0;
      }
    } else {
      dispatch(ToggleModal());
      response.error = "Please check your internet.";
      response.success = 0;
    }

    return response;
  }
}

//enter in game action
export const enterInGameAction = (gameId) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    dispatch(ToggleModal());
    let data = await enterInGame(gameId);
    dispatch(ToggleModal());
    dispatch(getMyGameAction(gameId))
    console.log("join data", data);

  }
}
//leave
export const LeaveInGameAction = (gameId) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    dispatch(ToggleModal());
    let data = await LeaveInGame(gameId);
    dispatch(ToggleModal());
    dispatch(getMyGameAction(gameId))
    console.log("leave data", data);

  }
}
//investin gamee
export const investmentInGameAction = (gameId) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    dispatch(ToggleModal());
    let data = await InvestmentInGame(gameId);
    dispatch(ToggleModal());
    console.log("investin games data", data);

  }
}
//investin gamee
export const gameStatsAction = (gameId) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    dispatch(ToggleModal());
    let data = await GameStats(gameId);
    dispatch(ToggleModal());
    console.log("game stats data", data);
    dispatch(setAllUserGameType(data.result))


  }
}
//top performaer gamee
export const TopPerformaertInGameAction = (gameId) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    dispatch(ToggleModal());
    let data = await TopPerformaertInGame(gameId);
    dispatch(ToggleModal());
    console.log("topeerformaer data", data);

  }
}
//serch
export const searchValueActipn = (search) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    let data = await getSearchResult(search);
    dispatch(setSearchResult(data.result.data))
    //setSearchResult
  }
}

export const getDefaultTrending = (search) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    let data = await getTrendingUSD(search);
    dispatch(setDeaultTrending(data.result.data))

    data = await getTrendingJMD(search);
    dispatch(setDeaultTrendingJMD(data.result.data))
    //setSearchResult
  }
}

// search final actions
export const setSearchNewsUSDAction = (search) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    let data = await getUSDNewsForSearch(search);
    console.log("datanews usd ", data);
    dispatch(setSearchNewsUSD(data.result.data))


    //setSearchResult
  }
}
export const setSearchNewsJMDAction = (search) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    let data = await getJMDNewsForSearch(search);
    dispatch(setSearchNewsJMD(data.result.data))


    //setSearchResult
  }
}
export const setSearchStockJMDAction = (search) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    let data = await getJMDSTOCKSymbolForSearch(search);
    dispatch(setSearchStockJMD(data.result.data))


    //setSearchResult
  }
}
export const setSearchStockUSDAction = (search) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    let data = await getUSDSTOCKSymbolForSearch(search);
    console.log("haseeb", data.result);

    dispatch(setSearchStockUSD(data.result.data.info))
    console.log("haseeb", data.result);

    return data.result.data.info;

    //setSearchResult
  }
}
export const setSearchSymbolUSDAction = (search) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    let data = await getUSDSymbolForSearch(search);
    console.log("haseeb-0-0-0 ", data);

    dispatch(setSearchSymbolUSD(data.result.data))


    //setSearchResult
  }
}
export const setSearchSymbolJMDAction = (search) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    let data = await getJMDSymbolForSearch(search);
    dispatch(setSearchSymbolJMD(data.result.data))


    //setSearchResult
  }
}
//getAnalysisSearch
export const getAnalysisSearchAction = (search) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    let data = await getAnalysisSearch(search);
    dispatch(setSearchAnalysis(data.result.data))
    console.log("analysis", data);



    //setSearchResult
  }
}
//https://api.stockgitter.com/api/USD/sectors/performance
export const getSectorPerformanceAction = (search) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    let data = await getSectorPerformance(search);
    dispatch(setSectorInformation(data.result.data))
    console.log("sector", data);



    //setSearchResult
  }
}
export const getSectorPerformanceActionJMD = (search) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    let data = await getSectorPerformanceJMD(search);
    dispatch(setSectorInformationJMD(data.result.data))
    console.log("sector", data);



    //setSearchResult
  }
}
//getSectoreCompareAnalysis
export const getSectoreCompareAnalysisAction = (search) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    let data = await getSectoreCompareAnalysis(search);
    dispatch(setSectorInformationCompare(data.result))
    console.log("compare info ", data);



    //setSearchResult
  }
}