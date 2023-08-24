import * as types from '../types';

const initialState = {
  simulationSettingUSD: null,
  simulationSettingJMD: null,
  brokerUSD: null,
  borkerJMD: null,
  language: null,
  companyArr: null,
  orderId: null,
  orderListUSD: null,
  orderListJMD: null,
  oneBroker: null,
  watchliststock: null,
  watchlistforex: null,
  watchlistbond: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DEFAULT_SIMULATION_SETTING_USD:
      return {
        ...state,
        simulationSettingUSD: action.payLoad,
      };
    case types.SET_DEFAULT_SIMULATION_SETTING_JMD:
      return {
        ...state,
        simulationSettingJMD: action.payLoad,
      };
    case types.SET_BROKER_JMD:
      return {
        ...state,
        borkerJMD: action.payLoad,
      };
    case types.SET_BROKER_USD:
      return {
        ...state,
        brokerUSD: action.payLoad,
      };
    case types.SET_ORDER_LANGUAGE:
      return {
        ...state,
        language: action.payLoad,
      };
    case types.SET_COMPANY_ARR:
      return {
        ...state,
        companyArr: action.payLoad,
      };
    case types.SET_ORDER_ID:
      return {
        ...state,
        orderId: action.payLoad,
      };
    case types.SET_ORDER_LIST_USD:
      return {
        ...state,
        orderListUSD: action.payLoad,
      };
    case types.SET_ORDER_LIST_JMD:
      return {
        ...state,
        orderListJMD: action.payLoad,
      };
    case types.SET_ONE_BROKER:
      return {
        ...state,
        oneBroker: action.payLoad,
      };
    case types.SET_WATCHLIST_STOCK:
      return {
        ...state,
        watchliststock: action.payLoad,
      };
    case types.SET_WATCHLIST_FOREX:
      return {
        ...state,
        watchlistforex: action.payLoad,
      };
    case types.SET_WATCHLIST_BOND:
      return {
        ...state,
        watchlistbond: action.payLoad,
      };
    //SET_BROKER_JMDcompanyArr orderId orderListUSD


    default:
      return state;
  }
};
