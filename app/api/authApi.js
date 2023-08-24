import { baseUrl, authHeader, header, ENV } from "./sharedApi";
import { requestHelper } from "../utils/helper";
export const loginUser = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/${ENV}/auth/login`,
        "POST",
        authHeader,
        credentials
    );
    const data = res.json();
    return data;
};
export const SignUp = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/${ENV}/auth/register`,
        "POST",
        authHeader,
        credentials
    );
    const data = res.json();
    return data;
};
export const ActivateAuth = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/${ENV}/auth/activate-user`,
        "POST",
        authHeader,
        credentials
    );
    const data = res.json();
    return data;
};
//api/auth/avatar
export const changeAvatar = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/${ENV}/auth/avatar`,
        "POST",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};

//api/users/me

export const UpdateProfileData = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/${ENV}/users/me`,
        "POST",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
export const UpdatePassword = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/${ENV}/auth/change-password`,
        "POST",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
export const AddSimulationDefault = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/${ENV}/auth/change-password`,
        "POST",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
export const ForgotEmailCheck = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/${ENV}/auth/forget-password`,
        "POST",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
//api/auth/refresh-token
export const refreshAuthToken = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/${ENV}/auth/refresh-token`,
        "POST",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
//api/users/me
export const getUserInfo = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/${ENV}/users/me`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
//PinAuthApi
export const PinAuthApi = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/auth/reset-password`,
        "POST",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};



