import { AsyncStorage } from 'react-native'
let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const action = (actionName, load) => {

  return {
    type: actionName,
    payLoad: load
  }
};

export const emailCheck = (email) => {
  return reg.test(email);
}
export let GetToken = () => AsyncStorage.getItem("UserData1").then((val) => {
  if (val != null) {
    val = JSON.parse(val);
    console.log("my token:" + val);
    return val.token ? val.token : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyMC0wMi0yMSAwNzo0MTo1MyIsInVzZXJfdHlwZSI6Imd1ZXN0X3VzZXIifQ.-yh6IY75cZbaMT3eB7EZTrFL5gYsa16j9UR9i8RXSyE';
  }
  return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyMC0wMi0yMSAwNzo0MTo1MyIsInVzZXJfdHlwZSI6Imd1ZXN0X3VzZXIifQ.-yh6IY75cZbaMT3eB7EZTrFL5gYsa16j9UR9i8RXSyE';

});
//Get Role
export let GetRole = () => AsyncStorage.getItem("UserData1").then((val) => {
  if (val != null) {
    val = JSON.parse(val);
    return val.role;
  }
});
export let GetCompanyId = () => AsyncStorage.getItem("UserData1").then((val) => {
  if (val != null) {
    val = JSON.parse(val);
    return val.company_id;
  }
});


export const requestHelper = (url, method, headers, data) => {
  const requestLoad = {
    method,
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  const getLoad = {
    method,
    headers: { ...headers, "Content-Type": "application/json" },
  };
  return fetch(`${url}`, method === "GET" || method == "DELETE" ? getLoad : requestLoad)

};