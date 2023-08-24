import { baseUrl, authHeader, header, ENV, JMD } from "./sharedApi";
import { requestHelper } from "../utils/helper";

//api/JMD/news/company/GK?limit=1
export const getAllGames = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/competitions/all`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};

export const getMyGame = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/competitions/my-games`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};

export const getGameDetailApi = async credentials => {
    console.log(`${baseUrl}/api/competitions/top-performers/${credentials}`);

    const res = await requestHelper(
        `${baseUrl}/api/competitions/top-performers/${credentials}`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};

//api/competitions/enter/:game_id
export const enterInGame = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/competitions/enter/${credentials}`,
        "POST",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
//leave game 
export const LeaveInGame = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/competitions/leave/${credentials}`,
        "POST",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
//invest in game
export const InvestmentInGame = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/competitions/investments/${credentials}`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
//api : https://api.stockgitter.com/api/competitions/top-performers/:game_id
export const TopPerformaertInGame = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/competitions/top-performers/${credentials}`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};
//stats
//api : https://api.stockgitter.com/api/competitions/stats
export const GameStats = async credentials => {
    const res = await requestHelper(
        `${baseUrl}/api/competitions/stats`,
        "GET",
        await header(),
        credentials
    );
    const data = res.json();
    return data;
};