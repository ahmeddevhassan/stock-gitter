import * as types from '../types';
import store from '../store';
import { AsyncStorage } from 'react-native';
import { action } from "../../utils/helper";
// import { loginUser } from "../../api/authApi";
import { EMPTY_USERNAME, EMPTY_PASSWORD, INVALID_CREDENTIALS } from "../../utils/Consts";
import { getNewsJMD, getNewsUSD, updateUserAlerts, getAllAlertSettings, getNotificationUSD, getNotificationJMD } from '../../api/NewApi';
import { ToggleModal } from './UserActions'
import _ from 'lodash'

// MARK - Setter
export const setNewsJMD = data => action(types.SET_ALL_JMD_NEWS, data);
export const setNewsUSD = data =>
  action(types.SET_ALL_USD_NEWS, data);
export const SetError = (value) =>
  action(types.SET_NEWS_LIMIT, value);
export const SetAllAlerts = (value) =>
  action(types.SET_ALL_ALERTS, value);
export const setNotificationUsdType = (value) =>
  action(types.SET_ALL_USD_notification, value);
export const setNotificationJmdType = (value) =>
  action(types.SET_ALL_JMD_notification, value);
//


// MARK - Getter

// MARK - Actions

export let getNewsJMDAction = (credentials, navigation, error) => {
  return async (dispatch) => {
    // dispatch(ToggleModal());


    let data = await getNewsJMD(credentials);

    let response = {
      success: 1,
      error: "",
    };
    if (data.result) {
      if (data.result.data) {
        dispatch(setNewsJMD(data.result.data))
      }
    }
    // if (data && data.status) {
    //   if (data.status == "OK") {
    //     dispatch(ToggleModal());
    //     let value = data.result.data;
    //     AsyncStorage.setItem('UserData', JSON.stringify(value));
    //     dispatch(SetLoginData(value));
    //     response.success = 1;
    //   }
    //   else if (data.status == "NOK") {
    //     dispatch(ToggleModal());
    //     response.error = data.result.error;
    //     response.success = 0;
    //   }
    //   else {
    //     dispatch(ToggleModal());
    //     response.error = data.result.error;
    //     response.success = 0;
    //   }
    // } else {
    //   dispatch(ToggleModal());
    //   response.error = "Please check your internet.";
    //   response.success = 0;
    // }

    return response;
  }

};
// signup
export let getNewsUSDAction = (credentials, navigation, error) => {
  return async (dispatch) => {
    // dispatch(ToggleModal());

    let data = await getNewsUSD(credentials);
    let response = {
      success: 1,
      error: "",
    };
    if (data.result) {
      if (data.result.data) {
        dispatch(setNewsUSD(data.result.data))
      }
    }
    // if (data && data.status) {
    //   if (data.status == "OK") {
    //     dispatch(ToggleModal());
    //     response.success = 1;
    //   }
    //   else if (data.status == "NOK") {
    //     dispatch(ToggleModal());
    //     response.error = data.result.error;
    //     response.success = 0;
    //   }
    //   else {
    //     dispatch(ToggleModal());
    //     response.error = data.result.error;
    //     response.success = 0;
    //   }
    // } else {
    //   dispatch(ToggleModal());
    //   response.error = "Please check your internet.";
    //   response.success = 0;
    // }


    return response;

  }

};

//updateUserAlerts
export const UpdateUserProfileAlerts = (credentials) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    let response = await updateUserAlerts(credentials);
    console.log("response updateUserAlerts ", response);

  }
}
//getAllAlertSettings
export const GetUserAlerts = (navigation) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    dispatch(ToggleModal());

    let response = await getAllAlertSettings("");
    console.log("response updateUserAlerts ", response);
    dispatch(SetAllAlerts(response.result.data))
    dispatch(ToggleModal());

    //SET_ALL_ALERTS
    //SetAllAlerts

  }
}

//

export const getNotificationUSDAction = (navigation) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    dispatch(ToggleModal());
    let response = await getNotificationUSD("");
    console.log("response notification usd  ", response);

    dispatch(setNotificationUsdType(response.result.data))
    dispatch(ToggleModal());

    //SET_ALL_ALERTS
    //SetAllAlerts

  }
}
export const getNotificationJMDAction = (navigation) => {
  return async (dispatch) => {
    // dispatch(Log_out());
    dispatch(ToggleModal());
    let response = await getNotificationJMD("");
    console.log("response notification jmd ", response);
    console.log("response.result.data0,response.result.data", response.result.data);

    dispatch(setNotificationJmdType(response.result.data))
    dispatch(ToggleModal());

    //SET_ALL_ALERTS
    //SetAllAlerts

  }
}
//