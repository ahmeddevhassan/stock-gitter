import { baseUrl, authHeader, header, ENV, JMD } from "./sharedApi";
import { requestHelper } from "../utils/helper";

//api/JMD/news/company/GK?limit=1
export const getSimulationUSD = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/${ENV}/simulations`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};

export const getSimulationJMD = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/${JMD}/simulations`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
export const SimulationDefaultUser = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/${JMD}/simulations-settings`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};

//https://api.stockgitter.com/api/USD/simulations
export const getBrokerUSD = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/${ENV}/brokers`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
export const getBrokerJMD = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/${JMD}/brokers`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
export const createOrder = async (credentials, language) => {
    const res = await requestHelper(
        `${baseUrl}/api/${language}/order-preview`,
        "POST",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
//https://api.stockgitter.com/api/USD/stocks-list?search_value={COMPANY_NAME}&order_col=0&order_dir=asc&length=5
export const getCompanyObject = async (credentials, language) => {
    const res = await requestHelper(
        `${baseUrl}/api/${language}/stocks-list?search_value=${credentials}&order_col=0&order_dir=asc&length=10`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
//https://api.stockgitter.com/api/orders

export const placeOrderForStatus = async (credentials, language) => {
    const res = await requestHelper(
        `${baseUrl}/api/${language}/orders`,
        "POST",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
//https://api.stockgitter.com/api/USD/orders-list
export const listOrderHistoryUSD = async (credentials, language) => {
    const res = await requestHelper(
        `${baseUrl}/api/${ENV}/orders-list`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
export const listOrderHistoryJMD = async (credentials, language) => {
    const res = await requestHelper(
        `${baseUrl}/api/${JMD}/orders-list`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};

export const getPreferredSimulationBroker = async (credentials, language) => {
    const res = await requestHelper(
        `${baseUrl}/api/${ENV}/simulations-settings`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
export const getwatchListStockApi = async (credentials, language) => {
    const res = await requestHelper(
        `${baseUrl}/api/${ENV}/watchlist/groups/stocks`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
export const getwatchListForexApi = async (credentials, language) => {
    const res = await requestHelper(
        `${baseUrl}/api/${ENV}/watchlist/groups/forex`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
export const getwatchListBondApi = async (credentials, language) => {
    const res = await requestHelper(
        `${baseUrl}/api/${ENV}/watchlist/groups/bonds`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
//https://api.stockgitter.com/api/USD/watchlist/groups/forex

//USD/simulations-settings
//https://api.stockgitter.com/api/USD/watchlist/groups/stocks
//https://api.stockgitter.com/api/USD/watchlist
export const addtowatchlist = async (credentials) => {
    const res = await requestHelper(
        `${baseUrl}/api/USD/watchlist`,
        "POST",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
export const removeFromWatchList = async (credentials) => {
    const res = await requestHelper(
        `${baseUrl}/api/USD/watchlist/symbol/${credentials}`,
        "DELETE",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
//https://api.stockgitter.com/api/USD/watchlist/symbol/FCCY
export const getGroups = async (credentials, language) => {
    const res = await requestHelper(
        `${baseUrl}/api/USD/watchlist/groups`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};

//https://api.stockgitter.com/api/USD/watchlist/groups