import axios from "axios";
import { apiUrl } from "../constants/env";

const API = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});

export const handleLogin = async (email: string, password: string) => {
    try {
        const response = await API.post('/users/login', { email, password });
        return response.data;
    } catch (error) {
        console.error(`Error during login: ${error}`);
        throw error;
    }
};