import { baseUrl, authHeader, header, ENV, JMD } from "./sharedApi";
import { requestHelper } from "../utils/helper";

//api/JMD/news/company/GK?limit=1
export const getNewsUSD = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/${ENV}/news/company/GK`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};

//api/users/me

export const getNewsJMD = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/${JMD}/news/company/GK`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
//https://api.stockgitter.com/api/users/alerts

export const updateUserAlerts = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/users/alerts`,
        "POST",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
//https://api.stockgitter.com/api/users/alerts
export const getAllAlertSettings = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/users/alerts`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};


//https://api.stockgitter.com/api/USD/notifications
export const getNotificationUSD = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/${ENV}/notifications`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
export const getNotificationJMD = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/${JMD}/notifications`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
//https://api.stockgitter.com/api/USD/symbols/search
export const getSearchResult = async credentials => {
    console.log("credentials", credentials);


    const res = await requestHelper(
        `${baseUrl}/api/USD/symbols/search?q=` + credentials,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
//https://api.stockgitter.com/api/USD/symbols/trending
export const getTrendingUSD = async credentials => {
    console.log("credentials", credentials);

    // console.log("https://api.stockgitter.com/api/USD/symbols/trending");

    const res = await requestHelper(
        `${baseUrl}/api/USD/symbols/trending`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
export const getTrendingJMD = async credentials => {
    console.log("credentials", credentials);


    const res = await requestHelper(
        `${baseUrl}/api/JMD/symbols/trending`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};


//https://api.stockgitter.com/api/USD/news/company/BA?limit=5

export const getUSDNewsForSearch = async credentials => {
    console.log(`${baseUrl}/api/USD/news/company/${credentials}?limit=5`);

    const res = await requestHelper(
        `${baseUrl}/api/USD/news/company/${credentials}?limit=5`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
export const getJMDNewsForSearch = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/JMD/news/company/${credentials}?limit=5`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
export const getUSDSymbolForSearch = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/USD/symbols/${credentials}`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
export const getJMDSymbolForSearch = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/JMD/symbols/${credentials}`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
//https://api.stockgitter.com/api/USD/stocks/ba
export const getUSDSTOCKSymbolForSearch = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/USD/stocks/${credentials}`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
export const getJMDSTOCKSymbolForSearch = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/JMD/stocks/${credentials}`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};

//https://api.stockgitter.com/api/USD/analysis/SFBC
export const getAnalysisSearch = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/USD/analysis/${credentials}`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
//https://api.stockgitter.com/api/USD/sectors/performance
////
export const getSectorPerformance = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/USD/sectors/performance`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
export const getSectorPerformanceJMD = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/JMD/sectors/performance`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
export const getSectoreCompareAnalysis = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/USD/analysis/sector/${credentials}`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
//https://api.stockgitter.com/api/USD/analysis/sector/BABY