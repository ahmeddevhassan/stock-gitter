import * as types from '../types';

const initialState = {
  searchValue: null,
  searchResult: null,
  trending: null,
  trendingJMD: null,
  newsUSDSearch: null,
  newsJMDSearch: null,
  symbolJMDSearch: null,
  symbolUSDSearch: null,
  stockUSDSearch: null,
  stockJMDSearch: null,
  analysis: null,
  sectorInformation: null,
  analysisSector: null,
  sectorInformationJMD: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SEARCH_VALUE:
      console.log("set all game", action.payLoad);

      return {
        ...state,
        searchValue: action.payLoad,
      };
    case types.SET_SEARCH_RESULT:
      console.log("search result", action.payLoad);

      return {
        ...state,
        searchResult: action.payLoad,
      };
    case types.SET_TRENDING_DEFAULT:

      return {
        ...state,
        trending: action.payLoad,
      };
    case types.SET_TRENDING_DEFAULT_JMD:

      return {
        ...state,
        trendingJMD: action.payLoad,
      };
    //news

    case types.SET_USD_NEWS_SEARCH:

      return {
        ...state,
        newsUSDSearch: action.payLoad,
      };
    case types.SET_JMD_NEWS_SEARCH:

      return {
        ...state,
        newsJMDSearch: action.payLoad,
      };
    //symbol

    case types.SET_JMD_SYMBOL_SEARCH:

      return {
        ...state,
        symbolJMDSearch: action.payLoad,
      };
    case types.SET_USD_SYMBOL_SEARCH:
      return {
        ...state,
        symbolUSDSearch: action.payLoad,
      };
    case types.SET_SEARCH_ANALYSIS:
      return {
        ...state,
        analysis: action.payLoad,
      };
    case types.SET_SECTOR_INFORMATION:
      return {
        ...state,
        sectorInformation: action.payLoad,
      };
    case types.SET_SECTOR_INFORMATION_COMPARE:
      return {
        ...state,
        analysisSector: action.payLoad,
      };
    case types.SET_SECTOR_INFORMATION_JMD:
      return {
        ...state,
        sectorInformationJMD: action.payLoad,
      };


    //SET_SEARCH_ANALYSIS SET_SECTOR_INFORMATION 
    //stock
    /**
  * 
  * newsUSDSearch: null,
newsJMDSearch: null,
symbolJMDSearch: null,
symbolUSDSearch: null,
stockUSDSearch: null,
stockJMDSearch: null,
  */
    case types.SET_JMD_STOCK_SEARCH:

      return {
        ...state,
        stockJMDSearch: action.payLoad,
      };
    case types.SET_USD_STOCK_SEARCH:
      console.log("action.payLoad", action.payLoad);

      return {
        ...state,
        stockUSDSearch: action.payLoad,
      };

    default:
      return state;
  }
};
