import * as types from '../types';

const initialState = {
  newsUSD: null,
  newsJMD: null,
  pageno: 10,
  alerts: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ALL_USD_NEWS:
      return {
        ...state,
        newsUSD: action.payLoad,
      };
    case types.SET_ALL_JMD_NEWS:
      return {
        ...state,
        newsJMD: action.payLoad,
      };
    case types.SET_NEWS_LIMIT:
      return {
        ...state,
        pageno: action.payLoad
      };
    case types.SET_ALL_ALERTS:
      return {
        ...state,
        alerts: action.payLoad
      };

    default:
      return state;
  }
};
