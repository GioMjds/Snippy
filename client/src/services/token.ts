import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { apiUrl } from "../constants/env";

const API = axios.create({
    baseURL: apiUrl,
});

export const isTokenExpired = (token: string): boolean => {
    const decoded: { exp: number } = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const currentTime = Date.now() / 1000;
    return tokenExpiration < currentTime;
};

export const getAccessToken = async (codeParam: string) => {
    try {
        const response = await API.get('/auth/getAccessToken', {
            params: {
                code: codeParam
            }
        });
        console.log(response.data);
        if (response.data.access_token) {
            localStorage.setItem("access_token", response.data.access_token);
            return response.data.access_token;
        } else {
            console.error("No access token received from server");
            return null;
        }
    } catch (error) {
        console.error(`Error getting access token: ${error}`);
        throw error;
    }
}

export const refreshUserToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return false;
    if (isTokenExpired(refreshToken)) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return false;
    }
    
    try {
        const response = await axios.post(`${apiUrl}/refresh`, { refresh: refreshToken });
        if (response.status === 200) {
            localStorage.setItem("access_token", response.data.access);
            return true;
        }
        return false;
    } catch (error) {
        console.error(`Error refreshing token: ${error}`);
        return false;
    }
};

export const userAuth = async (): Promise<boolean> => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
        console.warn(`No access token found`);
        return false;
    }

    if (isTokenExpired(accessToken)) {
        const response = await refreshUserToken();
        return response ?? false;
    }

    console.log(`Token expiry checked`);
    return true;
}