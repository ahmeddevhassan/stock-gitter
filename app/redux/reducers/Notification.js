import * as types from '../types';

const initialState = {
  notificationUSD: null,
  notificationJMD: null,
  pageno: 10,
  alerts: null,
  investment: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ALL_USD_notification:
      console.log("action.payLoad USD", action.payLoad);

      return {
        ...state,
        notificationUSD: action.payLoad,
      };
    case types.SET_ALL_JMD_notification:
      console.log("action.payLoad", action.payLoad);

      return {
        ...state,
        notificationJMD: action.payLoad,
      };
    case types.SET_notification_LIMIT:
      return {
        ...state,
        pageno: action.payLoad
      };
    case types.SET_ALL_ALERTS:
      return {
        ...state,
        alerts: action.payLoad
      };
    case types.SET_ALL_INVESTMENT:
      return {
        ...state,
        investment: action.payLoad
      };


    default:
      return state;
  }
};
