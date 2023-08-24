import * as types from '../types';
import store from '../store';
import { AsyncStorage } from 'react-native';
import { action } from "../../utils/helper";
// import { loginUser } from "../../api/authApi";
import { EMPTY_USERNAME, EMPTY_PASSWORD, INVALID_CREDENTIALS } from "../../utils/Consts";
import { getSimulationJMD, getSimulationUSD, getBrokerJMD, getBrokerUSD, createOrder, getCompanyObject, placeOrderForStatus, listOrderHistoryUSD, listOrderHistoryJMD, getPreferredSimulationBroker, getwatchListBondApi, getwatchListStockApi, getwatchListForexApi, addtowatchlist, getGroups, removeFromWatchList } from '../../api/SimulationApi';
import { ToggleModal } from './UserActions'

// MARK - Setter
export const setDefaultSimulationSettingUSD = data => action(types.SET_DEFAULT_SIMULATION_SETTING_USD, data);
export const setDefaultSimulationSettingJMD = data => action(types.SET_DEFAULT_SIMULATION_SETTING_JMD, data);
export const detBrokerTypeDataJMD = data => action(types.SET_BROKER_JMD, data);
export const detBrokerTypeDataUSD = data => action(types.SET_BROKER_USD, data);
export const setOrderLanguage = data => action(types.SET_ORDER_LANGUAGE, data);
export const setCompanyArr = data => action(types.SET_COMPANY_ARR, data);
export const setOrderId = data => action(types.SET_ORDER_ID, data);
export const setOrderUSD = data => action(types.SET_ORDER_LIST_USD, data);
export const setOrderJMD = data => action(types.SET_ORDER_LIST_JMD, data);
export const setBrokerPreferred = data => action(types.SET_ONE_BROKER, data);
export const setwatchlistStock = data => action(types.SET_WATCHLIST_STOCK, data);
export const setwatchlistforex = data => action(types.SET_WATCHLIST_FOREX, data);
export const setwatchlistBond = data => action(types.SET_WATCHLIST_BOND, data);
//SET_ORDER_LANGUAGE
// MARK - Actions SET_COMPANY_ARR//SET_ORDER_ID setOrderUSD

export let getUserSimulationUSD = (credentials, navigation, error) => {
  return async (dispatch) => {
    // dispatch(ToggleModal());


    let data = await getSimulationUSD(credentials);

    let response = {
      success: 1,
      error: "",
    };
    if (data.result) {
      if (data.result.data) {

        dispatch(setDefaultSimulationSettingUSD(data.result.data))
      }
    }
    return response;
  }

};
export let getUserSimulationJMD = (credentials, navigation, error) => {
  return async (dispatch) => {
    // dispatch(ToggleModal());


    let data = await getSimulationJMD(credentials);
    console.log(" yes");


    let response = {
      success: 1,
      error: "",
    };
    if (data.result) {
      if (data.result.data) {

        dispatch(setDefaultSimulationSettingJMD(data.result.data))
      }
    }
    return response;
  }

};

export let getBrokerUSDAction = (credentials, navigation, error) => {
  return async (dispatch) => {
    // dispatch(ToggleModal());


    let data = await getBrokerUSD(credentials);
    console.log(" yes");


    let response = {
      success: 1,
      error: "",
    };
    if (data.result) {
      if (data.result.data) {
        let payload = [];
        await data.result.data.map(key => {
          payload.push({
            name: key.first_name + " " + key.last_name,
            code: key.id
          })
        })
        dispatch(detBrokerTypeDataUSD(payload))
      }
    }
    return response;
  }

};
export let getBrokerJMDAction = (credentials, navigation, error) => {
  return async (dispatch) => {
    // dispatch(ToggleModal());


    let data = await getBrokerJMD(credentials);
    console.log(" yes");


    let response = {
      success: 1,
      error: "",
    };
    if (data.result) {
      if (data.result.data) {
        let payload = [];
        await data.result.data.map(key => {
          payload.push({
            name: key.first_name + " " + key.last_name,
            code: key.id
          })
        })
        dispatch(detBrokerTypeDataJMD(payload))
      }
    }
    return response;
  }

};
//OrderAction

export let CreateOrderAction = (credentials, language) => {
  return async (dispatch) => {
    // dispatch(ToggleModal());
    dispatch(ToggleModal());

    let data = await createOrder(credentials, language);
    console.log(" createOrder data", data);
    let response = {
      success: 1,
      error: "",
    };
    if (data && data.status) {
      if (data.status == "OK") {
        dispatch(ToggleModal());
        response.success = 1;
        dispatch(setOrderId(data.result.data.id))
        let res = await placeOrderForStatus({ id: data.result.data.id }, language);
        console.log("res place order -> ", res);


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
//setOrderId
export let PlaceOrderAction = (credentials, language) => {
  return async (dispatch) => {
    // dispatch(ToggleModal());
    let data = await createOrder(credentials, language);
    console.log(" createOrder data", data);
  }
};
// get cluntry
export let getCompanyAction = (credentials, language) => {
  return async (dispatch) => {
    // dispatch(ToggleModal());
    let data = await getCompanyObject(credentials, language);
    //setCompanyArr
    if (data.result.data) {
      dispatch(setCompanyArr(data.result.data));
    }
  }
};

export let ListOrdersActionUSD = () => {
  return async (dispatch) => {
    // dispatch(ToggleModal());
    let data = await listOrderHistoryUSD();
    //setCompanyArr\

    if (data.result.data) {
      console.log("1");

      dispatch(setOrderUSD(data.result.data));
    }
    return;
  }
};

export let ListOrdersActionJMD = () => {
  return async (dispatch) => {
    // dispatch(ToggleModal());
    let data = await listOrderHistoryJMD();
    //setCompanyArr

    if (data.result.data) {
      console.log("2");

      dispatch(setOrderJMD(data.result.data));
    }
    return;

  }
};
export let getPreferredSimulationBrokerAction = () => {
  return async (dispatch) => {
    // dispatch(ToggleModal());
    let data = await getPreferredSimulationBroker();
    //setCompanyArr
    console.log("data prefered ", data);

    if (data.result.data) {

      dispatch(setBrokerPreferred(data.result.data));
    }
    return;

  }
};
//
export let getwatchlistStock = () => {
  return async (dispatch) => {
    // dispatch(ToggleModal());
    let data = await getwatchListStockApi();
    //setCompanyArr
    console.log("data data.result.data watch ", data.result.data);

    if (data.result.data) {

      dispatch(setwatchlistStock(data.result.data));
    }
    return;

  }
};
export let getwatchlistForex = () => {
  return async (dispatch) => {
    // dispatch(ToggleModal());
    let data = await getwatchListForexApi();
    //setCompanyArr
    console.log("data prefered ", data);

    if (data.result.data) {

      dispatch(setwatchlistforex(data.result.data));
    }
    return;

  }
};
export let getwatchlistBond = () => {
  return async (dispatch) => {
    // dispatch(ToggleModal());
    let data = await getwatchListBondApi();
    //setCompanyArr
    console.log("data prefered ", data);

    if (data.result.data) {

      dispatch(setwatchlistBond(data.result.data));
    }
    return;

  }
};
export let addToWatchLostAction = (payload) => {
  return async (dispatch) => {
    // dispatch(ToggleModal());
    //  https://api.stockgitter.com/api/USD/watchlist/groups
    console.log("payload", payload);

    let groups = await getGroups()
    if (groups && groups.result && groups.result.data && groups.result.data.length > 0) {
      console.log("payload", payload);
      console.log("groups", groups);

      payload.group_id = groups.result.data[0].id
      let data = await addtowatchlist(payload);
      console.log("watchlist list ", data);
      alert('watchlist added successfully.')
    }


    //setCompanyArr
    return;

  }
};

export let removeFromWatchlistAction = (payload) => {
  return async (dispatch) => {
    // dispatch(ToggleModal());
    //  https://api.stockgitter.com/api/USD/watchlist/groups
    console.log("payload", payload);

    let groups = await removeFromWatchList(payload)
    console.log("groups", groups);

    alert('Watchlist item removed successfully')

    //setCompanyArr
    return;

  }
};
//
