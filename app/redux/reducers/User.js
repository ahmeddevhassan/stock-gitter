import * as types from '../types';

const initialState = {
  name: false,
  email: "",
  userName: "",
  password: "",
  loader: false,
  error: '',
  role: null,
  loginData: null,
  deviceToken: null,
  responseUser: null,
  updatedData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.USER_FULLNAME:
      return {
        ...state,
        name: action.payLoad,
      };
    case types.USER_NAME:
      return {
        ...state,
        userName: action.payLoad,
      };
    case types.SET_AUTH_EMAIL:
      return {
        ...state,
        email: action.payLoad
      };
    case types.SET_AUTH_PASSWORD:
      return {
        ...state,
        password: action.payLoad
      };
    case types.SET_ERROR:
      return {
        ...state,
        error: action.payLoad
      };
    case types.SET_ROLE:
      return {
        ...state,
        role: action.payLoad
      };
    case types.LOGOUT:
      return {
        loader: false,
      };
    case types.SET_AUTH_MODAL:
      return {
        ...state,
        loader: !state.loader
      };
    case types.SET_LOGIN_DATA:
      return {
        ...state,
        loginData: action.payLoad
      };
    case types.SET_DEVICE_TOKEN:
      return {
        ...state,
        deviceToken: action.payLoad,
      };
    case types.SET_UPDATED_DATA:
      return {
        ...state,
        updatedData: action.payLoad,
      };
    default:
      return state;
  }
};
