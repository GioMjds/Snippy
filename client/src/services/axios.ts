import axios from "axios";
import { apiUrl } from "../constants/env";

const API = axios.create({
    baseURL: apiUrl
});

export const handleLogin = async (email: string, password: string) => {
    try {
        const response = await API.post('/users/login', {
                email: email, 
                password: password 
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response;
    } catch (error) {
        console.error(`Error during login: ${error}`);
        throw error;
    }
};