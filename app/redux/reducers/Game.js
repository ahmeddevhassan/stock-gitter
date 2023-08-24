import * as types from '../types';

const initialState = {
  allGames: null,
  myGame: null,
  gameDetail: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ALL_GAMES:
      console.log("set all game", action.payLoad);

      return {
        ...state,
        allGames: action.payLoad,
      };
    case types.SET_MY_GAME:
      console.log("myGame", action.payLoad);

      return {
        ...state,
        myGame: action.payLoad,
      };
    case types.SET_GAME_DETAIL:
      return {
        ...state,
        gameDetail: action.payLoad,
      };
    //

    default:
      return state;
  }
};
